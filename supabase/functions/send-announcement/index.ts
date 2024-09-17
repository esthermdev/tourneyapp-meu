import { createClient } from "jsr:@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("EXPO_PUBLIC_SUPABASE_URL")!,
  Deno.env.get("EXPO_PUBLIC_SUPABASE_ANON_KEY")!,
);

Deno.serve(async (req) => {
  if (req.method === "POST") {
    try {
      const { title, message } = await req.json();

      // Fetch all users' Expo push tokens
      const { data: users, error: fetchError } = await supabase
        .from("profiles")
        .select("expo_push_token")
        .not("expo_push_token", "is", null);

      if (fetchError) throw fetchError;

      const tokens = users.map((user) => user.expo_push_token);

      // Prepare the notification payload
      const notifications = tokens.map((token) => ({
        to: token,
        sound: "default",
        title: title,
        body: message,
        data: { type: "announcement" },
      }));

      // Send notifications using Expo's push notification service
      const response = await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notifications),
      });

      if (!response.ok) {
        throw new Error("Failed to send notifications");
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }
  } else {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      headers: { "Content-Type": "application/json" },
      status: 405,
    });
  }
});
