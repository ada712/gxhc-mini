"use strict";
const utils_request = require("../utils/request.js");
function getUserInfo() {
  return utils_request.request.get("user");
}
function userEdit(data) {
  return utils_request.request.post("user/edit", data);
}
function getLogout() {
  return utils_request.request.get("logout");
}
function spreadMsg() {
  return utils_request.request.get("user/spread_info");
}
function imgToBase(data) {
  return utils_request.request.post("image_base64", data);
}
function routineCode(data) {
  return utils_request.request.get("user/routine_code", data);
}
function getUserAgreement(type) {
  return utils_request.request.get(`get_agreement/${type}`, {}, {
    noAuth: true
  });
}
function mpBindingPhone(data) {
  return utils_request.request.post("v2/routine/binding_phone", data);
}
exports.getLogout = getLogout;
exports.getUserAgreement = getUserAgreement;
exports.getUserInfo = getUserInfo;
exports.imgToBase = imgToBase;
exports.mpBindingPhone = mpBindingPhone;
exports.routineCode = routineCode;
exports.spreadMsg = spreadMsg;
exports.userEdit = userEdit;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/user.js.map
