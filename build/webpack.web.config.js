const { resolve } = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { SRC_DIR, DIST_DIR } = require('./constants');

module.exports = {

  entry: {
    passfather: resolve(SRC_DIR, '../src/index.js'),
  },

  output: {
    filename: '[name].min.js',
    path: DIST_DIR,
    library: 'passfather',
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

  plugins: [
    new CopyPlugin([
      { from: resolve(SRC_DIR, './index.d.ts'), to: resolve(DIST_DIR, './passfather.d.ts') },
    ]),
  ],

  target: 'web',

};