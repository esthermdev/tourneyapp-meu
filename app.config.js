import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  extra: {
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    eas: {
      projectId: "489fb70f-4a80-4dec-9c24-be48db502895"
    },
  },
  updates: {
    url: "https://u.expo.dev/489fb70f-4a80-4dec-9c24-be48db502895"
  },
});