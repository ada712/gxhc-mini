"use strict";
const store_modules_index = require("./modules/index.js");
const store_getters = require("./getters.js");
const common_vendor = require("../common/vendor.js");
const store = common_vendor.createStore({
  modules: store_modules_index.modules,
  getters: store_getters.getters
});
exports.store = store;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/index.js.map
