let path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
let BundleTracker = require("webpack-bundle-tracker");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

// const postCSSPlugins = [require("postcss-import")];

module.exports = {
  mode: "development",
  entry: {
    // inventario: "./pruvitweb/inventario/src/inventario.js",
    index: "./static/js/app.js",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
    ],
  },
  devServer: {
    static: "./static/dist",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    proxy: {
      "/static/": "http://localhost:8000",
    },
  },

  plugins: [
    new BundleTracker({ filename: "./webpack-stats.json" }),
    new NodePolyfillPlugin(),
    new HtmlWebpackPlugin({ title: "Development" }),
  ],

  output: {
    filename: "[name]-[hash].js",
    // chunkFilename: "[name]-[hash].js",
    path: path.resolve(__dirname + "/static/dist/"),
    // publicPath: "/static/dist/",
    publicPath: "http://127.0.0.1:8080/",
    clean: true,
  },
  // optimization: {
  //   runtimeChunk: "single",
  //   splitChunks: { chunks: "all" },
  // },
  // resolve: {
  //   modules: ["node_modules"],
  //   extensions: [".js", ".jsx"],
  //   fallback: {
  //     fs: false,
  //     child_process: false,
  //   },
  // },
};
