const { resolve } = require('path');
const { SRC_DIR, DIST_DIR, LIBRARY_NAME } = require('./constants');

module.exports = {

  entry: {
    passfather: resolve(SRC_DIR, '../src/index.js'),
  },

  output: {
    filename: '[name].min.js',
    path: DIST_DIR,
    library: LIBRARY_NAME,
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

  target: 'web',

};