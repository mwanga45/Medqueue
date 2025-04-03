module.exports = {
    presets: [
      ['babel-preset-expo', {
        unstable_transformProfile: 'hermes-stable'
      }],
    ],
    plugins: [
      'react-native-reanimated/plugin',
    ],
  };