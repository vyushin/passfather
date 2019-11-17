const { random, randomItem, keys, compact, isInteger, includesAll, isBoolean, isArray, isPlainObject, assign, timesMap, without, shuffle, isCharCode, includes } = require('./utils');

/**
 * Module name
 * @const
 */
const MODULE_NAME = 'passfather';

/**
 * Default passfather options
 * @const
 */
const DEFAULT_OPTIONS = {
  numbers: true,
  uppercase: true,
  lowercase: true,
  symbols: true,
  length: 12,
  ranges: null,
};

/**
 * Functions to validate options
 * Methods must return true is validation successfully passed
 */
const OPTION_VALIDATORS = {
  numbers:    value => isBoolean(value),
  uppercase:  value => isBoolean(value),
  lowercase:  value => isBoolean(value),
  symbols:    value => isBoolean(value),
  length:     value => isInteger(value) && value > 0,
  ranges:     value => {
                const isArrayOfRanges = some => isArray(some) && some.length > 0 && some.every(item => isArray(item) && isCharCode(item[0]) && isCharCode(item[1]));
                return isArray(value) && value.length > 0 && value.every(item => isArrayOfRanges(item));
              },
  /**
   * Completely option validate
   * @param {Object} options
   * @return {Number} Error code or 0 if validation passed
   */
  completely(options) {
    const cases = [
      // [IMPORTANT] Order is important, because index of case matches with error code
      () => (options === undefined || isPlainObject(options) && keys(options).length === 0) === false,
      () => isPlainObject(options),
      () => includesAll(keys(DEFAULT_OPTIONS), keys(options)),
      () => options.hasOwnProperty('ranges')    === false || this.ranges(options.ranges),
      () => options.hasOwnProperty('numbers')   === false || this.numbers(options.numbers),
      () => options.hasOwnProperty('uppercase') === false || this.uppercase(options.uppercase),
      () => options.hasOwnProperty('lowercase') === false || this.lowercase(options.lowercase),
      () => options.hasOwnProperty('symbols')   === false || this.symbols(options.symbols),
      () => options.hasOwnProperty('length')    === false || this.length(options.length),
      () => {
        const opts = assign({}, DEFAULT_OPTIONS, options);
        return without(keys(opts), ['length']).some(key => { return key === 'ranges' ? isArray(opts[key]) : opts[key] === true; })
      }
    ];
    return cases.findIndex(item => item() === false);
  },
};

/**
 * Error messages by error code.
 * [IMPORTANT] Order is important, because index of error message matches with validation case.
 */
const ERROR_MESSAGES = [];
ERROR_MESSAGES[0]  = 'No errors';
ERROR_MESSAGES[1]  = `[${MODULE_NAME}]: Option must be an object`;
ERROR_MESSAGES[2]  = `[${MODULE_NAME}]: Options must contains only one (or several) of [${keys(DEFAULT_OPTIONS).join(', ')}]`;
ERROR_MESSAGES[3]  = `[${MODULE_NAME}]: Option "ranges" must be array with array of UTF-8 char code range. For example: [ [[48, 57 ]], [[33, 46], [58, 64], [94, 96], [123, 126]] ] `;
ERROR_MESSAGES[4]  = `[${MODULE_NAME}]: Option "numbers" must be boolean`;
ERROR_MESSAGES[5]  = `[${MODULE_NAME}]: Option "uppercase" must be boolean`;
ERROR_MESSAGES[6]  = `[${MODULE_NAME}]: Option "lowercase" must be boolean`;
ERROR_MESSAGES[7]  = `[${MODULE_NAME}]: Option "symbols" must be boolean`;
ERROR_MESSAGES[8]  = `[${MODULE_NAME}]: Option "length" must be integer greater than 0`;
ERROR_MESSAGES[9]  = `[${MODULE_NAME}]: At less one of options [${without(keys(DEFAULT_OPTIONS), ['length']).join(', ')}] mustn't be false`;

/**
 * UTF-8 char diapasons
 * @const
 */
const CHAR_RANGES = [
  [[48, 57]], // Numbers
  [[65, 90]], // Uppercase
  [[97, 122]], // Lowercase
  [[33, 46], [58, 64], [94, 96], [123, 126]], // Symbols
];

/**
 * Returns char ranges by options
 * @param {Object} options
 * @return {Array} Char diapasons
 */
function getCharRanges(options) {
  return compact([].concat(
    options.numbers   && [CHAR_RANGES[0]],
    options.uppercase && [CHAR_RANGES[1]],
    options.lowercase && [CHAR_RANGES[2]],
    options.symbols   && [CHAR_RANGES[3]],
    options.ranges    && options.ranges,
  ));
}

/**
 * Generate password
 * @param {Object} options
 * @return {String} Password
 */
function passfather(options) {
  const errorCode = OPTION_VALIDATORS.completely(options);

  if (errorCode > 0) {
    throw ERROR_MESSAGES[errorCode];
  }

  const opts = assign({}, DEFAULT_OPTIONS, options);
  const charRanges = getCharRanges(opts);
  const requiredChars = timesMap(charRanges.length, (item, index) => {
    return String.fromCharCode(random(randomItem(charRanges[index])));
  });

  if (requiredChars.length >= opts.length) {
    return shuffle(requiredChars).slice(0, opts.length).join('');
  }

  return shuffle(timesMap(opts.length - requiredChars.length, () => {
    return String.fromCharCode(random(randomItem(randomItem(charRanges))));
  }).concat(requiredChars)).join('');
}

module.exports = {
  passfather,
  DEFAULT_OPTIONS,
  CHAR_RANGES,
  ERROR_MESSAGES,
};
