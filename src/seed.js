const { compact, isBrowser } = require('./utils');

/**
 * Default seed for prng
 * @const
 */
const DEFAULT_NODE_SEED = !isBrowser() ? compact([].concat(
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

/**
 * Default seed for prng
 * @const
 */
const DEFAULT_BROWSER_SEED = isBrowser() ? compact([].concat(
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

module.exports = {
  DEFAULT_NODE_SEED, DEFAULT_BROWSER_SEED,
};