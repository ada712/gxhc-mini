"use strict";
const utils_request = require("../utils/request.js");
function routineBindingPhone(data) {
  return utils_request.request.post("v2/routine/auth_binding_phone", data, {
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
exports.basicConfig = basicConfig;
exports.routineBindingPhone = routineBindingPhone;
exports.routineLogin = routineLogin;
