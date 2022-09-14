const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');

const Dotenv = require('dotenv-webpack');

// eslint-disable-next-line node/no-process-env
const env = process.env.NODE_ENV;

console.log('env', env);

const DIST = path.resolve(__dirname, 'dist');

module.exports = {
  devtool: 'eval-source-map',
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: DIST,
    publicPath: DIST,
  },
  devServer: {
    port: 9011,
    devMiddleware: {
      writeToDisk: true,
    },
    static: DIST,
  },
  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify'),
    },
  },
  plugins: [
    new Dotenv({
      path: `./.env.${env === 'local' ? 'local' : 'prod'}`,
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new CompressionPlugin(),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({ process: 'process/browser' }),
    // for build scripts
    new CopyPlugin({
      patterns: [
        {
          flatten: true,
          from: './src/*',
          globOptions: {
            ignore: ['**/*.js'],
          },
        },
      ],
    }),
  ],
};
