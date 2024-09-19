import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  extra: {
    eas: {
      projectId: "489fb70f-4a80-4dec-9c24-be48db502895"
    },
  },
  android: {
    googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
  }
});