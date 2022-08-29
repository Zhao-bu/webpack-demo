```javascript
// 初始化项目
npm init -y
//安装 webpack
npm install webpack webpack-cli --save-dev
//使用 webpack-marge 合并通用配置和特定环境配置。
//安装 webpack-merge
npm i webpack-merge -D
```

结构

```js
- src
	- index.js
	- hello.js
- config
	- webpack.common.js	    //通用环境配置文件
	- webpack.dev.js	  		//开发环境配置文件
	- webpack.prod.js		//生产环境配置文件
- package-lock.json
- package.json
```

```javascript
// 打包编译。
npx webpack --config config/webpack.prod.js
//引入 HtmlWebpackPlugin 插件，生成一个 HTML5 文件， 其中包括使用 script 标签的 body 中的所有 webpack 包。
npm install --save-dev html-webpack-plugin
```



