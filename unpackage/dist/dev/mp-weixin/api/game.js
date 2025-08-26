"use strict";
const utils_request = require("../utils/request.js");
function gameList(data) {
  return utils_request.request.get("game/list", data, {
    noAuth: true
  });
}
function gameDetails(data) {
  return utils_request.request.get("game/details", data, {
    noAuth: true
  });
}
function gameApply(data) {
  return utils_request.request.post("gameOrder/apply", data);
}
function orderList(data) {
  return utils_request.request.get("gameOrder/list", data);
}
function orderDetails(data) {
  return utils_request.request.get("gameOrder/details", data);
}
function orderApplyList(data) {
  return utils_request.request.get("gameOrder/apply_list", data);
}
function applyAudit(data) {
  return utils_request.request.post("gameOrder/apply_audit", data);
}
exports.applyAudit = applyAudit;
exports.gameApply = gameApply;
exports.gameDetails = gameDetails;
exports.gameList = gameList;
exports.orderApplyList = orderApplyList;
exports.orderDetails = orderDetails;
exports.orderList = orderList;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/game.js.map
