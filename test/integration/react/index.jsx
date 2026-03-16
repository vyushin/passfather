const React = require('react');
const { renderToString } = require('react-dom/server');
const passfather = require('passfather');

function PasswordGenerator() {
  const password = passfather({ length: 32 });
  return React.createElement('div', { 'data-testid': 'password' }, password);
}

const html = renderToString(React.createElement(PasswordGenerator));
function decodeHTMLEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'");
}

const match = html.match(/>([^<]+)</);

if (!match || !match[1]) {
  console.error('[react] ❌ Password not found in rendered HTML');
  console.error('[react] HTML:', html);
  process.exit(1);
}

const password = decodeHTMLEntities(match[1]);

if (typeof password !== 'string' || password.length !== 32) {
  console.error('[react] ❌ Invalid password:', password);
  process.exit(1);
}

console.log('[react]', password);

