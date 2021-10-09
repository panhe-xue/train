const path = require('path')
const { DefinePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/index',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist')
	},
	mode: 'development',
	target: 'web',
	devServer: {
		hot: true,
		open: true,
	},
	module: {
		rules: [
		 	{
		 		test: /\.jsx?$/,
		 		exclude: /node_modules/,
		 		use: ['babel-loader']
		 	},
			{
				test: /\.css$/,
				use: ['style-loader','css-loader']
	 		},
			{
				test: /\.less$/,
				use: ['style-loader','css-loader', 'less-loader']
			},
			{
				test: /\.(png|jpg|webp)/,  
				use: ['file-loader']
			},
			{
				test: /\.(ttf|woff2?)$/,
				type: 'asset/resource',
				generator: {
					filename: 'font/[name].[hash:3][ext]'
				}
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: '插件使用',
			template: './index.html'
		}),
		new DefinePlugin({
			BASE_URL: '"./"'
		}),
	]
}