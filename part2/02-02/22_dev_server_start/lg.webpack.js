const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { DefinePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const allModes = [
  'eval',
  'eval-cheap-source-map',
  'eval-source-map',
  'cheap-source-map',
  'cheap-module-source-map',
  // 'inline-module-source-map',
  'inline-cheap-module-source-map',
  'source-map',
  'inline-source-map',
  'hidden-source-map',
  'nosources-source-map'
]

module.exports = allModes.map(item => ({
  devtool: item,
  mode: 'none',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `js/${item}/${item}.js`
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: `js/${item}/${item}.html`
    })
  ],
}))

// module.exports = {
//   mode: 'none',
//   devtool: 'eval',
//   entry: './src/index.js',
//   output: {
//     filename: 'index.js',
// 		path: path.resolve(__dirname, 'dist')
//   },
//   module: {
//     rules: [
//       // {
//       //   test: /\.css$/,
//       //   use: [
//       //     'style-loader',
//       //     {
//       //       loader: 'css-loader',
//       //       options: {
//       //         importLoaders: 1,
//       //         esModule: false
//       //       }
//       //     },
//       //     'postcss-loader'
//       //   ]
//       // },
//       // {
//       //   test: /\.less$/,
//       //   use: [
//       //     'style-loader',
//       //     'css-loader',
//       //     'postcss-loader',
//       //     'less-loader'
//       //   ]
//       // },
//       // {
//       //   test: /\.(png|svg|gif|jpe?g)$/,
//       //   type: 'asset',
//       //   generator: {
//       //     filename: "img/[name].[hash:4][ext]"
//       //   },
//       //   parser: {
//       //     dataUrlCondition: {
//       //       maxSize: 30 * 1024
//       //     }
//       //   }
//       // },
//       // {
//       //   test: /\.(ttf|woff2?)$/,
//       //   type: 'asset/resource',
//       //   generator: {
//       //     filename: 'font/[name].[hash:3][ext]'
//       //   }
//       // },
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: ['babel-loader']
//       },
//       // {
//       //   test: /\.ts$/,
//       //   exclude: /node_modules/,
//       //   use: ['ts-loader']
//       // }
//     ]
//   },
//   plugins: [
//     new CleanWebpackPlugin(),
//     new HtmlWebpackPlugin({
//       title: 'copyWebpackPlugin',
//       template: './public/index.html'
//     }),
//     new DefinePlugin({
//       BASE_URL: '"./"'
//     }),
//     new CopyWebpackPlugin({
//       patterns: [
//         {
//           from: 'public',
//           globOptions: {
//             ignore: ['**/index.html']
//           }
//         }
//       ]
//     })
//   ]
// }
