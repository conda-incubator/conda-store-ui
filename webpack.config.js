/*
 * Copyright (c) 2020, conda-store development team
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

const isProd = process.env.NODE_ENV === "production";
const ASSET_PATH = isProd ? "" : "/";

// Calculate hash based on content, will be used when generating production 
// bundles
const cssLoader = {
  loader: "css-loader",
  options: {
    modules: {
      auto: true,
      localIdentName: isProd ? "[hash:base64]" : "[name]__[local]--[hash:base64:5]",
    },
  },
};

const rules = [
  {
    test: /\.js$/,
    use: "source-map-loader",
    enforce: "pre",
    exclude: /node_modules/,
  },
  {
    test: /\.(css|less)$/,
    use: [
      isProd ? MiniCssExtractPlugin.loader : "style-loader",
      cssLoader,
      "less-loader",
    ],
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    type: "asset",
    parser: {
      dataUrlCondition: {
        maxSize: 10 * 1024, // 10kb
      },
    },
  },
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
    ],
  },
];

module.exports = {
  mode: isProd ? "production" : "development",
  // generate a sourcemap for production, in dev we generate mapping faster
  devtool: isProd ? "source-map" : "eval-cheap-module-source-map",
  devServer: {
    port: 8000,
    // enable hot module replacement
    hot: true,
  },
  entry: ["src/index.tsx", "src/main.tsx"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: isProd ? "[name].[contenthash].js" : "[name].js",
    publicPath: ASSET_PATH,
    clean: true,
  },
  module: { rules },
  resolve: {
    modules: ["node_modules", path.resolve(__dirname)],
    extensions: [".tsx", ".ts", ".jsx", ".js", ".less", ".css"],
  },
  plugins: [
    new HtmlWebpackPlugin({ title: "conda-store" }),
    new MiniCssExtractPlugin({
      filename: isProd ? "[name].[contenthash].css" : "[name].css",
    }),
    new Dotenv(),
    new webpack.EnvironmentPlugin(["REACT_APP_VERSION"]),
    new webpack.ids.HashedModuleIdsPlugin(),
  ],
  optimization: {
    minimize: isProd,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    runtimeChunk: "single",
  },
};