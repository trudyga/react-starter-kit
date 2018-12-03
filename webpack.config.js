const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const AutoPrefixedPlugin = require('autoprefixer');
const config = require('./config.json');

/**
 * Plugins
 */
const htmlWebpackPlugin = new HTMLWebpackPlugin({
  filename: 'index.html',
  template: './public/index.html',
  favicon: './public/favicon.ico',
  meta: {
    description: config.app.description,
    viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
  },
  hash: true,
  xhtml: true
});

/**
 * Loaders
 */
const autoprefixedPlugin = AutoPrefixedPlugin({
  browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
});

const CSSLoader = {
  loader: 'css-loader',
  options: {
    modules: false,
    sourceMap: true,
    minimize: true
  }
};

const CSSModuleLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    sourceMap: true,
    localIdentName: '[local]__[hash:base64:5]',
    minimize: true
  }
};

const postCSSLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    sourceMap: true,
    plugins: () => [autoprefixedPlugin]
  }
};

const ENTRY_PATH = path.join(__dirname, './src/index.js');
const OUTPUT_PATH = path.join(__dirname, './build');

module.exports = {
  entry: ENTRY_PATH,
  output: {
    path: OUTPUT_PATH,
    filename: './bundle.js'
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(jx|jsx)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader'
        }
      },
      {
        test: /\.(jx|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', CSSLoader]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', CSSModuleLoader, postCSSLoader, 'sass-loader']
      }
    ]
  },
  plugins: [htmlWebpackPlugin]
};
