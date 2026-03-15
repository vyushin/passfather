import { resolve } from 'path';
import { readFileSync } from 'fs';
import PACKAGE_JSON from '../package.json';

const BANNER = readFileSync(resolve('./BANNER'))
  .toString()
  .replace(/\[version\]/, PACKAGE_JSON.version)
  .replace(/\[description\]/, PACKAGE_JSON.description)
  .replace(/\[author\]/, PACKAGE_JSON.author)
const SRC_DIR  = resolve(__dirname, '../src');
const DIST_DIR = resolve(__dirname, '../dist');

export {
  SRC_DIR, DIST_DIR, PACKAGE_JSON, BANNER,
};
