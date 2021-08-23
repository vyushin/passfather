const { merge } = require('webpack-merge');
const { resolve } = require('path');
const { BannerPlugin } = require('webpack');
const { SRC_DIR, DIST_DIR, BANNER } = require('./constants');
const ARGV = process.argv;
const USE_MJS_OUTPUT = ARGV.some(x => x === '--use-mjs-output');

const webpackModuleConfig = {
  entry: {
    passfather: resolve(SRC_DIR, '../src/index.js'),
  },
  output: {
    filename: USE_MJS_OUTPUT ? '[name].mjs' : '[name].esm.js',
    path: DIST_DIR,
    module: true,
  },
  experiments: {
    outputModule: true
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
    minimize: false,
  },
  plugins: [
    new BannerPlugin({
      banner: BANNER,
      entryOnly: true,
    }),
    {
      apply(compiler) {
        compiler.hooks.compilation.tap('passfather', (compilation) => {
          compilation.hooks.afterProcessAssets.tap('passfather', (assets) => {
            const assetKey = Object.keys(assets)[0];
            const assetSource = assets[assetKey].source();
            const processedSource = assetSource.replace(/(__webpack_require__\([0-9]+?\);\s*)$/, ';export default $1');
            assets[assetKey] = {
              source() {
                return processedSource;
              },
              size() {
                return Buffer.byteLength(processedSource);
              }
            };
          });
        });
      }
    }
  ]
};

const webpackModuleMinConfig = merge(
  webpackModuleConfig,
  {
    output: {
      filename: USE_MJS_OUTPUT ? '[name].min.mjs' : '[name].esm.min.js',
    },
    optimization: {
      minimize: true,
    },
  }
);

module.exports = [webpackModuleConfig, webpackModuleMinConfig];
