const path = require('path')
let config = {
  root: path.join(__dirname, '../'),
  assets: path.join(__dirname, '../assets'),
  assetsDirectory: 'assets',
  publicPath: '/',
  dist: path.join(__dirname, '../dist'),
  index: path.join(__dirname, '../dist/index.html')
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
