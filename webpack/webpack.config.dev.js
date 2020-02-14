const Webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const config = require('./config');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  output: {
    chunkFilename: 'js/[name].chunk.js',
  },
  devServer: {
    historyApiFallback: {
      disableDotRule: true,
    },
    contentBase: common.outputPath,
    watchContentBase: true,
    port: 8082,
    stats: 'minimal',
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: config.srcPath,
        exclude: config.modulesPath,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        },
      },
      {
        test: /\.(js|jsx)$/,
        include: [config.srcPath, config.modulesPath].join(', '),
        loader: 'babel-loader',
        options: {
          compact: false,
        },
      },
      {
        test: /\.s?css$/i,
        use: ['style-loader', 'css-loader?sourceMap=true', 'sass-loader'],
      },
    ],
  },
});
