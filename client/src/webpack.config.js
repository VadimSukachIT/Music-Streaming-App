const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    main: [
      'babel-polyfill',
      './index.js',
    ],
  },

  output: {
    path: `${__dirname}/static/`,
    publicPath: '/static/',
    filename: '[name].js',
  },

  context: path.resolve(__dirname, './'),

  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      options: { presets: ['es2015', 'stage-0'] },
    }, {
      test: /\.less$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "less-loader"
      }]
    }, {
      test: /\.html$/,
      use: [ "html-loader" ]
    }, {
      test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: ['url-loader?limit=5000&name=[name].[hash].[ext]?'] },
    ],
  },

  devtool: 'source-map',

  devServer: {
    contentBase: path.join(__dirname, "static"),
    compress: true,
    port: 3000
  },

  resolve: {
    modules: ['./', 'node_modules'],
    extensions: ['.js', '.less'],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
