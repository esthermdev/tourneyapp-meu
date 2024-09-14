import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  extra: {
    supabaseUrl: "https://opleqymigooimduhlvym.supabase.co",
    supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wbGVxeW1pZ29vaW1kdWhsdnltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk0OTgxNDAsImV4cCI6MjAzNTA3NDE0MH0.2vvrpj3_y4JmWbgYEnOQO0TEM3ofehRvDjkAh6mVOPA",
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