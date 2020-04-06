const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const WorkerPlugin = require('worker-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const colors = require('./src/colors.js');
const metadata = require('./src/metadata.js');

const FILE_PREFIX = '[name].[contenthash]';
const CHUNK_PREFIX = 'chunk-[contenthash]';

module.exports = {
  entry: {
    index: './src/index.js',
  },
  devServer: {
    historyApiFallback: true,
  },
  output: {
    filename: FILE_PREFIX + '.js',
    chunkFilename: CHUNK_PREFIX + '.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|svg|gif)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'images/[name]-[hash].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new WorkerPlugin(),
    new FaviconsWebpackPlugin({
      logo: './src/logo.png',
      prefix: 'assets/',
      favicons: {
        appName: metadata.name,
        appShortName: metadata.shortName,
        appDescription: metadata.description,
        developerName: metadata.author,
        developerURL: metadata.authorURL,
        background: colors.background,
        theme_color: colors.primary,
        appleStatusBarStyle: 'default',
        display: 'minimal-ui',
        orientation: 'any',
        scope: '/',
        start_url: '/?source=pwa',
        version: process.env.npm_package_version,
        logging: false,
        pixel_art: false,
        loadManifestWithCredentials: false,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          firefox: false,
          windows: true,
          yandex: false,
        },
      },
    }),
    new MiniCssExtractPlugin({
      filename: FILE_PREFIX + '.css',
      chunkFilename: CHUNK_PREFIX + '.css',
    }),
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
  ],
};
