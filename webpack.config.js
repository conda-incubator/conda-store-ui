/*
 * Copyright (c) 2020, Max Klein
 *
 * This file is part of the tree-finder library, distributed under the terms of
 * the BSD 3 Clause license. The full license can be found in the LICENSE file.
 */
// import HtmlWebpackPlugin from "html-webpack-plugin";
// import path from "path";
// import MiniCssExtractPlugin from "mini-css-extract-plugin";
// import Dotenv from "dotenv-webpack";
// import { fileURLToPath } from 'url';

// // import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
// // // To improve build times for large projects enable fork-ts-checker-webpack-plugin
// // import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

// import {
//   dependencySrcMapRules,
//   stylingRules,
//   svgUrlRules,
//   getContext,
//   getOptimization,
//   getResolve,
//   tsRules
// } from "./webpack.rules.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");

// const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
// To improve build times for large projects enable fork-ts-checker-webpack-plugin
// const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const {
  dependencySrcMapRules,
  stylingRules,
  svgUrlRules,
  getContext,
  getOptimization,
  getResolve,
  tsRules
} = require("./webpack.rules");

const isProd = process.env.NODE_ENV === "production";

const basicConfig = {
  devtool: isProd ? false : "source-map",
  entry: ["src/index.tsx", "src/AppExample.tsx"],
  watch: false,
  ...getContext(__dirname),

  output: {
    filename: "conda-store-ui.js",
    path: path.resolve(__dirname, "dist"),
    // publicPath: "/dist/",
    library: {
      type: "module",
    },
  },
  experiments: {
    outputModule: true,
  },

  module: {
    rules: [
      ...dependencySrcMapRules,
      ...stylingRules,
      ...svgUrlRules,
      ...tsRules,
    ]
  },

  resolve: {
    ...getResolve(__dirname)
  },

  // devServer: {
  //   // contentBase: [path.join(__dirname, "examples"), path.join(__dirname, ".")],
  //   // inline: false,
  //   // publicPath: "/dist/",

  //   // dev-server writes to disk instead of keeping the bundle in memory
  //   writeToDisk: true,
  // },

  plugins: [
    new HtmlWebpackPlugin({
      // template: "./src/index.html",
      scriptLoading: "module",
      title: "conda-store-ui",
    }),
    new MiniCssExtractPlugin({
      filename: "conda-store-ui.css",
    }),
    new Dotenv()
  ],

  mode: isProd ? "production" : "development",

  optimization: {
    minimize: isProd,
    ...(isProd && getOptimization()),
  }
};

// export default [basicConfig];

module.exports = [basicConfig];
