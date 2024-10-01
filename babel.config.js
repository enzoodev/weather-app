module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['expo-localization', 'react-native-reanimated/plugin'],
  };
};
