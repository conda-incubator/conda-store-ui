/*
 * Copyright (c) 2022, conda-store development team
 *
 * This file is distributed under the terms of the BSD 3 Clause license. 
 * The full license can be found in the LICENSE file.
 */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");

// Need to differentiate between dev and production
const isProd = process.env.NODE_ENV === "production";
const ASSET_PATH = isProd ? "" : "/";

const rules = [
  // Dependency source maps
  {
    test: /\.js$/,
    use: "source-map-loader",
    enforce: "pre",
    exclude: /node_modules/
  },
  { test: /\.js.map$/, use: "file-loader" },

  // Styling rules
  {
    test: /\.module\.css$/,
    use: [
      "css-loader",
    ]
  },
  {
    test: /(?<!\.module)\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      "css-loader"
    ]
  },
  {
    test: /\.module\.less$/,
    use: [
      "css-loader",
      "less-loader"
    ]
  },
  {
    test: /(?<!\.module)\.less$/,
    use: [
      MiniCssExtractPlugin.loader,
      "css-loader",
      "less-loader"
    ]
  },

  // SVG rules
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    use: {
      loader: "svg-url-loader",
      options: { encoding: "none", limit: 10000 }
    }
  },

  // TypeScript rules
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: "ts-loader",
      options: {
        transpileOnly: false,
        projectReferences: true
      }
    }
  }
];

const resolve = {
  modules: [
    "node_modules",
    path.resolve(__dirname)
  ],
  extensions: [".tsx", ".ts", ".jsx", ".js", ".less", ".css"]
};

const plugins = [
  new HtmlWebpackPlugin({
    title: "conda-store"
  }),
  new MiniCssExtractPlugin(),
  new Dotenv(),
  new webpack.EnvironmentPlugin(['REACT_APP_VERSION'])
];

const optimization = {
  minimize: isProd,
  minimizer: [
    new TerserPlugin({
      terserOptions: {
        format: {
          comments: false
        }
      },
      extractComments: false
    }),
    new CssMinimizerPlugin()
  ]
};

module.exports = {
  mode: isProd ? "production" : "development",
  devtool: isProd ? false : "source-map",
  devServer: {
    port: 8000
  },
  entry: ["src/index.tsx", "src/main.tsx"],
  watch: false,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: ASSET_PATH,
    clean: true
  },
  module: {
    rules
  },
  resolve,
  plugins,
  optimization
};