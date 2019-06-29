const { random, randomItem, keys, compact, isInteger, includesAll, isBoolean, isPlainObject, assign, timesMap, without } = require('./utils');

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
};

/**
 * Functions to validate options
 */
const OPTION_VALIDATORS = {
  numbers:    value => isBoolean(value),
  uppercase:  value => isBoolean(value),
  lowercase:  value => isBoolean(value),
  symbols:    value => isBoolean(value),
  length:     value => isInteger(value) && value > 0,
  /**
   * Completely option validate
   * @param {Object} options
   * @return {Number} Error code or 0 if validation passed
   */
  completely(options) {
    const cases = [
      // Order is important, because index of case matches with error code
      () => (options === undefined || isPlainObject(options) && keys(options).length === 0) === false,
      () => isPlainObject(options),
      () => includesAll(keys(DEFAULT_OPTIONS), keys(options)),
      () => options.hasOwnProperty('numbers')   === false || this.numbers(options.numbers),
      () => options.hasOwnProperty('uppercase') === false || this.uppercase(options.uppercase),
      () => options.hasOwnProperty('lowercase') === false || this.lowercase(options.lowercase),
      () => options.hasOwnProperty('symbols')   === false || this.symbols(options.symbols),
      () => options.hasOwnProperty('length')    === false || this.length(options.length),
      () => includesAll(keys(options), without(keys(DEFAULT_OPTIONS), ['length'])) === false || keys(options).some(key => options[key] === true)
    ];
    return cases.findIndex(item => item() === false);
  },
};

/**
 * Error messages by error code.
 * Order is important, because index of error message matches with validation case.
 */
const ERROR_MESSAGES = [];
ERROR_MESSAGES[0] = 'No errors';
ERROR_MESSAGES[1] = `[${MODULE_NAME}]: Option must be an object`;
ERROR_MESSAGES[2] = `[${MODULE_NAME}]: Options must contains only one (or several) of [${keys(DEFAULT_OPTIONS).join(', ')}]`;
ERROR_MESSAGES[3] = `[${MODULE_NAME}]: Option "numbers" must be boolean`;
ERROR_MESSAGES[4] = `[${MODULE_NAME}]: Option "uppercase" must be boolean`;
ERROR_MESSAGES[5] = `[${MODULE_NAME}]: Option "lowercase" must be boolean`;
ERROR_MESSAGES[6] = `[${MODULE_NAME}]: Option "symbols" must be boolean`;
ERROR_MESSAGES[7] = `[${MODULE_NAME}]: Option "length" must be integer greater than 0`;
ERROR_MESSAGES[8] = `[${MODULE_NAME}]: One of options [${without(keys(DEFAULT_OPTIONS), ['length']).join(', ')}] must be true`;

/**
 * UTF-8 char diapasons
 * @const
 */
const CHAR_DIAPASONS = [
  [[48, 57 ]], // Numbers
  [[65, 90 ]], // Uppercase
  [[97, 122]], // Lowercase
  [[33, 47], [58, 64], [91, 96], [123, 126]], // Symbols
];

/**
 * Returns char diapasons by options
 * @param {Object} options
 * @return {Array} Char diapasons
 */
function getCharDiapasons(options) {
  return compact([].concat(
    options.numbers   && [CHAR_DIAPASONS[0]],
    options.uppercase && [CHAR_DIAPASONS[1]],
    options.lowercase && [CHAR_DIAPASONS[2]],
    options.symbols   && [CHAR_DIAPASONS[3]],
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
  const diapasons = getCharDiapasons(opts);

  return timesMap(opts.length, () => String.fromCharCode(random(randomItem(randomItem(diapasons))))).join('');
}

module.exports = passfather;
