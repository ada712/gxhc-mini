"use strict";
const config_app = require("../../config/app.js");
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      imgHost: config_app.HTTP_REQUEST_URL
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.imgHost + "/statics/images/empty-box.png",
    b: common_vendor.t($props.title || _ctx.$t(`暂无记录`))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/x-empty-page/x-empty-page.js.map
