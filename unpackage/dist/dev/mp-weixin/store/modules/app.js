"use strict";
const common_vendor = require("../../common/vendor.js");
const api_user = require("../../api/user.js");
const config_cache = require("../../config/cache.js");
const utils_cache = require("../../utils/cache.js");
const state = {
  token: utils_cache.Cache.get(config_cache.LOGIN_STATUS) || false,
  backgroundColor: "#fff",
  userInfo: {},
  uid: utils_cache.Cache.get(config_cache.UID) || 0,
  homeActive: false,
  phoneStatus: true,
  pageFooter: common_vendor.index.getStorageSync("pageFoot") || {},
  activityTab: ""
};
const mutations = {
  SETPHONESTATUS(state2, val) {
    state2.phoneStatus = val;
  },
  LOGIN(state2, opt) {
    state2.token = opt.token;
    utils_cache.Cache.set(config_cache.LOGIN_STATUS, opt.token, opt.time);
  },
  SETUID(state2, val) {
    state2.uid = val;
    utils_cache.Cache.set(config_cache.UID, val);
  },
  UPDATE_LOGIN(state2, token) {
    state2.token = token;
  },
  ACTIVITYTAB(state2, tab) {
    state2.activityTab = tab;
  },
  LOGOUT(state2) {
    state2.token = false;
    state2.uid = 0;
    utils_cache.Cache.clear(config_cache.LOGIN_STATUS);
    utils_cache.Cache.clear(config_cache.USER_INFO);
    utils_cache.Cache.clear(config_cache.UID);
    utils_cache.Cache.clear("snsapiCode");
  },
  BACKGROUND_COLOR(state2, color) {
    state2.color = color;
    document.body.style.backgroundColor = color;
  },
  UPDATE_USERINFO(state2, userInfo) {
    state2.userInfo = userInfo;
    utils_cache.Cache.set(config_cache.USER_INFO, userInfo);
  },
  OPEN_HOME(state2) {
    state2.homeActive = true;
  },
  CLOSE_HOME(state2) {
    state2.homeActive = false;
  },
  FOOT_UPLOAD(state2, data) {
    state2.pageFooter = data;
  }
};
const actions = {
  USERINFO({
    state: state2,
    commit
  }, force) {
    if (state2.userInfo !== null && !force)
      return Promise.resolve(state2.userInfo);
    else
      return new Promise((reslove) => {
        api_user.getUserInfo().then((res) => {
          commit("UPDATE_USERINFO", res.data);
          utils_cache.Cache.set(config_cache.USER_INFO, res.data);
          reslove(res.data);
        });
      }).catch(() => {
      });
  }
};
const app = {
  state,
  mutations,
  actions
};
exports.app = app;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/store/modules/app.js.map
