const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const SpritesmithPlugin = require("webpack-spritesmith");

const templateFunction = function(data) {
  var shared = ".ico { background-image: url(I); background-size:Wpx Hpx;}"
    .replace("I", data.spritesheet.image)
    .replace("W", data.spritesheet.width / 2)
    .replace("H", data.spritesheet.height / 2);

  var perSprite = data.sprites
    .map(sprite => {
      return ".ico-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }"
        .replace("N", sprite.name)
        .replace("W", sprite.width / 2)
        .replace("H", sprite.height / 2)
        .replace("X", sprite.offset_x / 2)
        .replace("Y", sprite.offset_y / 2);
    })
    .join("\n");

  return shared + "\n" + perSprite;
};
module.exports = {
  entry: { app: "./src/app.js" },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  devtool: "eval-source-map",
  devServer: {
    proxy: {
      "/api": "http://localhost:8081"
    },
    contentBase: path.join(__dirname, "dist"),
    hot: true,
    compress: true,
    overlay: true,
    open: true,
    port: 3000
  },
  mode: "development",
  resolve: {
    modules: ["node_modules", "assets/generated"]
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
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
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
      template: "./public/index.html",
      title: "项目模板"
    }),
    new StyleLintPlugin({
      files: ["src/**/*.{vue, css, sass, scss}", "!src/assets/generated/"]
    }),
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, "src/assets/sprites"),
        glob: "*.png"
      },
      customTemplates: {
        function_based_template: templateFunction
      },
      target: {
        image: path.resolve(__dirname, "src/assets/generated/sprite.png"),
        css: [
          [
            path.resolve(__dirname, "src/assets/generated/sprite2.scss"),
            {
              format: "function_based_template"
            }
          ],
          path.resolve(__dirname, "src/assets/generated/sprite.scss")
        ]
      },
      apiOptions: {
        cssImageRef: "~sprite.png"
      }
    })
  ]
};
