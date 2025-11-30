"use strict";
const utils_request = require("../utils/request.js");
function getShare() {
  return utils_request.request.get("share", {}, {
    noAuth: true
  });
}
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
function getColleges() {
  return utils_request.request.get("get_colleges", {}, {
    noAuth: true
  });
}
function getEnterprise() {
  return utils_request.request.get("get_enterprise", {}, {
    noAuth: true
  });
}
exports.basicConfig = basicConfig;
exports.getColleges = getColleges;
exports.getEnterprise = getEnterprise;
exports.getShare = getShare;
exports.routineBindingPhone = routineBindingPhone;
exports.routineLogin = routineLogin;
