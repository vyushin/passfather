const { resolve } = require('path');
const { readFileSync } = require('fs');
const PACKAGE_JSON = require('../package.json');

const BANNER = readFileSync(resolve('./BANNER'))
  .toString()
  .replace(/\[version\]/, PACKAGE_JSON.version)
  .replace(/\[description\]/, PACKAGE_JSON.description)
  .replace(/\[author\]/, PACKAGE_JSON.author)
const SRC_DIR  = resolve(__dirname, '../src');
const DIST_DIR = resolve(__dirname, '../dist');

module.exports = {
  SRC_DIR, DIST_DIR, PACKAGE_JSON, BANNER,
};
