const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

//TODO временно для вёрстки
let fs = require('fs');
const header = fs.readFileSync(path.join(__dirname, 'src', 'header.html'));
const footer = fs.readFileSync(path.join(__dirname, 'src', 'footer.html'));

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
      template: path.join(__dirname, 'src', 'home.html'),
      filename: 'index.html',
      header: header,
      footer: footer
    }),
    new HtmlWebpackPlugin({
      title: 'Test',
      template: path.join(__dirname, 'src', 'test.html'),
      filename: 'test.html',
      header: header,
      footer: footer
    }),
    new HtmlWebpackPlugin({
      title: 'FAQ',
      template: path.join(__dirname, 'src', 'faq.html'),
      filename: 'faq.html',
      header: header,
      footer: footer
    }),
    new HtmlWebpackPlugin({
      title: 'Result',
      template: path.join(__dirname, 'src', 'result.html'),
      filename: 'result.html',
      header: header,
      footer: footer
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