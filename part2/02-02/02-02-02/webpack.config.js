const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	entry: './src/index',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist')
	},
	mode: 'development',
	devtool: false,
	target: 'web',
	devServer: {
		hot: true,
		open: true,
	},
	module: {
		rules: [
		 	{
		 		test: /\.js?$/,
		 		exclude: /node_modules/,
		 		use: ['babel-loader']
		 	},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
	 		},
			{
				test: /\.less$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
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
	optimization: {
		minimizer: [
		  // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
		  // `...`,
		  new CssMinimizerPlugin(),
		//   new TerserPlugin(),
		],
	  },
	plugins: [
		new  MiniCssExtractPlugin({
			filename: 'css/[name].[hash:8].min.css',
		}),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: '插件使用',
			template: './index.html'
		}),
		new webpack.DefinePlugin({
			BASE_URL: '"./"'
		}),
		// new TerserPlugin(),
		// new webpack.optimize.ModuleConcatenationPlugin(),
	]
}