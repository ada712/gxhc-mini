"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_game = require("../../../api/game.js");
const config_app = require("../../../config/app.js");
const _sfc_main = {
  data() {
    return {
      pic: config_app.HTTP_REQUEST_URL + "/statics/system_images/order_complete.gif",
      order_id: "",
      status: {},
      //订单底部按钮状态
      orderInfo: {
        gameInfo: {}
      },
      userInfo: {}
    };
  },
  onLoad(options) {
    if (options.order_id)
      this.order_id = options.order_id;
    this.getOrderDetails();
  },
  methods: {
    getOrderDetails() {
      api_game.orderDetails({
        id: this.order_id
      }).then((res) => {
        if (res.status == 200) {
          this.orderInfo = res.data;
        }
      }).catch((err) => {
      });
    },
    /**
     * 取消订单
     *
     */
    cancelOrder: function() {
      let that = this;
      if (!this.order_id)
        return that.$util.Tips({
          title: `缺少订单号无法取消订单`
        });
      common_vendor.index.showModal({
        title: `提示`,
        content: `确认取消该订单`,
        success: function(res) {
          if (res.confirm) {
            api_game.applyAudit({
              id: that.order_id,
              cancelStatus: 1
            }).then((res2) => {
              return that.$util.Tips(
                {
                  title: res2.msg,
                  icon: "success"
                },
                function() {
                  that.getOrderDetails();
                }
              );
            }).catch((err) => {
              return that.$util.Tips({
                title: err
              });
            });
          } else if (res.cancel)
            ;
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.pic,
    b: $data.orderInfo.status == 0
  }, $data.orderInfo.status == 0 ? {} : $data.orderInfo.status == 2 ? {} : $data.orderInfo.status == 3 ? {} : $data.orderInfo.gameInfo.status == 0 ? {} : $data.orderInfo.gameInfo.status == 1 ? {} : $data.orderInfo.gameInfo.status == 2 ? {} : $data.orderInfo.gameInfo.status == 3 ? {} : {}, {
    c: $data.orderInfo.status == 2,
    d: $data.orderInfo.status == 3,
    e: $data.orderInfo.gameInfo.status == 0,
    f: $data.orderInfo.gameInfo.status == 1,
    g: $data.orderInfo.gameInfo.status == 2,
    h: $data.orderInfo.gameInfo.status == 3,
    i: $data.orderInfo.status == 1
  }, $data.orderInfo.status == 1 ? {
    j: common_vendor.t($data.orderInfo.gameInfo.gameProgress)
  } : {}, {
    k: common_vendor.t($data.orderInfo._add_time),
    l: common_vendor.n([3, 2].includes($data.orderInfo.status) ? "on" : ""),
    m: common_vendor.n([3, 2].includes($data.orderInfo.status) ? "on" : ""),
    n: $data.orderInfo.status == 1
  }, $data.orderInfo.status == 1 ? {
    o: common_vendor.s("width:" + $data.orderInfo.gameInfo.progress + "%;"),
    p: common_vendor.t($data.orderInfo.gameInfo.progress)
  } : {}, {
    q: common_vendor.t($data.orderInfo.gameInfo.app_name || ""),
    r: common_vendor.t($data.orderInfo.gameInfo.appid || ""),
    s: $data.orderInfo.status == 1
  }, $data.orderInfo.status == 1 ? {
    t: common_vendor.t($data.orderInfo.gameInfo.total_day || ""),
    v: common_vendor.t($data.orderInfo.gameInfo.remit || ""),
    w: common_vendor.t($data.orderInfo.gameInfo.dk_start_day || ""),
    x: common_vendor.t($data.orderInfo.gameInfo.start_time || ""),
    y: common_vendor.t($data.orderInfo.gameInfo.end_time || "")
  } : {}, {
    z: common_vendor.t($data.orderInfo.order_id),
    A: common_vendor.o(($event) => _ctx.copy($data.orderInfo.order_id)),
    B: common_vendor.t($data.orderInfo._add_time || ""),
    C: $data.orderInfo.status == 1
  }, $data.orderInfo.status == 1 ? {} : $data.orderInfo.status == 0 ? {} : $data.orderInfo.status == 2 ? {} : $data.orderInfo.status == 3 ? {} : {}, {
    D: $data.orderInfo.status == 0,
    E: $data.orderInfo.status == 2,
    F: $data.orderInfo.status == 3,
    G: $data.orderInfo.status == 0
  }, $data.orderInfo.status == 0 ? {
    H: common_vendor.o((...args) => $options.cancelOrder && $options.cancelOrder(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2bc5e661"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/goods/order_details/index.js.map
