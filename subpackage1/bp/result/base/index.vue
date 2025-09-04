<template>
  <view class="pages">
    <view class="base">
      <image class="icon" :src="imgUrl + '/subpackage1/base-icon.png'" />
      <text class="title">解锁成功</text>
      <text class="desc">恭喜您，已成功解锁BP诊断报告Base版</text>
      <view class="btn">
        <text class="btn-t">立即在线查看</text>
      </view>
      <text class="tip">下裁PDF版</text>
    </view>
    <view class="icon-list">
      <view class="icon1">
        <image class="img" :src="imgUrl + '/subpackage1/base-icon1.png'" />
      </view>
      <view class="icon2">
        <image
          @click="sharePopup = true"
          class="img"
          :src="imgUrl + '/subpackage1/base-icon2.png'"
        />
        <view class="rule" @click="goPage(1)">
          <text class="rule1">能量与邀请规则</text>
          <text class="rule2">查看</text>
        </view>
      </view>
    </view>
    <view class="introduce">
      <view class="title">
        <text class="title-t">诊断样本案例</text>
        <view class="more">
          <text class="more-t">查看更多</text>
          <image
            class="right-icon"
            src="/cloud/miniprogram/images/icons/icon-black-right.png"
          ></image>
        </view>
      </view>
      <view class="item" v-for="(item, key) in 2" :key="key">
        <item class="top">
          <text class="title">东风证券公司诊断结果名称名称可改...</text>
          <view class="more">
            <text class="more-t">查看诊断详情</text>
            <image
              class="right-icon"
              src="/cloud/miniprogram/images/icons/icon-black-right.png"
            ></image>
          </view>
        </item>
        <text class="time">2065 - 01 - 17 06:52</text>
      </view>
    </view>

    <x-popup :round="20" :show="sharePopup" @close="sharePopup = false">
      <view class="popup">
        <view class="head">
          <text class="title">邀请会员获取能量</text>
          <image
            @click="sharePopup = false"
            class="close"
            :src="imgUrl + '/subpackage1/close.png'"
          />
        </view>
        <view class="list">
          <view class="item">
            <image class="item-icon" :src="imgUrl + '/subpackage1/lj.png'" />
            <text class="item-t">分享链接</text>
          </view>
          <view class="item">
            <image class="item-icon" :src="imgUrl + '/subpackage1/hy.png'" />
            <text class="item-t">微信好友</text>
          </view>
          <view class="item">
            <image class="item-icon" :src="imgUrl + '/subpackage1/pyq.png'" />
            <text class="item-t">朋友圈</text>
          </view>
        </view>
      </view>
    </x-popup>
  </view>
</template>

<script>
import { imgUrls } from "@/config/app";
export default {
  data: function () {
    return {
      imgUrl: imgUrls,
      sharePopup: false,
    };
  },
  methods: {
    goPage(type) {
      if (type == 1) {
        uni.navigateTo({
          url: "/subpackage1/energy/index/index",
        });
      }
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
  .popup {
    height: 468rpx;
    .head {
      margin: 32rpx 30rpx;
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: center;
      position: relative;
      .close {
        position: absolute;
        right: 0;
        top: 0;
        width: 48rpx;
        height: 48rpx;
      }
    }
    .list {
      display: flex;
      align-items: center;
      text-align: center;
      margin: 50rpx 60rpx 0 60rpx;
      .item {
        margin-right: 66rpx;
        &:last-child {
          margin-right: 0;
        }
        .item-icon {
          width: 96rpx;
          height: 96rpx;
          display: block;
        }
        .item-t {
          color: #1b2132;
          font-size: 28rpx;
          margin-top: 20rpx;
          display: block;
          font-weight: 500;
        }
      }
    }
  }
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
  .icon-list {
    margin: 24rpx 32rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .img {
      width: 100%;
      height: 100%;
    }
    .icon1 {
      width: 338rpx;
      height: 120rpx;
    }
    .icon2 {
      width: 332rpx;
      height: 114rpx;
      position: relative;
      .rule {
        border-radius: 28rpx;
        padding: 18rpx 26rpx;
        background: #ffffff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: absolute;
        width: 332rpx;
        box-sizing: border-box;
        bottom: -70rpx;
        left: 0;
        .rule1 {
          color: #182855;
          text-align: left;
          font-size: 24rpx;
          font-weight: 400;
        }
        .rule2 {
          color: #e96f03;
          text-align: right;
          font-size: 24rpx;
          font-weight: 600;
        }
      }
    }
  }
  .introduce {
    margin: 90rpx 24rpx 0 24rpx;
    border-radius: 28rpx;
    background: #ffffff;
    padding: 32rpx 36rpx 4rpx 36rpx;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title-t {
        color: #182855;
        font-size: 24rpx;
        font-weight: 600;
      }
      .more {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .more-t {
          color: #c2c6d2;
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
        text-align: left;
        font-size: 24rpx;
        font-weight: 600;
      }
      .more {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .more-t {
          color: #182855;
          text-align: right;
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
