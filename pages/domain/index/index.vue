<template>
  <view class="wripper">
    <view class="content">
      <view class="same-module" v-for="(item, key) in menuList" :key="key">
        <view class="title">{{ item.title }}</view>
        <view class="list">
          <view
            class="item"
            v-for="(child, index) in item.list"
            :key="index"
            @click="navigateToPage(child)"
          >
            <image :src="child.icon" class="item-icon" />
            <view class="item-text">{{ child.label }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import list from "./menu";
import { USER_IDENTITY } from "@/const/index";
import { clearProjectStorage } from "@/utils/cache.js";
import { mapGetters } from "vuex";

const imgUrls =
  "https://7072-prod-cloud-env-9gqq29j68db5f470-1326719267.tcb.qcloud.la/miniprogram/images";
export default {
  data: function () {
    return {
      permission: ["tzzq", "fhzq", "sqzq", "lszq", "jfzq", "hbzq"],
    };
  },
  computed: {
    menuList() {
      return list.filter((item) => this.permission.includes(item.show));
    },
    ...mapGetters({
      isLogin: "isLogin",
    }),
  },
  methods: {
    navigateToPage(item) {
      if (!this.isLogin) {
        uni.navigateTo({
          url: "/pages/mine/login/index",
        });
        return;
      }
      const { route, isWeb } = item;
      if (!route)
        return uni.showToast({
          title: "功能开发中，敬请期待",
          icon: "none",
        }); // 如果 route 为空，则直接返回

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
  background: #f6f8ff;
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
            width: 110rpx;
            height: 110rpx;
            border-radius: 34rpx;
            margin-bottom: 14rpx;
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
