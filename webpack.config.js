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
        loader: 'babel-loader'
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  }
}
