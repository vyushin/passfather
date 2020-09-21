/**
 * Some examples
 */

const passfather = require('../dist/passfather');

const passwordWithCustomChars = passfather({
  // number, uppercase, lowercase or symbols enabled by default so we just don't pass them.
  length: 16,
  ranges: [
    [[9800, 9807]], // Group of char range. Zodiac signs
    [[9818, 9823]], // Group of char range. Chess figures.
    [[9698, 9701], [9606, 9611]], // Group of char range. Geometric figures
  ],
  prng: 'Kybos'
});

console.log(passwordWithCustomChars);