/* eslint-disable */
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    devtool: '#eval-source-map',
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ['css-loader'],
                        scss: [
                            {
                                loader: 'vue-style-loader'
                            },
                            {
                                loader: 'css-loader'
                            },
                            {
                                loader: 'sass-loader'
                            }
                        ],
                        sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.css$/,
                use: [
                        'vue-style-loader',
                        'css-loader'
                    ],
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                          sourceMap: true,
                          includePaths: [
                            path.resolve(__dirname, './src/styles')
                          ]
                        }
                    }
                ]
            },
            {
                test: /\.sass$/,
                use: [
                  'vue-style-loader',
                  'css-loader',
                  'resolve-url-loader',
                  'sass-loader?indentedSyntax'
                ],
            }
        ]
    }
})