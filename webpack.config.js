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
            new FileManagerPlugin({
                events: {
                    onStart: {
                        delete: ['dist'],
                    },
                    onEnd: {
                        copy: [
                            { source: path.join(__dirname, 'frontend/assets/img', 'og_image.jpg')
                                , destination: path.join(__dirname, 'dist/assets', 'og_image.jpg') },
                        ],
                    },
                },
            }),
            new HtmlWebpackPlugin({
                template: base_template,
                filename: 'index.html',
                meta: {
                    title: 'Welcome to the Audio Quality Test',
                    description: 'Check the audio quality with our test!',
                    'og:title': {
                        property: 'og:title',
                        content: 'Welcome to the Audio Quality Test'
                    },
                    'og:description': {
                        property: 'og:description',
                        content: 'Check the audio quality with our test!'
                    },
                    'og:image': {
                        property: 'og:image',
                        content: 'https://abxtest.com/frontend/assets/og_image.jpg'
                    },
                    'og:url': {
                        property: 'og:url',
                        content: 'https://abxtest.com'
                    },
                    'og:type': {
                        property: 'og:type',
                        content: 'website'
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