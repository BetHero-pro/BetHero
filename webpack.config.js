const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");
module.exports = () => {
  const env = dotenv.config().parsed;

  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    plugins: [new webpack.DefinePlugin(envKeys), new NodePolyfillPlugin()],
  };
};
