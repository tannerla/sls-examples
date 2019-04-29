const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");
const CopyPlugin = require("copy-webpack-plugin");
// const path = require('path');

console.log("slsw.lib.entries: ", slsw.lib.entries);

module.exports = {
  /**
   * The warmup source is ignored (commented out) by (serverless-)webpack, so
   * its necessary to remove it from entries and copy the folder over to the dist.
   * See below issue refs:
   * https://github.com/FidelLimited/serverless-plugin-warmup/issues/73
   * https://github.com/FidelLimited/serverless-plugin-warmup/issues/6
   */
  plugins: [new CopyPlugin([{ from: "_warmup", to: "_warmup" }])],
  entry: { "src/functions/index": "./src/functions/index.js" },
  // entry: slsw.lib.entries,
  target: "node",
  // Generate sourcemaps for proper error messages
  devtool: "source-map",
  // Since 'aws-sdk' is not compatible with webpack,
  // we exclude all node dependencies
  externals: [nodeExternals()],
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  optimization: {
    // We do not want to minimize our code.
    minimize: false
  },
  performance: {
    // Turn off size warnings for entry points
    hints: false
  },
  // Run babel on all .js files and skip those in node_modules
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: __dirname,
        exclude: /node_modules/
      }
    ]
  }
};
