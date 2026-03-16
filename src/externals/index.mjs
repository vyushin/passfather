function isBrowser() {
  return typeof window !== 'undefined' && typeof window.document !== 'undefined';
}

function initExternals() {
  const crypto = isBrowser() ? window.crypto : globalThis.crypto;

  globalThis.passfather = globalThis.passfather || {};
  globalThis.passfather.externals = { crypto };
}

export { initExternals };
