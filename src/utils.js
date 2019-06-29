/**
 * Returns random number
 * @param {[Number, Number]} diapason [min, max]
 * @return {Number} Random number
 */
function random(diapason) {
  return Math.floor(diapason[0] + Math.random() * (diapason[1] + 1 - diapason[0]));
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
 * @return {Array}
 */
function timesMap(times, iteratee) {
  return Array(times).fill().map(iteratee);
}

module.exports = {
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
};
