const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  // ... other Webpack configuration options ...
  plugins: [new NodePolyfillPlugin()],
};
