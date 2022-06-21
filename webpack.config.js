const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");

const mode = 'production';
const enabledSourceMap = mode === 'development';

module.exports = {
  mode: mode,
  entry: {
    "App": "./src/js/App.js",
    "style": "./src/scss/style.scss",
  },
  output: {
    path: path.join(__dirname, 'docs'),
    filename: "[name].js",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: enabledSourceMap,
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: enabledSourceMap,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new RemoveEmptyScriptsPlugin(),
  ],
};