// ======================= Manejador de empaquetados ======================= //

const path = require( 'path' );

const cssEntries = {
  base: path.resolve(`src/styles/base.css`),
};

const jsEntries = {
  base: path.resolve(`src/scripts/index.js`),
};

// ======================= Configuracion de webpack ======================= //

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');


const config = {
  context: __dirname,
  watchOptions: {
    ignored: /node_modules/,
  },
  stats: {
    version: false,
    preset: 'minimal',
    children: false,
  },
};

const cssConfig = Object.assign({}, config, {
  name: "styles",
  entry: cssEntries,
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public/dist'),
  },
  plugins: [
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'bundle.[name].min.css'
    })
  ],
  optimization: {
    removeEmptyChunks: true,
    splitChunks: {
      chunks: 'all',
      name: 'commons'
    }
  }
});

const jsConfig = Object.assign({}, config, {
  name: "scripts",
  entry: jsEntries,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        // here doing the swiper loader and declaring no sideEffects
        test: /swiper\.esm\.js/,
        sideEffects: false
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'bundle.[name].min.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      name: 'commons',
      cacheGroups: {
        default: false,
        vendors: false,
        swiper: {
          name: 'swiper',
          test: /[\\/]node_modules[\\/](swiper)[\\/]/,
          priority: -9,
          enforce: true,
        },
        commons: {
          name: 'commons',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          enforce: true,
        },
      },
    },
  },
});


module.exports = [jsConfig, cssConfig];
