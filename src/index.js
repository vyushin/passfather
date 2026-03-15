const { initExternals } = require('./externals/index.js');
const { passfather } = require('./passfather');

initExternals();

module.exports = passfather;
