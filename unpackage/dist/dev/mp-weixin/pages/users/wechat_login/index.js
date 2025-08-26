"use strict";
const common_vendor = require("../../../common/vendor.js");
const libs_routine = require("../../../libs/routine.js");
const utils_cache = require("../../../utils/cache.js");
const api_public = require("../../../api/public.js");
const api_user = require("../../../api/user.js");
const common_assets = require("../../../common/assets.js");
const app = getApp();
const editUserModal = () => "../../../components/eidtUserModal/index.js";
const _sfc_main = {
  components: {
    editUserModal
  },
  data() {
    return {
      isShow: false,
      bindPhone: false,
      configData: utils_cache.Cache.get("BASIC_CONFIG"),
      isUp: false,
      isPhoneBox: false,
      protocol: false,
      canGetPrivacySetting: false,
      authKey: ""
    };
  },
  onLoad(options) {
    this.userLogin();
    let pages = getCurrentPages();
    let prePage = pages[pages.length - 2];
    if (prePage && prePage.route == "pages/order_addcart/order_addcart") {
      this.isHome = true;
    } else {
      this.isHome = false;
    }
  },
  methods: {
    ChangeIsDefault(e) {
      this.$set(this, "protocol", !this.protocol);
    },
    privacy(type) {
      common_vendor.index.navigateTo({
        url: "/pages/users/privacy/index?type=" + type
      });
    },
    // 小程序 22.11.8日删除getUserProfile 接口获取用户昵称头像
    userLogin() {
      libs_routine.Routine.getCode().then((code) => {
        api_public.authType({
          code,
          spread_spid: app.globalData.spid,
          spread_code: app.globalData.code
        }).then((res) => {
          common_vendor.index.hideLoading();
          this.authKey = res.data.key;
          this.bindPhone = res.data.bindPhone;
        }).catch((err) => {
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({
            title: err,
            icon: "none",
            duration: 2e3
          });
        });
      }).catch((err) => {
        common_vendor.index.__f__("log", "at pages/users/wechat_login/index.vue:120", err);
      });
    },
    getAuthLogin() {
      common_vendor.index.__f__("log", "at pages/users/wechat_login/index.vue:124", this.authKey);
      if (!this.authKey)
        return;
      if (!this.protocol) {
        common_vendor.index.showToast({
          title: "请先阅读并同意协议",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      common_vendor.index.showLoading({
        title: `正在登录中`
      });
      api_public.authLogin({
        key: this.authKey
      }).then((res) => {
        common_vendor.index.__f__("log", "at pages/users/wechat_login/index.vue:140", this.$Cache);
        let time = res.data.expires_time - this.$Cache.time();
        this.$store.commit("LOGIN", {
          token: res.data.token,
          time
        });
        this.getUserInfo(res.data.bindName);
      }).catch((err) => {
        common_vendor.index.hideLoading();
        common_vendor.index.__f__("log", "at pages/users/wechat_login/index.vue:149", err);
        common_vendor.index.showToast({
          title: JSON.stringify(err),
          icon: "none",
          duration: 2e3
        });
      });
    },
    phoneLogin() {
      common_vendor.index.navigateTo({
        url: `/pages/users/binding_phone/index?authKey=${this.authKey}&pageType=0`
      });
    },
    /**
     * 获取个人用户信息
     */
    getUserInfo(new_user, back_url) {
      let that = this;
      api_user.getUserInfo().then((res) => {
        common_vendor.index.hideLoading();
        that.userInfo = res.data;
        that.$store.commit("SETUID", res.data.uid);
        that.$store.commit("UPDATE_USERINFO", res.data);
        if (new_user) {
          this.isShow = true;
        } else {
          that.$util.Tips({
            title: `登录成功`,
            icon: "success"
          }, {
            tab: 3
          });
        }
      }).catch((err) => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: err.msg,
          icon: "none",
          duration: 2e3
        });
      });
    },
    onReject() {
      common_vendor.index.navigateBack();
    }
  }
};
if (!Array) {
  const _easycom_x_navbar2 = common_vendor.resolveComponent("x-navbar");
  const _component_editUserModal = common_vendor.resolveComponent("editUserModal");
  const _component_template = common_vendor.resolveComponent("template");
  (_easycom_x_navbar2 + _component_editUserModal + _component_template)();
}
const _easycom_x_navbar = () => "../../../components/x-navbar/x-navbar.js";
if (!Math) {
  _easycom_x_navbar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      bgColor: "transparent",
      title: "登录"
    }),
    b: common_assets._imports_0$2,
    c: $data.configData.wap_login_logo,
    d: common_vendor.t($data.configData.site_name),
    e: $data.configData.wechat_auth_switch
  }, $data.configData.wechat_auth_switch ? common_vendor.e({
    f: $data.bindPhone
  }, $data.bindPhone ? {
    g: common_vendor.o((...args) => _ctx.getphonenumber && _ctx.getphonenumber(...args))
  } : !$data.bindPhone ? {
    i: common_vendor.o((...args) => $options.getAuthLogin && $options.getAuthLogin(...args))
  } : {}, {
    h: !$data.bindPhone,
    j: common_vendor.o((...args) => $options.onReject && $options.onReject(...args))
  }) : {}, {
    k: $data.configData.phone_auth_switch && false
  }, $data.configData.phone_auth_switch && false ? {
    l: common_vendor.o((...args) => $options.phoneLogin && $options.phoneLogin(...args))
  } : {}, {
    m: !$data.canGetPrivacySetting
  }, !$data.canGetPrivacySetting ? {
    n: common_vendor.n(_ctx.inAnimation ? "trembling" : ""),
    o: common_vendor.o(($event) => _ctx.inAnimation = false),
    p: $data.protocol ? true : false,
    q: common_vendor.o(($event) => $options.privacy(4)),
    r: common_vendor.o(($event) => $options.privacy(3)),
    s: common_vendor.o((...args) => $options.ChangeIsDefault && $options.ChangeIsDefault(...args))
  } : {}, {
    t: common_vendor.o(_ctx.closeEdit),
    v: common_vendor.o(($event) => $data.isShow = false),
    w: common_vendor.p({
      isShow: $data.isShow
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/users/wechat_login/index.js.map
