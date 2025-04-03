module.exports = {
  presets: [
    ['babel-preset-expo', {
      unstable_transformProfile: 'hermes-stable'
    }],
  ],
  plugins: [
    'react-native-reanimated/plugin',
    ['module:react-native-dotenv', {
      envName: 'APP_ENV',
      moduleName: '@env', 
      path: '.env',
    }],
  ],
};
