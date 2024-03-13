const basicConfigs = require("../webpack.config.js");

module.exports = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],

  addons: ["@storybook/addon-links", {
    name: "@storybook/addon-essentials",
    options: {
  docs: false
    },
  }, "@storybook/addon-interactions", "@storybook/addon-a11y", {
    name: '@storybook/addon-docs',
    options: {
     configureJSX: true,
     transcludeMarkdown: true,
    },
  }, "@storybook/addon-mdx-gfm", "@storybook/addon-webpack5-compiler-swc"],

  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },

  core: {
    disableTelemetry: true
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

  docs: {
    autodocs: true
  }
};
