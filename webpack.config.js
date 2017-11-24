const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.user.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
      rules: [
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: {
            loader: 'html-loader',
            options: {
              attrs: [':data-src']
            }
          }
        },
        {
          test: /\.(less|css)$/,
          use: [{
            loader: 'style-loader' 
          },
          {
            loader: 'css-loader' 
          },
          {
            loader: 'less-loader' 
          }],
        }
      ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: fs.readFileSync(
          path.resolve(__dirname, "src/template/banner.txt"), "utf8"), 
      raw: true, 
      entryOnly: true
    })
  ]
};