const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const rpSkinLoader = require('./rpSkin-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production'

const config = {
    mode: isProduction ? 'production' : 'development',
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.runtime.min.js',
            '@': path.join(__dirname, 'src')
        },
        extensions: ['.js', '.vue']
    },
    devServer: {
        contentBase: './dist',
        hot: true,
        inline: true,
        watchContentBase: true,
    },
    module: {
        noParse: /^(vue|vue-router)$/,
        rules: [{
            test: /\.vue$/,
            use: [{
                loader: "vue-loader",
                options: {
                    compiler: rpSkinLoader,
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            }]
        }, {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader'
            }
        }]
    },
    plugins: []
};

if (isProduction) {
    config.module.rules.push({
        test: /\.scss$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              // publicPath: '/css',
              hmr: process.env.NODE_ENV === 'development',
            }
        }, 'css-loader', 'postcss-loader', 'sass-loader']
    })

    config.plugins = [
        new webpack.DefinePlugin(
            {
              'process.env': {
                NODE_ENV: '"production"',
                BASE_URL: '"/"'
              }
            }
        ),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new HtmlWebpackPlugin({
            title: 'extract',
            template: `${__dirname}/public/index.html`,
            filename: `${__dirname}/dist/index.html`
        }),
    ]
} else {
    config.module.rules.push({
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
    })

    config.plugins = [
        new webpack.DefinePlugin(
            {
              'process.env': {
                NODE_ENV: '"development"',
                BASE_URL: '"/"'
              }
            }
        ),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'extract',
            template: `${__dirname}/public/index.html`,
            filename: `${__dirname}/dist/index.html`
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}


module.exports = config;