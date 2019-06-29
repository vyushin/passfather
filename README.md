# passfather
[![version](https://img.shields.io/npm/v/passfather.svg?style=flat-square)](https://www.npmjs.com/package/passfather)
[![license](https://img.shields.io/github/license/vyushin/passfather.svg?style=flat-square)](https://github.com/vyushin/passfather/blob/master/LICENSE)

**passfather** is very fast and powerful utility with zero dependencies to generate strong password.

## Installation

###### NPM
`npm install --save passfather`

## Example

It's very easy! Just import passfather and run it.

```javascript
import passfather from 'passfather';
const password = passfather();
console.log(password); // That is output "hI_hVF=/.T5f"
```

By default **passgen** doesn't require any options. But it's possible to pass options object to
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

It is not necessary to pass full option object to passfather...<br/>
By default all of options are enabled.<br/>
Just pass what you want to disable or custom length.

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

See [contributing](https://www.npmjs.com/package/passfather) guideline.

## License
[MIT LICENSE](https://github.com/vyushin/passfather/blob/master/LICENSE)
