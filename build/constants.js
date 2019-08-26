const { resolve } = require('path');

const SRC_DIR  = resolve(__dirname, '../src');
const DIST_DIR = resolve(__dirname, '../dist');

module.exports = {
  SRC_DIR, DIST_DIR,
};
