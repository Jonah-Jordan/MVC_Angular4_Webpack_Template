var webpackMerge = require('webpack-merge');
var webpack = require('webpack');
var helpers = require('./helpers');
var commonConfig = require('./webpack.common.js');

const ENV = process.env.NODE_ENV || 'devserver';

module.exports = webpackMerge(commonConfig, {
  devtool: 'eval-source-map',

  entry: ['./polyfills.ts', './vendor.ts', './main.ts' ],

  output: {
      path: helpers.root('dist'),
      context: helpers.root(''),
    publicPath: 'https://localhost:8081/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    proxy: {
       "/api": {
          target: 'https://conditiemeting-local.vmsw.be:44301',
       },
       "/": {
          target: 'https://conditiemeting-local.vmsw.be:44301/',
          secure: false,
          changeOrigin: true
       }
    }
  }
});