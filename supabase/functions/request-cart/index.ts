import { createClient } from "jsr:@supabase/supabase-js@2";

interface CartRequest {
  id: number;
  from_location: string;
  to_location: string;
  from_field_number: number | null;
  to_field_number: number | null;
  status: string;
}

interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  record: CartRequest;
  schema: "public";
  old_record: null | CartRequest;
}

const supabase = createClient(
  Deno.env.get("EXPO_PUBLIC_SUPABASE_URL")!,
  Deno.env.get("EXPO_PUBLIC_SUPABASE_ANON_KEY")!,
);

const NOTIFICATION_TTL = 30;

Deno.serve(async (req) => {
  const payload: WebhookPayload = await req.json();
  const cartRequest = payload.record;

  // Only proceed if this is an INSERT operation
  if (payload.type !== "INSERT") {
    return new Response(JSON.stringify({ message: "No action taken" }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const { data: volunteers, error } = await supabase
    .from("profiles")
    .select("id, expo_push_token")
    .eq("is_volunteer", true)
    .eq("is_available", true)
    .eq("is_logged_in", true);

  if (error) {
    console.error("Error fetching volunteers:", error);
    throw new Error("Failed to fetch volunteers");
  }

  if (volunteers && volunteers.length > 0) {
    const expirationTime = Date.now() + NOTIFICATION_TTL * 1000;
    const notification = {
      sound: "default",
      title: "New Cart Request",
      body: `From: ${cartRequest.from_location}${
        cartRequest.from_field_number ? ` ${cartRequest.from_field_number}` : ""
      } To: ${cartRequest.to_location}${
        cartRequest.to_field_number ? ` ${cartRequest.to_field_number}` : ""
      }`,
      data: {
        requestId: cartRequest.id,
        expirationTime: expirationTime,
        type: "new_cart_request",
      },
      contentAvailable: true,
    };

    const messages = volunteers.map((volunteer) => ({
      to: volunteer.expo_push_token,
      ...notification,
    }));

    const res = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("EXPO_ACCESS_TOKEN")}`,
      },
      body: JSON.stringify(messages),
    }).then((res) => res.json());

    setTimeout(async () => {
      const { data: request, error: requestError } = await supabase
        .from("cart_requests")
        .select("status")
        .eq("id", cartRequest.id)
        .single();

      if (requestError) {
        console.error("Error checking request status:", requestError);
        return;
      }

      if (request.status === "pending") {
        const { error: updateError } = await supabase
          .from("cart_requests")
          .update({ status: "expired" })
          .eq("id", cartRequest.id);

        if (updateError) {
          console.error(
            "Error updating request status to timed_out:",
            updateError,
          );
        } else {
          const silentNotification = {
            to: volunteers.map((v) => v.expo_push_token),
            content: {
              title: "Cart Request Expired",
              body: "A cart request has expired and been removed.",
            },
            data: {
              type: "cart_request_expired",
              requestId: cartRequest.id,
            },
            contentAvailable: true,
          };

          await fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Deno.env.get("EXPO_ACCESS_TOKEN")}`,
            },
            body: JSON.stringify(silentNotification),
          });
        }
      }
    }, NOTIFICATION_TTL * 1000);

    return new Response(JSON.stringify(res), {
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ message: "No action taken" }), {
    headers: { "Content-Type": "application/json" },
  });
});
