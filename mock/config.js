const api = require("./api.js");
const getUserInfo = require("./data/getUserInfo.js");

const config = [
  {
    method: "get",
    url: api.getUserInfo,
    data: getUserInfo
  }
];
module.exports = config;
