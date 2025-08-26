"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../utils/cache.js");
const common_assets = require("../../common/assets.js");
const api_user = require("../../api/user.js");
const _sfc_main = {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      defHead: common_assets.def_avatar,
      mp_is_new: this.$Cache.get("MP_VERSION_ISNEW") || false,
      userInfo: {
        avatar: "",
        nickname: ""
      },
      mpData: common_vendor.index.getStorageSync("copyRight"),
      canvasStatus: false
    };
  },
  mounted() {
  },
  methods: {
    /**
     * 上传文件
     * 
     */
    uploadpic: function() {
      let that = this;
      this.canvasStatus = true;
      that.$util.uploadImageChange("upload/image", (res) => {
        let userInfo = that.userInfo;
        if (userInfo !== void 0) {
          that.userInfo.avatar = res.data.url;
        }
        this.canvasStatus = false;
      }, (res) => {
        this.canvasStatus = false;
      }, (res) => {
        this.canvasWidth = res.w;
        this.canvasHeight = res.h;
      });
    },
    // 微信头像获取
    onChooseAvatar(e) {
      const {
        avatarUrl
      } = e.detail;
      this.$util.uploadImgs("upload/image", avatarUrl, (res) => {
        this.userInfo.avatar = res.data.url;
      }, (err) => {
        common_vendor.index.__f__("log", "at components/eidtUserModal/index.vue:116", err);
      });
    },
    closeAttr: function() {
      this.$emit("closeEdit");
    },
    /**
     * 提交修改
     */
    formSubmit(e) {
      let that = this;
      if (!this.userInfo.avatar)
        return that.$util.Tips({
          title: `请上传头像`
        });
      if (!e.detail.value.nickname)
        return that.$util.Tips({
          title: `请输入昵称`
        });
      this.userInfo.nickname = e.detail.value.nickname;
      api_user.userEdit(this.userInfo).then((res) => {
        this.$emit("editSuccess");
        return that.$util.Tips({
          title: res.msg,
          icon: "success"
        }, {
          tab: 3
        });
      }).catch((msg) => {
        return that.$util.Tips({
          title: msg || `保存失败`
        }, {
          tab: 3,
          url: 1
        });
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.closeAttr && $options.closeAttr(...args)),
    b: $data.mpData.siteLogo,
    c: common_vendor.t($data.mpData.siteName),
    d: !$data.mp_is_new
  }, !$data.mp_is_new ? {
    e: $data.userInfo.avatar || $data.defHead,
    f: common_vendor.o((...args) => $options.uploadpic && $options.uploadpic(...args))
  } : {
    g: $data.userInfo.avatar || $data.defHead,
    h: common_vendor.o((...args) => $options.onChooseAvatar && $options.onChooseAvatar(...args))
  }, {
    i: `请输入昵称`,
    j: $data.userInfo.nickname,
    k: $data.userInfo.avatar ? 1 : "",
    l: common_vendor.o((...args) => $options.formSubmit && $options.formSubmit(...args)),
    m: $props.isShow ? 1 : "",
    n: $data.canvasStatus
  }, $data.canvasStatus ? {
    o: _ctx.canvasWidth + "px",
    p: _ctx.canvasHeight + "px"
  } : {}, {
    q: $props.isShow
  }, $props.isShow ? {
    r: common_vendor.o(() => {
    }),
    s: common_vendor.o((...args) => $options.closeAttr && $options.closeAttr(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f7f0d621"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/eidtUserModal/index.js.map
