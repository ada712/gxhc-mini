<!-- /subpackage1/bp/detail/index.vue -->
<template>
  <x-load-page v-if="pageLoading" :loadingType="2" />
  <view class="pages" v-else>
    <view class="block1">
      <image
        class="icon1"
        :src="imgUrl + '/subpackage1/share-icon1.png'"
      ></image>
      <image
        class="icon2"
        :src="imgUrl + '/subpackage1/share-icon2.png'"
      ></image>
      <image
        class="icon3"
        :src="imgUrl + '/subpackage1/share-icon3.png'"
      ></image>
    </view>
    <view class="block2">
      <image
        class="icon4"
        :src="imgUrl + '/subpackage1/share-product-banner.png'"
      ></image>
    </view>
    <view class="block3">
      <image class="icon5" :src="imgUrl + '/subpackage1/qr-bj.png'"></image>
    </view>
  </view>
</template>

<script>
import { imgUrls, HTTP_REQUEST_URL, TOKENNAME } from "@/config/app";
import { getShare } from "@/api/gxhc";
export default {
  data: function () {
    return {
      imgUrl: imgUrls,
      pageLoading: true,
      spread: 0,
      initStatus: true,
    };
  },
  onLoad(options) {
    if (options.spread) {
      this.spread = options.spread;
    }
    this.pageLoading = false;
    console.log(options);
    this.isLogin();
    this.getData();
  },
  onShow() {
    console.log(this.initStatus);
    console.log(this.$store.state.app.token);
    if (this.initStatus && this.$store.state.app.token) {
      this.getData();
    }
  },
  methods: {
    isLogin() {
      if (!this.$store.state.app.token) {
        uni.navigateTo({
          url: "/pages/mine/login/index",
        });
        return;
      }
    },
    getData() {
      if (this.$store.state.app.token) {
        this.initStatus = false;
      }
      getShare({
        spread: this.spread,
      }).then((res) => {
        if (res.status == 200) {
        } else {
          uni.showToast({
            title: "获取分享数据失败",
            icon: "none",
          });
        }
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
  padding-bottom: 50rpx;
  .block1 {
    display: flex;
    justify-content: space-between;
    padding: 0 24rpx;
    margin-top: 50rpx;
    .icon1 {
      width: 242rpx;
      height: 212rpx;
      border-radius: 28rpx;
    }
    .icon2 {
      width: 14rpx;
      height: 14rpx;
      margin-top: 48rpx;
    }
    .icon3 {
      width: 426rpx;
      height: 212rpx;
      border-radius: 28rpx;
    }
  }
  .block2 {
    display: flex;
    justify-content: center;
    margin-top: 30rpx;
    .icon4 {
      width: 700rpx;
      height: 1002rpx;
      border-radius: 28rpx;
    }
  }
  .block3 {
    display: flex;
    justify-content: center;
    margin-top: 30rpx;
    .icon5 {
      width: 700rpx;
      height: 368rpx;
      border-radius: 28rpx;
    }
  }
}
</style>
