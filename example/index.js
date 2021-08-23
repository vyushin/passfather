/**
 * Some examples
 */
const example = () => {
  const passfather = require('../src');
  console.time('Timer');
  let result = '';
  for (let i = 0; i < 1; i++) {
    const passwordWithCustomChars = passfather({
      prng: 'Alea',
    });

    result += passwordWithCustomChars + '\n';
  }

  console.log(result);
  console.timeEnd('Timer');
};;

// example();