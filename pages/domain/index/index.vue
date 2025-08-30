@ -0,0 +1,272 @@
<template>
  <view class="wripper">
    <view class="content">
      <view class="same-module">
        <view class="title">项目专区</view>
        <view class="list">
          <view
            class="item"
            v-for="(item, key) in projectMenus"
            :key="key"
            @click="navigateToPage(item)"
          >
            <image :src="item.icon" class="item-icon" />
            <view class="item-text">{{ item.label }}</view>
          </view>
        </view>
      </view>
      <view class="same-module">
        <view class="title">积分专区</view>
        <view class="list">
          <view
            class="item"
            v-for="(item, key) in pointsMenus"
            :key="key"
            @click="navigateToPage(item)"
          >
            <image :src="item.icon" class="item-icon" />
            <view class="item-text">{{ item.label }}</view>
          </view>
        </view>
      </view>
      <view class="same-module" v-if="showDirectorModule">
        <view class="title">理事成员专区</view>
        <view class="list">
          <view
            class="item"
            v-for="(item, key) in directorMenus"
            :key="key"
            @click="navigateToPage(item)"
          >
            <image :src="item.icon" class="item-icon" />
            <view class="item-text">{{ item.label }}</view>
          </view>
        </view>
      </view>
      <view class="same-module" v-if="showCampusModule">
        <view class="title">校园合伙人专区</view>
        <view class="list">
          <view
            class="item"
            v-for="(item, key) in campusMenus"
            :key="key"
            @click="navigateToPage(item)"
          >
            <image :src="item.icon" class="item-icon" />
            <view class="item-text">{{ item.label }}</view>
          </view>
        </view>
      </view>
      <view class="same-module" v-if="showInvestorModule">
        <view class="title">社群专区</view>
        <view class="list">
          <view
            class="item"
            v-for="(item, key) in investMenus"
            :key="key"
            @click="navigateToPage(item)"
          >
            <image :src="item.icon" class="item-icon" />
            <view class="item-text">{{ item.label }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { USER_IDENTITY } from "@/const/index";
import { clearProjectStorage } from "@/utils/cache.js";
import { imgUrls } from "@/config/app";
export default {
  data: function () {
    return {
      userInfo: {},
      projectMenus: [
        {
          icon: `${imgUrls}/gn/icon_xm_fqxm.png`,
          label: "发起项目",
          iswebUrl: false,
          route: "/pages/project/apply/index",
        },
        {
          icon: `${imgUrls}/gn/icon_xm_xmjz.png`,
          label: "项目进展",
          iswebUrl: false,
          route: "/pages/project/evolve/index",
        },
        {
          icon: `${imgUrls}/gn/icon_xm_zlgx.png`,
          label: "资料更新",
          iswebUrl: false,
          route: "/projectPages/updateIndex/index",
        },
        {
          icon: `${imgUrls}/gn/icon_xm_lchzd.png`,
          label: "流程和制度",
          iswebUrl: false,
          route: "/explainPages/project/apply/index",
        },
        {
          icon: `${imgUrls}/gn/icon_xm_yfhxm.png`,
          label: "孵化项目",
          iswebUrl: false,
          route: "/projectPages/hatchList/index",
        },
      ],
      pointsMenus: [
        {
          icon: `${imgUrls}/gn/icon_jf_wdjf.png`,
          label: "我的积分",
          iswebUrl: false,
          route: "/pages/points/detail/index",
        },
        {
          icon: `${imgUrls}/gn/icon_jf_jfhq.png`,
          label: "积分获取",
          iswebUrl: false,
          route: "/explainPages/points/obtain/index",
        },
        {
          icon: `${imgUrls}/gn/icon_jf_glzd.png`,
          label: "管理制度",
          iswebUrl: false,
          route: "/explainPages/points/ruleState/index",
        },
      ],
      directorMenus: [
        {
          icon: `${imgUrls}/gn/icon_ls_ycyxm.png`,
          label: "已参与项目",
          iswebUrl: false,
          route: "/projectPages/directorJoined/index",
        },
        {
          icon: `${imgUrls}/gn/icon_ls_dqrxm.png`,
          label: "待确认项目",
          iswebUrl: false,
          route: "/projectPages/directorTBC/index",
        },
        {
          icon: `${imgUrls}/gn/icon_ls_wdht.png`,
          label: "我的合同",
          iswebUrl: false,
          route: "/pages/director/contract/index",
        },
      ],
      campusMenus: [
        {
          icon: `${imgUrls}/gn/icon_xy_dssq.png`,
          label: "大使申请",
          iswebUrl: false,
          route: "/campusPages/parter/apply/index",
        },
        {
          icon: `${imgUrls}/gn/icon_xy_jyzphb.png`,
          label: "经验值排行榜",
          iswebUrl: false,
          route: "/campusPages/experience/rankingList/index",
        },
        {
          icon: `${imgUrls}/gn/icon_xy_hdbm.png`,
          label: "校园活动",
          iswebUrl: false,
          route: "/campusPages/activity/list/index",
        },
      ],
      investMenus: [
        {
          icon: `${imgUrls}/gn/icon_tz_qbxm.png`,
          label: "全部项目",
          iswebUrl: false,
          route: "/projectPages/list/index",
        },
      ],
    };
  },
  onShow() {
    const userInfo = this.$Cache.get("USER_INFO");
    if (userInfo) this.userInfo = JSON.parse(userInfo)
    console.log(this.userInfo);
  },
  computed: {
    showPointModule() {
      if (!this.userInfo?.userTag) return true;
      return ["director", "admin"].includes(this.userInfo.userTag);
    },
    showCampusModule() {
      if (!this.userInfo?.userTag) return true;
      return ["ambassador", "partner", "campusManage", "admin"].includes(
        this.userInfo.userTag
      );
    },
    showDirectorModule() {
      if (!this.userInfo?.userTag) return false;
      return ["director", "admin"].includes(this.userInfo.userTag);
    },
    showInvestorModule() {
      if (!this.userInfo?.userTag) return false;
      return ["investor", "admin"].includes(this.userInfo.userTag);
    },
  },
  methods: {
    navigateToPage(item) {
      const { route, isWeb } = item;
      if (!route) return; // 如果 route 为空，则直接返回

      if (route === "/pages/project/apply/index") {
        clearProjectStorage();
      }

      let url = isWeb
        ? `/pages/web/index?url=${encodeURIComponent(route)}`
        : route;

      uni.navigateTo({
        url,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
page {
  background: #f4f4f4;
}

.wripper {
  width: 100%;
  position: relative;

  .content {
    width: 100%;
    box-sizing: border-box;
    padding: 24rpx;

    .same-module {
      width: 100%;
      background: #ffffff;
      border-radius: 24rpx;
      box-sizing: border-box;
      padding: 24rpx 24rpx 0rpx 24rpx;
      margin-bottom: 24rpx;

      .title {
        font-size: 32rpx;
        color: #2f3031;
        line-height: 48rpx;
        font-weight: bold;
      }

      .list {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 24rpx;

        .item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 25%;
          margin-bottom: 24rpx;

          .item-icon {
            width: 88rpx;
            height: 88rpx;
            border-radius: 34rpx;
            margin-bottom: 16rpx;
          }

          .item-text {
            font-size: 24rpx;
            color: #2f3031;
            line-height: 36rpx;
          }
        }
      }
    }
  }
}
</style>
