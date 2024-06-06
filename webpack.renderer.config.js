const rules = require('./webpack.rules');
const webpack = require('webpack');
require('dotenv').config({ path: '.env' });

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(
        process.env
      ),
    }),
  ],
};
