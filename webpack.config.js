const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve("public"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              // Inline files smaller than 10 kB
              limit: 10000,
              name: "/[name].[ext]",
            },
          },
        ],
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.ttf$/,
        use: ["url-loader"],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true, // true outputs JSX tags
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: "./src/images/favicon.ico",
    }),
  ],
};
