<template>
  <view class="container">
    <view class="content">
      <view class="section">
        <text class="title">上传 Banner 图片（750*320）</text>
        <view class="upload-img" bindtap="uploadChooseImage">上传图片</view>
        <image
          class="img-show"
          v-if="imagePath"
          :src="imagePath"
          mode="aspectFit"
        ></image>
      </view>

      <view class="section">
        <text class="title">banner图片对应的链接地址：</text>
        <input
          name="linkPath"
          class="linkPath"
          placeholder="请输入链接地址"
          :value="linkPath"
          bindinput="handleInput"
        />
      </view>

      <!-- <view class="section ">
      <label><checkbox value="isWeb" checked="{{isWeb}}" bindchange="toggleIsWeb"/> 是否是微信公众号链接</label>
    </view> -->

      <view class="submit" @click="onSubmit">提交</view>
    </view>
  </view>
</template>

<script>
export default {
  data: function () {
    return {
      tempFilePath: "",
      imagePath: "",
      isWeb: true,
      linkPath: "",
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  box-sizing: border-box;
  padding: 32rpx 24rpx;
  display: flex;
  flex-direction: column;
  .content {
    width: 100%;
    border-radius: 24rpx;
    background-color: #ffffff;
    box-sizing: border-box;
    padding: 24rpx;
  }
  .section {
    display: flex;
    flex-direction: column;
    margin-bottom: 30rpx;
    .title {
      font-weight: 600;
      font-size: 32rpx;
      color: #2f3031;
      line-height: 48rpx;
      margin-bottom: 16rpx;
    }
    .upload-img {
      width: 100%;
      height: 200rpx;
      background: #ffffff;
      border-radius: 12rpx;
      border: 1rpx solid #e5e6e6;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(47, 48, 49, 0.75);
    }
    .img-show {
      width: 100%;
      height: 320rpx;
      margin-top: 24rpx;
    }
    .linkPath {
      width: 100%;
      height: 72rpx;
      background: #ffffff;
      border-radius: 12rpx;
      border: 1rpx solid #e5e6e6;
      box-sizing: border-box;
      padding-left: 24rpx;
    }
  }
  .mt24 {
    margin-top: 32rpx;
  }
  .submit {
    width: 100%;
    height: 88rpx;
    background: #2969ff;
    border-radius: 12rpx;
    font-weight: 600;
    font-size: 32rpx;
    color: #ffffff;
    line-height: 48rpx;
    margin-top: 64rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
