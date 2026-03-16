const { compact, isBrowser } = require('./utils');

/**
 * Returns seed for Node.js prng
 * @return {Array|null}
 */
function getDefaultNodeSeed() {
  return !isBrowser() ? compact([].concat(
    Date.now(),
    (
      process.memoryUsage
        ? [
          process.memoryUsage().heapTotal,
          process.memoryUsage().heapUsed,
        ]
        : null
    ),
    (
      process.env
        ? [
          process.arch,
          process.platform,
        ]
        : null
    )
  )) : null;
}

/**
 * Returns seed for browser prng
 * @return {Array|null}
 */
function getDefaultBrowserSeed() {
  return isBrowser() ? compact([].concat(
    Date.now(),
    (
      performance && performance.memory
        ? [
          performance.memory.totalJSHeapSize,
          performance.memory.usedJSHeapSize,
        ]
        : null
    ),
    (
      navigator
        ? [
          navigator.userAgent,
          navigator.appVersion,
          navigator.hardwareConcurrency,
          navigator.deviceMemory,
        ]
        : null
    ),
  )) : null;
}

module.exports = {
  getDefaultNodeSeed, getDefaultBrowserSeed,
};