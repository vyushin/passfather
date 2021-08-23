const { getRandomUint32, ...utils } = require('../src/utils');
const PRNGs = require('../src/PRNGs');

const getNodeSeed = () => {
  return [Date.now(), process.memoryUsage().heapTotal, process.memoryUsage().heapUsed];
};

const wait = async (ms) => await new Promise(res => setTimeout(res, ms));

describe('Test utils.js', () => {

  describe('Testing getRandomUint32() function', () => {
    const PRNGsKeysWithoutDefault = Object.keys(PRNGs);
    const PRNGsKeysWithDefault = [undefined, 'default', ...PRNGsKeysWithoutDefault];

    describe.each(PRNGsKeysWithDefault)('Must have unique value without seed', (prng) => {
      test(`With PRNG ${prng}`, () => {
        const v1 = getRandomUint32(prng);
        wait(1).then(() => { // Waiting because non default prng uses "new Date()" seed
          const v2 = getRandomUint32(prng);
          expect(v1).not.toBe(v2);
        });
      });
    });

    describe.each(PRNGsKeysWithDefault)('Must have unique value with different seed', (prng) => {
      test(`With PRNG ${prng}`, () => {
        const v1 = getRandomUint32(prng, getNodeSeed());
        const v2 = getRandomUint32(prng, getNodeSeed());
        expect(v1).not.toBe(v2);
      });
    });

    describe.each(PRNGsKeysWithoutDefault)('Must have the same value with the same seed', (prng) => {
      const staticSeed = getNodeSeed();
      test(`With PRNG ${prng}`, () => {
        const v1 = getRandomUint32(prng, staticSeed);
        const v2 = getRandomUint32(prng, staticSeed);
        expect(v1).toBe(v2);
      });
    });

    describe.each(PRNGsKeysWithoutDefault)('Must have the same value with weak seed', (prng) => {
      test(`With PRNG ${prng}`, () => {
        const v1 = getRandomUint32(prng, ['seed']);
        const v2 = getRandomUint32(prng, ['seed']);
        expect(v1).toBe(v2);
      });
    });
  });
});