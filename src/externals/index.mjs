function isBrowser() {
  return typeof window !== 'undefined' && typeof window.document !== 'undefined';
}

async function initExternals() {
  let os;
  let crypto;

  if (isBrowser()) {
    crypto = window.crypto;
  } else {
    crypto = await import('crypto').then(mod => mod.default || mod);
  }

  globalThis.passfather = globalThis.passfather || {};
  globalThis.passfather.externals = { crypto };
}

export { initExternals };
