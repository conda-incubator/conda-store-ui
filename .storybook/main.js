const basicConfigs = require("../webpack.config.js");

module.exports = {
  stories: ["../story/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    // "@storybook/preset-create-react-app",
    "@storybook/addon-a11y",
  ],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
    disableTelemetry: true,
  },
  features: {
    interactionsDebugger: true,
  },
  webpackFinal: async (config) => {
    return {
      ...config,
      module: { ...config.module, rules: basicConfigs[0].module.rules },
      resolve: { ...config.resolve, extensions: basicConfigs[0].resolve.extensions, modules: basicConfigs[0].resolve.modules },
    };
  },
};
