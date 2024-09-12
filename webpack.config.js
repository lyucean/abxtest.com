const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const base_template = path.join(__dirname, 'frontend', 'index.html'); // базовый шаблон

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        mode: 'development',
        entry: {
            main: {
                import: path.join(__dirname, 'frontend/js', 'index.js'),
                filename: '[contenthash].[name].js',
            },
            translations: {
                import: path.join(__dirname, 'frontend/js', 'translations.js'),
                filename: '[contenthash].[name].js',
            },
            jquery: {
                dependOn: 'translations',
                import: path.join(__dirname, 'frontend/js', 'jquery.js'),
                filename: '[contenthash].[name].js',
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
                filename: '[contenthash].[name].css',
            }),
            new FaviconsWebpackPlugin(path.join('frontend/assets/img', 'favicon.png')),
            // Подключение jQuery как глобальной переменной
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            }),
            new Dotenv({
                path: isProduction ? './.env' : './.env.default', // Путь к вашему .env файлу в зависимости от режима
            }),
        ],
        devServer: {
            watchFiles: path.join(__dirname, 'frontend'),
            port: 9090,
        },
    }
}