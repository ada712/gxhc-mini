"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_user = require("../../../api/user.js");
const mpHtml = () => "../../../components/mp-html/mp-html.js";
const _sfc_main = {
  components: {
    mpHtml
  },
  data() {
    return {
      tagStyle: {
        img: "width:100%;display:block;",
        table: "width:100%",
        video: "width:100%"
      },
      content: ``
    };
  },
  onLoad(options) {
    api_user.getUserAgreement(options.type).then((res) => {
      this.content = res.data.content;
      common_vendor.index.setNavigationBarTitle({
        title: res.data.title
      });
    }).catch((err) => {
      that.$util.Tips({
        title: err
      });
    });
  }
};
if (!Array) {
  const _easycom_mp_html2 = common_vendor.resolveComponent("mp-html");
  _easycom_mp_html2();
}
const _easycom_mp_html = () => "../../../components/mp-html/mp-html.js";
if (!Math) {
  _easycom_mp_html();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.sr("article", "536bf4b9-0"),
    b: common_vendor.p({
      content: $data.content,
      ["tag-style"]: $data.tagStyle
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-536bf4b9"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/users/privacy/index.js.map
