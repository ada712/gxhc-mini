"use strict";
const utils_request = require("../utils/request.js");
function getUserInfo() {
  return utils_request.request.get("user");
}
function getIntegralList(q) {
  return utils_request.request.get("integral/list", q);
}
function messageSystem(data) {
  return utils_request.request.get("user/message_system/list", data);
}
function getMsgDetails(id) {
  return utils_request.request.get("user/message_system/detail/" + id);
}
exports.getIntegralList = getIntegralList;
exports.getMsgDetails = getMsgDetails;
exports.getUserInfo = getUserInfo;
exports.messageSystem = messageSystem;
