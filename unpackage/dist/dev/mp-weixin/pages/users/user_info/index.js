"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_user = require("../../../api/user.js");
const libs_login = require("../../../libs/login.js");
const _sfc_main = {
  data() {
    return {
      mp_is_new: true,
      loginType: "h5",
      //app.globalData.loginType
      userInfo: {}
    };
  },
  computed: common_vendor.mapGetters(["isLogin"]),
  watch: {
    isLogin: {
      handler: function(newV, oldV) {
        if (newV) {
          this.getUserInfo();
        }
      },
      deep: true
    }
  },
  onLoad() {
    if (this.isLogin) {
      this.getUserInfo();
    } else {
      libs_login.toLogin();
    }
  },
  methods: {
    getphonenumber(e) {
      if (e.detail.errMsg == "getPhoneNumber:ok") {
        Routine.getCode().then((code) => {
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
     * 退出登录
     * 
     */
    outLogin: function() {
      let that = this;
      if (that.loginType == "h5") {
        common_vendor.index.showModal({
          title: `提示`,
          content: `确认退出登录`,
          success: function(res) {
            if (res.confirm) {
              api_user.getLogout().then((res2) => {
                that.$store.commit("LOGOUT");
                common_vendor.index.reLaunch({
                  url: "/pages/index/index"
                });
              }).catch((err) => {
              });
            } else if (res.cancel)
              ;
          }
        });
      }
    },
    /**
     * 提交修改
     */
    formSubmit: function(e) {
      let that = this, value = e.detail.value;
      that.switchUserInfo[that.userIndex];
      if (!value.nickname)
        return that.$util.Tips({
          title: `请输入姓名`
        });
      value.avatar = this.userInfo.avatar;
      api_user.userEdit(value).then((res) => {
        return that.$util.Tips({
          title: res.msg,
          icon: "success"
        }, {
          tab: 3,
          url: 1
        });
      }).catch((msg) => {
        return that.$util.Tips({
          title: msg || `保存失败`
        }, {
          tab: 3,
          url: 1
        });
      });
    },
    /**
     * 获取用户详情
     */
    getUserInfo: function() {
      let that = this;
      api_user.getUserInfo().then((res) => {
        that.$set(that, "userInfo", res.data);
        let switchUserInfo = res.data.switchUserInfo || [];
        for (let i = 0; i < switchUserInfo.length; i++) {
          if (switchUserInfo[i].uid == that.userInfo.uid)
            that.userIndex = i;
        }
        that.$set(that, "switchUserInfo", switchUserInfo);
      });
    },
    /**
     * 上传文件
     * 
     */
    uploadpic: function() {
      let that = this;
      this.canvasStatus = true;
      that.$util.uploadImageChange("upload/image", (res) => {
        let userInfo = that.switchUserInfo[that.userIndex];
        if (userInfo !== void 0) {
          that.userInfo.avatar = res.data.url;
        }
        that.switchUserInfo[that.userIndex] = userInfo;
        that.$set(that, "switchUserInfo", that.switchUserInfo);
        this.canvasStatus = false;
      }, (res) => {
        this.canvasStatus = false;
      }, (res) => {
        this.canvasWidth = res.w;
        this.canvasHeight = res.h;
      });
    },
    onChooseAvatar(e) {
      common_vendor.index.__f__("log", "at pages/users/user_info/index.vue:245", e);
      const {
        avatarUrl
      } = e.detail;
      this.$util.uploadImgs("upload/image", avatarUrl, (res) => {
        this.userInfo.avatar = res.data.url;
      }, (err) => {
        common_vendor.index.__f__("log", "at pages/users/user_info/index.vue:252", err);
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.mp_is_new
  }, !$data.mp_is_new ? {
    b: $data.userInfo.avatar,
    c: common_vendor.o((...args) => $options.uploadpic && $options.uploadpic(...args))
  } : {
    d: $data.userInfo.avatar,
    e: common_vendor.o((...args) => $options.onChooseAvatar && $options.onChooseAvatar(...args))
  }, {
    f: $data.userInfo.nickname,
    g: !$data.userInfo.phone
  }, !$data.userInfo.phone ? {
    h: common_vendor.o((...args) => $options.getphonenumber && $options.getphonenumber(...args))
  } : {
    i: $data.userInfo.phone
  }, {
    j: common_vendor.t($data.userInfo.uid),
    k: common_vendor.o((...args) => $options.outLogin && $options.outLogin(...args)),
    l: common_vendor.o((...args) => $options.formSubmit && $options.formSubmit(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2822ba10"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/users/user_info/index.js.map
