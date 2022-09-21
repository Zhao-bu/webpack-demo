// 公共配置
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')
module.exports = {
  // 入口文件 main.js
  entry: {
    main: './src/main.js'
  },
  // 输出
  output: {
    // 输出到 dist文件夹
    // 记得改路径
    path: path.resolve(__dirname, '../dist'),
    // js文件下
    filename: 'js/chunk-[contenthash].js',
    // 每次打包前自动清除旧的dist
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 选择模板 public/index.html
      template: './public/index.html',
      // 打包后的名字
      filename: 'index.html',
      // js文件插入 body里
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/chunk-[contenthash].css',
      ignoreOrder: true,
    }),
    //构建进度条
    new ProgressBarPlugin({
        format: ` build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
    }),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        // 处理样式文件
        test: /\.(css|s[cs]ss)$/,
        use: [
          // loader执行顺序是从右到左
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
      },
      {
        // 处理图片
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        type: 'asset',
        parser: {
          // 转base64的条件
          dataUrlCondition: {
            maxSize: 25 * 1024, // 25kb
          }
        },
        generator: {
          filename: 'images/[contenthash][ext][query]',
        },
      },
      {
        // babel
        test: /\.js$/,
        // 排除node_modules中的js
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ],
      },
      {//vue文件
        test: /\.vue$/,
        use: 'vue-loader',
      }
    ]
  },
  resolve: {
    // 路径别名
    alias:{
        '@': path.resolve('./src'),
        '@views':'~/views',
        '@components':'~/components',
        '@utils':'~/utils'
      },
    // 引入文件时省略后缀
    extensions: ['.js', '.ts', '.less', '.vue']
  },
}