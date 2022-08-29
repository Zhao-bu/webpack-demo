## 结构

```js
- config
	- paths.js			//封装路径方法
	- webpack.common.js	    	//通用环境配置文件
	- webpack.dev.js	  	//开发环境配置文件
	- webpack.prod.js		//生产环境配置文件
- dist
	- bundle.js			//输出文件
	- index.html			//生成的html文件，自动引入了bundle.js
- src
	- static			//静态资源文件夹
	- index.js			//入口文件
	- hello.js
- package-lock.json
- package.json

```

## 基础配置

### 环境

**node v14.18.3**

```javascript
// 初始化项目
npm init -y
//安装 webpack
npm install webpack webpack-cli --save-dev
//使用 webpack-marge 合并通用配置和特定环境配置。
//安装 webpack-merge
npm i webpack-merge -D
```

### [入口(entry)](https://webpack.docschina.org/concepts/#entry)

### [输出(output)](https://webpack.docschina.org/concepts/#output)

```javascript
// 打包编译。
npx webpack --config config/webpack.prod.js
```

## 进阶配置

### [Source Map](https://webpack.docschina.org/configuration/devtool)

追踪到 error 和 warning 在源代码中的原始位置

```javascript
//修改开发环境配置文件 webpack.dev.js
module.exports =  merge(common, {
  // 开发工具，开启 source map，编译调试
  devtool: 'eval-cheap-module-source-map',
})
```

### [HtmlWebpackPlugin](https://webpack.docschina.org/plugins/html-webpack-plugin/#root)

该插件将为你生成一个 HTML5 文件， 在 body 中使用 `script` 标签引入你所有 webpack 生成的 bundle。

```javascript
//引入 HtmlWebpackPlugin 插件，生成一个 HTML5 文件， 其中包括使用 script 标签的 body 中的所有 webpack 包。
npm install --save-dev html-webpack-plugin
```

```javascript
//webpack.common.js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  plugins: [new HtmlWebpackPlugin({
      title:'release_v0'	//指定html文件title
  })],
};
```

### [DevServer](https://webpack.docschina.org/configuration/dev-server/#root)

通过 [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 的这些配置，能够以多种方式改变其行为。这是一个基本的示例，利用 `gzips` 压缩 `public/` 目录当中的所有内容并提供一个本地服务(serve)

```javascript
const { merge } = require('webpack-merge')
const path = require('path')
module.exports = merge(common, {
    devServer:{
        hot:true, //支持热更新
        port:8080,
        //contentBase:path.resolve(__dirname,'./dist') //指定（额外的）静态文件目录， // 如果使用 CopyWebpackPlugin ，设置为false
        static:path.resolve(__dirname,'./dist')
    }
})
```

### 执行命令

通过 cross-env 配置环境变量，区分开发环境和生产环境。

安装：

```javascript
npm install --save-dev cross-env
```

package.json

```javascript
{
    "scripts": {
        "dev": "cross-env NODE_ENV=development webpack serve --open --config config/webpack.dev.js",
        "build": "cross-env NODE_ENV=production webpack --config config/webpack.prod.js"
      },
}
```

现在可以运行 webpack 指令：

- npm run dev：本地构建；
- npm run build：生产打包。

### [加载图片](https://webpack.docschina.org/guides/asset-modules/)

修改通用环境配置文件 webpack.commom.js：

```javascript
const {appSrc} = require('./paths');
module.exports = {
    module: {
        rules: [
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            include: appSrc,
            type: 'asset/resource',
          },
        ],
      },
}
```

### [加载字体](https://webpack.docschina.org/guides/asset-modules/)

```javascript
//webpack.commom.js
module.exports = {
    module: {
        rules: [
            {
               test: /.(woff|woff2|eot|ttf|otf)$/i,
               include: [
                  resolveApp('src'),
                ],
               type: 'asset/resource',
             },
         ]
     }
 }
```

### [加载CSS](https://webpack.docschina.org/loaders/css-loader)

为了在 JavaScript 模块中 `import` 一个 CSS 文件，需要安装并配置 [style-loader](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.docschina.org%2Floaders%2Fstyle-loader) 和 [css-loader](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.docschina.org%2Floaders%2Fcss-loader)。

#### [style-loader](https://webpack.docschina.org/loaders/style-loader)

用于将 CSS 插入到 DOM 中，通过使用多个 `<style></style>` 自动把 styles 插入到 DOM 中.

#### [css-loader](https://webpack.docschina.org/loaders/css-loader)

css-loader 对 `@import` 和 `url()` 进行处理，就像 js 解析 `import/require()` 一样，让 CSS 也能模块化开发。

#### 安装配置

```javascript
npm install --save-dev style-loader css-loader
//若打包报错，需降低版本
```

webpack.commom.js

```javascript
const paths = require('./paths');
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                include: paths.appSrc,
                use: [
                  // 将 JS 字符串生成为 style 节点
                  'style-loader',
                  // 将 CSS 转化成 CommonJS 模块
                  'css-loader',
                ],
              },
          ]
      }
  }
```

