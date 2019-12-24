const { CHAR_RANGES } = require('../src/passfather');
const { ERROR_MESSAGES, DEFAULT_OPTIONS } = require('../src/validatingOptions');
const { random, getCharsByDiapason, without, escapeRegExp } = require('../src/utils');
const PRNGs = require('../src/PRNGs');
const passfather = require('../dist/passfather');

CHAR_RANGES.push([ // Fictional ranges
  [ [1248, 1263] ],
  [ [1264, 1279], [1680, 1695], [2320, 2335] ]
]);

const CHARS = {
  numbers:   escapeRegExp(CHAR_RANGES[0].map(range => getCharsByDiapason(range)).join('')),
  uppercase: escapeRegExp(CHAR_RANGES[1].map(range => getCharsByDiapason(range)).join('')),
  lowercase: escapeRegExp(CHAR_RANGES[2].map(range => getCharsByDiapason(range)).join('')),
  symbols:   escapeRegExp(CHAR_RANGES[3].map(range => getCharsByDiapason(range)).join('')),
  ranges:    [
    escapeRegExp(CHAR_RANGES[4][0].map(range => getCharsByDiapason(range)).join('')),
    escapeRegExp(CHAR_RANGES[4][1].map(range => getCharsByDiapason(range)).join('')),
  ],
  all() {
    return `${this.numbers}${this.uppercase}${this.lowercase}${this.symbols}${this.ranges.join('')}`;
  }
};

describe('Make password with default options', () => {
  const password = passfather();
  it('Default length',     () => expect(password.length).toBe(DEFAULT_OPTIONS.length));
  it('Contains numbers',   () => expect(password).toMatch(new RegExp(`[${CHARS.numbers}]+`)));
  it('Contains uppercase', () => expect(password).toMatch(new RegExp(`[${CHARS.uppercase}]+`)));
  it('Contains lowercase', () => expect(password).toMatch(new RegExp(`[${CHARS.lowercase}]+`)));
  it('Contains symbols',   () => expect(password).toMatch(new RegExp(`[${CHARS.symbols}]+`)));
});

describe('Make password with custom length', () => {
  const length = random([10, 100]);
  const password = passfather({ length });
  it('Custom length',      () => expect(password.length).toBe(length));
  it('Contains numbers',   () => expect(password).toMatch(new RegExp(`[${CHARS.numbers}]+`)));
  it('Contains uppercase', () => expect(password).toMatch(new RegExp(`[${CHARS.uppercase}]+`)));
  it('Contains lowercase', () => expect(password).toMatch(new RegExp(`[${CHARS.lowercase}]+`)));
  it('Contains symbols',   () => expect(password).toMatch(new RegExp(`[${CHARS.symbols}]+`)));
});

describe('Make password without...', () => {

  describe('Make password without numbers', () => {
    const password = passfather({ numbers: false });
    it('Default length',             () => expect(password.length).toBe(DEFAULT_OPTIONS.length));
    it('Does not contain numbers',   () => expect(password).not.toMatch(new RegExp(`[${CHARS.numbers}]+`)));
    it('Contains uppercase',         () => expect(password).toMatch(new RegExp(`[${CHARS.uppercase}]+`)));
    it('Contains lowercase',         () => expect(password).toMatch(new RegExp(`[${CHARS.lowercase}]+`)));
    it('Contains symbols',           () => expect(password).toMatch(new RegExp(`[${CHARS.symbols}]+`)));
  });

  describe('Make password without uppercase', () => {
    const password = passfather({ uppercase: false });
    it('Default length',             () => expect(password.length).toBe(DEFAULT_OPTIONS.length));
    it('Contains numbers',           () => expect(password).toMatch(new RegExp(`[${CHARS.numbers}]+`)));
    it('Does not contain uppercase', () => expect(password).not.toMatch(new RegExp(`[${CHARS.uppercase}]+`)));
    it('Contains lowercase',         () => expect(password).toMatch(new RegExp(`[${CHARS.lowercase}]+`)));
    it('Contains symbols',           () => expect(password).toMatch(new RegExp(`[${CHARS.symbols}]+`)));
  });

  describe('Make password without lowercase', () => {
    const password = passfather({ lowercase: false });
    it('Default length',             () => expect(password.length).toBe(DEFAULT_OPTIONS.length));
    it('Contains numbers',           () => expect(password).toMatch(new RegExp(`[${CHARS.numbers}]+`)));
    it('Contains uppercase',         () => expect(password).toMatch(new RegExp(`[${CHARS.uppercase}]+`)));
    it('Does not contain lowercase', () => expect(password).not.toMatch(new RegExp(`[${CHARS.lowercase}]+`)));
    it('Contains symbols',           () => expect(password).toMatch(new RegExp(`[${CHARS.symbols}]+`)));
  });

  describe('Make password without symbols', () => {
    const password = passfather({ symbols: false });
    it('Default length',             () => expect(password.length).toBe(DEFAULT_OPTIONS.length));
    it('Contains numbers',           () => expect(password).toMatch(new RegExp(`[${CHARS.numbers}]+`)));
    it('Contains uppercase',         () => expect(password).toMatch(new RegExp(`[${CHARS.uppercase}]+`)));
    it('Contains lowercase',         () => expect(password).toMatch(new RegExp(`[${CHARS.lowercase}]+`)));
    it('Does not contain symbols',   () => expect(password).not.toMatch(new RegExp(`[${CHARS.symbols}]+`)));
  });

});

describe('Make passwords contains only...', () => {

  it('Make password contains only numbers', () => {
    const password = passfather({ uppercase: false, lowercase: false, symbols: false });
    expect(password).toMatch(new RegExp(`^[${CHARS.numbers}]+$`));
  });

  it('Make password contains only uppercase', () => {
    const password = passfather({ numbers: false, lowercase: false, symbols: false });
    expect(password).toMatch(new RegExp(`^[${CHARS.uppercase}]+$`));
  });

  it('Make password contains only lowercase', () => {
    const password = passfather({ numbers: false, uppercase: false, symbols: false });
    expect(password).toMatch(new RegExp(`^[${CHARS.lowercase}]+$`));
  });

  it('Make password contains only symbols', () => {
    const password = passfather({ numbers: false, uppercase: false, lowercase: false });
    expect(password).toMatch(new RegExp(`^[${CHARS.symbols}]+$`));
  });

  it('Make password contains only ranges', () => {
    const password = passfather({ numbers: false, uppercase: false, lowercase: false, symbols: false, ranges: CHAR_RANGES[4] });
    expect(password).toMatch(new RegExp(`^[${CHARS.ranges.join('')}]+$`));
  });

});

describe('Make short password with guaranteed chars set', () => {

  describe('Make short password with guaranteed numbers, uppercase, lowercase, symbols and ranges', () => {
    const length = 6; // [IMPORTANT] Length is important. number + uppercase + lowercase + symbol + two ranges = 6
    const password = passfather({ length, ranges: CHAR_RANGES[4] });
    it('Default length',     () => expect(password.length).toBe(length));
    it('Contains numbers',   () => expect(password).toMatch(new RegExp(`[${CHARS.numbers}]+`)));
    it('Contains uppercase', () => expect(password).toMatch(new RegExp(`[${CHARS.uppercase}]+`)));
    it('Contains lowercase', () => expect(password).toMatch(new RegExp(`[${CHARS.lowercase}]+`)));
    it('Contains symbols',   () => expect(password).toMatch(new RegExp(`[${CHARS.symbols}]+`)));
    it('Contains ranges',    () => expect(password).toMatch(new RegExp(`[${CHARS.ranges.join('')}]+`)));
  });

  describe('Make short password with guaranteed numbers, uppercase, lowercase', () => {
    const length = 3;
    const password = passfather({ length, symbols: false });
    it('Default length',             () => expect(password.length).toBe(length));
    it('Contains numbers',           () => expect(password).toMatch(new RegExp(`[${CHARS.numbers}]+`)));
    it('Contains uppercase',         () => expect(password).toMatch(new RegExp(`[${CHARS.uppercase}]+`)));
    it('Contains lowercase',         () => expect(password).toMatch(new RegExp(`[${CHARS.lowercase}]+`)));
    it('Does not contain symbols',   () => expect(password).not.toMatch(new RegExp(`[${CHARS.symbols}]+`)));
  });

  describe('Make short password with guaranteed uppercase, lowercase, symbols', () => {
    const length = 3;
    const password = passfather({ length, numbers: false });
    it('Default length',             () => expect(password.length).toBe(length));
    it('Does not contain numbers',   () => expect(password).not.toMatch(new RegExp(`[${CHARS.numbers}]+`)));
    it('Contains uppercase',         () => expect(password).toMatch(new RegExp(`[${CHARS.uppercase}]+`)));
    it('Contains lowercase',         () => expect(password).toMatch(new RegExp(`[${CHARS.lowercase}]+`)));
    it('Contains symbols',           () => expect(password).toMatch(new RegExp(`[${CHARS.symbols}]+`)));
  });

  describe('Make short password with guaranteed lowercase, symbols, numbers', () => {
    const length = 3;
    const password = passfather({ length, uppercase: false });
    it('Default length',             () => expect(password.length).toBe(length));
    it('Contains numbers',           () => expect(password).toMatch(new RegExp(`[${CHARS.numbers}]+`)));
    it('Does not contain uppercase', () => expect(password).not.toMatch(new RegExp(`[${CHARS.uppercase}]+`)));
    it('Contains lowercase',         () => expect(password).toMatch(new RegExp(`[${CHARS.lowercase}]+`)));
    it('Contains symbols',           () => expect(password).toMatch(new RegExp(`[${CHARS.symbols}]+`)));
  });

  describe('Make short password with guaranteed symbols, numbers, uppercase', () => {
    const length = 3;
    const password = passfather({ length, lowercase: false });
    it('Default length',             () => expect(password.length).toBe(length));
    it('Contains numbers',           () => expect(password).toMatch(new RegExp(`[${CHARS.numbers}]+`)));
    it('Contains uppercase',         () => expect(password).toMatch(new RegExp(`[${CHARS.uppercase}]+`)));
    it('Does not contain lowercase', () => expect(password).not.toMatch(new RegExp(`[${CHARS.lowercase}]+`)));
    it('Contains symbols',           () => expect(password).toMatch(new RegExp(`[${CHARS.symbols}]+`)));
  });

  describe('Make short password with guaranteed ranges', () => {
    const length = 2;
    const password = passfather({ length, numbers: false, uppercase: false, lowercase: false, symbols: false, ranges:  CHAR_RANGES[4] });
    it('Default length',              () => expect(password.length).toBe(length));
    it('Does not contains numbers',   () => expect(password).not.toMatch(new RegExp(`[${CHARS.numbers}]+`)));
    it('Does not contains uppercase', () => expect(password).not.toMatch(new RegExp(`[${CHARS.uppercase}]+`)));
    it('Does not contain lowercase',  () => expect(password).not.toMatch(new RegExp(`[${CHARS.lowercase}]+`)));
    it('Does not contains symbols',   () => expect(password).not.toMatch(new RegExp(`[${CHARS.symbols}]+`)));
    it('Contains ranges',             () => expect(password).toMatch(new RegExp(`^[${CHARS.ranges.join('')}]+$`)));
  });

});

describe('Make password with empty options object', () => {
  const password = passfather({});
  it('Default length',     () => expect(password.length).toBe(DEFAULT_OPTIONS.length));
  it('Contains numbers',   () => expect(password).toMatch(new RegExp(`[${CHARS.numbers}]+`)));
  it('Contains uppercase', () => expect(password).toMatch(new RegExp(`[${CHARS.uppercase}]+`)));
  it('Contains lowercase', () => expect(password).toMatch(new RegExp(`[${CHARS.lowercase}]+`)));
  it('Contains symbols',   () => expect(password).toMatch(new RegExp(`[${CHARS.symbols}]+`)));
});

describe('Make password with invalid options', () => {
  const args = [true, false, null, 0, 1, '', [], Symbol('passfather')];

  describe('With invalid option object', () => {
    test.each(args)(
      'Passing %p',
      (arg) => expect(() => passfather(arg)).toThrow(ERROR_MESSAGES[1]),
    );
  });

  it('With unknown options property', () => {
    expect(() => passfather({ unknown: true })).toThrow(ERROR_MESSAGES[2])
  });

  describe('With invalid "ranges" option', () => {
    const incorrectRangeStructuresAndValues = [
      [], [[]], [[], []], [[[]]], [[[]], [[]]],
      [48, 57], [48], [[48, 57], []], [[48, 57], [48]],
      [[[48, 57]], [48, 57]], [[[-1, 'incorrect']]], [[[true, 57]]],
    ];
    test.each(args.slice(2))(
        'With %p "range" value',
        (arg) => expect(() => passfather({ ranges: arg })).toThrow(ERROR_MESSAGES[3]),
    );
    test.each(incorrectRangeStructuresAndValues.slice(2))(
        'With incorrect "range" option structure %p',
        (arg) => expect(() => passfather({ ranges: arg })).toThrow(ERROR_MESSAGES[3]),
    );
  });

  describe('With invalid "numbers" option', () => {
    test.each(args.slice(2))(
      'Passing %p value',
      (arg) => expect(() => passfather({ numbers: arg })).toThrow(ERROR_MESSAGES[4]),
    );
  });

  describe('With invalid "uppercase" option', () => {
    test.each(args.slice(2))(
      'Passing %p value',
      (arg) => expect(() => passfather({ uppercase: arg })).toThrow(ERROR_MESSAGES[5]),
    );
  });

  describe('With invalid "lowercase" option', () => {
    test.each(args.slice(2))(
      'Passing %p value',
      (arg) => expect(() => passfather({ lowercase: arg })).toThrow(ERROR_MESSAGES[6]),
    );
  });

  describe('With invalid "symbols" option', () => {
    test.each(args.slice(2))(
      'Passing %p value',
      (arg) => expect(() => passfather({ symbols: arg })).toThrow(ERROR_MESSAGES[7]),
    );
  });

  describe('With invalid "length" option', () => {
    test.each(without(args, [1]).concat([-1, 0.5, 1.5]))(
      'Passing %p value',
      (arg) => expect(() => passfather({ length: arg })).toThrow(ERROR_MESSAGES[8]),
    );
  });

  describe('With invalid "symbols" option', () => {
    test.each(args.slice(2))(
      'Passing %p value',
      (arg) => expect(() => passfather({ symbols: arg })).toThrow(ERROR_MESSAGES[7]),
    );
  });

  describe('With invalid "prng" option', () => {
    test.each(args.slice(2))(
      'Passing %p value',
      (arg) => expect(() => passfather({ prng: arg })).toThrow(ERROR_MESSAGES[9]),
    );
  });

  describe('With invalid "seed" option', () => {
    const addArgs = [[1, '', NaN], [2, 'a', {}]];
    test.each(args.concat(addArgs))(
      'Passing %p value',
      (arg) => expect(() => passfather({ seed: arg })).toThrow(ERROR_MESSAGES[10]),
    );
  });

  it('When numbers, uppercase, lowercase, symbols are false', () => {
    const optinos = { numbers: false, uppercase: false, lowercase: false, symbols: false };
    expect(() => passfather(optinos)).toThrow(ERROR_MESSAGES[11])
  });

  it('When "seed" options is passed without "prng" options', () => {
    const optinos = { seed: [1, 2, 3] };
    expect(() => passfather(optinos)).toThrow(ERROR_MESSAGES[12])
  });

});