const { resolve } = require('path');
const { SRC_DIR, DIST_DIR } = require('./constants');

module.exports = {

  entry: {
    passfather: resolve(SRC_DIR, '../src/index.js'),
  },

  output: {
    filename: '[name].js',
    path: DIST_DIR,
    libraryTarget: 'umd'
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

  target: 'node',

};