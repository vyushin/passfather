import { resolve, dirname } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);
const PACKAGE_JSON = require('../package.json');

const BANNER = readFileSync(resolve(__dirname, './BANNER'))
  .toString()
  .replace(/\[version\]/, PACKAGE_JSON.version)
  .replace(/\[description\]/, PACKAGE_JSON.description)
  .replace(/\[author\]/, PACKAGE_JSON.author)
const SRC_DIR  = resolve(__dirname, '../src');
const DIST_DIR = resolve(__dirname, '../dist');

export {
  SRC_DIR, DIST_DIR, PACKAGE_JSON, BANNER,
};
