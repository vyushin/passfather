const passfather = require('./src/index');
const password = passfather({
  symbols: false,
  length: 16,
});
console.log(password)