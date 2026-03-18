// Jest setup: ensure globalThis.crypto is available in the Node/Jest environment.

if (typeof globalThis.crypto === 'undefined') {
  // Use Node's built-in webcrypto implementation when available.
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { webcrypto } = require('crypto');

    if (!webcrypto) {
      throw new Error('Node crypto.webcrypto is not available');
    }

    // Attach webcrypto to globalThis to match browser-like environments.
    globalThis.crypto = webcrypto;
  } catch (error) {
    // If we cannot provide a crypto implementation, fail fast with a clear message.
    throw new Error(
      'globalThis.crypto is required for tests but could not be provisioned from Node "crypto".\n' +
      `Original error: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
