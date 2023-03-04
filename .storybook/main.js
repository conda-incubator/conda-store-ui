const basicConfigs = require("../webpack.config.js");

module.exports = {

  

  stories: [
  	    "../src/**/*.stories.mdx" ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
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
   babel: (cfg) => ({
    ...cfg,
    babelrc: false,
    configFile: false
  }),
  webpackFinal: async (config) => {
    return {
      ...config,
      module: { ...config.module, rules: basicConfigs[0].module.rules },
      resolve: { ...config.resolve, extensions: basicConfigs[0].resolve.extensions, modules: basicConfigs[0].resolve.modules },
    };
  },
};
