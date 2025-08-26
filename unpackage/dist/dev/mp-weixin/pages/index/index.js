"use strict";
const common_vendor = require("../../common/vendor.js");
const api_game = require("../../api/game.js");
require("../../utils/cache.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      src: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/4a/67/86/4a67863c-5006-4b2e-792f-293c793173b0/AppIcon-1x_U007emarketing-0-8-0-85-220-0.png/180x180bb.png",
      logo: common_assets.logo,
      page: 1,
      limit: 10,
      loading: false,
      //是否加载中
      loadend: false,
      //是否加载完毕
      loadTitle: `加载更多`,
      //提示语
      gameList: []
    };
  },
  computed: {
    ...common_vendor.mapGetters({
      isLogin: "isLogin"
    })
  },
  onLoad(options) {
    this.getGameList();
  },
  methods: {
    getGameList() {
      api_game.gameList({
        page: this.page,
        limit: this.limit
      }).then((res) => {
        if (res.status == 200) {
          let list = res.data.list || [];
          let loadend = list.length < this.limit;
          this.gameList = this.$util.SplitArray(list, this.gameList);
          this.loadend = loadend;
          this.loading = false;
          this.loadTitle = loadend ? `没有更多内容啦~` : `加载更多`;
          this.page = this.page + 1;
        }
      });
    },
    goDetails(gid) {
      common_vendor.index.navigateTo({
        url: "/pages/goods_details/index?gid=" + gid
      });
    }
  },
  onReachBottom: function() {
    this.getGameList();
  }
};
if (!Array) {
  const _easycom_x_navbar2 = common_vendor.resolveComponent("x-navbar");
  const _easycom_x_empty_page2 = common_vendor.resolveComponent("x-empty-page");
  (_easycom_x_navbar2 + _easycom_x_empty_page2)();
}
const _easycom_x_navbar = () => "../../components/x-navbar/x-navbar.js";
const _easycom_x_empty_page = () => "../../components/x-empty-page/x-empty-page.js";
if (!Math) {
  (_easycom_x_navbar + _easycom_x_empty_page)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.logo,
    b: common_vendor.p({
      letfArrow: false
    }),
    c: common_vendor.f($data.gameList, (item, key, i0) => {
      return common_vendor.e({
        a: common_vendor.t(key + 1),
        b: key < 3 ? 1 : "",
        c: common_vendor.t(key + 1)
      }, _ctx.isLogin ? {} : {}, {
        d: key,
        e: common_vendor.o(($event) => $options.goDetails(item.gid), key)
      });
    }),
    d: $data.src,
    e: _ctx.isLogin,
    f: $data.gameList.length > 0
  }, $data.gameList.length > 0 ? {
    g: $data.loading,
    h: common_vendor.t($data.loadTitle)
  } : $data.gameList.length == 0 ? common_vendor.e({
    j: !$data.loading
  }, !$data.loading ? {
    k: common_vendor.p({
      title: `暂无游戏`
    })
  } : {}, {
    l: $data.loading
  }) : {}, {
    i: $data.gameList.length == 0
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
