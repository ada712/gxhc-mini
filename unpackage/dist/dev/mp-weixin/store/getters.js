"use strict";
const getters = {
  token: (state) => state.app.token,
  isLogin: (state) => !!state.app.token,
  backgroundColor: (state) => state.app.backgroundColor,
  userInfo: (state) => state.app.userInfo || {},
  uid: (state) => state.app.uid,
  homeActive: (state) => state.app.homeActive,
  home: (state) => state.app.home,
  cartNum: (state) => state.indexData.cartNum,
  activityTab: (state) => state.app.activityTab
};
exports.getters = getters;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/getters.js.map
