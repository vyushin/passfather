function initExternals() {
  const crypto = require('crypto');

  global.passfather = global.passfather || {};
  global.passfather.externals = { crypto };
}

module.exports = {
  initExternals,
};
