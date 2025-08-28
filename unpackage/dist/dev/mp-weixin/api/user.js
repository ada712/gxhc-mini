"use strict";
const utils_request = require("../utils/request.js");
function getUserInfo() {
  return utils_request.request.get("user");
}
exports.getUserInfo = getUserInfo;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/user.js.map
