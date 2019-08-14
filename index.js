const passfather = require('./src/index');
const password = passfather({
  length: 32,
});
console.log(password)