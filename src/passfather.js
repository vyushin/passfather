const { getRandomUint32, random, randomItem, compact, assign, timesMap, shuffle, hasWindow } = require('./utils');
const PRNGs = require('./PRNGs');
const { OPTION_VALIDATORS, ERROR_MESSAGES, DEFAULT_OPTIONS } = require('./validatingOptions');
const { DEFAULT_BROWSER_SEED, DEFAULT_NODE_SEED } = require('./seed');

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
  const seed = opts.seed || hasWindow ? shuffle(DEFAULT_BROWSER_SEED) : shuffle(DEFAULT_NODE_SEED);
  const prng = opts.prng !== 'default' ? new PRNGs[opts.prng](seed) : null;
  const charRanges = getCharRanges(opts);

  prng ? getRandomUint32.prototype.prng = prng : getRandomUint32.prototype.prng = null;

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
