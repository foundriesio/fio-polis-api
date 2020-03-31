/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { NODE_ENV } = process.env;
const isProd = NODE_ENV === 'production';

module.exports = {
  name: 'Server',
  entry: './src/index.js',
  mode: isProd ? 'production' : 'development',
  target: 'async-node',
  externals: [/^[^./!]/], // excludes node_modules
  optimization: {
    usedExports: true,
    minimize: false,
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'dist/'),
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.browser': undefined,
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: true,
    }),
  ],
};
