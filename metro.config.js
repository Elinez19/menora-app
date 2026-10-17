const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

config.transformer = {
  ...config.transformer,
  unstable_workerThreads: false,
};

module.exports = withNativeWind(config, { input: "./src/global.css" });
