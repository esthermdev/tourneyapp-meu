import 'dotenv/config';

const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'com.esmdev.TourneyAppMEU.dev';
  }

  if (IS_PREVIEW) {
    return 'com.esmdev.TourneyAppMEU.preview';
  }

  return 'com.esmdev.TourneyAppMEU';
};

const getAppName = () => {
  if (IS_DEV) {
    return 'Maine Ultimate (Dev)';
  }

  if (IS_PREVIEW) {
    return 'Maine Ultimate (Preview)';
  }

  return 'Maine Ultimate';
};


export default ({ config }) => ({
  ...config,
  name: getAppName(),
  extra: {
    eas: {
      projectId: "489fb70f-4a80-4dec-9c24-be48db502895"
    },
  },
  ios: {
    ...config.ios,
    bundleIdentifier: getUniqueIdentifier(),
  },
  android: {
    ...config.android,
    package: "com.esmdev.TourneyAppMEU",
    googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
  }
});