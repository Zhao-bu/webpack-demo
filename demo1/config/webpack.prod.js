const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const {resolveApp} = require('./paths')

module.exports = merge(common, {
    // 生产模式
    mode: 'production',
    // 输出
    output: {
        // bundle 文件名称 【只有这里和开发环境不一样】
        //生产环境的 output 需要通过 contenthash 值来区分版本和变动，可达到清缓存的效果，
        //而本地环境为了构建效率，则不引人 contenthash。
        filename: '[name].[contenthash].bundle.js',

        // bundle 文件路径
        path: resolveApp('dist'),

        // 编译前清除目录
        clean: true
    },
})