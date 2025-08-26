"use strict";
const utils_request = require("../utils/request.js");
function authType(data) {
  return utils_request.request.get("v2/routine/auth_type", data, {
    noAuth: true
  });
}
function authLogin(data) {
  return utils_request.request.get("v2/routine/auth_login", data, {
    noAuth: true
  });
}
function routineLogin(data) {
  return utils_request.request.get("v2/wechat/routine_auth", data, {
    noAuth: true
  });
}
function basicConfig(name) {
  return utils_request.request.get(`basic_config`, {}, {
    noAuth: true
  });
}
exports.authLogin = authLogin;
exports.authType = authType;
exports.basicConfig = basicConfig;
exports.routineLogin = routineLogin;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/public.js.map
