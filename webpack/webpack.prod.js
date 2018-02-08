/* eslint-disable */
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = merge(common, {
    devtool: '#source-map',
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader',
                        }),
                        scss: ExtractTextPlugin.extract({
                            use: [
                                {
                                    loader: 'css-loader'
                                },
                                {
                                    loader: 'sass-loader'
                                }
                            ],
                            fallback: 'vue-style-loader'
                        }),
                        // scss: [
                        //     {
                        //         loader: 'vue-style-loader'
                        //     },
                        //     {
                        //         loader: 'css-loader'
                        //     },
                        //     {
                        //         loader: 'sass-loader'
                        //     }
                        // ],
                        sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'vue-style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'vue-style-loader',
                  use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'url-loader'
                        }, 
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '..')
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new ExtractTextPlugin({
            filename: 'styles.css',
            allChunks: true
        })
    ]
})