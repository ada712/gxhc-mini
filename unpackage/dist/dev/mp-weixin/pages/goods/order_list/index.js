"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_game = require("../../../api/game.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      page: 1,
      limit: 10,
      loading: false,
      //是否加载中
      loadend: false,
      //是否加载完毕
      loadTitle: `加载更多`,
      //提示语
      orderStatus: -1,
      //订单状态
      orderList: [],
      //订单数组
      orderData: {}
      //订单详细统计
    };
  },
  onLoad(options) {
    if (options.status)
      this.orderStatus = options.status;
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      if (this.loadend)
        return;
      if (this.loading)
        return;
      this.loading = true;
      this.loadTitle = `加载更多`;
      api_game.orderList({
        status: this.orderStatus,
        page: this.page,
        limit: this.limit
      }).then((res) => {
        if (res.status == 200) {
          let list = res.data.list || [];
          let loadend = list.length < this.limit;
          this.orderList = this.$util.SplitArray(list, this.orderList);
          this.orderData = res.data.orderData;
          this.loadend = loadend;
          this.loading = false;
          this.loadTitle = loadend ? `没有更多内容啦~` : `加载更多`;
          this.page = this.page + 1;
        }
      }).catch((err) => {
        this.loading = false;
        this.loadTitle = `加载更多`;
      });
    },
    /**
     * 取消订单
     *
     */
    cancelOrder: function(index, order_id) {
      let that = this;
      if (!order_id)
        return that.$util.Tips({
          title: `缺少订单号无法取消订单`
        });
      common_vendor.index.showModal({
        title: `提示`,
        content: `确认取消该订单`,
        success: function(res) {
          if (res.confirm) {
            api_game.applyAudit({
              id: order_id,
              cancelStatus: 1
            }).then((res2) => {
              return that.$util.Tips(
                {
                  title: res2.msg,
                  icon: "success"
                },
                function() {
                  that.orderList.splice(index, 1);
                  that.$set(that, "orderList", that.orderList);
                  that.getOrderList();
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
    },
    /**
     * 切换类型
     */
    statusClick(status) {
      if (status == this.orderStatus)
        return;
      this.orderStatus = status;
      this.loadend = false;
      this.page = 1;
      this.orderList = [];
      this.getOrderList();
    },
    /**
     * 去订单详情
     */
    goOrderDetails(order_id) {
      common_vendor.index.navigateTo({
        url: "/pages/goods/order_details/index?order_id=" + order_id
      });
    }
  },
  onReachBottom: function() {
    this.getOrderList();
  }
};
if (!Array) {
  const _easycom_x_empty_page2 = common_vendor.resolveComponent("x-empty-page");
  _easycom_x_empty_page2();
}
const _easycom_x_empty_page = () => "../../../components/x-empty-page/x-empty-page.js";
if (!Math) {
  _easycom_x_empty_page();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0$1,
    b: common_vendor.t($data.orderData.all || 0),
    c: common_vendor.n($data.orderStatus == -1 ? "on" : ""),
    d: common_vendor.o(($event) => $options.statusClick(-1)),
    e: common_vendor.t($data.orderData.dsh || 0),
    f: common_vendor.n($data.orderStatus == 0 ? "on" : ""),
    g: common_vendor.o(($event) => $options.statusClick(0)),
    h: common_vendor.t($data.orderData.dks || 0),
    i: common_vendor.n($data.orderStatus == 1 ? "on" : ""),
    j: common_vendor.o(($event) => $options.statusClick(1)),
    k: common_vendor.t($data.orderData.jxz || 0),
    l: common_vendor.n($data.orderStatus == 2 ? "on" : ""),
    m: common_vendor.o(($event) => $options.statusClick(2)),
    n: common_vendor.t($data.orderData.ddk || 0),
    o: common_vendor.n($data.orderStatus == 3 ? "on" : ""),
    p: common_vendor.o(($event) => $options.statusClick(3)),
    q: common_vendor.f($data.orderList, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.order_id),
        b: item.status == 0
      }, item.status == 0 ? {} : item.status == 2 ? {} : item.status == 3 ? {} : item.gameInfo.status == 0 ? {} : item.gameInfo.status == 1 ? {} : item.gameInfo.status == 2 ? {} : item.gameInfo.status == 3 ? {} : {}, {
        c: item.status == 2,
        d: item.status == 3,
        e: item.gameInfo.status == 0,
        f: item.gameInfo.status == 1,
        g: item.gameInfo.status == 2,
        h: item.gameInfo.status == 3,
        i: common_vendor.t(item.gameInfo.app_name),
        j: common_vendor.t(item.gameInfo.appid),
        k: item.status == 1
      }, item.status == 1 ? {
        l: common_vendor.t(item.gameInfo.total_day),
        m: common_vendor.t(item.gameInfo.remit)
      } : {}, {
        n: item.status == 1
      }, item.status == 1 ? {
        o: common_vendor.s("width:" + item.gameInfo.progress + "%;"),
        p: common_vendor.t(item.gameInfo.progress)
      } : {}, {
        q: common_vendor.o(($event) => $options.goOrderDetails(item.id), index),
        r: item.status == 1
      }, item.status == 1 ? {
        s: common_vendor.t(item.gameInfo.gameProgress)
      } : {}, {
        t: item.status == 0
      }, item.status == 0 ? {
        v: common_vendor.o(($event) => $options.cancelOrder(index, item.id), index)
      } : {}, {
        w: common_vendor.o(($event) => $options.goOrderDetails(item.id), index),
        x: index
      });
    }),
    r: $data.orderList.length > 0
  }, $data.orderList.length > 0 ? {
    s: $data.loading,
    t: common_vendor.t($data.loadTitle)
  } : {}, {
    v: $data.orderList.length == 0
  }, $data.orderList.length == 0 ? common_vendor.e({
    w: !$data.loading
  }, !$data.loading ? {
    x: common_vendor.p({
      title: `暂无游戏`
    })
  } : {}, {
    y: $data.loading
  }) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0fd83329"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/goods/order_list/index.js.map
