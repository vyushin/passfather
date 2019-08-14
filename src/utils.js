const crypto = require('crypto');

/**
 * Returns true if the code runs in browser
 * @return {Boolean}
 */
function isBrowser() {
  return global.hasOwnProperty('Window') && global instanceof global.Window;
}

function getRandomInt() {
  return isBrowser()
    ? crypto.getRandomValues(new Uint8Array(1))[0]
    : parseInt(crypto.randomBytes(1).toString('hex'), 16);
}

/**
 * Returns random number
 * @param {[Number, Number]} diapason [min, max]
 * @return {Number} Random number
 */
function random(diapason) {
  const randomInt = getRandomInt();
  const range = diapason[1] - diapason[0] + 1;
  return (randomInt >= Math.floor(256 / range) * range) ? random(diapason) : diapason[0] + (randomInt % range);
}

/**
 * Returns random item from array
 * @param {Array} arr
 * @return {*} Random item
 */
function randomItem(arr) {
  return arr[random([0, arr.length - 1])];
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
 * Returns object keys as an array
 * @param {Object} obj
 * @return {Array}
 */
function keys(obj) {
  return Object.keys(obj);
}

/**
 * Returns true ig the value is Integer
 * @param {*} value
 * @return {Boolean}
 */
function isInteger(value) {
  return Number.isInteger(value);
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
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
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

module.exports = {
  isBrowser,
  getRandomInt,
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
  isBoolean,
  isPlainObject,
  assign,
  timesMap,
  numSequence,
  shuffle,
  getCharsByDiapason,
};
