"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  data: function() {
    return {
      copyRight: "",
      inAnimation: false,
      protocol: false,
      navList: [`快速登录`, `账号登录`],
      current: 1,
      account: "",
      password: "",
      captcha: "",
      formItem: 1,
      type: "login",
      logoUrl: "https://v5.crmeb.net/statics/system_images/login_logo.jpeg",
      keyCode: "",
      codeUrl: "",
      codeVal: "",
      isShowCode: false,
      appLoginStatus: false,
      // 微信登录强制绑定手机号码状态
      appUserInfo: null,
      // 微信登录保存的用户信息
      appleLoginStatus: false,
      // 苹果登录强制绑定手机号码状态
      appleUserInfo: null,
      appleShow: false,
      // 苹果登录版本必须要求ios13以上的
      keyLock: true
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.logoUrl,
    b: _ctx.formItem === 1
  }, _ctx.formItem === 1 ? common_vendor.e({
    c: _ctx.current !== 1
  }, _ctx.current !== 1 ? {
    d: common_assets._imports_0$3,
    e: `输入手机号码`,
    f: _ctx.account,
    g: common_vendor.o(($event) => _ctx.account = $event.detail.value),
    h: common_assets._imports_1,
    i: `填写登录密码`,
    j: _ctx.password,
    k: common_vendor.o(($event) => _ctx.password = $event.detail.value),
    l: common_vendor.o((...args) => _ctx.submit && _ctx.submit(...args))
  } : {}, {
    m: _ctx.current !== 0 || _ctx.appLoginStatus || _ctx.appleLoginStatus
  }, _ctx.current !== 0 || _ctx.appLoginStatus || _ctx.appleLoginStatus ? {
    n: common_assets._imports_0$3,
    o: `输入手机号码`,
    p: _ctx.account,
    q: common_vendor.o(($event) => _ctx.account = $event.detail.value),
    r: common_assets._imports_2,
    s: `填写验证码`,
    t: _ctx.captcha,
    v: common_vendor.o(($event) => _ctx.captcha = $event.detail.value),
    w: common_vendor.t(_ctx.text),
    x: _ctx.disabled,
    y: common_vendor.n(_ctx.disabled === true ? "on" : ""),
    z: common_vendor.o((...args) => _ctx.code && _ctx.code(...args))
  } : {}, {
    A: _ctx.current !== 0
  }, _ctx.current !== 0 ? {
    B: common_vendor.o((...args) => _ctx.loginMobile && _ctx.loginMobile(...args))
  } : {}, {
    C: _ctx.current === 0
  }, _ctx.current === 0 ? {
    D: common_vendor.o((...args) => _ctx.submit && _ctx.submit(...args))
  } : {}, {
    E: _ctx.current == 0
  }, _ctx.current == 0 ? {
    F: common_vendor.o(($event) => _ctx.current = 1)
  } : {}, {
    G: _ctx.current == 1
  }, _ctx.current == 1 ? {
    H: common_vendor.o(($event) => _ctx.current = 0)
  } : {}, {
    I: common_vendor.n(_ctx.inAnimation ? "trembling" : ""),
    J: common_vendor.o(($event) => _ctx.inAnimation = false),
    K: _ctx.protocol ? true : false,
    L: common_vendor.o(($event) => _ctx.privacy(4)),
    M: common_vendor.o(($event) => _ctx.privacy(3)),
    N: common_vendor.o((...args) => _ctx.ChangeIsDefault && _ctx.ChangeIsDefault(...args))
  }) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-691b193d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/users/login/index.js.map
