const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    zlib: require.resolve('browserify-zlib'),
    path: require.resolve('path-browserify'),
    crypto: require.resolve('crypto-browserify'),
    fs: false,
    stream: require.resolve('stream-browserify'),
    http: require.resolve('stream-http'),
    net: false,
    process: require.resolve('process/browser'), // Add this line
  };

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ]);

  return config;
};
