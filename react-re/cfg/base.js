'use strict';
let path = require('path');
let defaultSettings = require('./defaults');

// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
// let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
let additionalPaths = [];

module.exports = {
  additionalPaths: additionalPaths,
  port: defaultSettings.port,
  debug: true,
  devtool: 'eval',
  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: 'app.js',
    publicPath: defaultSettings.publicPath
  },
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    port: defaultSettings.port,
    publicPath: defaultSettings.publicPath,
    proxy: {
      '/api': 'http://localhost:3000',
      '/static': 'http://localhost:3000',
      '/img': 'http://localhost:3000',
      '/offline.manifest': 'http://localhost:3000'
    },
    noInfo: false
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../assets'),
      'pages': path.resolve(__dirname, '../src/pages'),
      'styles': path.resolve(__dirname, '../src/styles'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  postcss: function () {
    return [
      require('postcss-modules-values'),
      require('autoprefixer')({
        browsers: ['last 2 versions', 'ie >= 8']
      })
    ]
  },
  module: {}
};
