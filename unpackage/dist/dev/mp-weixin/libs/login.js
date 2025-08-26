"use strict";
const common_vendor = require("../common/vendor.js");
const store_index = require("../store/index.js");
const utils_cache = require("../utils/cache.js");
const utils_validate = require("../utils/validate.js");
const config_cache = require("../config/cache.js");
require("../utils/request.js");
function prePage() {
  let pages = getCurrentPages();
  let prePage2 = pages[pages.length - 1];
  return prePage2.route;
}
const toLogin = utils_validate.Debounce(_toLogin, 800);
function _toLogin(push, pathLogin) {
  store_index.store.commit("LOGOUT");
  let path = prePage();
  const BASIC_CONFIG = utils_cache.Cache.get("BASIC_CONFIG");
  utils_cache.Cache.set("login_back_url", path);
  let url;
  if (!BASIC_CONFIG.wechat_auth_switch) {
    url = "/pages/users/binding_phone/index?pageType=0";
  } else {
    url = "/pages/users/wechat_login/index";
  }
  common_vendor.index.navigateTo({
    url
  });
}
function checkLogin() {
  let token = utils_cache.Cache.get(config_cache.LOGIN_STATUS);
  utils_cache.Cache.get(config_cache.EXPIRES_TIME);
  if (!token) {
    common_vendor.index.setStorageSync("authIng", false);
    utils_cache.Cache.clear(config_cache.LOGIN_STATUS);
    utils_cache.Cache.clear(config_cache.EXPIRES_TIME);
    utils_cache.Cache.clear(config_cache.USER_INFO);
    utils_cache.Cache.clear(config_cache.STATE_R_KEY);
    return false;
  } else {
    store_index.store.commit("UPDATE_LOGIN", token);
    let userInfo = utils_cache.Cache.get(config_cache.USER_INFO, true);
    if (userInfo) {
      store_index.store.commit("UPDATE_USERINFO", userInfo);
    }
    return true;
  }
}
exports.checkLogin = checkLogin;
exports.toLogin = toLogin;
//# sourceMappingURL=../../.sourcemap/mp-weixin/libs/login.js.map
