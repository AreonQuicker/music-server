const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: 'config/dev.env' });
}

module.exports = (env) => {
  const isProduction = env === 'production';

  return {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.PRISMA_ENDPOINT': JSON.stringify(process.env.PRISMA_ENDPOINT)
      })
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/'
    }
  };
};
