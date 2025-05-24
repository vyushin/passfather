const PRNGs = require('./PRNGs');
const PRNGKeys = new Set(Object.keys(PRNGs));

/**
 * Returns true if the code runs in browser
 * @return {Boolaen}
 */
function isBrowser() {
  return typeof window !== 'undefined' && typeof window.document !== 'undefined';
}

/**
 * Returns crypto module for this environment
 */
const getCrypto = (() => {
  let cachedCrypto = null;

  return function () {
    if (cachedCrypto) return cachedCrypto;

    if (isBrowser()) {
      cachedCrypto = window.crypto;
    } else {
      try {
        cachedCrypto = require('crypto');
      } catch (e) {
        throw new Error('Crypto API is not available in this environment');
      }
    }

    return cachedCrypto;
  };
})();

/**
 * Returns os module for this environment
 */
const getOS = (() => {
  let cachedOS = null;

  return function () {
    if (cachedOS) return cachedOS;

    if (isBrowser()) {
      cachedOS = {};
    } else {
      try {
        cachedOS = require('os');
      } catch (e) {
        throw new Error('OS API is not available in this environment');
      }
    }

    return cachedOS;
  };
})()

/**
 * Returns 32bit random integer
 * @param { String } prng Password random number generator
 * @param { Array } seed Seed
 * @return {Number}
 */
function getRandomUint32(prng, seed) {
  const hasPRNG = PRNGKeys.has(prng);
  prng && prng !== 'default' && !hasPRNG && console.warn(`PRNG ${prng} is not supported`);
  if (prng && prng !== 'default' && PRNGKeys.has(prng)) {
    const prngFn = seed ? new PRNGs[prng](seed) : new PRNGs[prng]();
    return prngFn.uint32();
  }
  const crypto = getCrypto();
  return isBrowser()
    ? crypto.getRandomValues(new Uint32Array(1))[0]
    : parseInt(crypto.randomBytes(4).toString('hex'), 16);
}

/**
 * Returns random number
 * @param {[Number, Number]} diapason [min, max]
 * @param { String } prng Password random number generator
 * @param { Array } seed Seed
 * @return {Number} Random number
 */
function random(diapason, prng, seed) {
  const randomInt = getRandomUint32(prng, seed);
  const range = diapason[1] - diapason[0] + 1;
  return (randomInt >= Math.floor(4294967295 / range) * range) ? random(diapason) : diapason[0] + (randomInt % range);
}

/**
 * Returns random item from array
 * @param {Array} arr
 * @param {Function} prng Password random number generator
 * @param { Array } seed Seed
 * @return {*} Random item
 */
function randomItem(arr, prng, seed) {
  return arr[random([0, arr.length - 1], prng, seed)];
}

/**
 * Returns array without values
 * @param {Array} arr to filter
 * @param {Array} values Values Discarded values
 * @return {Array}
 */
function without(arr, values) {
  return arr.filter(item => values.includes(item) === false);
}

/**
 * Search values in array
 * @param {Array} arr Array to search
 * @param {Array} values Values to search
 * @return {Boolean} Returns true if arr has one of values
 */
function includes(arr, values) {
  return arr.some(item => values.includes(item));
}

/**
 * Returns true if arr includes all of the values
 * @param {Array} arr Array to search
 * @param {Array} values Values to search
 * @return {Boolean}
 */
function includesAll(arr, values) {
  return values.some(item => arr.includes(item) === false) === false;
}

/**
 * Returns true if the arr haven't values
 * @param {Array} arr Array to search
 * @param {Array} values Values to search
 * @return {Boolean}
 */
function excludes(arr, values) {
  return arr.some(item => values.includes(item)) === false;
}

/**
 * Returns array last index
 * @param {Array} arr
 * @return {Number}
 */
function lastIndex(arr) {
  return arr.length - 1;
}

/**
 * Remove false, null, 0, "", undefined, NaN
 * @param {Array} arr
 * @return {Array}
 */
function compact(arr) {
  return arr.filter(Boolean);
}

/**
 * Returns true is value is boolean
 * @param {*} value
 * @return {Boolean}
 */
function isBoolean(value) {
  return value === true || value === false;
}

/**
 * Returns true if the value is array
 * @param {*} value
 * @return {Boolean}
 */
function isArray(value) {
  return value instanceof Array;
}

/**
 * Returns object keys as an array
 * @param {Object} obj
 * @return {Array}
 */
function keys(obj) {
  return Object.keys(obj);
}

/**
 * Returns true ig the value is integer
 * @param {*} value
 * @return {Boolean}
 */
function isInteger(value) {
  return Number.isInteger(value);
}

/**
 * Returns true ig the value is number
 * @param {*} value
 * @return {Boolean}
 */
function isNumber(value) {
  return typeof value === 'number' && isNaN(value) === false;
}

/**
 * Returns true ig the value is string
 * @param {*} value
 * @return {Boolean}
 */
function isString(value) {
  return typeof value === 'string';
}

/**
 * Returns true is value is Object
 * @param {*} value
 * @return {Boolean}
 */
function isPlainObject(value) {
  try {
    return /^\{.*\}$/.test(JSON.stringify(value)) === true && value instanceof Map === false;
  } catch (e) {
    return false;
  }
}

/**
 * Object assign
 * @return {Object}
 */
function assign() {
  return Object.assign.apply(Object, arguments);
}

/**
 * Make empty array by length and map it
 * @param {Number} times
 * @param {Function} iteratee The function invoked per iteration
 * @return {Array}timesMap
 */
function timesMap(times, iteratee) {
  return Array(times).fill().map(iteratee);
}

/**
 * Make number sequence
 * @param {Number} from
 * @param {Number} to
 * @param {Boolean} inclusive If true then result array will contain "to" number in last
 * @return {Array} number[]
 */
function numSequence(from, to, inclusive) {
  return (result => inclusive ? result.push(to) && result : result)(timesMap(to - from, (item, key) => from + key));
}

/**
 * Shuffle array
 * @param {Array} arr
 * @return {Array}
 */
function shuffle(arr, prng, seed) {
  if (arr.length <= 1) return arr;
  timesMap(arr.length, (item, index) => {
    const randomIndex = random([0, arr.length - 1], prng, seed);
    [arr[index], arr[randomIndex]] = [arr[randomIndex], arr[index]];
  });
  return arr;
}

/**
 * Returns UTF-8 chars by diapason
 * @param {Array} diapason [from, to]
 * @return {String} All chars in one string
 */
function getCharsByDiapason(diapason) {
  return String.fromCodePoint.apply(String, numSequence(diapason[0], diapason[1], true));
}

/**
 * Returns true is value is UTF-8 char code
 * @param {*} value
 * @return {Boolean}
 */
function isCharCode(value) {
  return String.fromCharCode(value) !== String.fromCharCode(false);
}

/**
 * Escape regexp operators
 * @link https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions
 * @param {*} value
 * @return {String}
 */
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

/**
 * Pick values from array
 * @param {Array} arr
 * @param {Array} values
 * @return {Array}
 */
function pick(arr, values) {
  return arr.filter(item => values.includes(item));
}

module.exports = {
  isBrowser,
  getRandomUint32,
  random,
  randomItem,
  without,
  includes,
  includesAll,
  excludes,
  lastIndex,
  compact,
  keys,
  isInteger,
  isNumber,
  isString,
  isBoolean,
  isArray,
  isPlainObject,
  assign,
  timesMap,
  numSequence,
  shuffle,
  getCharsByDiapason,
  isCharCode,
  escapeRegExp,
  getOS,
};
