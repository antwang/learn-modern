module.exports = {
  extends: "eslint:recommended",
  env: {
    browser: true,
    es6: true,
    node: true
  },
  rules: {
    "no-console": "off",
    indent: ["error", 2],
    quotes: ["warn", "double"]
  }
};
