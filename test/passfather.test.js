const { DEFAULT_OPTIONS, CHAR_DIAPASONS, ERROR_MESSAGES } = require('../src/passfather');
const { random, getCharsByDiapason, without } = require('../src/utils');
const passfather = require('../dist/passfather');

const CHARS = {
  numbers:   CHAR_DIAPASONS[0].map(diapason => getCharsByDiapason(diapason)).join(''),
  uppercase: CHAR_DIAPASONS[1].map(diapason => getCharsByDiapason(diapason)).join(''),
  lowercase: CHAR_DIAPASONS[2].map(diapason => getCharsByDiapason(diapason)).join(''),
  symbols:   CHAR_DIAPASONS[3].map(diapason => getCharsByDiapason(diapason)).join(''),
  all() {
    return `${this.numbers}${this.uppercase}${this.lowercase}${this.symbols}`;
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

  describe('Make password contains only numbers', () => {
    const password = passfather({ uppercase: false, lowercase: false, symbols: false });
    it('Default length',             () => expect(password.length).toBe(DEFAULT_OPTIONS.length));
    it('Contains numbers',           () => expect(password).toMatch(new RegExp(`[${CHARS.numbers}]+`)));
    it('Does not contain uppercase', () => expect(password).not.toMatch(new RegExp(`[${CHARS.uppercase}]+`)));
    it('Does not contain lowercase', () => expect(password).not.toMatch(new RegExp(`[${CHARS.lowercase}]+`)));
    it('Does not contain symbols',   () => expect(password).not.toMatch(new RegExp(`[${CHARS.symbols}]+`)));
  });

  describe('Make password contains only uppercase', () => {
    const password = passfather({ numbers: false, lowercase: false, symbols: false });
    it('Default length',             () => expect(password.length).toBe(DEFAULT_OPTIONS.length));
    it('Does not contain numbers',   () => expect(password).not.toMatch(new RegExp(`[${CHARS.numbers}]+`)));
    it('Contains uppercase',         () => expect(password).toMatch(new RegExp(`[${CHARS.uppercase}]+`)));
    it('Does not contain lowercase', () => expect(password).not.toMatch(new RegExp(`[${CHARS.lowercase}]+`)));
    it('Does not contain symbols',   () => expect(password).not.toMatch(new RegExp(`[${CHARS.symbols}]+`)));
  });

  describe('Make password contains only lowercase', () => {
    const password = passfather({ numbers: false, uppercase: false, symbols: false });
    it('Default length',             () => expect(password.length).toBe(DEFAULT_OPTIONS.length));
    it('Does not contain numbers',   () => expect(password).not.toMatch(new RegExp(`[${CHARS.numbers}]+`)));
    it('Does not contain uppercase', () => expect(password).not.toMatch(new RegExp(`[${CHARS.uppercase}]+`)));
    it('Contains lowercase',         () => expect(password).toMatch(new RegExp(`[${CHARS.lowercase}]+`)));
    it('Does not contain symbols',   () => expect(password).not.toMatch(new RegExp(`[${CHARS.symbols}]+`)));
  });

  describe('Make password contains only symbols', () => {
    const password = passfather({ numbers: false, uppercase: false, lowercase: false });
    it('Default length',             () => expect(password.length).toBe(DEFAULT_OPTIONS.length));
    it('Does not contain numbers',   () => expect(password).not.toMatch(new RegExp(`[${CHARS.numbers}]+`)));
    it('Does not contain uppercase', () => expect(password).not.toMatch(new RegExp(`[${CHARS.uppercase}]+`)));
    it('Does not contain lowercase', () => expect(password).not.toMatch(new RegExp(`[${CHARS.lowercase}]+`)));
    it('Contains symbols',           () => expect(password).toMatch(new RegExp(`[${CHARS.symbols}]+`)));
  });

});

describe('Make short password with guaranteed chars set', () => {

  describe('Make short password with guaranteed all symbols', () => {
    const length = 4;
    const password = passfather({ length });
    it('Default length',     () => expect(password.length).toBe(length));
    it('Contains numbers',   () => expect(password).toMatch(new RegExp(`[${CHARS.numbers}]+`)));
    it('Contains uppercase', () => expect(password).toMatch(new RegExp(`[${CHARS.uppercase}]+`)));
    it('Contains lowercase', () => expect(password).toMatch(new RegExp(`[${CHARS.lowercase}]+`)));
    it('Contains symbols',   () => expect(password).toMatch(new RegExp(`[${CHARS.symbols}]+`)));
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

  test.each(args)(
    'Passing %p',
    (arg) => expect(() => passfather(arg)).toThrow(ERROR_MESSAGES[1]),
  );

  it('With unknown options property', () => {
    expect(() => passfather({ unknown: true })).toThrow(ERROR_MESSAGES[2])
  });

  test.each(args.slice(2))(
    'With %p "numbers" value',
    (arg) => expect(() => passfather({ numbers: arg })).toThrow(ERROR_MESSAGES[3]),
  );

  test.each(args.slice(2))(
    'With %p "uppercase" value',
    (arg) => expect(() => passfather({ uppercase: arg })).toThrow(ERROR_MESSAGES[4]),
  );

  test.each(args.slice(2))(
    'With %p "lowercase" value',
    (arg) => expect(() => passfather({ lowercase: arg })).toThrow(ERROR_MESSAGES[5]),
  );

  test.each(args.slice(2))(
    'With %p "symbols" value',
    (arg) => expect(() => passfather({ symbols: arg })).toThrow(ERROR_MESSAGES[6]),
  );

  test.each(without(args, [1]).concat([-1, 0.5, 1.5]))(
    'With %p "length" value',
    (arg) => expect(() => passfather({ length: arg })).toThrow(ERROR_MESSAGES[7]),
  );

  it('When all options are false', () => {
    const optinos = { numbers: false, uppercase: false, lowercase: false, symbols: false };
    expect(() => passfather(optinos)).toThrow(ERROR_MESSAGES[8])
  });

});