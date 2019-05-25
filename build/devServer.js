const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const path = require("path");
const config = require("./webpack.config.dev");
const options = {
  proxy: {
    "/api": "http://localhost:8081"
  },
  contentBase: path.resolve(__dirname, "../dist"),
  hot: true,
  compress: true,
  overlay: true,
  open: true,
  port: 3000
};
webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const app = new webpackDevServer(compiler, options);

app.listen(options.port, function() {
  console.log(`app listening on port ${options.port}!\n`);
});
