const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { ModuleFederationPlugin } = webpack.container;
const path = require('path');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3001,
    host: '0.0.0.0', // So that dev server can be accessed externally
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'frontend',
      shared: {
        react: {
          import: 'react', // the "react" package will be used a provided and fallback module
          shareKey: 'react', // under this name the shared module will be placed in the share scope
          shareScope: 'default', // share scope with this name will be used
          singleton: true, // only a single version of the shared module is allowed
        },
        'react-dom': {
          singleton: true, // only a single version of the shared module is allowed
        },
      },
    }),
    new webpack.DefinePlugin({
      // TODO These are actually not needed
      'process.env.FOLDER_SERVICE_FRONTEND_URL': JSON.stringify(
        process.env.FOLDER_SERVICE_FRONTEND_URL | 'folder-service-url-not-found'
      ),
      'process.env.FOLDER_SERVICE_FRONTEND_PORT': JSON.stringify(
        process.env.FOLDER_SERVICE_FRONTEND_PORT |
          'folder-service-port-not-found'
      ),
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
        exclude: [/module\.css$/],
      },
      {
        test: /\.module\.css$/i,
        use: [
          'style-loader',
          '@teamsupercell/typings-for-css-modules-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
        ],
      },
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
