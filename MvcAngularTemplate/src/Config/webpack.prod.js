var webpack = require('webpack');
var helpers = require('./helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('../../package.json')
var webpackMerge = require('webpack-merge');


module.exports = webpackMerge.smart(commonConfig,{
  devtool: 'cheap-source-map', 
  context: helpers.root(''),
  entry: {
    vendor: ["./polyfills.ts",'./vendor.ts'],
    app: './main.ts',
   
  },

  output: {
    path: helpers.root('dist'),
    publicPath: './static/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].js'
  },
 
  module: {
    rules: [
       {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),

  // split bundles
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor']
    }),
    new webpack.NamedModulesPlugin(),
    
    new ExtractTextPlugin('[name].[chunkhash].css'),

    new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      mangle: {
        keep_fnames: true
      },
      sourceMap: true,
    }),

    new webpack.LoaderOptionsPlugin({
          htmlLoader: {
            minimize: false // workaround for ng2
          }})
  ],
});

// console.log('App Version: ', pkg.version)
// console.log('Build Env:   ', ENV)