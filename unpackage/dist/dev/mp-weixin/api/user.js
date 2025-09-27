"use strict";
const utils_request = require("../utils/request.js");
function getUserInfo() {
  return utils_request.request.get("user");
}
function getIntegralList(q) {
  return utils_request.request.get("integral/list", q);
}
function getAddressList(data) {
  return utils_request.request.get("address/list", data);
}
function setAddressDefault(id) {
  return utils_request.request.post("address/default/set", {
    id
  });
}
function editAddress(data) {
  return utils_request.request.post("address/edit", data);
}
function delAddress(id) {
  return utils_request.request.post("address/del", {
    id
  });
}
function getAddressDetail(id) {
  return utils_request.request.get("address/detail/" + id);
}
function userEdit(data) {
  return utils_request.request.post("user/edit", data);
}
function getLogout() {
  return utils_request.request.get("logout");
}
function invoiceList(data) {
  return utils_request.request.get("v2/invoice", data, {
    noAuth: true
  });
}
function invoiceSave(data) {
  return utils_request.request.post("v2/invoice/save", data, {
    noAuth: true
  });
}
function invoiceDelete(id) {
  return utils_request.request.get("v2/invoice/del/" + id);
}
function invoiceDetail(id) {
  return utils_request.request.get("v2/invoice/detail/" + id);
}
function messageSystem(data) {
  return utils_request.request.get("user/message_system/list", data);
}
function getMsgDetails(id) {
  return utils_request.request.get("user/message_system/detail/" + id);
}
function getUserAgreement(type) {
  return utils_request.request.get(`get_agreement/${type}`, {}, {
    noAuth: true
  });
}
exports.delAddress = delAddress;
exports.editAddress = editAddress;
exports.getAddressDetail = getAddressDetail;
exports.getAddressList = getAddressList;
exports.getIntegralList = getIntegralList;
exports.getLogout = getLogout;
exports.getMsgDetails = getMsgDetails;
exports.getUserAgreement = getUserAgreement;
exports.getUserInfo = getUserInfo;
exports.invoiceDelete = invoiceDelete;
exports.invoiceDetail = invoiceDetail;
exports.invoiceList = invoiceList;
exports.invoiceSave = invoiceSave;
exports.messageSystem = messageSystem;
exports.setAddressDefault = setAddressDefault;
exports.userEdit = userEdit;
