const { merge } = require('webpack-merge');
const { resolve } = require('path');
const { BannerPlugin } = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const { SRC_DIR, DIST_DIR, BANNER } = require('./constants');

const webpackCommonConfig = {
  entry: {
    passfather: resolve(SRC_DIR, '../src/index.js'),
  },
  output: {
    filename: '[name].js',
    path: DIST_DIR,
    library: 'passfather',
    umdNamedDefine: true,
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new BannerPlugin({
      banner: BANNER,
      entryOnly: true,
    })
  ]
};

const webpackUmdConfig = merge([
  webpackCommonConfig,
  {
    output: {
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: { node: '4.3.0' } }],
              ],
            },
          }],
        },
      ],
    },
    optimization: {
      minimize: false,
    },
    plugins: [
      new CopyPlugin([
        { from: resolve(SRC_DIR, './index.d.ts'), to: resolve(DIST_DIR, './passfather.d.ts') },
      ]),
    ],
  },
]);

const webpackUmdMinConfig = merge([
  webpackCommonConfig,
  {
    output: {
      filename: '[name].min.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: ['> 1%', 'IE 9', 'not dead'] }],
              ],
            },
          }],
        },
      ],
    },
    optimization: {
      minimize: true,
    },
  },
]);

module.exports = [webpackUmdConfig, webpackUmdMinConfig];