const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const { resolveApp } = require('./paths')
// const contentBase = require('webpack-dev-server')
const path = require('path')
module.exports = merge(common, {
    // 开发模式
    mode: 'development',
    // 输出
    output: {
        // bundle 文件名称
        filename: '[name].bundle.js',

        // bundle 文件路径
        path: resolveApp('dist'),

        // 编译前清除目录
        clean: true
    },
    // 开发工具，开启 source map，编译调试
    devtool: 'eval-cheap-module-source-map',
    devServer:{
        hot:true, //支持热更新
        port:8080,
        //contentBase:path.resolve(__dirname,'./dist') //指定（额外的）静态文件目录， // 如果使用 CopyWebpackPlugin ，设置为false
        static:path.resolve(__dirname,'./dist')
    }
})