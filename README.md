# passfather
[![version](https://img.shields.io/npm/v/passfather.svg?style=flat-square)](https://www.npmjs.com/package/passfather)
[![license](https://img.shields.io/github/license/vyushin/passfather.svg?style=flat-square)](https://github.com/vyushin/passfather/blob/master/LICENSE)

**passfather** is very fast and powerful utility with zero dependencies to generate strong password.

## Installation

###### NPM
`npm install --save passfather`

###### Yarn
`yarn add passfather`

## Example

It's very easy! Just import **passfather** and run it.

###### ES6

```javascript
import passfather from 'passfather';
const password = passfather();
console.log(password); // Output "9g'Jta75Gl3w"
```

###### CommonJS

```javascript
const passfather = require('passfather');
const password = passfather();
console.log(password); // Output "4$Pi3V^F3v(F"
```
###### CDN
```html
<script src="https://unpkg.com/passfather/dist/passfather.min.js"></script>
<script>
    console.log( passfather() ); // Output "r_@1hDvFRMhA"
</script>
```

By default **passfather** doesn't require any options. But it's possible to pass options object to
customize password.

```javascript
import passfather from 'passfather';
const password = passfather({
  numbers: true,
  uppercase: true,
  lowercase: true,
  symbols: false, // Disable symbols
  length: 16,
});
console.log(password); // Output "40rAe2hqiM0UzTmN"
```

**NOTE:** if option object is passed then it merges with default options object.

## Options

```javascript
// Default options.
// This options passfather uses by default.

const DEFAULT_OPTIONS = {
  numbers: true,
  uppercase: true,
  lowercase: true,
  symbols: true,
  length: 12,
};
```
By default all of options are enabled.<br/>
It is not necessary to pass full option object to **passfather**...<br/>
Just pass what you want to disable or length.

For example:

```javascript
import passfather from 'passfather';
const password = passfather({
  symbols: false,
  length: 16,
});
console.log(password); // Output "e0CgZti4awyJgC57"
```

## Contributing

See [contributing](https://github.com/vyushin/passfather/blob/master/CONTRIBUTING.md) guideline.

## License
[MIT LICENSE](https://github.com/vyushin/passfather/blob/master/LICENSE)
