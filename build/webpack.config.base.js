const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const SpritesmithPlugin = require("webpack-spritesmith");
// 雪碧图模板函数
const templateFunction = require("./spriteFuncTemplate");
module.exports = {
  entry: { app: path.resolve(__dirname, "../src/app.js") },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: ""
  },
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    proxy: {
      "/api": "http://localhost:8081"
    },
    contentBase: path.resolve(__dirname, "../dist"),
    hot: true,
    compress: true,
    overlay: true,
    open: true,
    port: 3000
  },
  resolve: {
    modules: ["../node_modules", "../src/assets/generated"]
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        enforce: "pre",
        options: {
          formatter: require("eslint-friendly-formatter")
        }
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: "vue-loader"
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8092,
              name: "img/[hash:7].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8092,
              name: "media/[hash:7].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8092,
              name: "font/[hash:7].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      title: "项目模板"
    }),
    new StyleLintPlugin({
      files: ["src/**/*.{vue, css, sass, scss}", "!src/assets/generated/"]
    }),
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, "../src/assets/sprites"),
        glob: "*.png"
      },
      customTemplates: {
        function_based_template: templateFunction
      },
      target: {
        image: path.resolve(__dirname, "../src/assets/generated/sprite.png"),
        css: [
          [
            path.resolve(__dirname, "../src/assets/generated/sprite2.scss"),
            {
              format: "function_based_template"
            }
          ],
          path.resolve(__dirname, "../src/assets/generated/sprite.scss")
        ]
      },
      apiOptions: {
        cssImageRef: "~sprite.png"
      }
    })
  ]
};
