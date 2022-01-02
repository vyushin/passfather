/*!
 * @file passfather.esm.js
 * @version 3.0.3
 * @description Passfather is very fast and powerful utility with zero dependencies to generate strong password
 * @copyright Copyright (c) 2019-present, Evgeny Vyushin <e@vyushin.ru> (https://github.com/vyushin)
 * @license
 * This source code is licensed under the MIT license found in the
 * LICENSE file on https://github.com/vyushin/passfather/blob/master/LICENSE
 */
/******/ var __webpack_modules__ = ({

/***/ 544:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*! From http://baagoe.com/en/RandomMusings/javascript/ */
const Mash = __webpack_require__(165);

function Alea() {
  return function (args) {
    /*! Johannes Baagøe <baagoe@baagoe.com>, 2010 */
    var s0 = 0;
    var s1 = 0;
    var s2 = 0;
    var c = 1;

    if (args.length == 0) {
      args = [+new Date()];
    }

    var mash = Mash();
    s0 = mash(' ');
    s1 = mash(' ');
    s2 = mash(' ');

    for (var i = 0; i < args.length; i++) {
      s0 -= mash(args[i]);

      if (s0 < 0) {
        s0 += 1;
      }

      s1 -= mash(args[i]);

      if (s1 < 0) {
        s1 += 1;
      }

      s2 -= mash(args[i]);

      if (s2 < 0) {
        s2 += 1;
      }
    }

    mash = null;

    var random = function () {
      var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32

      s0 = s1;
      s1 = s2;
      return s2 = t - (c = t | 0);
    };

    random.uint32 = function () {
      return random() * 0x100000000; // 2^32
    };

    random.fract53 = function () {
      return random() + (random() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
    };

    random.version = 'Alea 0.9';
    random.args = args;
    return random;
  }(Array.prototype.slice.call(arguments));
}

;
module.exports = Alea;

/***/ }),

/***/ 825:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*! From http://baagoe.com/en/RandomMusings/javascript/ */
const Mash = __webpack_require__(165);

function KISS07() {
  return function (args) {
    /*! George Marsaglia, 2007-06-23 */

    /*! http://groups.google.com/group/comp.lang.fortran/msg/6edb8ad6ec5421a5 */
    var x = 123456789;
    var y = 362436069;
    var z = 21288629;
    var w = 14921776;
    var c = 0;

    if (args.length == 0) {
      args = [+new Date()];
    }

    var mash = Mash();

    for (var i = 0; i < args.length; i++) {
      x ^= mash(args[i]) * 0x100000000; // 2^32

      y ^= mash(args[i]) * 0x100000000;
      z ^= mash(args[i]) * 0x100000000;
      w ^= mash(args[i]) * 0x100000000;
    }

    if (y === 0) {
      y = 1;
    }

    c ^= z >>> 31;
    z &= 0x7fffffff;

    if (z % 7559 === 0) {
      z++;
    }

    w &= 0x7fffffff;

    if (w % 7559 === 0) {
      w++;
    }

    mash = null;

    var uint32 = function () {
      var t;
      x += 545925293;
      x >>>= 0;
      y ^= y << 13;
      y ^= y >>> 17;
      y ^= y << 5;
      t = z + w + c;
      z = w;
      c = t >>> 31;
      w = t & 0x7fffffff;
      return x + y + w >>> 0;
    };

    var random = function () {
      return uint32() * 2.3283064365386963e-10; // 2^-32
    };

    random.uint32 = uint32;

    random.fract53 = function () {
      return random() + (uint32() & 0x1fffff) * 1.1102230246251565e-16; // 2^-53
    };

    random.args = args;
    random.version = 'KISS07 0.9';
    return random;
  }(Array.prototype.slice.call(arguments));
}

;
module.exports = KISS07;

/***/ }),

/***/ 139:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*! From http://baagoe.com/en/RandomMusings/javascript/ */
const Mash = __webpack_require__(165);

function Kybos() {
  return function (args) {
    /*! Johannes Baagøe <baagoe@baagoe.com>, 2010 */
    var s0 = 0;
    var s1 = 0;
    var s2 = 0;
    var c = 1;
    var s = [];
    var k = 0;
    var mash = Mash();
    var s0 = mash(' ');
    var s1 = mash(' ');
    var s2 = mash(' ');

    for (var j = 0; j < 8; j++) {
      s[j] = mash(' ');
    }

    if (args.length == 0) {
      args = [+new Date()];
    }

    for (var i = 0; i < args.length; i++) {
      s0 -= mash(args[i]);

      if (s0 < 0) {
        s0 += 1;
      }

      s1 -= mash(args[i]);

      if (s1 < 0) {
        s1 += 1;
      }

      s2 -= mash(args[i]);

      if (s2 < 0) {
        s2 += 1;
      }

      for (var j = 0; j < 8; j++) {
        s[j] -= mash(args[i]);

        if (s[j] < 0) {
          s[j] += 1;
        }
      }
    }

    var random = function () {
      var a = 2091639;
      k = s[k] * 8 | 0;
      var r = s[k];
      var t = a * s0 + c * 2.3283064365386963e-10; // 2^-32

      s0 = s1;
      s1 = s2;
      s2 = t - (c = t | 0);
      s[k] -= s2;

      if (s[k] < 0) {
        s[k] += 1;
      }

      return r;
    };

    random.uint32 = function () {
      return random() * 0x100000000; // 2^32
    };

    random.fract53 = function () {
      return random() + (random() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
    };

    random.addNoise = function () {
      for (var i = arguments.length - 1; i >= 0; i--) {
        for (j = 0; j < 8; j++) {
          s[j] -= mash(arguments[i]);

          if (s[j] < 0) {
            s[j] += 1;
          }
        }
      }
    };

    random.version = 'Kybos 0.9';
    random.args = args;
    return random;
  }(Array.prototype.slice.call(arguments));
}

;
module.exports = Kybos;

/***/ }),

/***/ 105:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*! From http://baagoe.com/en/RandomMusings/javascript/ */
const Mash = __webpack_require__(165);

function LFIB4() {
  return function (args) {
    /*! George Marsaglia's LFIB4, */

    /*! http://groups.google.com/group/sci.crypt/msg/eb4ddde782b17051 */
    var k0 = 0,
        k1 = 58,
        k2 = 119,
        k3 = 178;
    var s = [];
    var mash = Mash();

    if (args.length === 0) {
      args = [+new Date()];
    }

    for (var j = 0; j < 256; j++) {
      s[j] = mash(' ');
      s[j] -= mash(' ') * 4.76837158203125e-7; // 2^-21

      if (s[j] < 0) {
        s[j] += 1;
      }
    }

    for (var i = 0; i < args.length; i++) {
      for (var j = 0; j < 256; j++) {
        s[j] -= mash(args[i]);
        s[j] -= mash(args[i]) * 4.76837158203125e-7; // 2^-21

        if (s[j] < 0) {
          s[j] += 1;
        }
      }
    }

    mash = null;

    var random = function () {
      var x;
      k0 = k0 + 1 & 255;
      k1 = k1 + 1 & 255;
      k2 = k2 + 1 & 255;
      k3 = k3 + 1 & 255;
      x = s[k0] - s[k1];

      if (x < 0) {
        x += 1;
      }

      x -= s[k2];

      if (x < 0) {
        x += 1;
      }

      x -= s[k3];

      if (x < 0) {
        x += 1;
      }

      return s[k0] = x;
    };

    random.uint32 = function () {
      return random() * 0x100000000 >>> 0; // 2^32
    };

    random.fract53 = random;
    random.version = 'LFIB4 0.9';
    random.args = args;
    return random;
  }(Array.prototype.slice.call(arguments));
}

;
module.exports = LFIB4;

/***/ }),

/***/ 247:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*! From http://baagoe.com/en/RandomMusings/javascript/ */
const Mash = __webpack_require__(165);

function LFib() {
  return function (args) {
    /*! Johannes Baagøe <baagoe@baagoe.com>, 2010 */
    var k0 = 255,
        k1 = 52,
        k2 = 0;
    var s = [];
    var mash = Mash();

    if (args.length === 0) {
      args = [+new Date()];
    }

    for (var j = 0; j < 256; j++) {
      s[j] = mash(' ');
      s[j] -= mash(' ') * 4.76837158203125e-7; // 2^-21

      if (s[j] < 0) {
        s[j] += 1;
      }
    }

    for (var i = 0; i < args.length; i++) {
      for (var j = 0; j < 256; j++) {
        s[j] -= mash(args[i]);
        s[j] -= mash(args[i]) * 4.76837158203125e-7; // 2^-21

        if (s[j] < 0) {
          s[j] += 1;
        }
      }
    }

    mash = null;

    var random = function () {
      k0 = k0 + 1 & 255;
      k1 = k1 + 1 & 255;
      k2 = k2 + 1 & 255;
      var x = s[k0] - s[k1];

      if (x < 0.0) {
        x += 1.0;
      }

      x -= s[k2];

      if (x < 0.0) {
        x += 1.0;
      }

      return s[k0] = x;
    };

    random.uint32 = function () {
      return random() * 0x100000000 >>> 0; // 2^32
    };

    random.fract53 = random;
    random.version = 'LFib 0.9';
    random.args = args;
    return random;
  }(Array.prototype.slice.call(arguments));
}

;
module.exports = LFib;

/***/ }),

/***/ 759:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*! From http://baagoe.com/en/RandomMusings/javascript/ */
const Mash = __webpack_require__(165);

function MRG32k3a() {
  return function (args) {
    /*! Copyright (c) 1998, 2002 Pierre L'Ecuyer, DIRO, Université de Montréal. */

    /*! http://www.iro.umontreal.ca/~lecuyer/ */
    var m1 = 4294967087;
    var m2 = 4294944443;
    var s10 = 12345,
        s11 = 12345,
        s12 = 123,
        s20 = 12345,
        s21 = 12345,
        s22 = 123;

    if (args.length === 0) {
      args = [+new Date()];
    }

    var mash = Mash();

    for (var i = 0; i < args.length; i++) {
      s10 += mash(args[i]) * 0x100000000; // 2 ^ 32

      s11 += mash(args[i]) * 0x100000000;
      s12 += mash(args[i]) * 0x100000000;
      s20 += mash(args[i]) * 0x100000000;
      s21 += mash(args[i]) * 0x100000000;
      s22 += mash(args[i]) * 0x100000000;
    }

    s10 %= m1;
    s11 %= m1;
    s12 %= m1;
    s20 %= m2;
    s21 %= m2;
    s22 %= m2;
    mash = null;

    var uint32 = function () {
      var m1 = 4294967087;
      var m2 = 4294944443;
      var a12 = 1403580;
      var a13n = 810728;
      var a21 = 527612;
      var a23n = 1370589;
      var k, p1, p2;
      /* Component 1 */

      p1 = a12 * s11 - a13n * s10;
      k = p1 / m1 | 0;
      p1 -= k * m1;
      if (p1 < 0) p1 += m1;
      s10 = s11;
      s11 = s12;
      s12 = p1;
      /* Component 2 */

      p2 = a21 * s22 - a23n * s20;
      k = p2 / m2 | 0;
      p2 -= k * m2;
      if (p2 < 0) p2 += m2;
      s20 = s21;
      s21 = s22;
      s22 = p2;
      /* Combination */

      if (p1 <= p2) return p1 - p2 + m1;else return p1 - p2;
    };

    var random = function () {
      return uint32() * 2.3283064365386963e-10; // 2^-32
    };

    random.uint32 = uint32;

    random.fract53 = function () {
      return random() + (uint32() & 0x1fffff) * 1.1102230246251565e-16; // 2^-53
    };

    random.version = 'MRG32k3a 0.9';
    random.args = args;
    return random;
  }(Array.prototype.slice.call(arguments));
}

;
module.exports = MRG32k3a;

/***/ }),

/***/ 165:
/***/ ((module) => {

/*! From http://baagoe.com/en/RandomMusings/javascript/ */

/*! Johannes Baagøe <baagoe@baagoe.com>, 2010 */
function Mash() {
  var n = 0xefc8249d;

  var mash = function (data) {
    data = data.toString();

    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }

    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  mash.version = 'Mash 0.9';
  return mash;
}

module.exports = Mash;

/***/ }),

/***/ 779:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*! From http://baagoe.com/en/RandomMusings/javascript/ */
const Mash = __webpack_require__(165);

function Xorshift03() {
  return function (args) {
    /*! George Marsaglia, 13 May 2003 */

    /*! http://groups.google.com/group/comp.lang.c/msg/e3c4ea1169e463ae */
    var x = 123456789,
        y = 362436069,
        z = 521288629,
        w = 88675123,
        v = 886756453;

    if (args.length == 0) {
      args = [+new Date()];
    }

    var mash = Mash();

    for (var i = 0; i < args.length; i++) {
      x ^= mash(args[i]) * 0x100000000; // 2^32

      y ^= mash(args[i]) * 0x100000000;
      z ^= mash(args[i]) * 0x100000000;
      v ^= mash(args[i]) * 0x100000000;
      w ^= mash(args[i]) * 0x100000000;
    }

    mash = null;

    var uint32 = function () {
      var t = (x ^ x >>> 7) >>> 0;
      x = y;
      y = z;
      z = w;
      w = v;
      v = v ^ v << 6 ^ (t ^ t << 13) >>> 0;
      return (y + y + 1) * v >>> 0;
    };

    var random = function () {
      return uint32() * 2.3283064365386963e-10; // 2^-32
    };

    random.uint32 = uint32;

    random.fract53 = function () {
      return random() + (uint32() & 0x1fffff) * 1.1102230246251565e-16; // 2^-53
    };

    random.version = 'Xorshift03 0.9';
    random.args = args;
    return random;
  }(Array.prototype.slice.call(arguments));
}

;
module.exports = Xorshift03;

/***/ }),

/***/ 664:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Alea = __webpack_require__(544);

const KISS07 = __webpack_require__(825);

const Kybos = __webpack_require__(139);

const LFib = __webpack_require__(247);

const LFIB4 = __webpack_require__(105);

const MRG32k3a = __webpack_require__(759);

const Xorshift03 = __webpack_require__(779);

module.exports = {
  Alea,
  KISS07,
  Kybos,
  LFib,
  LFIB4,
  MRG32k3a,
  Xorshift03
};

/***/ }),

/***/ 344:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  compact,
  assign,
  timesMap,
  hasWindow,
  ...utils
} = __webpack_require__(599);

const {
  OPTION_VALIDATORS,
  ERROR_MESSAGES,
  DEFAULT_OPTIONS
} = __webpack_require__(852);

const {
  DEFAULT_BROWSER_SEED,
  DEFAULT_NODE_SEED
} = __webpack_require__(680);

const _random = utils.random;
const _randomItem = utils.randomItem;
const _shuffle = utils.shuffle;
/**
 * UTF-8 char diapasons
 * @const
 */

const CHAR_RANGES = [[[48, 57]], // Numbers
[[65, 90]], // Uppercase
[[97, 122]], // Lowercase
[[33, 46], [58, 64], [94, 96], [123, 126]] // Symbols
];
/**
 * Returns char ranges by options
 * @param {Object} options
 * @return {Array} Char diapasons
 */

function getCharRanges(options) {
  return compact([].concat(options.numbers && [CHAR_RANGES[0]], options.uppercase && [CHAR_RANGES[1]], options.lowercase && [CHAR_RANGES[2]], options.symbols && [CHAR_RANGES[3]], options.ranges && options.ranges));
}

function getEnvironmentSeed({
  seed
}) {
  const hasSeed = Boolean(seed);

  if (hasWindow()) {
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

  const opts = assign({}, DEFAULT_OPTIONS, options, passfather.prototype._dev.options);

  const shuffle = arr => {
    const seed = _shuffle(getEnvironmentSeed(opts));

    return _shuffle(arr, opts.prng, seed);
  };

  const random = diapason => {
    const seed = _shuffle(getEnvironmentSeed(opts));

    return _random(diapason, opts.prng, _shuffle(seed));
  };

  const randomItem = arr => {
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

passfather.prototype._dev = {
  options: {}
};
module.exports = {
  passfather,
  DEFAULT_OPTIONS,
  CHAR_RANGES,
  ERROR_MESSAGES
};

/***/ }),

/***/ 680:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  compact,
  hasWindow
} = __webpack_require__(599);

const os = hasWindow() ? {} : eval(`require('os')`);
/**
 * Default seed for prng
 * @const
 */

const DEFAULT_NODE_SEED = !hasWindow() ? compact([].concat(Date.now(), process.memoryUsage ? [process.memoryUsage().heapTotal, process.memoryUsage().heapUsed] : null, process.env ? [process.arch, process.platform, os.cpus().length, os.totalmem()] : null)) : null;
/**
 * Default seed for prng
 * @const
 */

const DEFAULT_BROWSER_SEED = hasWindow() ? compact([].concat(Date.now(), performance && performance.memory ? [performance.memory.totalJSHeapSize, performance.memory.usedJSHeapSize] : null, navigator ? [navigator.userAgent, navigator.appVersion, navigator.hardwareConcurrency, navigator.deviceMemory] : null)) : null;
module.exports = {
  DEFAULT_NODE_SEED,
  DEFAULT_BROWSER_SEED
};

/***/ }),

/***/ 599:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const PRNGs = __webpack_require__(664);

const PRNGKeys = new Set(Object.keys(PRNGs));
/**
 * Returns true if the code runs in Window
 * @return {Boolaen}
 */

function hasWindow() {
  return typeof window !== 'undefined' && window.hasOwnProperty('Window') && window instanceof window.Window;
}
/**
 * Returns crypto module for this environment
 */


function getCrypto() {
  return hasWindow() ? window.crypto : eval(`require('crypto')`);
}
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
  return hasWindow() ? crypto.getRandomValues(new Uint32Array(1))[0] : parseInt(crypto.randomBytes(4).toString('hex'), 16);
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
  return randomInt >= Math.floor(4294967295 / range) * range ? random(diapason) : diapason[0] + randomInt % range;
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
  hasWindow,
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
  escapeRegExp
};

/***/ }),

/***/ 852:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  keys,
  isInteger,
  includesAll,
  isBoolean,
  isArray,
  isPlainObject,
  assign,
  without,
  isCharCode,
  isString,
  isNumber
} = __webpack_require__(599);

const PRNGs = __webpack_require__(664);

const {
  name
} = __webpack_require__(876);
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
  seed: null
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
    const cases = [// [IMPORTANT] Order is important, because index of case matches with error code
    () => (options === undefined || isPlainObject(options) && keys(options).length === 0) === false, () => isPlainObject(options), () => includesAll(keys(DEFAULT_OPTIONS), keys(options)), () => options.hasOwnProperty('ranges') === false || this.ranges(options.ranges), () => options.hasOwnProperty('numbers') === false || this.numbers(options.numbers), () => options.hasOwnProperty('uppercase') === false || this.uppercase(options.uppercase), () => options.hasOwnProperty('lowercase') === false || this.lowercase(options.lowercase), () => options.hasOwnProperty('symbols') === false || this.symbols(options.symbols), () => options.hasOwnProperty('length') === false || this.length(options.length), () => options.hasOwnProperty('prng') === false || this.prng(options.prng), () => options.hasOwnProperty('seed') === false || this.seed(options.seed), () => {
      const opts = assign({}, DEFAULT_OPTIONS, options);
      return without(keys(opts), ['length']).some(key => {
        return key === 'ranges' ? isArray(opts[key]) : opts[key] === true;
      });
    }, () => {
      const opts = assign({}, DEFAULT_OPTIONS, options);
      return (options.hasOwnProperty('seed') && opts.prng === 'default') === false;
    }];
    const result = cases.findIndex(item => item() === false);
    return result;
  }

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
  OPTION_VALIDATORS,
  ERROR_MESSAGES,
  MODULE_NAME,
  DEFAULT_OPTIONS
};

/***/ }),

/***/ 876:
/***/ ((module) => {

module.exports = JSON.parse('{"name":"passfather","version":"3.0.3","description":"Passfather is very fast and powerful utility with zero dependencies to generate strong password","author":"Evgeny Vyushin <e@vyushin.ru> (https://github.com/vyushin)","contributors":["Evgeny Vyushin <e@vyushin.ru> (https://github.com/vyushin)"],"maintainers":["Evgeny Vyushin <e@vyushin.ru> (https://github.com/vyushin)"],"repository":{"type":"git","url":"https://github.com/vyushin/passfather"},"scripts":{"install-all":"cd ./build && npm install && cd ../test && npm install","build:cdn":"cd ./build && npm run build:cdn","build:umd":"cd ./build && npm run build:umd","build":"cd ./build && npm run build","pretest":"npm run build","test":"cd ./test && npm test","prepublish":"npm test"},"bugs":{"url":"https://github.com/vyushin/passfather/issues"},"homepage":"https://github.com/vyushin/passfather","main":"./dist/passfather.js","module":"./dist/passfather.esm.js","types":"./dist/passfather.d.ts","license":"MIT","keywords":["password","generator","passgen"],"directories":{"doc":"./README.md"},"devDependencies":{}}');

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _passfather__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(344);
/* harmony import */ var _passfather__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_passfather__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_passfather__WEBPACK_IMPORTED_MODULE_0__.passfather);
})();

var __webpack_exports__default = __webpack_exports__.Z;
export { __webpack_exports__default as default };
