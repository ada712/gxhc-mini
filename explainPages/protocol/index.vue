<template>
  <view class="wripper">
    <view class="list">
      <view class="item" @click="onClickPrivacyProtocol">
        <view> 隐私政策 </view>
        <image
          src="/static/images/icons/icon-right-arrow.png"
          class="icon-arrow-right"
        />
      </view>
      <view class="item" @click="onClickServeProtocol">
        <view> 用户服务协议 </view>
        <image
          src="/static/images/icons/icon-right-arrow.png"
          class="icon-arrow-right"
        />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data: function () {
    return {};
  },
  methods: {
    onClickPrivacyProtocol() {
      uni.navigateTo({
        url: "/explainPages/protocol/privacy/index",
      });
    },
    onClickServeProtocol() {
      uni.navigateTo({
        url: "/explainPages/protocol/serve/index",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
page {
  background: #f4f5f6;
}
.wripper {
  width: 100%;
  box-sizing: border-box;
  padding: 24rpx;
}
.wripper .list {
  width: 100%;
  background: #ffffff;
  border-radius: 24rpx;
}
.wripper .list .item {
  width: 100%;
  height: 100rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 32rpx;
  line-height: 48rpx;
  box-sizing: border-box;
  padding: 0 24rpx;
}
.wripper .list .item .icon-arrow-right {
  width: 12rpx;
  height: 24rpx;
}
</style>
