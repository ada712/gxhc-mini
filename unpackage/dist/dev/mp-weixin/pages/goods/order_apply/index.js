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
      orderList: [],
      //订单数组
      orderData: {}
      //订单详细统计
    };
  },
  onLoad(options) {
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
      api_game.orderApplyList({
        page: this.page,
        limit: this.limit
      }).then((res) => {
        if (res.status == 200) {
          let list = res.data.list || [];
          let loadend = list.length < this.limit;
          this.orderList = this.$util.SplitArray(list, this.orderList);
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
    auditOrder: function(index, order_id, status) {
      let that = this;
      if (!order_id)
        return that.$util.Tips({
          title: `缺少订单号无法审核订单`
        });
      common_vendor.index.showModal({
        title: `提示`,
        content: `确认审核该订单`,
        success: function(res) {
          if (res.confirm) {
            api_game.applyAudit({
              id: order_id,
              auditStatus: status
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
    b: common_vendor.f($data.orderList, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item._add_time),
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
        k: common_vendor.t(item.userInfo.nickname),
        l: common_vendor.t(item.userInfo.uid),
        m: common_vendor.o(($event) => $options.auditOrder(index, item.id, 2), index),
        n: common_vendor.o(($event) => $options.auditOrder(index, item.id, 1), index),
        o: index
      });
    }),
    c: $data.orderList.length > 0
  }, $data.orderList.length > 0 ? {
    d: $data.loading,
    e: common_vendor.t($data.loadTitle)
  } : {}, {
    f: $data.orderList.length == 0
  }, $data.orderList.length == 0 ? common_vendor.e({
    g: !$data.loading
  }, !$data.loading ? {
    h: common_vendor.p({
      title: `暂无游戏`
    })
  } : {}, {
    i: $data.loading
  }) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0728e743"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/goods/order_apply/index.js.map
