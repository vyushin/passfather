const { getRandomUint32, ...utils } = require('../../src/utils');
const PRNGs = require('../../src/PRNGs');

const getNodeSeed = () => {
  return [Date.now(), process.memoryUsage().heapTotal, process.memoryUsage().heapUsed];
};

const wait = async (ms) => await new Promise(res => setTimeout(res, ms));

describe('Test utils.js', () => {

  describe('Testing getRandomUint32() function', () => {
    const PRNGsKeysWithoutDefault = Object.keys(PRNGs);
    const PRNGsKeysWithDefault = [undefined, 'default', ...PRNGsKeysWithoutDefault];

    describe.each(PRNGsKeysWithDefault)('Must have unique value without seed', (prng) => {
      test(`With PRNG ${prng}`, async () => {
        const n1 = getRandomUint32(prng);
        await wait(100); // Waiting because non default prng uses "new Date()" seed
        const n2 = getRandomUint32(prng);
        expect(n1).not.toBe(n2);
      });
    });

    describe.each(PRNGsKeysWithDefault)('Must have unique value with different seed', (prng) => {
      test(`With PRNG ${prng}`, () => {
        const n1 = getRandomUint32(prng, getNodeSeed());
        const n2 = getRandomUint32(prng, getNodeSeed());
        expect(n1).not.toBe(n2);
      });
    });

    describe.each(PRNGsKeysWithoutDefault)('Must have the same value with the same seed', (prng) => {
      const staticSeed = getNodeSeed();
      test(`With PRNG ${prng}`, () => {
        const v1 = getRandomUint32(prng, staticSeed);
        const v2 = getRandomUint32(prng, staticSeed);
        expect(v1).toBe(v2);
      });
    });

    describe.each(PRNGsKeysWithoutDefault)('Must have the same value with weak seed', (prng) => {
      test(`With PRNG ${prng}`, () => {
        const v1 = getRandomUint32(prng, ['seed']);
        const v2 = getRandomUint32(prng, ['seed']);
        expect(v1).toBe(v2);
      });
    });
  });

  describe('Testing isBrowser()', () => {
    test('Returns false in Node.js environment', () => {
      expect(utils.isBrowser()).toBe(false);
    });
  });

  describe('Testing random()', () => {
    test('Returns value within diapason [0, 0]', () => {
      expect(utils.random([0, 0])).toBe(0);
    });
    test('Returns value within diapason [5, 5]', () => {
      expect(utils.random([5, 5])).toBe(5);
    });
    test('Returns value within diapason [0, 1]', () => {
      const result = utils.random([0, 1]);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(1);
    });
    test('Returns value within large diapason [0, 1000000]', () => {
      const result = utils.random([0, 1000000]);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(1000000);
    });
    test('Returns integer', () => {
      expect(Number.isInteger(utils.random([0, 100]))).toBe(true);
    });
    test('Returns value within negative-to-positive diapason [-10, 10]', () => {
      const result = utils.random([-10, 10]);
      expect(result).toBeGreaterThanOrEqual(-10);
      expect(result).toBeLessThanOrEqual(10);
    });
  });

  describe('Testing randomItem()', () => {
    test('Returns the only item from single-element array', () => {
      expect(utils.randomItem([42])).toBe(42);
    });
    test('Returns item from array', () => {
      const arr = [1, 2, 3, 4, 5];
      expect(arr).toContain(utils.randomItem(arr));
    });
    test('Works with string array', () => {
      const arr = ['a', 'b', 'c'];
      expect(arr).toContain(utils.randomItem(arr));
    });
  });

  describe('Testing without()', () => {
    test('Removes specified values', () => {
      expect(utils.without([1, 2, 3, 4], [2, 4])).toEqual([1, 3]);
    });
    test('Returns same array when no matches', () => {
      expect(utils.without([1, 2, 3], [4, 5])).toEqual([1, 2, 3]);
    });
    test('Returns empty array when all removed', () => {
      expect(utils.without([1, 2], [1, 2])).toEqual([]);
    });
    test('Works with empty array', () => {
      expect(utils.without([], [1, 2])).toEqual([]);
    });
    test('Works with empty values', () => {
      expect(utils.without([1, 2, 3], [])).toEqual([1, 2, 3]);
    });
    test('Works with strings', () => {
      expect(utils.without(['a', 'b', 'c'], ['b'])).toEqual(['a', 'c']);
    });
  });

  describe('Testing includes()', () => {
    test('Returns true when arr has one of values', () => {
      expect(utils.includes([1, 2, 3], [3, 4])).toBe(true);
    });
    test('Returns false when arr has none of values', () => {
      expect(utils.includes([1, 2, 3], [4, 5])).toBe(false);
    });
    test('Returns false for empty array', () => {
      expect(utils.includes([], [1, 2])).toBe(false);
    });
    test('Returns false for empty values', () => {
      expect(utils.includes([1, 2], [])).toBe(false);
    });
  });

  describe('Testing includesAll()', () => {
    test('Returns true when arr includes all values', () => {
      expect(utils.includesAll([1, 2, 3, 4], [1, 3])).toBe(true);
    });
    test('Returns false when arr missing some values', () => {
      expect(utils.includesAll([1, 2], [1, 3])).toBe(false);
    });
    test('Returns true for empty values', () => {
      expect(utils.includesAll([1, 2], [])).toBe(true);
    });
    test('Returns false for empty arr with non-empty values', () => {
      expect(utils.includesAll([], [1])).toBe(false);
    });
  });

  describe('Testing excludes()', () => {
    test('Returns true when arr has none of values', () => {
      expect(utils.excludes([1, 2, 3], [4, 5])).toBe(true);
    });
    test('Returns false when arr has one of values', () => {
      expect(utils.excludes([1, 2, 3], [3, 4])).toBe(false);
    });
    test('Returns true for empty array', () => {
      expect(utils.excludes([], [1, 2])).toBe(true);
    });
    test('Returns true for empty values', () => {
      expect(utils.excludes([1, 2], [])).toBe(true);
    });
  });

  describe('Testing lastIndex()', () => {
    test('Returns last index', () => {
      expect(utils.lastIndex([10, 20, 30])).toBe(2);
    });
    test('Returns 0 for single-element array', () => {
      expect(utils.lastIndex([1])).toBe(0);
    });
    test('Returns -1 for empty array', () => {
      expect(utils.lastIndex([])).toBe(-1);
    });
  });

  describe('Testing compact()', () => {
    test('Removes all falsy values', () => {
      expect(utils.compact([0, 1, false, 2, '', 3, null, undefined, NaN])).toEqual([1, 2, 3]);
    });
    test('Returns empty array from all falsy', () => {
      expect(utils.compact([0, false, '', null, undefined, NaN])).toEqual([]);
    });
    test('Returns same values when no falsy', () => {
      expect(utils.compact([1, 'a', true, {}, []])).toEqual([1, 'a', true, {}, []]);
    });
    test('Returns empty array from empty array', () => {
      expect(utils.compact([])).toEqual([]);
    });
  });

  describe('Testing isBoolean()', () => {
    test.each([true, false])('Returns true for %p', (val) => {
      expect(utils.isBoolean(val)).toBe(true);
    });
    test.each([0, 1, '', 'true', null, undefined, [], {}])('Returns false for %p', (val) => {
      expect(utils.isBoolean(val)).toBe(false);
    });
  });

  describe('Testing isArray()', () => {
    test.each([[[]], [[1]], [[1, 2, 3]]])('Returns true for %p', (val) => {
      expect(utils.isArray(val)).toBe(true);
    });
    test.each([{}, 'string', 0, null, undefined, true])('Returns false for %p', (val) => {
      expect(utils.isArray(val)).toBe(false);
    });
  });

  describe('Testing keys()', () => {
    test('Returns keys of object', () => {
      expect(utils.keys({ a: 1, b: 2 })).toEqual(['a', 'b']);
    });
    test('Returns empty array for empty object', () => {
      expect(utils.keys({})).toEqual([]);
    });
  });

  describe('Testing isInteger()', () => {
    test.each([0, 1, -1, 100, Number.MAX_SAFE_INTEGER])('Returns true for %p', (val) => {
      expect(utils.isInteger(val)).toBe(true);
    });
    test.each([0.5, 1.1, NaN, Infinity, -Infinity, '1', null, undefined, true])('Returns false for %p', (val) => {
      expect(utils.isInteger(val)).toBe(false);
    });
  });

  describe('Testing isNumber()', () => {
    test.each([0, 1, -1, 0.5, Infinity, -Infinity])('Returns true for %p', (val) => {
      expect(utils.isNumber(val)).toBe(true);
    });
    test.each([NaN, '1', null, undefined, true, []])('Returns false for %p', (val) => {
      expect(utils.isNumber(val)).toBe(false);
    });
  });

  describe('Testing isString()', () => {
    test.each(['', 'hello', '123', ' '])('Returns true for %p', (val) => {
      expect(utils.isString(val)).toBe(true);
    });
    test.each([0, null, undefined, true, [], {}])('Returns false for %p', (val) => {
      expect(utils.isString(val)).toBe(false);
    });
  });

  describe('Testing isPlainObject()', () => {
    test.each([{}, { a: 1 }, { nested: { b: 2 } }])('Returns true for %p', (val) => {
      expect(utils.isPlainObject(val)).toBe(true);
    });
    test.each([[], null, undefined, 0, '', true, 'string', new Map()])('Returns false for %p', (val) => {
      expect(utils.isPlainObject(val)).toBe(false);
    });
    test('Returns false for object with circular reference', () => {
      const obj = {};
      obj.self = obj;
      expect(utils.isPlainObject(obj)).toBe(false);
    });
  });

  describe('Testing assign()', () => {
    test('Merges two objects', () => {
      expect(utils.assign({}, { a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
    });
    test('Later properties override earlier', () => {
      expect(utils.assign({}, { a: 1 }, { a: 2 })).toEqual({ a: 2 });
    });
    test('Handles undefined properties', () => {
      expect(utils.assign({}, { a: 1 }, { a: undefined })).toEqual({ a: undefined });
    });
    test('Returns target object', () => {
      const target = {};
      const result = utils.assign(target, { a: 1 });
      expect(result).toBe(target);
    });
  });

  describe('Testing timesMap()', () => {
    test('Creates array of given length', () => {
      expect(utils.timesMap(3, (_, i) => i)).toEqual([0, 1, 2]);
    });
    test('Returns empty array for 0', () => {
      expect(utils.timesMap(0, (_, i) => i)).toEqual([]);
    });
    test('Passes item and index to iteratee', () => {
      const result = utils.timesMap(3, (item, index) => index * 2);
      expect(result).toEqual([0, 2, 4]);
    });
  });

  describe('Testing numSequence()', () => {
    test('Generates exclusive sequence', () => {
      expect(utils.numSequence(0, 3)).toEqual([0, 1, 2]);
    });
    test('Generates inclusive sequence', () => {
      expect(utils.numSequence(0, 3, true)).toEqual([0, 1, 2, 3]);
    });
    test('Generates sequence with offset', () => {
      expect(utils.numSequence(5, 8, true)).toEqual([5, 6, 7, 8]);
    });
    test('Generates empty exclusive sequence when from === to', () => {
      expect(utils.numSequence(3, 3)).toEqual([]);
    });
    test('Generates single-element inclusive sequence when from === to', () => {
      expect(utils.numSequence(3, 3, true)).toEqual([3]);
    });
  });

  describe('Testing shuffle()', () => {
    test('Returns same array reference (mutates in place)', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = utils.shuffle(arr);
      expect(result).toBe(arr);
    });
    test('Returns array with same elements', () => {
      const arr = [1, 2, 3, 4, 5];
      const sorted = [...arr];
      utils.shuffle(arr);
      expect(arr.sort()).toEqual(sorted.sort());
    });
    test('Returns single-element array unchanged', () => {
      expect(utils.shuffle([42])).toEqual([42]);
    });
    test('Returns empty array unchanged', () => {
      expect(utils.shuffle([])).toEqual([]);
    });
    test('Preserves array length', () => {
      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      utils.shuffle(arr);
      expect(arr.length).toBe(10);
    });
  });

  describe('Testing getCharsByDiapason()', () => {
    test('Returns digits 0-9 for [48, 57]', () => {
      expect(utils.getCharsByDiapason([48, 57])).toBe('0123456789');
    });
    test('Returns single char for [65, 65]', () => {
      expect(utils.getCharsByDiapason([65, 65])).toBe('A');
    });
    test('Returns uppercase A-Z for [65, 90]', () => {
      expect(utils.getCharsByDiapason([65, 90])).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    });
    test('Returns lowercase a-z for [97, 122]', () => {
      expect(utils.getCharsByDiapason([97, 122])).toBe('abcdefghijklmnopqrstuvwxyz');
    });
  });

  describe('Testing isCharCode()', () => {
    test.each([1, 48, 65, 122, 1024, 0xFFFF])('Returns true for valid char code %p', (val) => {
      expect(utils.isCharCode(val)).toBe(true);
    });
    test.each([0, false, null, undefined])('Returns false for %p', (val) => {
      expect(utils.isCharCode(val)).toBe(false);
    });
  });

  describe('Testing escapeRegExp()', () => {
    test('Escapes all special regex characters', () => {
      expect(utils.escapeRegExp('.*+?^${}()|[]\\')).toBe('\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\');
    });
    test('Returns plain string unchanged', () => {
      expect(utils.escapeRegExp('hello')).toBe('hello');
    });
    test('Returns empty string unchanged', () => {
      expect(utils.escapeRegExp('')).toBe('');
    });
    test('Escapes mixed content', () => {
      const escaped = utils.escapeRegExp('price: $100 (USD)');
      expect(escaped).toBe('price: \\$100 \\(USD\\)');
    });
  });

});