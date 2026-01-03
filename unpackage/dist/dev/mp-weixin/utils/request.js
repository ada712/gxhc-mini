"use strict";
const common_vendor = require("../common/vendor.js");
const config_app = require("../config/app.js");
const store_index = require("../store/index.js");
require("./cache.js");
function baseRequest(url, method, data, { noAuth = false, noVerify = false }) {
  let Url = config_app.HTTP_REQUEST_URL, header = config_app.HEADER;
  if (!noAuth) {
    if (!store_index.store.state.app.token) {
      console.warn("测试模式：检测到未登录，但不跳转登录页面");
      common_vendor.index.showToast({
        title: "未登录（测试模式）",
        icon: "none",
        duration: 2e3
      });
      return Promise.reject({
        msg: `未登录`
      });
    }
  }
  if (store_index.store.state.app.token)
    header[config_app.TOKENNAME] = "Bearer " + store_index.store.state.app.token;
  return new Promise((reslove, reject) => {
    if (common_vendor.index.getStorageSync("locale")) {
      header["Cb-lang"] = common_vendor.index.getStorageSync("locale");
    }
    let newUrl = Url + "/api/" + url;
    common_vendor.index.request({
      url: newUrl,
      method: method || "GET",
      header,
      data: data || {},
      timeout: config_app.TIMEOUT,
      success: (res) => {
        if (noVerify)
          reslove(res.data, res);
        else if (res.data.status == 200)
          reslove(res.data, res);
        else if ([110002, 110003, 110004].indexOf(res.data.status) !== -1) {
          console.warn("测试模式：检测到登录过期，但不跳转登录页面", res.data);
          common_vendor.index.showToast({
            title: res.data.msg || "请登录（测试模式）",
            icon: "none",
            duration: 2e3
          });
          reject(res.data);
        } else if (res.data.status == 100103) {
          common_vendor.index.showModal({
            title: `提示`,
            content: res.data.msg,
            showCancel: false,
            confirmText: `我知道了`
          });
        } else
          reject(res.data.msg || `系统错误`);
      },
      fail: (msg) => {
        reject(`请求失败`);
      }
    });
  });
}
const request = {};
["options", "get", "post", "put", "head", "delete", "trace", "connect"].forEach(
  (method) => {
    request[method] = (api, data, opt) => baseRequest(api, method, data, opt || {});
  }
);
exports.request = request;
