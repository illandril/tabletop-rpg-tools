var crypto = require('crypto');
const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const colors = require('./src/colors.js');
const metadata = require('./src/metadata.js');

const SRC_DIR = path.resolve(__dirname, 'src');

const FILE_PREFIX = '[name].[contenthash]';
const CHUNK_PREFIX = 'chunk-[contenthash]';

const BAD_CSS_CHARACTERS = /[^a-zA-Z0-9\\-_]/g;
const BAD_CSS_PREFIX = /^((-?[0-9])|--)/;
function sanitizeCSSClassName(className) {
  return className.replace(BAD_CSS_CHARACTERS, '-').replace(BAD_CSS_PREFIX, '_$1');
}

const SVG_CLASS_PREFIXER = (node, extra) => {
  const fileName = path.basename(extra.path);
  const md5 = crypto.createHash('md5');
  const pathHash = md5.update(extra.path).digest('base64');
  return sanitizeCSSClassName(fileName + '-' + pathHash.substring(0, 5));
};

const CSSLoader = {
  loader: 'css-loader',
  options: {
    modules: false,
  },
};

const CSSModuleLoader = {
  loader: 'css-loader',
  options: {
    modules: {
      mode: 'local',
      getLocalIdent: (loaderContext, localIdentName, localName, options) => {
        let prefix = path.relative(SRC_DIR, loaderContext.resourcePath).replace(/\\/g, '/');
        prefix = prefix.replace(/^(page|component)s\//, '$1_');
        prefix = prefix.replace(/(\/page)?\.module\.scss$/, '');
        return sanitizeCSSClassName(prefix + '__' + localName);
      },
    },
  },
};

const ImageLoaders = [
  {
    loader: 'file-loader',
    options: {
      name: 'images/[name]-[hash].[ext]',
    },
  },
  {
    loader: 'image-webpack-loader',
    options: {},
  },
];

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
        use: [MiniCssExtractPlugin.loader, CSSLoader],
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: [MiniCssExtractPlugin.loader, CSSLoader, 'sass-loader'],
      },
      {
        test: /\.module\.scss$/,
        use: [MiniCssExtractPlugin.loader, CSSModuleLoader, 'sass-loader'],
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
        test: /\.svg$/,
        issuer: {
          test: /\.jsx?$/,
        },
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: {
                  removeViewBox: false,
                  prefixIds: {
                    prefix: SVG_CLASS_PREFIXER,
                  },
                },
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        issuer: {
          test: /\.s?css?$/,
        },
        use: ImageLoaders,
      },
      {
        test: /\.(png|jpe?g|gif)?$/,
        exclude: /node_modules/,
        use: ImageLoaders,
      },
    ],
  },
  plugins: [
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
