const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    main: './src/app/layout.tsx',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
  plugins: [new webpack.CleanPlugin()],
  output: {
    filename: '[name].[contenthash].js',
    path: path.join(__dirname, 'dist'),
  },
};
