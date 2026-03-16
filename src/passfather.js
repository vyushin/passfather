const { compact, assign, timesMap, isBrowser, ...utils } = require('./utils');
const { OPTION_VALIDATORS, ERROR_MESSAGES, DEFAULT_OPTIONS } = require('./validatingOptions');
const { DEFAULT_BROWSER_SEED, DEFAULT_NODE_SEED } = require('./seed');

const _random = utils.random;
const _randomItem = utils.randomItem;
const _shuffle = utils.shuffle;
const freeze = Object.freeze

/**
 * UTF-8 char diapasons
 * @const
 */
const CHAR_RANGES = freeze([
  freeze([freeze([48, 57])]), // Numbers
  freeze([freeze([65, 90])]), // Uppercase
  freeze([freeze([97, 122])]), // Lowercase
  freeze([
    freeze([33, 46]),
    freeze([58, 64]),
    freeze([94, 96]),
    freeze([123, 126]),
  ]), // Symbols
]);

/**
 * Returns char ranges by options
 * @param {Object} options
 * @return {Array} Char diapasons
 */
function getCharRanges(options) {
  return compact([].concat(
    options.numbers && [CHAR_RANGES[0]],
    options.uppercase && [CHAR_RANGES[1]],
    options.lowercase && [CHAR_RANGES[2]],
    options.symbols && [CHAR_RANGES[3]],
    options.ranges && options.ranges,
  ));
}

function getEnvironmentSeed({ seed }) {
  const hasSeed = Boolean(seed);
  if (isBrowser()) {
    return hasSeed ? seed : DEFAULT_BROWSER_SEED;
  }
  return hasSeed ? seed : DEFAULT_NODE_SEED;
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

  const shuffle = (arr) => {
    const seed = _shuffle(getEnvironmentSeed(opts));
    return _shuffle(arr, opts.prng, seed);
  };

  const random = (diapason) => {
    const seed = _shuffle(getEnvironmentSeed(opts));
    return _random(diapason, opts.prng, _shuffle(seed));
  };

  const randomItem = (arr) => {
    const seed = _shuffle(getEnvironmentSeed(opts));
    return _randomItem(arr, opts.prng, _shuffle(seed));
  };

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
