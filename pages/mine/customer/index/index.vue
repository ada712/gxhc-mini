<template>
  <view class="wripper">
    <view class="content">
      <view class="same-row" @click="goPersonInfoPage">
        <view class="left">
          <image :src="imgPath + '/mine/icon_grxx.png'" class="icon-menu" />
          <view class="col">
            <view class="label">个人信息</view>
            <view class="notes">查看我的账号信息</view>
          </view>
        </view>
        <image
          :src="imgPath + '/icons/icon-right-arrow.png'"
          class="icon-right-arrow"
        />
      </view>

      <view class="same-row" @click="goRealNamePage">
        <view class="left">
          <image :src="imgPath + '/mine/icon-smzz.png'" class="icon-menu" />
          <view class="col">
            <view class="label">实名认证</view>
            <view class="notes">认证之后可享受更多权益</view>
          </view>
        </view>
        <image
          :src="imgPath + '/icons/icon-right-arrow.png'"
          class="icon-right-arrow"
        />
      </view>

      <view class="same-row" @click="goAddressPage" v-if="!user.receiveAddress">
        <view class="left">
          <image :src="imgPath + '/mine/icon_sjdz.png'" class="icon-menu" />
          <view class="col">
            <view class="label">收件地址</view>
            <view class="notes">完善地址信息方便您文件签收</view>
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
      user: {
        receiveAddress: "",
      },
    };
  },
  methods: {
    navigateToPage(url) {
      uni.navigateTo({ url });
    },
    goPersonInfoPage() {
      this.navigateToPage("/pages/mine/customer/personInfo/index");
    },
    goRealNamePage() {
      this.navigateToPage("/pages/mine/customer/realName/index");
    },
    goAddressPage() {
      this.navigateToPage("/pages/mine/customer/address/list/index");
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

      .icon-right-arrow {
        width: 40rpx;
        height: 39rpx;
      }
    }
  }
}
</style>
