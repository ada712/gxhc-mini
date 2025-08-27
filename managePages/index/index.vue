<template>
  <view class="wripper">
    <view class="content">
      <view class="same-row" @click="goDirectorPage">
        <view class="left">
          <image :src="imgPath + '/admin/icon-jftj.png'" class="icon-menu" />
          <view class="col">
            <view class="label">新增理事成员</view>
            <view class="notes">录入理事成员信息</view>
          </view>
        </view>
      </view>

      <view class="same-row">
        <view class="left">
          <image :src="imgPath + '/admin/icon-jflr.png'" class="icon-menu" />
          <view class="col">
            <view class="label">管理首页banner</view>
            <view class="notes">新增或者删除首页轮播循环的 banner</view>
          </view>
        </view>
        <view class="operate-box">
          <view class="operate-btn mb8" @click="goAddBanner">新增</view>
          <view class="operate-btn" @click="goDelBanner">删除</view>
        </view>
      </view>

      <view class="same-row" @click="goUsersPage">
        <view class="left">
          <image :src="imgPath + '/admin/icon-jflr.png'" class="icon-menu" />
          <view class="col">
            <view class="label">查看系统用户</view>
            <view class="notes">标记用户身份权限</view>
          </view>
        </view>
        <image
          :src="imgPath + '/icons/icon-right-arrow.png'"
          class="icon-right-arrow"
        />
      </view>

      <view class="same-row" @click="goEnterPage">
        <view class="left">
          <image :src="imgPath + '/admin/icon-jflr.png'" class="icon-menu" />
          <view class="col">
            <view class="label">积分登记</view>
            <view class="notes">每3个月将积分情况录入系统</view>
          </view>
        </view>
        <image
          :src="imgPath + '/icons/icon-right-arrow.png'"
          class="icon-right-arrow"
        />
      </view>
    </view>
  </view>
</template>

<script>
import { imgUrls } from "@/config/app";
export default {
  data: function () {
    return {
      imgPath: imgUrls,
    };
  },
  methods: {
    goUsersPage() {
      uni.navigateTo({
        url: "/managePages/users/index/index",
      });
    },

    goEnterPage() {
      uni.navigateTo({
        url: "/managePages/point/enter/index",
      });
    },
    goDirectorPage() {
      uni.navigateTo({
        url: "/managePages/director/addDirector/index",
      });
    },
    goAddBanner() {
      uni.navigateTo({
        url: "/managePages/banner/add/index",
      });
    },
    goDelBanner() {
      uni.navigateTo({
        url: "/managePages/banner/delete/index",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  background: #f5f5f5;
}
.wripper {
  width: 100%;
  box-sizing: border-box;
  padding: 24rpx;
  .content {
    width: 100%;
    .same-row {
      width: 100%;
      height: 208rpx;
      background: #ffffff;
      border-radius: 24rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24rpx;
      box-sizing: border-box;
      padding: 0 32rpx 0 40rpx;
      .left {
        width: 85%;
        display: flex;
        flex-direction: row;
        align-items: center;
        .icon-menu {
          width: 64rpx;
          height: 64rpx;
          margin-right: 32rpx;
        }
        .col {
          display: flex;
          flex-direction: column;
          .label {
            font-size: 34rpx;
            color: #2f3031;
            line-height: 52rpx;
            font-weight: bold;
            margin-bottom: 8rpx;
          }
          .notes {
            font-size: 24rpx;
            color: rgba(47, 48, 49, 0.5);
            line-height: 36rpx;
          }
        }
      }
      .operate-box {
        width: 25%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        .operate-btn {
          width: 140rpx;
          font-size: 24rpx;
          line-height: 36rpx;
          color: rgba(47, 48, 49, 0.75);
          height: 56rpx;
          background: #ffffff;
          border-radius: 28rpx;
          border: 1rpx solid #e5e6e6;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mb8 {
          margin-bottom: 8rpx;
        }
      }

      .icon-right-arrow {
        width: 40rpx;
        height: 39rpx;
      }
    }
  }
}
</style>
