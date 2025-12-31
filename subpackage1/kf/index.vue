<template>
  <view class="container">
    <view class="card">
      <image 
        @click="previewImage" 
        :src="imgUrl + '/subpackage1/qr-code4.jpg'" 
        mode="aspectFit" 
        class="qr-image"
      />
      <view class="tips">
        <text class="tips-t">扫描二维码，添加BP诊断Agent官方客服微信</text>
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
    previewImage() {
      uni.previewImage({
        urls: [this.imgUrl + "/subpackage1/qr-code4.jpg"],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
page {
  background-color: #f5f5f5;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20rpx;
  padding: 60rpx 40rpx;
  width: 100%;
}

.qr-image {
  width: 350rpx;
  height: 350rpx;
  margin-bottom: 40rpx;
  border-radius: 16rpx;
}

.tips {
  text-align: center;
}

.tips-t {
  font-size: 28rpx;
  color: #666666;
  line-height: 1.6;
}
</style>