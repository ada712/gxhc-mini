"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const api_public = require("./api/public.js");
const store_index = require("./store/index.js");
const utils_cache = require("./utils/cache.js");
const utils_util = require("./utils/util.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/user/index.js";
  "./pages/goods_details/index.js";
  "./pages/goods/order_list/index.js";
  "./pages/goods/order_details/index.js";
  "./pages/goods/order_apply/index.js";
  "./pages/users/wechat_login/index.js";
  "./pages/users/login/index.js";
  "./pages/users/user_spread_code/index.js";
  "./pages/users/user_info/index.js";
  "./pages/users/binding_phone/index.js";
  "./pages/users/privacy/index.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:5", "App Launch");
    api_public.basicConfig().then((res) => {
      common_vendor.index.setStorageSync("BASIC_CONFIG", res.data);
    });
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:11", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:14", "App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(store_index.store);
  app.config.globalProperties.$Cache = utils_cache.Cache;
  app.config.globalProperties.$util = utils_util.util;
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
