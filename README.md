# Replace Plugin for [Webpack](http://webpack.github.io/)

> Perform replacements (plain and regular expression) in the assets emitted. 

[![Build Status](https://travis-ci.org/nanyuantingfeng/replacer-webpack-plugin.svg?branch=master)](https://travis-ci.org/nanyuantingfeng/replacer-webpack-plugin)
[![GitHub repo size](https://img.shields.io/github/repo-size/nanyuantingfeng/replacer-webpack-plugin)](https://img.shields.io/github/repo-size/nanyuantingfeng/replacer-webpack-plugin)


## Install:

```bash
$ npm install --save-dev replacer-webpack-plugin
```

## Usage:

Plugin allows to perform replacements in a way [String.prototype.replace()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) does.
It means that if you want to replace all occurrences, you should use RegExp-like string in `options.search` with `g` flag in `options.flags`, etc.

### Plain replacement:

Plain string replacement, no need to escape RegExp special characters.

In your `webpack.config.js`:

```javascript
var ReplacerWebpackPlugin = require('replacer-webpack-plugin')
```

```javascript
module.exports = {
  // ...

  plugins: [
    new ReplacerWebpackPlugin({
      includes: /.+\.js/,
      search: '$',
      replace: 'jQuery'
    })
  ]
}
```

### RegExp replacement:

To achieve regular expression replacement you should either specify the `search` option as
[RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) instance,
either specify it as string and add the `flags` option (as an empty string if you do not want any flags).
In the latter case, `search` and `flags` are being passed to the
[RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) constructor
and this means that you should escape RegExp special characters in `search` if you want it to be replaced as a string.

In your `webpack.config.js`:

```javascript
module.exports = {
  // ...
  plugins: [
    new ReplacerWebpackPlugin({
      includes: /.+\.js/,
      search: /\$/i,
      replace: 'window.jQuery'
    })
  ]
}
```

or

```javascript
module.exports = {
  // ...
  plugins: [
    new ReplacerWebpackPlugin({
      includes: /.+\.js/,
      search: '$',
      replace: 'window.jQuery',
      flags: 'i'
    })
  ]
}
```

### Multiple replacement:

Also, you can pass an array of search-replace pairs this way:

In your `webpack.config.js`:

```javascript
module.exports = {
  // ...
  plugins: [
    new ReplacerWebpackPlugin({
      includes: /.+\.js/,
      multiple: [
        { search: 'jQuery', replace: 'window.$' },
        { search: '_', replace: 'window.lodash' }
      ]
    })
  ]
}
```

### Callback replacement

You can specify a callback function to have dynamic replacement values.

In your `webpack.config.js`:

```javascript
module.exports = {
  // ...
  plugins: [
    new ReplacerWebpackPlugin({
      includes: /.+\.js/,
      search: '^Hello, (.*)!$',
      replace: (match, p1) => `Bonjour, ${p1.toUpperCase()}!`,
      flags: 'g'
    })
  ]
}
```
