const { keys, isInteger, includesAll, isBoolean, isArray, isPlainObject, assign, without, isCharCode, isString, isNumber } = require('./utils');
const PRNGs = require('./PRNGs');
const { name } = require('../package.json');

/**
 * Module name
 * @const
 */
const MODULE_NAME = name;

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
  prng: 'default',
  seed: null,
};

/**
 * Functions to validate options
 * Methods must return true is validation successfully passed
 */
const OPTION_VALIDATORS = {
  numbers: value => isBoolean(value),
  uppercase: value => isBoolean(value),
  lowercase: value => isBoolean(value),
  symbols: value => isBoolean(value),
  length: value => isInteger(value) && value > 0,
  ranges: value => {
    const isArrayOfRanges = some => isArray(some) && some.length > 0 && some.every(item => isArray(item) && isCharCode(item[0]) && isCharCode(item[1]));
    return isArray(value) && value.length > 0 && value.every(item => isArrayOfRanges(item));
  },
  prng: value => ['default'].concat(keys(PRNGs)).includes(value),
  seed: value => isArray(value) && value.length > 0 && value.some(item => isString(item) ? false : !isNumber(item)) === false,
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
      () => options.hasOwnProperty('ranges') === false || this.ranges(options.ranges),
      () => options.hasOwnProperty('numbers') === false || this.numbers(options.numbers),
      () => options.hasOwnProperty('uppercase') === false || this.uppercase(options.uppercase),
      () => options.hasOwnProperty('lowercase') === false || this.lowercase(options.lowercase),
      () => options.hasOwnProperty('symbols') === false || this.symbols(options.symbols),
      () => options.hasOwnProperty('length') === false || this.length(options.length),
      () => options.hasOwnProperty('prng') === false || this.prng(options.prng),
      () => options.hasOwnProperty('seed') === false || this.seed(options.seed),
      () => {
        const opts = assign({}, DEFAULT_OPTIONS, options);
        return without(keys(opts), ['length']).some(key => { return key === 'ranges' ? isArray(opts[key]) : opts[key] === true; });
      },
      () => {
        const opts = assign({}, DEFAULT_OPTIONS, options);
        return (options.hasOwnProperty('seed') && opts.prng === 'default') === false;
      },
    ];
    const result = cases.findIndex(item => item() === false);
    return result;
  },
};

/**
 * Error messages by error code.
 * [IMPORTANT] Order is important, because index of error message matches with validation case.
 */
const ERROR_MESSAGES = [];
ERROR_MESSAGES[0] = 'No errors';
ERROR_MESSAGES[1] = `[${MODULE_NAME}]: Option must be an object`;
ERROR_MESSAGES[2] = `[${MODULE_NAME}]: Options must contains only one (or several) of [${keys(DEFAULT_OPTIONS).join(', ')}]`;
ERROR_MESSAGES[3] = `[${MODULE_NAME}]: Option "ranges" must be array with array of UTF-8 char code range. For example: [ [[48, 57 ]], [[33, 46], [58, 64], [94, 96], [123, 126]] ] `;
ERROR_MESSAGES[4] = `[${MODULE_NAME}]: Option "numbers" must be boolean`;
ERROR_MESSAGES[5] = `[${MODULE_NAME}]: Option "uppercase" must be boolean`;
ERROR_MESSAGES[6] = `[${MODULE_NAME}]: Option "lowercase" must be boolean`;
ERROR_MESSAGES[7] = `[${MODULE_NAME}]: Option "symbols" must be boolean`;
ERROR_MESSAGES[8] = `[${MODULE_NAME}]: Option "length" must be integer greater than 0`;
ERROR_MESSAGES[9] = `[${MODULE_NAME}]: Option "prng" must be one of [${['default'].concat(keys(PRNGs)).join(', ')}]`;
ERROR_MESSAGES[10] = `[${MODULE_NAME}]: Option "seed" must be array of strings or numbers`;
ERROR_MESSAGES[11] = `[${MODULE_NAME}]: At less one of options [${without(keys(DEFAULT_OPTIONS), ['length', 'prng', 'seed']).join(', ')}] mustn't be false`;
ERROR_MESSAGES[12] = `[${MODULE_NAME}]: Option "seed" cannot be used when "prng" option is default. Set "prng" option to one  of [${keys(PRNGs).join(', ')}]`;

module.exports = {
  OPTION_VALIDATORS, ERROR_MESSAGES, MODULE_NAME, DEFAULT_OPTIONS,
};
