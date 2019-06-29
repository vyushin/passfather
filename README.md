# passmaker
[![version](https://img.shields.io/npm/v/passmaker.svg?style=flat-square)](https://www.npmjs.com/package/passmaker)
[![license](https://img.shields.io/github/license/vyushin/passmaker.svg?style=flat-square)](https://github.com/vyushin/passmaker/blob/master/LICENSE)

**passmaker** is very fast and powerful utility with zero dependencies to generate strong password.

## Installation

###### NPM
`npm install --save passmaker`

## Example

It's very easy! Just import passmaker and run it.

```javascript
import passmaker from 'passmaker';
const password = passmaker();
console.log(password); // That is output "hI_hVF=/.T5f"
```

By default **passgen** doesn't require any options. But it's possible to pass options object to
customize password.

```javascript
import passmaker from 'passmaker';
const password = passmaker({
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
// This options passmaker uses by default.

const DEFAULT_OPTIONS = {
  numbers: true,
  uppercase: true,
  lowercase: true,
  symbols: true,
  length: 12,
};
```

It is not necessary to pass full option object to passmaker...<br/>
By default all of options are enabled.<br/>
Just pass what you want to disable or custom length.

For example:

```javascript
import passmaker from 'passmaker';
const password = passmaker({
  symbols: false,
  length: 16,
});
console.log(password); // Output "r9GojHs0m3sh1lrMZMr5D9WNOTTDlF55"
```

## Contributing

See [contributing](https://www.npmjs.com/package/passmaker) guideline.

## License
[MIT LICENSE](https://github.com/vyushin/passmaker/blob/master/LICENSE)
