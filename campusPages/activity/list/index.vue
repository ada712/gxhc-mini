<template>
  <view class="activity-list">
    <block v-if="list.lenght > 0">
      <view
        class="item"
        bind:tap="goActivityIntro"
        v-for="(item, key) in list"
        :key="key"
      >
        <image :src="item.banner" class="banner" />
        <view class="name">{{ item.title }}</view>
        <view class="row">
          <view class="subtitle">{{ item.subtitle }}</view>
          <view class="end-time">截止时间：2024-09-31</view>
        </view>
      </view>
    </block>
    <block v-else>
      <view class="empty-row">最近暂无活动</view>
    </block>
  </view>
</template>

<script>
import { imgUrls } from "@/config/app";
export default {
  data: function () {
    return {
      imgPath: imgUrls,
      list: [],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.activity-list {
  width: 100%;
  box-sizing: border-box;
  padding: 32rpx 24rpx;
  .item {
    width: 100%;
    border-radius: 24rpx;
    background: #ffffff;
    margin-bottom: 24rpx;
    box-sizing: border-box;
    padding: 24rpx;
    position: relative;
    .banner {
      width: 100%;
      height: 210rpx;
      border-radius: 12rpx;
      margin-bottom: 4rpx;
    }
    .name {
      font-size: 32rpx;
      color: #2f3031;
      line-height: 48rpx;
      font-weight: bold;
      margin-bottom: 8rpx;
    }
    .subtitle {
      font-size: 24rpx;
      color: rgba(47, 48, 49, 0.5);
      line-height: 36rpx;
    }
    .end-time {
      font-size: 24rpx;
      color: rgba(47, 48, 49, 0.5);
      line-height: 36rpx;
    }
    .row {
      display: flex;
      width: 100%;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }

  .empty-row {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20rpx;
    font-size: 24rpx;
    color: rgba(47, 48, 49, 0.75);
    line-height: 36rpx;
    width: 100%;
    height: 500rpx;
  }
}
</style>
