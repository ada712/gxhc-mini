"use strict";
const common_vendor = require("../../common/vendor.js");
const libs_login = require("../../libs/login.js");
const api_user = require("../../api/user.js");
const libs_routine = require("../../libs/routine.js");
const pages_user_menu = require("./menu.js");
const common_assets = require("../../common/assets.js");
getApp();
const _sfc_main = {
  data() {
    return {
      orderMenu: pages_user_menu.orderMenu,
      storeMenu: pages_user_menu.storeMenu,
      MyMenus: pages_user_menu.MyMenus,
      member_style: 3,
      userInfo: {}
    };
  },
  onLaunch() {
  },
  onShow() {
    if (this.isLogin) {
      this.getUserInfo();
    }
  },
  methods: {
    maskMiddleFour(str, start = 3, count = 4) {
      if (str.length < start + count)
        return str;
      return str.slice(0, start) + "*".repeat(count) + str.slice(start + count);
    },
    // goMenuPage
    goMenuPage(url, name) {
      if (this.isLogin) {
        if (url.indexOf("http") === -1) {
          if (name && name === "联系客服") {
            return getCustomer(url);
          }
          if (url != "#" && url == "/pages/users/user_info/index") {
            common_vendor.index.openSetting({
              success: function(res) {
              }
            });
          }
          common_vendor.index.navigateTo({
            url,
            fail(err) {
              common_vendor.index.switchTab({
                url
              });
            }
          });
        } else {
          common_vendor.index.navigateTo({
            url: `/pages/annex/web_view/index?url=${url}`
          });
        }
      } else {
        this.openAuto();
      }
    },
    // 打开授权
    openAuto() {
      libs_login.toLogin();
    },
    getphonenumber(e) {
      if (e.detail.errMsg == "getPhoneNumber:ok") {
        libs_routine.Routine.getCode().then((code) => {
          let data = {
            code,
            iv: e.detail.iv,
            encryptedData: e.detail.encryptedData
          };
          api_user.mpBindingPhone(data).then((res) => {
            this.getUserInfo();
            this.$util.Tips({
              title: res.msg,
              icon: "success"
            });
          }).catch((err) => {
            return this.$util.Tips({
              title: err
            });
          });
        }).catch((error) => {
          common_vendor.index.hideLoading();
        });
      }
    },
    /**
     * 获取个人用户信息
     */
    getUserInfo: function() {
      let that = this;
      api_user.getUserInfo().then((res) => {
        that.userInfo = res.data;
        common_vendor.index.__f__("log", "at pages/user/index.vue:246", "getUserInfo", res.data);
        that.$store.commit("SETUID", res.data.uid);
        common_vendor.index.stopPullDownRefresh();
      });
    },
    goEdit() {
      if (this.isLogin == false) {
        libs_login.toLogin();
      } else {
        if (this.userInfo.is_default_avatar) {
          this.editModal = true;
          return;
        }
        common_vendor.index.navigateTo({
          url: "/pages/users/user_info/index"
        });
      }
    }
  },
  computed: {
    statusBarHeight() {
      let systemInfo = common_vendor.index.getSystemInfoSync();
      return systemInfo.statusBarHeight;
    },
    ...common_vendor.mapGetters({
      isLogin: "isLogin"
    })
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.userInfo.avatar
  }, $data.userInfo.avatar ? {
    b: $data.userInfo.avatar,
    c: common_vendor.o(($event) => $options.goEdit())
  } : {
    d: common_assets._imports_0,
    e: common_vendor.o(($event) => $options.goEdit())
  }, {
    f: $data.userInfo.is_money_level ? 1 : "",
    g: !_ctx.isLogin
  }, !_ctx.isLogin ? {
    h: common_vendor.o((...args) => $options.openAuto && $options.openAuto(...args))
  } : {}, {
    i: _ctx.isLogin
  }, _ctx.isLogin ? {
    j: common_vendor.t($data.userInfo.nickname)
  } : {}, {
    k: _ctx.isLogin && $data.userInfo.phone
  }, _ctx.isLogin && $data.userInfo.phone ? {
    l: common_vendor.t($options.maskMiddleFour($data.userInfo.phone)),
    m: common_vendor.o(($event) => $options.goEdit())
  } : {}, {
    n: !$data.userInfo.phone && _ctx.isLogin
  }, !$data.userInfo.phone && _ctx.isLogin ? {
    o: common_vendor.o((...args) => $options.getphonenumber && $options.getphonenumber(...args))
  } : {}, {
    p: _ctx.isLogin
  }, _ctx.isLogin ? {} : {}, {
    q: $options.statusBarHeight + 40 + "px",
    r: 190 + $options.statusBarHeight + "px",
    s: common_vendor.f($data.orderMenu, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.n(item.img),
        b: item.num > 0
      }, item.num > 0 ? {
        c: common_vendor.t(item.num)
      } : {}, {
        d: common_vendor.t(item.title),
        e: item.url,
        f: index
      });
    }),
    t: common_vendor.n("height"),
    v: $data.userInfo.spread_open
  }, $data.userInfo.spread_open ? {
    w: common_vendor.f($data.MyMenus, (item, index, i0) => {
      return common_vendor.e({
        a: item.url != "#" && item.url != "/pages/service/index" && item.url != "/pages/extension/customer_list/chat" || item.url == "/pages/extension/customer_list/chat"
      }, item.url != "#" && item.url != "/pages/service/index" && item.url != "/pages/extension/customer_list/chat" || item.url == "/pages/extension/customer_list/chat" ? {
        b: item.pic,
        c: common_vendor.t(item.name),
        d: common_vendor.o(($event) => $options.goMenuPage(item.url, item.name), index)
      } : {}, {
        e: index
      });
    })
  } : {}, {
    x: $data.storeMenu.length
  }, $data.storeMenu.length ? {
    y: common_vendor.f($data.storeMenu, (item, index, i0) => {
      return common_vendor.e({
        a: item.url != "#" && item.url != "/pages/service/index"
      }, item.url != "#" && item.url != "/pages/service/index" ? {
        b: item.pic,
        c: common_vendor.t(item.name),
        d: item.url,
        e: common_vendor.o(($event) => $options.goMenuPage(item.url, item.name), index)
      } : {}, {
        f: index
      });
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/index.js.map
