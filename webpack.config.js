/*
 * Copyright (c) 2022,  Quansight
 *
 * This file is part of the tree-finder library, distributed under the terms of
 * the BSD 3 Clause license. The full license can be found in the LICENSE file.
 */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");

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
  tsRules,
  mdxRules
} = require("./webpack.rules");

const isProd = process.env.NODE_ENV === "production";

const basicConfig = {
  devServer: {
    port: 8000
  },
  devtool: isProd ? false : "source-map",
  entry: ["src/index.tsx", "src/AppExample.tsx"],
  watch: false,
  ...getContext(__dirname),

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },

  module: {
    rules: [
      ...dependencySrcMapRules,
      ...stylingRules,
      ...svgUrlRules,
      ...tsRules,
      ...mdxRules
    ]
  },

  resolve: {
    ...getResolve(__dirname)
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "conda-store"
    }),
    new MiniCssExtractPlugin(),
    new Dotenv(),
    new webpack.EnvironmentPlugin(['REACT_APP_VERSION'])
  ],

  mode: isProd ? "production" : "development",

  optimization: {
    minimize: isProd,
    ...(isProd && getOptimization())
  }
};

module.exports = [basicConfig];
