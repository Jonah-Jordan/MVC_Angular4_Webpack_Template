var webpackMerge = require('webpack-merge');
var webpack = require('webpack');
var helpers = require('./helpers');
var path = require('path');
var commonConfig = require('./webpack.common.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENV = process.env.NODE_ENV || 'dev';

module.exports = webpackMerge(commonConfig, {
  devtool: 'eval-source-map',

  entry: ['./polyfills.ts', './vendor.ts', './main.ts' ],
  context: helpers.root(''),
  output: {
    path: helpers.root('dist'),
    publicPath: '../static/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },


  plugins: [
    new webpack.NamedModulesPlugin(),
  ],

});