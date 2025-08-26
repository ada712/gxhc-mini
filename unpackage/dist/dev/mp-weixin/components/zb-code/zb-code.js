"use strict";
const common_vendor = require("../../common/vendor.js");
const components_zbCode_qrcode = require("./qrcode.js");
let qrcode;
const _sfc_main = {
  name: "zb-code",
  props: {
    cid: {
      type: String,
      default: "zb-code-canvas"
    },
    size: {
      type: Number,
      default: 200
    },
    unit: {
      type: String,
      default: "upx"
    },
    show: {
      type: Boolean,
      default: true
    },
    val: {
      type: String,
      default: ""
    },
    background: {
      type: String,
      default: "#ffffff"
    },
    foreground: {
      type: String,
      default: "#000000"
    },
    pdground: {
      type: String,
      default: "#000000"
    },
    icon: {
      type: String,
      default: ""
    },
    iconSize: {
      type: Number,
      default: 40
    },
    lv: {
      type: Number,
      default: 3
    },
    onval: {
      type: Boolean,
      default: false
    },
    loadMake: {
      type: Boolean,
      default: false
    },
    usingComponents: {
      type: Boolean,
      default: true
    },
    showLoading: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: "二维码生成中"
    }
  },
  data() {
    return {
      result: ""
    };
  },
  methods: {
    _makeCode() {
      let that = this;
      if (!this._empty(this.val)) {
        qrcode = new components_zbCode_qrcode.QRCode({
          context: that,
          // 上下文环境
          canvasId: that.cid,
          // canvas-id
          usingComponents: that.usingComponents,
          // 是否是自定义组件
          showLoading: that.showLoading,
          // 是否显示loading
          loadingText: that.loadingText,
          // loading文字
          text: that.val,
          // 生成内容
          size: that.cpSize,
          // 二维码大小
          background: that.background,
          // 背景色
          foreground: that.foreground,
          // 前景色
          pdground: that.pdground,
          // 定位角点颜色
          correctLevel: that.lv,
          // 容错级别
          image: that.icon,
          // 二维码图标
          imageSize: that.iconSize,
          // 二维码图标大小
          cbResult: function(res) {
            that._result(res);
          }
        });
      } else {
        common_vendor.index.showToast({
          title: "二维码内容不能为空",
          icon: "none",
          duration: 2e3
        });
      }
    },
    _clearCode() {
      this._result("");
      qrcode.clear();
    },
    _saveCode() {
      let that = this;
      if (this.result != "") {
        common_vendor.index.saveImageToPhotosAlbum({
          filePath: that.result,
          success: function() {
            common_vendor.index.showToast({
              title: "二维码保存成功",
              icon: "success",
              duration: 2e3
            });
          }
        });
      }
    },
    _result(res) {
      this.result = res;
      this.$emit("result", res);
    },
    _empty(v) {
      let tp = typeof v, rt = false;
      if (tp == "number" && String(v) == "") {
        rt = true;
      } else if (tp == "undefined") {
        rt = true;
      } else if (tp == "object") {
        if (JSON.stringify(v) == "{}" || JSON.stringify(v) == "[]" || v == null)
          rt = true;
      } else if (tp == "string") {
        if (v == "" || v == "undefined" || v == "null" || v == "{}" || v == "[]")
          rt = true;
      } else if (tp == "function") {
        rt = false;
      }
      return rt;
    }
  },
  watch: {
    size: function(n, o) {
      if (n != o && !this._empty(n)) {
        this.cSize = n;
        if (!this._empty(this.val)) {
          setTimeout(() => {
            this._makeCode();
          }, 100);
        }
      }
    },
    val: function(n, o) {
      if (this.onval) {
        if (n != o && !this._empty(n)) {
          setTimeout(() => {
            this._makeCode();
          }, 0);
        }
      }
    }
  },
  computed: {
    cpSize() {
      if (this.unit == "upx") {
        return common_vendor.index.upx2px(this.size);
      } else {
        return this.size;
      }
    }
  },
  mounted() {
    if (this.loadMake) {
      if (!this._empty(this.val)) {
        setTimeout(() => {
          this._makeCode();
        }, 0);
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $props.cid,
    b: $options.cpSize + "px",
    c: $options.cpSize + "px",
    d: $props.show,
    e: $data.result,
    f: $options.cpSize + "px",
    g: $options.cpSize + "px"
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/zb-code/zb-code.js.map
