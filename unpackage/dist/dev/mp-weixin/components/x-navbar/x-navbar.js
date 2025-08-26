"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "x-navbar",
  props: {
    // 导航栏标题
    title: {
      type: String,
      default: ""
    },
    // 标题的颜色
    titleColor: {
      type: String,
      default: "#1A1A1A"
    },
    // 标题的宽度，单位rpx
    titleWidth: {
      type: [String, Number],
      default: "300"
    },
    // 标题的文字大小，单位rpx
    titleSize: {
      type: [String, Number],
      default: 32
    },
    // 返回箭头的颜色
    backIconColor: {
      type: String,
      default: "#333"
    },
    bgColor: {
      type: String,
      default: "#ffffff"
    },
    // 对象形式，因为用户可能定义一个纯色，或者线性渐变的颜色
    background: {
      type: Object,
      default() {
        return {
          background: "#ffffff"
        };
      }
    },
    // 导航栏是否固定在顶部
    isFixed: {
      type: Boolean,
      default: true
    },
    // 自定义返回逻辑
    customBack: {
      type: Function,
      default: null
    },
    // 判断是否改变顶部
    navStatus: {
      type: Boolean,
      default: true
    },
    // 是否显示左侧箭头
    letfArrow: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    const props = __props;
    let systemInfo = common_vendor.index.getSystemInfoSync();
    const statusBarHeight = common_vendor.ref(systemInfo.statusBarHeight);
    const titleStyle = common_vendor.computed(() => {
      return {
        width: common_vendor.index.upx2px(Number(props.titleWidth)) + "px",
        color: props.titleColor,
        fontSize: common_vendor.index.upx2px(Number(props.titleSize)) + "px"
      };
    });
    const navbarHeight = common_vendor.computed(() => systemInfo.platform === "android" ? 48 : 44);
    const navbarInnerStyle = common_vendor.computed(() => {
      return {
        height: navbarHeight.value + "px"
      };
    });
    const goBack = () => {
      if (typeof props.customBack === "function") {
        props.customBack();
      } else {
        common_vendor.index.navigateBack();
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: statusBarHeight.value + "px",
        b: __props.letfArrow
      }, __props.letfArrow ? {
        c: __props.backIconColor,
        d: common_vendor.o(goBack)
      } : {}, {
        e: __props.title
      }, __props.title ? {
        f: common_vendor.t(__props.title),
        g: common_vendor.s(titleStyle.value)
      } : {}, {
        h: Number(navbarHeight.value) + "px",
        i: common_vendor.s(navbarInnerStyle.value),
        j: __props.isFixed ? 1 : "",
        k: common_vendor.s(__props.background),
        l: common_vendor.s({
          background: __props.bgColor
        }),
        m: __props.isFixed
      }, __props.isFixed ? {
        n: Number(navbarHeight.value) + statusBarHeight.value + "px"
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-709aa875"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/x-navbar/x-navbar.js.map
