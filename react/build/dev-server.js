const express = require('express')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require("webpack-hot-middleware")
const history = require('connect-history-api-fallback')

const webpackConfig = require('./webpack.dev.conf')
const config = require('./config')

const port = process.env.PORT || config.dev.port
const proxyMap = config.dev.proxy

const app = express()
const compiler = webpack(webpackConfig)

let devOpts = {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true
  }
}
Object.keys(proxyMap).forEach((key) => app.use(proxyMiddleware(key, proxyMap[key])))
let hotServer = hotMiddleware(compiler)
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotServer.publish({ action: 'reload' })
    cb()
  })
})
app.use(history())
app.use(devMiddleware(compiler, devOpts))
app.use(hotServer)
app.use('/assets', express.static(config.dev.assets))
app.listen(port, (err) => {
  console.log(err ? err : 'Listening at http://localhost:' + port + '\n')
})
