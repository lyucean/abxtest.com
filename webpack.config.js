const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
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
      template: path.join(__dirname, 'src', 'home.html'),
      filename: 'index.html',
    }),
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ['dist'],
        },
        // onEnd: {
        //   copy: [
        //     {
        //       source: path.join('src', 'favicon.ico'),
        //       destination: 'dist/favicon.ico',
        //     },
        //     {
        //       source: path.join('src/img', '*'),
        //       destination: 'dist/asset/img',
        //     },
        //   ],
        // },
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new FaviconsWebpackPlugin(path.join('src/assets/img', 'favicon.png'))
  ],
  devServer: {
    watchFiles: path.join(__dirname, 'src'),
    port: 9090,
  },
}