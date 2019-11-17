# passfather
[![version](https://img.shields.io/npm/v/passfather.svg?style=flat-square)](https://www.npmjs.com/package/passfather)
[![license](https://img.shields.io/github/license/vyushin/passfather.svg?style=flat-square)](https://github.com/vyushin/passfather/blob/master/LICENSE)

**passfather** is very fast and powerful utility with zero dependencies to generate strong password or random string.

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

###### TypeScript

```typescript
import passfather from 'passfather';
const password: string = passfather();
console.log(password); // Output "3zj}E0uuW6}V"
```

###### CDN

```html
<script src="https://unpkg.com/passfather/dist/passfather.min.js"></script>
<script>
    console.log( passfather() ); // Output "r_@1hDvFRMhA"
</script>
```

By default passfather doesn't require any options. But it's possible to pass options object to
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
  ranges: null,
};
```
By default all of options are enabled and ranges is empty.<br/>
It is not necessary to pass full option object to passfather...<br/>
Just pass what you want to disable, ranges, or length.

For example:

```javascript
import passfather from 'passfather';
const password = passfather({
  symbols: false,
  length: 16,
});
console.log(password); // Output "e0CgZti4awyJgC57"
```

## Ranges (custom chars)

Passfather can make password containing custom chars.<br/>
It's possible via ranges option.

For example:

```javascript
import passfather from 'passfather';
const password = passfather({
  numbers: false,
  uppercase: false,
  lowercase: false,
  symbols: false,
  length: 16,
  ranges: [ 
    [[9800, 9807], [9818, 9823]], // Group of char range. Zodiac signs, chess figures.
    [[9698, 9701], [9606, 9611]], // Group of char range. Geometric figures
  ],
});
console.log(password); // Output "▋▆♟◥◢♎◥♚♞♚▆♚◥▆▉♝"
```

The ranges option is array of UTF-8 char ranges.<br/>
You can find all of them on [unicode table](https://unicode-table.com/ru/#box-drawing)

Example above contains UTF-8 chars with codes from 9800 to 9807 and from 9818 to 9823 (zodiac signs and chess figures).<br/>
The example also contains UTF-8 chars with codes from 9698 to 9701 and from 9606 to 9611 (geometric figures).

This means that password will **necessarily** contain **one or more** chess figures **or** zodiac signs **and** one or more geometric figures.<br/>
But it doesn't mean that password will contain zodiac signs **and** chess figures because they are part of one range.<br/>
If you want make password with zodiac signs **and** chess figures you should move chess figures to new range.

For example:

```javascript
import passfather from 'passfather';
const password = passfather({
  numbers: false,
  uppercase: false,
  lowercase: false,
  symbols: false,
  length: 16,
  ranges: [ 
    [[9800, 9807]], // Group of char range. Zodiac signs
    [[9818, 9823]], // Group of char range. Chess figures.
    [[9698, 9701], [9606, 9611]], // Group of char range. Geometric figures
  ],
});
console.log(password); // Output "♏◣♛◥♚♟♚♝♌▆♌♚♞▉♞♞"
```

Making new range you get guarantee that one of char from range will be part of password.

Ranges may using together with number, uppercase, lowercase or symbols option.

For example:

```javascript
import passfather from 'passfather';
const password = passfather({
  // number, uppercase, lowercase or symbols enabled by default 
  // so we just don't pass them.
  length: 16,
  ranges: [ 
    [[9800, 9807]],
    [[9818, 9823]],
    [[9698, 9701], [9606, 9611]],
  ],
});
console.log(password); // Output "♚!N◢♊q6DO1,3▉♌k5♞"
```

## Contributing

See [contributing](https://github.com/vyushin/passfather/blob/master/CONTRIBUTING.md) guideline.

## License
[MIT LICENSE](https://github.com/vyushin/passfather/blob/master/LICENSE)
