<template>
  <view class="pages">
    <view class="base">
      <image class="icon" :src="imgUrl + '/subpackage1/base-icon3.png'" />
      <text class="title">解锁成功</text>
      <text class="desc">恭喜您，已成功解锁BP诊断报告Plus版</text>
      <view class="btn">
        <text class="btn-t">立即在线查看</text>
      </view>
      <text class="tip">下裁PDF版</text>
    </view>
  </view>
</template>

<script>
import { imgUrls } from "@/config/app";
export default {
  data: function () {
    return {
      imgUrl: imgUrls,
    };
  },
  methods: {
    goPage() {
      uni.navigateTo({
        url: "/bp/result/base/index",
      });
    },
  },
};
</script>

<style>
page {
  background: #f5f8ff;
}
</style>
<style lang="scss" scoped>
.pages {
  padding-bottom: 80rpx;
  .base {
    margin: 40rpx 32rpx 0 32rpx;
    border-radius: 28rpx;
    background: #ffffff;
    padding: 0rpx 24rpx 40rpx 24rpx;
    text-align: center;
    .icon {
      width: 336rpx;
      height: 336rpx;
      display: block;
      margin: 0 auto;
    }
    .title {
      display: block;
      color: #444444;
      text-align: center;
      font-size: 42rpx;
      font-weight: 500;
    }
    .desc {
      display: block;
      color: #999999;
      text-align: center;
      font-size: 28rpx;
      font-weight: 400;
      margin-top: 16rpx;
    }
    .btn {
      height: 88rpx;
      border-radius: 300rpx;
      margin: 40rpx 52rpx 0 52rpx;
      background: #2969ff;
      display: flex;
      align-items: center;
      justify-content: center;
      .btn-t {
        color: #ffffff;
        text-align: center;
        font-size: 28rpx;
        font-weight: 400;
      }
    }
    .tip {
      color: #2969ff;
      font-size: 28rpx;
      font-weight: 400;
      margin-top: 40rpx;
      display: block;
    }
  }
}
</style>
