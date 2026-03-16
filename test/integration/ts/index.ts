import passfather from 'passfather';

const password: string = passfather({ length: 32 })
console.log('[ts]', password);
