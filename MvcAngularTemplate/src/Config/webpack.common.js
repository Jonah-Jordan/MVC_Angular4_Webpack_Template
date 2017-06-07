var webpack = require('webpack');
var helpers = require('./helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('../../package.json')
const ENV = process.env.NODE_ENV || 'dev';

module.exports = {
    resolve: {
        modules: [helpers.root("../node_modules")],
    extensions: ['.ts', '.js']
    },
 
module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader',
          'angular-router-loader'
        ],
        exclude: [/\.(spec)\.ts$/]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },     
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'url-loader?name=assets/[name].[ext]&limit=5000'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?sourceMap'
      }
    ]
  },

  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('./app'), // location of your src
      {} // a map of your routes
    ),

    // inject process.env
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(ENV),
        VERSION: JSON.stringify(pkg.version),
      }
    }),

    //generate _layout.cshtml file
    new HtmlWebpackPlugin({
       inject: false,
       template: 'app/layoutTemplate.cshtml',
       filename: '../../Views/Shared/_layout.cshtml'

    }),

    // copy static assets
    //new CopyWebpackPlugin(
    //  [
    //    // file and folders to add
    //    { from: './img', to: 'assets/img' }
       
    //  ]
    //),

    // new webpack.NamedModulesPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
  ],

};

console.log('App Version: ', pkg.version)
console.log('Build Env:   ', ENV)