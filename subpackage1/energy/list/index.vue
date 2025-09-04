<template>
  <view class="pages">
    <view class="list">
      <view class="item" v-for="value in 10">
        <view class="top">
          <image class="icon" :src="imgUrl + '/subpackage1/energy-icon.png'" />
          <view class="top-right">
            <view class="top-right-b">
              <text class="ti">邀请好友 张三丰</text>
              <text class="num">+23</text>
            </view>
            <view class="top-right-b">
              <text class="phone">132********8</text>
              <text class="ye">能量余额5432</text>
            </view>
          </view>
        </view>
        <view class="bottom">
          <text class="time">2025-11-09 17:30</text>
          <text class="no">订单编号 0293928938298938</text>
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
      imgUrl: imgUrls,
    };
  },
  methods: {
    goPage() {
      uni.navigateTo({
        url: "/subpackage1/energy/list/index",
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
  padding-bottom: 100rpx;
  .list {
    margin: 24rpx;

    .item {
      padding: 22rpx 32rpx;
      box-sizing: border-box;
      border-radius: 28rpx;
      background-color: #fff;
      margin-bottom: 24rpx;
      .top {
        display: flex;
        border-bottom: 2rpx solid #f5f8ff;
        padding-bottom: 8rpx;
        margin-bottom: 10rpx;
        .icon {
          width: 60rpx;
          height: 60rpx;
          border-radius: 50%;
        }
        .top-right {
          margin-left: 24rpx;
          flex: 1;
          .top-right-b {
            display: flex;
            align-items: center;
            justify-content: space-between;
            &:last-child {
              margin-top: 8rpx;
            }
            .ti {
              color: #27282a;
              font-size: 28rpx;
              font-weight: 400;
            }
            .num {
              color: #1b2132;
              font-size: 32rpx;
              font-weight: 500;
            }
            .phone {
              color: #979797;
              font-size: 24rpx;
              font-weight: 400;
            }
            .ye {
              color: #979797;
              font-size: 24rpx;
              font-weight: 400;
            }
          }
        }
      }
      .bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .time {
          color: #979797;
          font-size: 24rpx;
          font-weight: 400;
        }
        .no {
          color: #979797;
          font-size: 24rpx;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
