<template>
  <view class="pages">
    <view class="content">
      <text class="title">2024 年度新能源产业链投资分析报告</text>
      <view class="bp"></view>
    </view>
    <view class="btn" @click="showPopup = true">
      <text class="btn-t">报告下载（5元/份）</text>
    </view>
    <view class="tip">
      <text class="tip-t">会员免费，免费成为会员</text>
    </view>

    <view class="mask" v-if="showPopup">
      <view class="popup">
        <view class="popup-content">
          <text class="title">报告下载</text>
          <text class="p-t">报告下载 5元/份 </text>
          <text class="p-t">社区会员可免费下载</text>
          <text class="p-t2">成为会员</text>
        </view>
        <view class="popup-btns">
          <view class="popup-btn" @click="showPopup = false">
            <text class="popup-btn-t1">取消</text>
          </view>
          <view class="popup-btn">
            <text class="popup-btn-t2">确认付费</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { imgUrls } from "@/config/app";
export default {
  data: function () {
    return {
      showPopup: false,
    };
  },
  methods: {},
};
</script>

<style>
page {
  background: #f5f8ff;
}
</style>
<style lang="scss" scoped>
.pages {
  padding-bottom: 50rpx;
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(#000000, 0.3);
    z-index: 9;
    .popup {
      margin: 50% 100rpx 0 100rpx;
      border-radius: 16rpx;
      opacity: 1;
      border: 0 solid #979797;
      background: #ffffff;
      .popup-content {
        min-height: 200rpx;
        text-align: center;
        padding: 48rpx 0;
        .title {
          display: block;
          color: #1a1a1a;
          text-align: center;
          font-size: 32rpx;
          font-weight: 500;
          margin-bottom: 30rpx;
        }
        .p-t {
          display: block;
          color: #404040;
          text-align: center;
          font-size: 28rpx;
          font-weight: 400;
          margin-top: 3rpx;
        }
        .p-t2 {
          margin-top: 4rpx;
          color: #08418f;
          text-align: center;
          font-size: 28rpx;
          font-weight: 500;
        }
      }
      .popup-btns {
        display: flex;
        align-items: center;
        .popup-btn {
          width: 50%;
          padding: 22rpx 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-top: 1px solid #f6f6f6;
          &:last-child {
            border-left: 1px solid #f6f6f6;
          }
          .popup-btn-t1 {
            color: #404040;
            text-align: center;
            font-size: 32rpx;
            font-weight: 400;
          }
          .popup-btn-t2 {
            color: #2969ff;
            text-align: center;
            font-size: 32rpx;
            font-weight: 400;
          }
        }
      }
    }
  }
  .content {
    margin: 24rpx 32rpx;
    border-radius: 28rpx;
    background: #ffffff;
    padding: 20rpx 24rpx;
    .title {
      color: #182855;
      font-size: 24rpx;
      font-weight: 600;
    }
    .bp {
      height: 500px;
    }
  }
  .btn {
    margin: 38rpx 76rpx 0 76rpx;
    height: 88rpx;
    border-radius: 300rpx;
    opacity: 1;
    background: #2969ff;
    display: flex;
    align-items: center;
    justify-content: center;
    .btn-t {
      color: #ffffff;
      font-size: 28rpx;
      font-weight: 400;
    }
  }
  .tip {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 22rpx;
    .tip-t {
      color: #2969ff;
      font-size: 28rpx;
      font-weight: 400;
      text-align: center;
    }
  }
}
</style>
