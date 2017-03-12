const path = require('path')
let config = {
  root: path.resolve(__dirname, '../'),
  assets: path.resolve(__dirname, '../assets'),
  assetsDirectory: 'assets',
  publicPath: '/',
  dist: path.resolve(__dirname, '../dist'),
  index: path.resolve(__dirname, '../dist/index.html')
}
module.exports = {
  dev: Object.assign({}, config, {
    port: 3333,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/img': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/offline.manifest': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
  }}),
  pro: Object.assign({}, config, {
  })
}
