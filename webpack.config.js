const path = require('path');

module.exports = {
  mode: 'development',
  entry: './public/JS/main.js',
  output: {
    path: path.resolve(__dirname, 'public/JS/dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  devtool: 'inline-source-map',
};
