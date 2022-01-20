##### 所有webpack配置

	1, 安装webpack webpack-cli 本地安装
	2，./node_modules/webpack/bin/webpack.js --version 查看安装版本
	3，webpack 有默认配置文件，入口为src/index.js
	4，webpack配置文件默认为 webpack.config.js 可以用 --config 配置名称，来改变

##### webpack.config.js:

	1. entry: 入口文件
	2. output: {
		filename: '打包后文件名称',
		path: '打包后文件路径,必须绝对路径',
	}

