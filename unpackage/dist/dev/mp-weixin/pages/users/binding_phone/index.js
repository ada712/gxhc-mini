"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
getApp();
const _sfc_main = {
  data() {
    return {
      statusBarHeight,
      pageType: 1,
      // 0 登录 1 绑定手机
      phone: "",
      captcha: "",
      text: "获取验证码",
      isShow: false,
      protocol: false,
      inAnimation: false,
      authKey: "",
      backUrl: "",
      pageTitle: "绑定手机号",
      configData: Cache.get("BASIC_CONFIG"),
      canGetPrivacySetting: false
    };
  },
  onLoad(options) {
  },
  methods: {}
};
if (!Array) {
  const _component_Verify = common_vendor.resolveComponent("Verify");
  const _component_editUserModal = common_vendor.resolveComponent("editUserModal");
  const _component_privacyAgreementPopup = common_vendor.resolveComponent("privacyAgreementPopup");
  (_component_Verify + _component_editUserModal + _component_privacyAgreementPopup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.statusBarHeight,
    b: !_ctx.isHome
  }, !_ctx.isHome ? {
    c: common_assets._imports_0$4,
    d: common_vendor.o((...args) => _ctx.back && _ctx.back(...args))
  } : {
    e: common_assets._imports_1$1,
    f: common_vendor.o((...args) => _ctx.home && _ctx.home(...args))
  }, {
    g: common_vendor.t($data.pageTitle),
    h: common_vendor.t($data.pageType == 1 ? "绑定手机号" : "手机号登录"),
    i: common_vendor.t($data.pageType == 1 ? "登录注册需绑定手机号" : "首次登录会自动注册"),
    j: `填写手机号码`,
    k: $data.phone,
    l: common_vendor.o(($event) => $data.phone = $event.detail.value),
    m: `填写验证码`,
    n: $data.captcha,
    o: common_vendor.o(($event) => $data.captcha = $event.detail.value),
    p: common_vendor.t($data.text),
    q: common_vendor.n(_ctx.disabled === true ? "on" : ""),
    r: _ctx.disabled,
    s: common_vendor.o((...args) => _ctx.code && _ctx.code(...args)),
    t: common_vendor.t(_ctx.$t(`${$data.pageType == 1 ? "绑定手机号" : "立即登录"}`)),
    v: common_vendor.o((...args) => _ctx.submitData && _ctx.submitData(...args)),
    w: $data.pageType == 0 && !$data.canGetPrivacySetting
  }, $data.pageType == 0 && !$data.canGetPrivacySetting ? {
    x: common_vendor.n($data.inAnimation ? "trembling" : ""),
    y: common_vendor.o(($event) => $data.inAnimation = false),
    z: $data.protocol ? true : false,
    A: common_vendor.t(`已阅读并同意`),
    B: common_vendor.o((...args) => _ctx.ChangeIsDefault && _ctx.ChangeIsDefault(...args)),
    C: common_vendor.t(`《用户协议》`),
    D: common_vendor.o(($event) => _ctx.privacy(4)),
    E: common_vendor.t(`与`),
    F: common_vendor.t(`《隐私协议》`),
    G: common_vendor.o(($event) => _ctx.privacy(3)),
    H: common_vendor.o((...args) => _ctx.ChangeIsDefault && _ctx.ChangeIsDefault(...args))
  } : {}, {
    I: common_vendor.sr("verify", "3b94089e-0"),
    J: common_vendor.o(_ctx.success),
    K: common_vendor.p({
      captchaType: "clickWord",
      imgSize: {
        width: "330px",
        height: "155px"
      }
    }),
    L: common_vendor.o(_ctx.closeEdit),
    M: common_vendor.o(_ctx.editSuccess),
    N: common_vendor.p({
      isShow: $data.isShow
    }),
    O: $data.canGetPrivacySetting
  }, $data.canGetPrivacySetting ? {
    P: common_vendor.o(_ctx.onReject),
    Q: common_vendor.o(_ctx.onAgree)
  } : {}, {
    R: common_vendor.s(_ctx.colorStyle)
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3b94089e"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/users/binding_phone/index.js.map
