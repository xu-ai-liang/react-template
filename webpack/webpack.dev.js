const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?reload=true&noInfo=true',
    path.resolve('app/index.js'),
  ],
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
  },
  // 在 js 文件里支持如下写法： import a from '@/utils/a'
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../app'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: 'html-withimg-loader',
      },
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|webp|ico)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              outputPath: 'static/images',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'static/font',
            },
          },
        ],
      },
      {
        test: /\.md$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          outputPath: 'static',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('app/index.html'),
      favicon: path.resolve('app/assets/images/favicon.ico'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin(),
  ],
};
