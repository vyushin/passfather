## 4.1.0 (May 25, 2025)
*  Changed ESM entry point to .mjs: passfather.min.js → passfather.min.mjs
* Updated all references in README.md, package.json, Playwright test HTML, and rollup.config.js to use .mjs
* Removed legacy src/index.esm.js file
* Removed dependency on the os module in utils.js and seed.js
* Added src/externals/index.mjs with await import('crypto') for ESM environments
* Added src/externals/index.js using require('crypto') for CJS environments
* Created src/index.mjs with await initExternals() and export default passfather
* Updated src/index.js to call initExternals() on load
* Added ESM integration test: test/integration/esm-test.mjs
* Included ESM test in integration test runner script
* Added test/jest/jest.config.js and jest.setup.js with globalThis.passfather.externals.crypto for test compatibility
* Adjusted tsconfig.json in integration tests to use target: ESNext, esModuleInterop, and allowSyntheticDefaultImports
* Added output.globals.crypto in UMD build to suppress Rollup warnings

## 4.0.3 (May 25, 2025)
* Update build

## 4.0.2 (May 25, 2025)
* Аdd new badges to the readme
* Improve content

## 4.0.1 (May 25, 2025)
* fix types

## 4.0.0 (May 24, 2025)
* Switched build system from Webpack to Rollup
* Added end-to-end tests using Playwright
* Added integration tests (require/import/ts)
* Reduced package size by 4× (from ~150 KB to ~40 KB)
* Type declarations (`.d.ts`) are now generated and published for both ESM and UMD
* `exports` field added to `package.json` for modern bundler compatibility (Node 20+, Vite, etc.)

## 3.0.6 (April 24, 2024)
* Add funding info to the README

## 3.0.5 (April 21, 2024)
* Add funding info

## 3.0.4 (March 24, 2024)
* Improving the README.md
* Add tests with hexadecimal ranges

## 3.0.3 (January 02, 2022)
* Fix examples

## 3.0.2 (January 02, 2022)
* Fix ESM bundle
* Remove validation cache

## 3.0.1 (August 24, 2021)
* Update README.md

## 3.0.0 (August 23, 2021)
* Improve PRNG algorithm
* Make new test for each of PRNG algorithm
* Memoize option validation result, up performance

## 2.1.3 (October 04, 2020)
* Add missing typescript declaration in dist directory

## 2.1.2 (October 04, 2020)
* Add .esm.js bundle to module of package.json (instead .mjs) for more compatibility

## 2.1.1 (September 21, 2020)

* Add semver to unpkg links
* Add module property to package.json

## 2.1.0 (September 21, 2020)

* Improve build
* Add ESM support
* Code refactoring
* Other improvements

## 2.0.0 (December 25, 2019)

* Add multiple pseudorandom number generators
* Code refactoring

## 1.4.1 (November 17, 2019)

* Possibility to generate password with custom char ranges

## 1.3.1 (September 17, 2019)

* Improved TS declaration file
* Add TS declaration path to `package.json`
* Add `CHANGELOG.md`