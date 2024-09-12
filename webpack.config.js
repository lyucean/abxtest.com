const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const webpack = require('webpack');
let fs = require('fs');

const base_template = path.join(__dirname, 'frontend', 'index.html'); // базовый шаблон

module.exports = {
  mode: 'development',
  entry: {
    main: {
      import: path.join(__dirname, 'frontend/js', 'index.js'),
      filename: '[name].[contenthash].index.js',
    },
    jquery: {
      dependOn: 'jquery_helper',
      import: path.join(__dirname, 'frontend/js', 'jquery.js'),
      filename: '[name].[contenthash].jquery.js',
    },
    jquery_helper: {
      dependOn: 'main',
      import: path.join(__dirname, 'frontend/js', 'jquery_helper.js'),
      filename: '[name].[contenthash].jquery_helper.js',
    },
  },
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'dist'),
    filename: 'index.[contenthash:5].js',
    assetModuleFilename: 'frontend/assets/images/[name].[ext]'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: base_template,
      filename: 'index.html',
    }),
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ['dist'],
        },
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new FaviconsWebpackPlugin(path.join('frontend/assets/img', 'favicon.png')),
    // Подключение jQuery как глобальной переменной
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  devServer: {
    watchFiles: path.join(__dirname, 'frontend'),
    port: 9090,
  },
}