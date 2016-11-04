const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: 'build',
    publicPath: 'build'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less')
      },

    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
  ],
  devServer: {
    historyApiFallback: true
  }
}
