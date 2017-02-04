const path = require("path")
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const cssnext = require('postcss-cssnext');

module.exports = {
  entry: './src/client',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/build'),
    publicPath: 'build'
  },
  resolve: {
    extensions: ['', '.scss', '.js', '.ts', '.tsx'],
    root: [
      path.resolve('./src'),
    ]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      { test: /\.ts(x?)$/, loader: 'babel-loader!ts-loader' },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!postcss-loader!less'
      },
      {
        test: /(\.css)$/,
        loaders: ['style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss']
      }
    ]
  },
  postcss: [cssnext],
  devServer: {
    host: "0.0.0.0",
    historyApiFallback: true
  }
}
