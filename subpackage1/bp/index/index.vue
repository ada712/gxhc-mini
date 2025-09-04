<template>
  <view class="pages">
    <div class="more">
      <text class="more-t" @click="goMore">查看历史记录</text>
      <image
        class="right-icon"
        src="/cloud/miniprogram/images/icons/icon-black-right.png"
      ></image>
    </div>
    <view class="upload" @click="goPage">
      <image
        class="upload-img"
        src="/cloud/miniprogram/images/subpackage1/upload-icon.png"
      ></image>
    </view>
    <div class="tips">
      <view class="line">
        <text class="d-p">注意事项</text>
        <text class="d-p">报告获取时间十分钟，完成后会通过短信通知</text>
      </view>
      <text class="d-p">免责申明</text>
      <text class="d-p"
        >1.本工具生成内容完全由AI自动生成，信息内容来源于用户上传文件和全网信息，模型经过调优依然可能存在幻觉现象，不保证内容真实性，仅供参考</text
      >
      <text class="d-p"
        >2.用户上传文件仅用于模型分析，未经授权不会用于商业目的</text
      >
    </div>
  </view>
</template>

<script>
import { imgUrls } from "@/config/app";
export default {
  data: function () {
    return {};
  },
  methods: {
    goMore() {
      uni.navigateTo({
        url: '/subpackage1/bp/list/index',
      });
    },
    goPage() {
      uni.navigateTo({
        url: '/subpackage1/bp/result/base/index',
      });
    }
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
  .more {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 24rpx 32rpx;
    .more-t {
      color: #182855;
      font-size: 28rpx;
      font-weight: 400;
      margin-right: 20rpx;
    }
    .right-icon {
      width: 14.2rpx;
      height: 24.8rpx;
    }
  }

  .upload {
    margin: 0 32rpx;
    border-radius: 28rpx;
    opacity: 1;
    background: #ffffff;
    padding: 26rpx 24rpx 20rpx 24rpx;
    box-sizing: border-box;
    .upload-img {
      width: 100%;
      height: 200rpx;
      border-radius: 8rpx;
    }
  }

  .tips {
    margin: 34rpx 48rpx;
    .line {
      margin-bottom: 30rpx;
    }
    .d-p {
      display: block;
      color: #60738e;
      font-size: 22rpx;
      font-weight: 400;
      line-height: 36.82rpx;
    }
  }
}
</style>
