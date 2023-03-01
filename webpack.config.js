const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: path.join(__dirname, 'src/js', 'index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.[contenthash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'home.html'),
      filename: 'index.html',
    }),
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ['dist'],
        },
        onEnd: {
          copy: [
            {
              source: path.join('src', 'favicon.ico'),
              destination: 'dist/favicon.ico',
            },
            {
              source: path.join('src/img', '*'),
              destination: 'dist/img',
            },
          ],
        },
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  devServer: {
    watchFiles: path.join(__dirname, 'src'),
    port: 9090,
  },
}