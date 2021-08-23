/**
 * Some examples
 */

const passfather = require('../src');
const utils = require('../src/utils');
console.time('Timer');
let result = '';
for (let i = 0; i < 0; i++) {
  const passwordWithCustomChars = passfather({
    prng: 'Alea',
  });

  const n = utils.getRandomUint32('Alea') + ' ' + utils.getRandomUint32('Alea');
  result += n + '\n';
  // result += passwordWithCustomChars + '\n';
}

console.log(result);
console.timeEnd('Timer');