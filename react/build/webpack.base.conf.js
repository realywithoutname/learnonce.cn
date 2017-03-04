const path = require('path')
const config = require('./config')
const projectRoot = path.resolve(__dirname, '../')
const assetsPath = (_path) => {
  var assetsDirectory = process.env.NODE_ENV === 'production'
  ? config.pro.assets
  : config.dev.assets
  return path.posix.join(assetsDirectory, _path)
}
module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.pro.root,
    publicPath: process.env.NODE_ENV === 'production' ? config.pro.publicPath : config.dev.publicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['json', 'jsx', '.js'],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../assets'),
      'pages': path.resolve(__dirname, '../src/pages'),
      'styles': path.resolve(__dirname, '../src/styles'),
      'components': path.resolve(__dirname, '../src/components')
    },
    modules: [
      path.resolve(__dirname, '../node_modules')
    ]
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [
        'babel-loader',
        {
          loader: 'eslint-loader',
          options: require(path.resolve(__dirname, '../.eslintrc'))
        }
      ],
      include: [
        projectRoot
      ],
      exclude: [
        /node_modules/
      ]
    },
    {
      test: /\.css$/,
      use: [
         'style-loader',
         'css-loader?importLoaders=1&modules&localIdentName=[name]-[local]',
         {
           loader: 'postcss-loader',
           options: {
             plugins () {
               return [
                 require('postcss-modules-values')
               ]
             }
           }
         }
       ]
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: assetsPath('img/[name].[hash:7].[ext]')
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: assetsPath('fonts/[name].[hash:7].[ext]')
      }
    }]
  }
}
