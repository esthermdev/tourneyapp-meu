import { createClient } from "jsr:@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("EXPO_PUBLIC_SUPABASE_URL")!,
  Deno.env.get("EXPO_PUBLIC_SUPABASE_ANON_KEY")!,
);

const BATCH_SIZE = 100;

// Define the type for a single notification
interface Notification {
  to: string;
  sound: string;
  title: string;
  body: string;
  data: { type: string };
}

// Define the type for the Expo API response
interface ExpoPushTicket {
  id: string;
  status: "ok" | "error";
  message?: string;
  details?: {
    error: string;
  };
}

interface ExpoPushResponse {
  data: ExpoPushTicket[];
}

async function sendNotifications(
  notifications: Notification[],
): Promise<ExpoPushResponse> {
  console.log(`Sending batch of ${notifications.length} notifications`);
  const response = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(notifications),
  });

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(
      `Failed to send notifications: ${response.status} ${responseText}`,
    );
  }

  return await response.json() as ExpoPushResponse;
}

Deno.serve(async (req: Request) => {
  if (req.method === "POST") {
    try {
      console.log("Received POST request");
      const { title, message } = await req.json() as {
        title: string;
        message: string;
      };
      console.log("Parsed request body:", { title, message });

      const { data: users, error: fetchError } = await supabase
        .from("profiles")
        .select("expo_push_token")
        .not("expo_push_token", "is", null);

      if (fetchError) throw fetchError;

      console.log("Fetched user tokens:", users.length);

      const tokens = users.map((user: { expo_push_token: string }) =>
        user.expo_push_token
      );

      const results: ExpoPushResponse[] = [];
      for (let i = 0; i < tokens.length; i += BATCH_SIZE) {
        const batchTokens = tokens.slice(i, i + BATCH_SIZE);
        const batchNotifications: Notification[] = batchTokens.map((token) => ({
          to: token,
          sound: "default",
          title,
          body: message,
          data: { type: "announcement" },
        }));

        console.log(
          `Preparing batch ${Math.floor(i / BATCH_SIZE) + 1} of ${
            Math.ceil(tokens.length / BATCH_SIZE)
          }`,
        );
        const result = await sendNotifications(batchNotifications);
        results.push(result);
      }

      console.log("All notifications sent successfully");

      return new Response(JSON.stringify({ success: true, data: results }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    } catch (error) {
      console.error("Detailed error:", error);
      return new Response(
        JSON.stringify({
          error: (error as Error).message,
          details: (error as Error).toString(),
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        },
      );
    }
  } else {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      headers: { "Content-Type": "application/json" },
      status: 405,
    });
  }
});
