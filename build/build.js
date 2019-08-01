const path = require("path");
const parseArgs = require("minimist");
const webpack = require("webpack");
const ModernBuildPlugin = require("./modernBuildPlugin");
const baseConf = require("./webpack.config.base");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const merge = require("webpack-merge");
const argv = parseArgs(process.argv.slice(2));
const { modern } = argv;

// 配置babelloader
const configureBabelLoader = browserlist => {
  if (!modern) {
    return {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    };
  }
  return {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        babelrc: false,
        presets: [
          [
            "@babel/preset-env",
            {
              modules: false,
              corejs: "2",
              useBuiltIns: "usage",
              targets: {
                browsers: browserlist
              }
            }
          ]
        ]
      }
    }
  };
};

// 现代浏览器的配置文件
const modernConf = merge(baseConf, {
  output: {
    filename: "modern-[name].js",
    path: path.resolve(__dirname, "../dist")
  },
  plugins: [new ModernBuildPlugin({ modern })],
  module: {
    rules: [
      configureBabelLoader([
        "last 2 Chrome versions",
        "not Chrome < 60",
        "last 2 Safari versions",
        "not Safari < 10.1",
        "last 2 iOS versions",
        "not iOS < 10.3",
        "last 2 Firefox versions",
        "not Firefox < 54",
        "last 2 Edge versions",
        "not Edge < 15"
      ])
    ]
  }
});

// 旧浏览器的配置文件
const legacyConf = merge(baseConf, {
  output: {
    filename: "legacy-[name].js",
    path: path.resolve(__dirname, "../dist")
  },
  plugins: [
    new ModernBuildPlugin({ isModernBuild: false }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [configureBabelLoader(["> 1%", "last 2 versions", "Firefox ESR"])]
  }
});

// 不区分浏览器的配置文件
const commonConf = merge(baseConf, {
  module: {
    rules: [configureBabelLoader()]
  },
  plugins: [new CleanWebpackPlugin()]
});

// 调用webpack编译代码
const createCompiler = config => {
  let compiler = webpack(config);
  return () => {
    return new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err) return reject(err);
        console.log(stats.toString({ colors: true }) + "\n");
        resolve();
      });
    });
  };
};

const build = async () => {
  if (!modern) {
    await createCompiler(commonConf)();
  } else {
    await createCompiler(legacyConf)();
    await createCompiler(modernConf)();
  }
};
build();
