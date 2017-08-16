const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const antdTheme = require('./antd.theme')

const config = require('./config')

module.exports = function (env) {
    var isDevelopment = !(env && env.release)
    return {
        target: 'web',
        entry: {
            bundle: [
                ...(isDevelopment ? [
                'react-hot-loader/patch',
                'webpack-dev-server/client?http://' + config.host + ':' + config.port,
                'webpack/hot/only-dev-server'] : []),
                'babel-polyfill',
                './src/index.js'
            ]
        },
        output: {
            filename: isDevelopment ? '[name].js' : 'bundle/[name].[chunkhash:8].js',
            path: path.resolve(__dirname, 'build'),
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    include: [path.resolve(__dirname, 'src')],
                    loader: 'babel-loader',
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: "css-loader",
                        publicPath: '/static/'
                    })
                },
                {
                    test: /\.scss$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoader: 1
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => {
                                    autoprefixer({
                                        browsers: [
                                            '>1%',
                                            'last 4 version',
                                            'Firefox ESR',
                                            'not ie < 9'
                                        ]
                                    })
                                }
                            }
                        },
                        'sass-loader'
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'postcss-loader',
                        {
                            loader: 'less-loader',
                            options: {
                                modifyVars: antdTheme
                            }
                        }
                    ]
                },
                {
                    test: [/\.png$/, /\.jpe?g$/, /\.gif$/, /\.bmp$/],
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'media/[name].[hash:8].[ext]',
                        outputPath: 'static/',
                        publicPath: '/static/'
                    }
                },
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff',
                        name: '[name].[hash:8].[ext]',
                        outputPath: 'static/'
                    }
                },
                {
                    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash:8].[ext]',
                        outputPath: 'static/'
                    }
                },
                {
                    test: /zepto/,
                    use: [
                        {
                            loader: 'exports-loader',
                            options: 'window.Zepto'
                        },
                        'script-loader'
                    ]
                }
            ]
        },
        resolve: {
            modules: [
                'node_modules',
                path.resolve(__dirname, 'src')
            ],
            extensions: ['.js', '.jsx']
        },
        plugins: [
            new ExtractTextPlugin(isDevelopment ? 'bundle.css' : 'bundle/bundle.[chunkhash:8].css'),

            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(isDevelopment ? 'development' : 'production')
                }
            }),

            new HtmlWebpackPlugin({
                template: 'index.html',
                outputPath: '/'
            }),
            
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: module => /node_modules/.test(module.resource)
            }),

            ...isDevelopment ? [
                new webpack.HotModuleReplacementPlugin(),
                new webpack.NamedModulesPlugin(),
            ] : [
                new webpack.optimize.UglifyJsPlugin({
                    text: /\.jsx?$/,
                    sourceMap: true,
                    compress: {
                        warnings: false
                    }
                })
            ]
        ],

        node: {
            console: false,
            // global: false,
            __dirname: false
        },

        devtool: isDevelopment ? 'inline-source-map' : 'source-map',

        devServer: {
            hot: true,
            contentBase: path.resolve(__dirname, 'build'),
            compress: true,
            port: config.port,
            historyApiFallback: true,
            proxy: config.proxy
        }
    }
}