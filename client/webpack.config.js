const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');


module.exports = () => {
  return {
    mode: 'development',
    //removing install since it is conflicting with the bundle
    entry: './src/js/index.js',
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'J.A.T.E.',
      }),
      new MiniCssExtractPlugin(),
      new InjectManifest(),
      new WebpackPwaManifest({
        name: 'J.A.T.E.',
        short_name: 'J.A.T.E',
        background_color: '#ffffff',
        icons: [
          {
            src: './src/images/logo.png',
            type: 'image/png',
            sizes: [96, 128, 192, 256, 384,512],
            purpose: 'any maskable'
          }  
        ],
        orientation: 'portrait',
        display: 'standalone',
        description: 'Just Another Text Editor', 
        background_color: '#7eb4e2',
        theme_color: '#7eb4e2', 
      })
    ],

    //added css loaders and babel
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
