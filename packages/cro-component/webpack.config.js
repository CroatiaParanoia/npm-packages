/* eslint-disable @typescript-eslint/no-require-imports */

const path = require('path');

const resolve = (...p) => path.resolve(__dirname, ...p);

const isWatch = process.env.NODE_ENV === 'development';

module.exports = {
  mode: process.env.NODE_ENV,
  watch: isWatch,
  watchOptions: {
    aggregateTimeout: 1000,
    ignored: /node_modules/
  },
  entry: ['@babel/polyfill', resolve('./src/index.ts')],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: ['awesome-typescript-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // 将 JS 字符串生成为 style 节点
          'css-loader', // 将 CSS 转化成 CommonJS 模块
          'sass-loader' // 将 Sass 编译成 CSS，默认使用 Node Sass
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024000
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    path: resolve(__dirname, 'lib'),
    filename: 'cro-component.js',
    library: 'croComponent',
    libraryTarget: 'commonjs'
  },
  devtool: 'inline-source-map',
  externals: [
    {
      react: 'react'
    }
  ]
};
