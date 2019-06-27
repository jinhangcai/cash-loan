const fs = require('fs')
const path = require('path')
const year = new Date().getFullYear()
const enableEslint = require('./enable-eslint')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('../config')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

exec()
async function exec() {

  let TARGET = path.resolve(__dirname, '../src')
  dev(TARGET, config.dev.port)

}


function hasFile(path, callback) {
  // exists同步版
  try {
    let isExists = fs.existsSync(path, callback);
    return isExists;
  } catch (e) {
    console.log('error' + e.message);
  }
}

function dev(project_dir, port) {
  const server = require('./dev-server.js')
  server(config => {
    const MAINJSURL = path.resolve(project_dir, './main.js')
    let isExists = hasFile(MAINJSURL)
    if (isExists) {
      config.entry.app = MAINJSURL
    } else {
      config.entry.app = path.resolve(project_dir, './main.ts')
    }

    Object.keys(config.entry).forEach(function (name) {
      config.entry[name] = ['./build/dev-client'].concat(config.entry[name])
    })

    config.module.rules.push({
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: resolve('../src'),
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    })

    config.plugins.push(new HtmlWebpackPlugin({
      filename: './index.html',
      template: path.resolve(project_dir, './index.html'),
      inject: true,
      favicon: 'favicon.ico'
    }))
  }, port)
}
