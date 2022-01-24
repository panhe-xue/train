const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'none',
  // 多入口打包的配置
  // entry: {
  //   index: './src/index.js',
  //   album: './src/album.js'
  // },
  entry: './src/index.js',
  output: {
    filename: '[name]-[chunkhash].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  // all initial async
  // optimization: {
  //   splitChunks: {
  //     chunks: 'initial',
  //   },
  // },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Multi Entry',
      template: './src/index.html',
      filename: 'index.html',
      // chunks: ['index']
    }),
    new  MiniCssExtractPlugin({
			filename: '[name]-[chunkhash].bundle.css',
		}),
    // new HtmlWebpackPlugin({
    //   title: 'Multi Entry',
    //   template: './src/album.html',
    //   filename: 'album.html',
    //   chunks: ['album']
    // }),
    // new BundleAnalyzerPlugin()
  ]
}
