"use strict";
const utils_request = require("../utils/request.js");
function basicConfig(name) {
  return utils_request.request.get(`basic_config`, {}, {
    noAuth: true
  });
}
exports.basicConfig = basicConfig;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/public.js.map
