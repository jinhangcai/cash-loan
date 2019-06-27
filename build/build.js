const execa = require('execa');


process.env.NODE_ENV = 'production'

let ora = require('ora')
// let rm = require('rimraf')
let path = require('path')
// let chalk = require('chalk')
let webpack = require('webpack')
const fs = require('fs')
const fse = require('fs-extra')
const year = new Date().getFullYear()
const HtmlWebpackPlugin = require('html-webpack-plugin')


function hasFile(path, callback) {
  try {
    let isExists = fs.existsSync(path, callback);
    return isExists;
  } catch (e) {
    console.log('error' + e.message);
  }
}

async function build(TARGET_STR, TARGET, ENV) {
  // const isOnline = ENV === 'online'
  TARGET = './src'
  let webpackConfig = require('./webpack.prod.conf')
  const MAINBUILDENTRY = path.resolve(TARGET, './main.js')
  console.log('MAINBUILDENTRY', MAINBUILDENTRY)
  webpackConfig.entry.app = ['babel-polyfill', MAINBUILDENTRY];

  // TARGET_STR = TARGET_STR.replace(/activity_/g, '')

  webpackConfig.output.path = path.resolve(
    __dirname,
    '../dist'
   //
  )

//

  webpackConfig.output.publicPath = webpackConfig.output.publicPath;
//
  let minify = {
    removeComments: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true
  }
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      filename: path.resolve(webpackConfig.output.path, './m.html'),
      template: path.resolve(TARGET, './index.html'),
      inject: true,
      favicon: 'favicon.ico',
      minify,
      chunksSortMode: 'dependency'
    })
  )

  webpack(webpackConfig, async function(err, stats) {
    // spinner.stop()
    if (err) throw err
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n'
    )


    process.exit(0)
  })
}

async function exec() {

  build('../src')

}
exec()
