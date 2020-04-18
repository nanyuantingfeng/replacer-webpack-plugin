/***************************************************
 * Created by nanyuantingfeng on 2020/4/18 12:17. *
 ***************************************************/
import { Plugin } from 'webpack'

interface BasicReplacerOptions {
  includes: Array<string | RegExp> | string | RegExp
}

interface ReplacerSingle extends BasicReplacerOptions {
  search: string | RegExp
  replace: string | ((substring: string, ...args: any[]) => string)
  flags?: string
}

interface ReplacerMultiple extends BasicReplacerOptions {
  multiple: Array<Omit<ReplacerSingle, 'includes'>>
}

interface ReplacerWebpackPlugin extends Plugin {
  constructor(options: ReplacerSingle | ReplacerMultiple)
}

export = ReplacerWebpackPlugin
