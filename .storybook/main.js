const basicConfigs = require("../webpack.config.js");
//import remarkGfm from 'remark-gfm'; 

module.exports = {
  stories: [
  	    "../src/**/*.stories.mdx",
	    "../src/docs/markdown/*.md",
  	    "../src/**/*.stories.@(ts|tsx)"
           ],
  addons: [
    "@storybook/addon-links",
    {
      name: "@storybook/addon-essentials",
      options: {
	docs: false
      },
    },
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",

     { 
       name: '@storybook/addon-docs', 
       options: { 
	    configureJSX: true,
	    transcludeMarkdown: true,
       }, 
     }, 
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
