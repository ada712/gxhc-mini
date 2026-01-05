"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const api_public = require("./api/public.js");
const store_index = require("./store/index.js");
const utils_cache = require("./utils/cache.js");
const utils_util = require("./utils/util.js");
require("./utils/request.js");
require("./config/app.js");
require("./libs/login.js");
require("./utils/validate.js");
require("./config/cache.js");
require("./store/modules/index.js");
require("./store/modules/app.js");
require("./api/user.js");
require("./store/modules/hotWords.js");
require("./store/modules/indexData.js");
require("./store/getters.js");
if (!Math) {
  "./pages/home/index/index.js";
  "./pages/home/introduce/index.js";
  "./pages/domain/index/index.js";
  "./pages/mine/index/index.js";
  "./pages/web/index.js";
  "./pages/videos/index/index.js";
  "./pages/director/list/index.js";
  "./pages/director/detail/index.js";
  "./pages/director/contract/index.js";
  "./pages/points/ranking/index.js";
  "./pages/points/detail/index.js";
  "./pages/mine/customer/address/list/index.js";
  "./pages/mine/customer/address/edit/index.js";
  "./pages/mine/customer/realName/index.js";
  "./pages/mine/customer/personInfo/index.js";
  "./pages/mine/customer/index/index.js";
  "./pages/mine/login/index.js";
  "./pages/mine/message/index.js";
  "./pages/mine/exchange/index.js";
  "./pages/mine/exchange/record/index.js";
  "./pages/mine/agent/index.js";
  "./pages/project/detail/index.js";
  "./pages/project/evolve/index.js";
  "./pages/project/apply/index.js";
  "./pages/home/serviceDetail/index.js";
  "./pages/home/vipServiceList/index.js";
  "./pages/home/serviceList/index.js";
  "./subpackage1/agent/index/index.js";
  "./subpackage1/agent/list/index.js";
  "./subpackage1/agent/detail/index.js";
  "./subpackage1/bp/index/index.js";
  "./subpackage1/bp/list/index.js";
  "./subpackage1/bp/detail/index.js";
  "./subpackage1/bp/loading/index.js";
  "./subpackage1/bp/result/base/index.js";
  "./subpackage1/bp/result/plus/index.js";
  "./subpackage1/bp/applyPlay/index.js";
  "./subpackage1/bp/feedback/index.js";
  "./subpackage1/kf/index.js";
  "./subpackage1/energy/index/index.js";
  "./subpackage1/energy/list/index.js";
  "./subpackage1/auth/index/index.js";
  "./subpackage1/auth/certifica/index.js";
  "./subpackage1/share/index.js";
  "./subpackage1/poster/index.js";
  "./subpackage1/bp/internalList/index.js";
  "./explainPages/project/apply/index.js";
  "./explainPages/protocol/index.js";
  "./explainPages/protocol/privacy/index.js";
  "./explainPages/campus/intro/index.js";
  "./explainPages/points/ruleState/index.js";
  "./explainPages/points/obtain/index.js";
  "./explainPages/news/mohe/index.js";
  "./explainPages/news/opencsg/index.js";
  "./campusPages/parter/apply/index.js";
  "./campusPages/parter/list/index.js";
  "./campusPages/activity/apply/index.js";
  "./campusPages/activity/list/index.js";
  "./campusPages/activity/detail/index.js";
  "./campusPages/activity/launch/index.js";
  "./campusPages/experience/rankingList/index.js";
  "./campusPages/experience/apply/index.js";
  "./campusPages/experience/detail/index.js";
  "./managePages/index/index.js";
  "./managePages/director/addDirector/index.js";
  "./managePages/point/enter/index.js";
  "./managePages/users/index/index.js";
  "./managePages/banner/add/index.js";
  "./managePages/banner/delete/index.js";
  "./managePages/users/contract/index.js";
  "./projectPages/memberInfo/index.js";
  "./projectPages/workExperience/index.js";
  "./projectPages/eduExperience/index.js";
  "./projectPages/practiceExperience/index.js";
  "./projectPages/hatchList/index.js";
  "./projectPages/directorJoined/index.js";
  "./projectPages/directorTBC/index.js";
  "./projectPages/directorFeedback/index.js";
  "./projectPages/list/index.js";
  "./projectPages/updateBP/index.js";
  "./projectPages/updateIndex/index.js";
  "./projectPages/updateFinance/index.js";
  "./pages/users/user_invoice_list/index.js";
  "./pages/users/user_invoice_form/index.js";
  "./pages/users/user_spread_code/index.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
    api_public.basicConfig().then((res) => {
      common_vendor.index.setStorageSync("BASIC_CONFIG", res.data);
    });
  },
  onShow: function() {
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/ada/work/pt/gx/gxhc-mini/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(store_index.store);
  app.config.globalProperties.$Cache = utils_cache.Cache;
  app.config.globalProperties.$util = utils_util.util;
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
