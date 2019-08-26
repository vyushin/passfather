(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    passfather = _require.passfather;

module.exports = passfather;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(2),
    random = _require.random,
    randomItem = _require.randomItem,
    keys = _require.keys,
    compact = _require.compact,
    isInteger = _require.isInteger,
    includesAll = _require.includesAll,
    isBoolean = _require.isBoolean,
    isPlainObject = _require.isPlainObject,
    assign = _require.assign,
    timesMap = _require.timesMap,
    without = _require.without,
    shuffle = _require.shuffle;
/**
 * Module name
 * @const
 */


var MODULE_NAME = 'passfather';
/**
 * Default passfather options
 * @const
 */

var DEFAULT_OPTIONS = {
  numbers: true,
  uppercase: true,
  lowercase: true,
  symbols: true,
  length: 12
};
/**
 * Functions to validate options
 */

var OPTION_VALIDATORS = {
  numbers: function numbers(value) {
    return isBoolean(value);
  },
  uppercase: function uppercase(value) {
    return isBoolean(value);
  },
  lowercase: function lowercase(value) {
    return isBoolean(value);
  },
  symbols: function symbols(value) {
    return isBoolean(value);
  },
  length: function length(value) {
    return isInteger(value) && value > 0;
  },

  /**
   * Completely option validate
   * @param {Object} options
   * @return {Number} Error code or 0 if validation passed
   */
  completely(options) {
    var _this = this;

    var cases = [// Order is important, because index of case matches with error code
    function () {
      return (options === undefined || isPlainObject(options) && keys(options).length === 0) === false;
    }, function () {
      return isPlainObject(options);
    }, function () {
      return includesAll(keys(DEFAULT_OPTIONS), keys(options));
    }, function () {
      return options.hasOwnProperty('numbers') === false || _this.numbers(options.numbers);
    }, function () {
      return options.hasOwnProperty('uppercase') === false || _this.uppercase(options.uppercase);
    }, function () {
      return options.hasOwnProperty('lowercase') === false || _this.lowercase(options.lowercase);
    }, function () {
      return options.hasOwnProperty('symbols') === false || _this.symbols(options.symbols);
    }, function () {
      return options.hasOwnProperty('length') === false || _this.length(options.length);
    }, function () {
      return includesAll(keys(options), without(keys(DEFAULT_OPTIONS), ['length'])) === false || keys(options).some(function (key) {
        return options[key] === true;
      });
    }];
    return cases.findIndex(function (item) {
      return item() === false;
    });
  }

};
/**
 * Error messages by error code.
 * Order is important, because index of error message matches with validation case.
 */

var ERROR_MESSAGES = [];
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

var CHAR_DIAPASONS = [[[48, 57]], // Numbers
[[65, 90]], // Uppercase
[[97, 122]], // Lowercase
[[33, 46], [58, 64], [94, 96], [123, 126]]];
/**
 * Returns char diapasons by options
 * @param {Object} options
 * @return {Array} Char diapasons
 */

function getCharDiapasons(options) {
  return compact([].concat(options.numbers && [CHAR_DIAPASONS[0]], options.uppercase && [CHAR_DIAPASONS[1]], options.lowercase && [CHAR_DIAPASONS[2]], options.symbols && [CHAR_DIAPASONS[3]]));
}
/**
 * Generate password
 * @param {Object} options
 * @return {String} Password
 */


function passfather(options) {
  var errorCode = OPTION_VALIDATORS.completely(options);

  if (errorCode > 0) {
    throw ERROR_MESSAGES[errorCode];
  }

  var opts = assign({}, DEFAULT_OPTIONS, options);
  var diapasons = getCharDiapasons(opts);
  var requiredChars = timesMap(diapasons.length, function (item, index) {
    return String.fromCharCode(random(randomItem(diapasons[index])));
  });

  if (requiredChars.length >= opts.length) {
    return shuffle(requiredChars).slice(0, opts.length).join('');
  }

  return shuffle(timesMap(opts.length - requiredChars.length, function () {
    return String.fromCharCode(random(randomItem(randomItem(diapasons))));
  }).concat(requiredChars)).join('');
}

module.exports = {
  passfather,
  DEFAULT_OPTIONS,
  CHAR_DIAPASONS,
  ERROR_MESSAGES
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var crypto = isBrowser() ? global.crypto : eval('require("crypto")');
/**
 * Returns true if the code runs in browser
 * @return {Boolean}
 */

function isBrowser() {
  return global.hasOwnProperty('Window') && global instanceof global.Window;
}

function getRandomInt() {
  return isBrowser() ? crypto.getRandomValues(new Uint32Array(1))[0] : parseInt(crypto.randomBytes(4).toString('hex'), 16);
}
/**
 * Returns random number
 * @param {[Number, Number]} diapason [min, max]
 * @return {Number} Random number
 */


function random(diapason) {
  var randomInt = getRandomInt();
  var range = diapason[1] - diapason[0] + 1;
  return randomInt >= Math.floor(4294967295 / range) * range ? random(diapason) : diapason[0] + randomInt % range;
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
  return arr.filter(function (item) {
    return values.includes(item) === false;
  });
}
/**
 * Search values in array
 * @param {Array} arr Array to search
 * @param {Array} values Values to search
 * @return {Boolean} Returns true if arr has one of values
 */


function includes(arr, values) {
  return arr.some(function (item) {
    return values.includes(item);
  });
}
/**
 * Returns true if arr includes all of the values
 * @param {Array} arr Array to search
 * @param {Array} values Values to search
 * @return {Boolean}
 */


function includesAll(arr, values) {
  return values.some(function (item) {
    return arr.includes(item) === false;
  }) === false;
}
/**
 * Returns true if the arr haven't values
 * @param {Array} arr Array to search
 * @param {Array} values Values to search
 * @return {Boolean}
 */


function excludes(arr, values) {
  return arr.some(function (item) {
    return values.includes(item);
  }) === false;
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
  return function (result) {
    return inclusive ? result.push(to) && result : result;
  }(timesMap(to - from, function (item, key) {
    return from + key;
  }));
}
/**
 * Shuffle array
 * @param {Array} arr
 * @return {Array}
 */


function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [arr[j], arr[i]];
    arr[i] = _ref[0];
    arr[j] = _ref[1];
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
  getCharsByDiapason
};

/***/ })
/******/ ]);
});