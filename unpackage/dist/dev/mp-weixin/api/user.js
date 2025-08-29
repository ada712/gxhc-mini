"use strict";
const utils_request = require("../utils/request.js");
function getUserInfo() {
  return utils_request.request.get("user");
}
exports.getUserInfo = getUserInfo;
