const path = require('path')
const webpack = require('webpack');
const debuggable = process.env.BUILD_TYPE !== 'release'
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MinaWebpackPlugin = require('./plugin/MinaWebpackPlugin');
const MinaRuntimePlugin = require('./plugin/MinaRuntimePlugin');

module.exports = {
    context: path.resolve('src'),
    entry: path.join(__dirname, 'src/app.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        globalObject: 'wx'               //把全局对象配置为 wx
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: '**/*',
                    to: './',
                    filter: resourcePath => !['.ts', '.js', '.scss'].some(item => resourcePath.endsWith(item)),
                },
            ],
        }),
        new MinaWebpackPlugin({
            scriptExtensions: ['.ts', '.js'],
            assetExtensions: ['.scss'],
        }),
        new MinaRuntimePlugin(),
        new webpack.EnvironmentPlugin({
            NODE_ENV: JSON.stringify(process.env.NODE_ENV) || 'development',
            BUILD_TYPE: JSON.stringify(process.env.BUILD_TYPE) || 'debug',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(scss)$/,
                include: /src/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            useRelativePath: true,
                            name: '[path][name].wxss',
                            context: path.resolve('src'),
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: { includePaths: [path.resolve('src', 'styles'), path.resolve('src')] },
                        },
                    },
                ],
            },
        ]
    },
    mode: debuggable ? 'none' : 'production',
    devtool: debuggable ? 'inline-source-map' : 'source-map',
    optimization: {
        splitChunks: {   //抽离公共代码 生成common.js
            chunks: 'all',
            name: 'common',
            minChunks: 2,
            minSize: 0
        },
        runtimeChunk: {  //抽离runtime 代码 生成runtime.js
            name: 'runtime'
        }
    }
}