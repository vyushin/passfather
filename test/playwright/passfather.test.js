const { test, expect } = require('@playwright/test')

test('Passfather ESM browser test', async ({ page }) => {
  const fileUrl = 'http://localhost:3002/test/playwright/html/passfather.esm.html';

  page.on('console', msg => console.log('[browser]', msg.text()));

  await page.goto(fileUrl);
  await page.waitForFunction(() => window.generatedPassword !== undefined);

  const password = await page.evaluate(() => window.generatedPassword);
  console.log('Generated password:', password);

  expect(typeof password).toBe('string');
  expect(password.length).toBe(64);
});

test('Passfather UMD browser test', async ({ page }) => {
  const fileUrl = 'http://localhost:3002/test/playwright/html/passfather.umd.html';

  page.on('console', msg => console.log('[browser]', msg.text()));

  await page.goto(fileUrl);
  await page.waitForFunction(() => window.generatedPassword !== undefined);

  const password = await page.evaluate(() => window.generatedPassword);
  console.log('Generated password:', password);

  expect(typeof password).toBe('string');
  expect(password.length).toBe(32);
});

test('Passfather React browser test', async ({ page }) => {
  const fileUrl = 'http://localhost:3002/test/playwright/html/passfather.react.html';

  page.on('console', msg => console.log('[browser]', msg.text()));

  await page.goto(fileUrl);
  await page.waitForFunction(() => window.generatedPassword !== undefined);

  const password = await page.evaluate(() => window.generatedPassword);
  console.log('Generated password:', password);

  expect(typeof password).toBe('string');
  expect(password.length).toBe(32);

  const domText = await page.locator('[data-testid="password"]').textContent();
  expect(domText.length).toBeGreaterThan(0);
});
