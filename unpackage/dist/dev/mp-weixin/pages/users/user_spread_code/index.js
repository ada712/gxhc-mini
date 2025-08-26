"use strict";
const common_vendor = require("../../../common/vendor.js");
const config_app = require("../../../config/app.js");
const api_user = require("../../../api/user.js");
const libs_login = require("../../../libs/login.js");
const zbCode = () => "../../../components/zb-code/zb-code.js";
const _sfc_main = {
  components: {
    zbCode
  },
  data() {
    return {
      indicatorDots: false,
      circular: false,
      autoplay: false,
      interval: 3e3,
      duration: 500,
      swiperIndex: 0,
      spreadList: [],
      userInfo: {},
      poster: "",
      isAuto: false,
      //没有授权的不会自动授权
      isShowAuth: false,
      //是否隐藏授权
      spreadData: [{}],
      //新海报数据
      nickName: "",
      siteName: "",
      mpUrl: "",
      posterImage: [],
      //二维码参数
      codeShow: false,
      cid: "1",
      ifShow: true,
      val: "",
      // 要生成的二维码值
      size: 200,
      // 二维码大小
      unit: "upx",
      // 单位
      background: "#FFF",
      // 背景色
      foreground: "#000",
      // 前景色
      pdground: "#000",
      // 角标色
      icon: "",
      // 二维码图标
      iconsize: 40,
      // 二维码图标大小
      lv: 3,
      // 二维码容错级别 ， 一般不用设置，默认就行
      onval: true,
      // val值变化时自动重新生成二维码
      loadMake: true,
      // 组件加载完成后自动生成二维码
      src: "",
      // 二维码生成后的图片地址或base64
      codeSrc: "",
      wd: 0,
      hg: 0,
      qrcode: ""
    };
  },
  computed: common_vendor.mapGetters({
    "isLogin": "isLogin",
    "userData": "userInfo",
    "uid": "uid"
  }),
  watch: {
    userData: {
      handler: function(newV, oldV) {
        if (newV) {
          this.$set(this, "userInfo", newV);
        }
      },
      deep: true
    }
  },
  async onReady() {
    if (this.isLogin) {
      this.val = `${config_app.HTTP_REQUEST_URL}?spid=${this.uid}`;
      await this.getUser();
    } else {
      libs_login.toLogin();
    }
    this.$nextTick(() => {
      let selector = common_vendor.index.createSelectorQuery().select(".aaa");
      selector.fields({
        size: true
      }, (data) => {
        common_vendor.index.__f__("log", "at pages/users/user_spread_code/index.vue:136", data);
        this.wd = data.width;
        this.hg = data.height;
      }).exec();
    });
  },
  onShow() {
  },
  onHide() {
    common_vendor.index.hideLoading();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: this.userInfo.nickname + `-邀请海报`,
      imageUrl: this.spreadList[0],
      path: "/pages/index/index?spread=" + this.userInfo.uid
    };
  },
  methods: {
    savePosterPathMp(url) {
      let that = this;
      common_vendor.index.getSetting({
        success(res) {
          if (!res.authSetting["scope.writePhotosAlbum"]) {
            common_vendor.index.authorize({
              scope: "scope.writePhotosAlbum",
              success() {
                common_vendor.index.saveImageToPhotosAlbum({
                  filePath: url,
                  success: function(res2) {
                    that.$util.Tips({
                      title: `保存成功`,
                      icon: "success"
                    });
                  },
                  fail: function(res2) {
                    that.$util.Tips({
                      title: `保存失败`
                    });
                  }
                });
              }
            });
          } else {
            common_vendor.index.saveImageToPhotosAlbum({
              filePath: url,
              success: function(res2) {
                that.$util.Tips({
                  title: `保存成功`,
                  icon: "success"
                });
              },
              fail: function(res2) {
                that.$util.Tips({
                  title: `保存失败`
                });
              }
            });
          }
        }
      });
    },
    bindchange(e) {
      this.spreadList;
      this.swiperIndex = e.detail.current;
    },
    getUser() {
      api_user.getUserInfo().then((res) => {
        this.userInfo = res.data;
      });
    },
    qrR(res) {
      this.codeSrc = res;
      this.spreadMsgs();
    },
    //获取图片
    async spreadMsgs() {
      let res = await api_user.spreadMsg();
      this.spreadData = res.data.spread;
      this.nickName = res.data.nickname;
      this.siteName = res.data.site_name;
      this.qrcode = await this.imgToBase(res.data.qrcode, "");
      await this.routineCode();
      let mpUrl = await this.downloadFilestoreImage(this.mpUrl);
      common_vendor.index.showLoading({
        title: `海报生成中`,
        mask: true
      });
      for (let i = 0; i < res.data.spread.length; i++) {
        let that = this;
        let arr2;
        arr2 = [mpUrl, await this.downloadFilestoreImage(res.data.spread[i].pic)];
        that.$util.userPosterCanvas(
          arr2,
          res.data.nickname,
          res.data.site_name,
          i,
          this.wd,
          this.hg,
          (tempFilePath) => {
            that.$set(that.posterImage, i, tempFilePath);
            if (!that.posterImage.length) {
              return that.$util.Tips({
                title: `小程序二维码需要发布正式版后才能获取到`
              });
            }
          }
        );
      }
      common_vendor.index.hideLoading();
    },
    async routineCode() {
      let res = await api_user.routineCode();
      this.mpUrl = res.data.url;
    },
    async imgToBase(url, code) {
      let res = await api_user.imgToBase({
        image: url,
        code
      });
      return res.data;
    },
    //图片转符合安全域名路径
    downloadFilestoreImage(url) {
      return new Promise((resolve, reject) => {
        let that = this;
        common_vendor.index.downloadFile({
          url,
          success: function(res) {
            resolve(res.tempFilePath);
          },
          fail: function() {
            return that.$util.Tips({
              title: ""
            });
          }
        });
      });
    }
  }
};
if (!Array) {
  const _easycom_zb_code2 = common_vendor.resolveComponent("zb-code");
  _easycom_zb_code2();
}
const _easycom_zb_code = () => "../../../components/zb-code/zb-code.js";
if (!Math) {
  _easycom_zb_code();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.spreadData, (item, index, i0) => {
      return common_vendor.e({
        a: $data.posterImage[index]
      }, $data.posterImage[index] ? {
        b: $data.hg + "px",
        c: $data.posterImage[index]
      } : {
        d: $data.hg + "px",
        e: "myCanvas" + index
      }, {
        f: common_vendor.n($data.swiperIndex == index ? "active" : "quiet"),
        g: index
      });
    }),
    b: $data.indicatorDots,
    c: $data.autoplay,
    d: $data.circular,
    e: $data.interval,
    f: $data.duration,
    g: common_vendor.o((...args) => $options.bindchange && $options.bindchange(...args)),
    h: common_vendor.o(($event) => $options.savePosterPathMp($data.posterImage[$data.swiperIndex])),
    i: common_vendor.sr("qrcode", "60842e32-0"),
    j: common_vendor.o($options.qrR),
    k: common_vendor.p({
      show: $data.codeShow,
      cid: $data.cid,
      val: $data.val,
      size: $data.size,
      unit: $data.unit,
      background: $data.background,
      foreground: $data.foreground,
      pdground: $data.pdground,
      icon: $data.icon,
      iconSize: $data.iconsize,
      onval: $data.onval,
      loadMake: $data.loadMake
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/users/user_spread_code/index.js.map
