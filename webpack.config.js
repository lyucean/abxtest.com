const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const webpack = require('webpack');
let fs = require('fs');

const base_template = path.join(__dirname, 'src', 'index.html'); // базовый шаблон

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src/js', 'index.js'),
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'dist'),
    filename: 'index.[contenthash:8].js',
    assetModuleFilename: 'src/assets/images/[name].[ext]'
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
      content: fs.readFileSync(path.join(__dirname, 'src/includes', 'home.html')),
    }),
    new HtmlWebpackPlugin({
      template: base_template,
      filename: 'choice.html',
      content: fs.readFileSync(path.join(__dirname, 'src/includes', 'choice.html')),
    }),
    new HtmlWebpackPlugin({
      template: base_template,
      filename: 'test.html',
      content: fs.readFileSync(path.join(__dirname, 'src/includes', 'test.html')),
    }),
    new HtmlWebpackPlugin({
      template: base_template,
      filename: 'faq.html',
      content: fs.readFileSync(path.join(__dirname, 'src/includes', 'faq.html')),
    }),
    new HtmlWebpackPlugin({
      template: base_template,
      filename: 'result.html',
      content: fs.readFileSync(path.join(__dirname, 'src/includes', 'result.html')),
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
    new FaviconsWebpackPlugin(path.join('src/assets/img', 'favicon.png')),
    // Подключение jQuery как глобальной переменной
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  devServer: {
    watchFiles: path.join(__dirname, 'src'),
    port: 9090,
  },
}