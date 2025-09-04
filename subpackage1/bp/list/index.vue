<template>
  <view class="pages">
    <view class="content">
      <view
        class="item"
        @click="goPage(1)"
        v-for="(item, key) in 10"
        :key="key"
      >
        <item class="top">
          <text class="title">BP文件名称名称名称名称名称名称名...</text>
          <view class="more">
            <text class="more-t">查看BP详情</text>
            <image
              class="right-icon"
              src="/cloud/miniprogram/images/icons/icon-black-right.png"
            ></image>
          </view>
        </item>
        <text class="time">2065 - 01 - 17 06:52</text>
      </view>
    </view>
  </view>
</template>

<script>
import { imgUrls } from "@/config/app";
export default {
  data: function () {
    return {};
  },
  methods: {
    goPage(id) {
      uni.navigateTo({
        url: "/subpackage1/bp/detail/index?id" + id,
      });
    },
  },
};
</script>

<style>
page {
  background: #f5f8ff;
  padding-bottom: 40rpx;
}
</style>
<style lang="scss" scoped>
.pages {
  .content {
    margin: 24rpx 32rpx;
    border-radius: 28rpx;
    background: #ffffff;
    padding: 6rpx 24rpx;
    .item {
      padding: 30rpx 0 20rpx 0;
      border-bottom: 1px solid #f3f3f3;
      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .time {
        color: #182855;
        font-size: 22rpx;
        font-weight: 400;
      }
      &:last-child {
        border: none;
      }
      .title {
        color: #182855;
        font-size: 24rpx;
        font-weight: 600;
      }
      .more {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .more-t {
          color: #182855;
          font-size: 24rpx;
          font-weight: 400;
          margin-right: 20rpx;
        }
        .right-icon {
          width: 14.2rpx;
          height: 24.8rpx;
        }
      }
    }
  }
}
</style>
