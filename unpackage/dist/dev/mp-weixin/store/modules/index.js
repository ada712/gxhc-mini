"use strict";
const store_modules_app = require("./app.js");
const store_modules_hotWords = require("./hotWords.js");
const store_modules_indexData = require("./indexData.js");
const modules = {
  app: store_modules_app.app,
  hotWords: store_modules_hotWords.hotWords,
  indexData: store_modules_indexData.indexData
};
exports.modules = modules;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/store/modules/index.js.map
