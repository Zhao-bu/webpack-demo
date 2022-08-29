const HtmlWebpackPlugin = require('html-webpack-plugin')
const {appSrc,resolveApp} = require('./paths')
module.exports = {
    // 入口
  entry: {
    index: './src/index.js',
  },
  plugins: [
    // 生成html，自动引入所有bundle
    new HtmlWebpackPlugin({
      title: 'release_v0',
      template: 'src/index.html'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,    //图片资源
        include: appSrc,
        type: 'asset/resource',
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/i,  //字体资源
        include: [
           resolveApp('src'),
         ],
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        include: appSrc,
        use: [
          // 将 JS 字符串生成为 style 节点
          'style-loader',
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
        ],
      },
    ],
  }
}