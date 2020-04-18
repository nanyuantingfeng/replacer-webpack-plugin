/***************************************************
 * Created by nanyuantingfeng on 2020/4/18 11:57. *
 ***************************************************/
const { ConcatSource } = require('webpack-sources')
const PLUGIN_NAME = 'REPLACER_WEBPACK_PLUGIN'

function replaceOne(source, options) {
  const { replace, flags } = options
  let search
  if (options.search instanceof RegExp) {
    // if the `search` type is RegExp, we ignore `flags`
    search = options.search
  } else if (flags !== null) {
    search = new RegExp(options.search, flags)
  } else {
    search = options.search
  }

  if (typeof search === 'undefined' || search === null || typeof replace === 'undefined' || replace === null) {
    throw new Error('ReplacerWebpackPlugin `options.search` and `options.replace` are required')
  }

  return source.replace(search, replace)
}

function replace(source, options) {
  if (options.multiple) {
    return options.multiple.reduce(replaceOne, source)
  }
  return replaceOne(source, options)
}

function isMatch(name, regx) {
  return !!name && regx.some(reg => (typeof reg === 'string' ? reg === name : reg.test(name)))
}

module.exports = class ReplacerWebpackPlugin {
  constructor(options) {
    this.options = options

    if (!Array.isArray(options.includes)) {
      this.options.includes = [options.includes]
    }

    this.options.includes.forEach(s => {
      if (!(typeof s === 'string' || s instanceof RegExp)) {
        throw new Error('ReplacerWebpackPlugin options.includes must be Array<string | RegExp>')
      }
    })

    if (this.options.multiple && !Array.isArray(this.options.multiple)) {
      throw new Error('ReplacerWebpackPlugin options.multiple must be Array<{search,replace,flags?}>')
    }
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(PLUGIN_NAME, compilation => {
      compilation.hooks.optimizeChunkAssets.tapAsync(PLUGIN_NAME, (chunks, callback) => {
        chunks.forEach(chunk => {
          chunk.files.forEach(file => {
            if (isMatch(file, this.options.includes)) {
              compilation.updateAsset(file, old => new ConcatSource(replace(old.source(), this.options)))
            }
          })
        })
        callback()
      })
    })
  }
}
