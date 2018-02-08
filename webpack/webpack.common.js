/* eslint-disable */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// function resolve (dir) {
//     return path.join(__dirname, '..', dir)
// }
module.exports = {
    entry: { 
        main: path.resolve(__dirname, '../src/main.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: '[name].[hash].js'
    },
    resolve: {
        extensions: ['*', '.js', '.vue', '.json'],
        modules: [
            path.resolve(__dirname, '../src'), // use src as a url base
            'node_modules'
        ],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'assets': path.resolve(__dirname, '../src/assets'), // assets/* as image base
        }
    },
    module: {
        rules:
        [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'Vue-Quick-Lab',
            template: path.resolve(__dirname, '../index.html'),
            filename: path.resolve(__dirname, '../dist/index.html')
        })
    ],
    performance: {
        hints: false
    }
}