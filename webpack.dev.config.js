/* eslint-env node */

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const profileConfig = require('./config');

const devPort = 3000;

module.exports = {

  devServer: {
    hot: true,
    port: devPort
  },

  devtool: 'eval',


  entry: [
    `webpack-dev-server/client?http://localhost:${devPort}`,
    'webpack/hot/only-dev-server',
    path.join(__dirname, 'assets/main.js')
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel?cacheDirectory'
    }, {
      test: /\.pug/,
      loader: 'pug'
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
    }, {
      test: /\.(jpe?g|png|gif|svg|ico)$/,
      loader: 'file',
      query: {
        name: 'images/[hash].[ext]'
      }
    }, {
      test: /\.woff$/,
      loader: 'url',
      query: {
        name: 'font/[hash].[ext]',
        limit: 5000,
        mimetype: 'application/font-woff'
      }
    },
      {
        test: /\.ttf$|\.eot$/,
        loader: 'file',
        query: {
          name: 'font/[hash].[ext]'
        }
      }]
  },

  postcss: () => [autoprefixer],

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin([ { from: 'assets/images/icons', to: 'images/icons' } ]),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new HtmlPlugin(Object.assign({
      title: 'HWdTech Card',
      filename: 'index.html',
      favicon: 'assets/images/favicon.ico',
      template: 'assets/templates/index.pug'
    }, profileConfig)),
    new ExtractTextPlugin('bundle.css')
  ]
};

