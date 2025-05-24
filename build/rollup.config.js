import path from 'path';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';

import { SRC_DIR, DIST_DIR, BANNER } from './constants';

export default [
  // ESM
  {
    input: path.resolve(SRC_DIR, './index.esm.js'),
    output: {
      file: path.resolve(DIST_DIR, './esm/passfather.min.js'),
      format: 'es',
      exports: 'default',
      banner: BANNER,
    },
    plugins: [
      commonjs(),
      json(),
      terser(),
      copy({
        targets: [{
          src: path.resolve(SRC_DIR, 'index.d.ts'),
          dest: DIST_DIR,
          rename: 'passfather.d.ts',
        }]
      })
    ],
    external: ['crypto', 'os'],
  },

  // UMD
  {
    input: path.resolve(SRC_DIR, './index.js'),
    output: {
      file: path.resolve(DIST_DIR, './umd/passfather.min.js'),
      format: 'umd',
      name: 'passfather',
      exports: 'default',
      banner: BANNER,
    },
    plugins: [
      commonjs(),
      json(),
      terser(),
    ],
    external: ['crypto', 'os'],
  }
];