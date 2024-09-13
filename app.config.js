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
  plugins: [
    ...config.plugins,
    [
      "expo-build-properties",
      {
        android: {
          extraProguardRules: `
            -keep class com.facebook.hermes.unicode.** { *; }
            -keep class com.facebook.jni.** { *; }
          `
        }
      }
    ]
  ]
});