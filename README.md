# passfather
[![version](https://img.shields.io/npm/v/passfather.svg?style=flat-square)](https://www.npmjs.com/package/passfather)
[![license](https://img.shields.io/github/license/vyushin/passfather.svg?style=flat-square)](https://github.com/vyushin/passfather/blob/master/LICENSE)

**passfather** is very fast and powerful utility with zero dependencies to generate strong password.

## Installation

###### NPM
`npm install --save passfather`

## Example

It's very easy! Just import **passfather** and run it.

###### ES6

```javascript
import passfather from 'passfather';
const password = passfather();
console.log(password); // Output "hI_hVF=/.T5f"
```

###### CommonJS

```javascript
const passfather = require('passfather');
const password = passfather();
console.log(password); // Output "q*)ExGM`>hZo"
```
###### CDN
```HTML
<script src="https://unpkg.com/passfather/dist/passfather.min.js"></script>
<script>
    console.log( passfather() ); // Output "X7~m3}i7%<P)"
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
console.log(password); // Output "4R7wikmfKEr12Pk3"
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
console.log(password); // Output "r9GojHs0m3sh1lrMZMr5D9WNOTTDlF55"
```

## Contributing

See [contributing](https://github.com/vyushin/passfather/blob/master/CONTRIBUTING.md) guideline.

## License
[MIT LICENSE](https://github.com/vyushin/passfather/blob/master/LICENSE)
