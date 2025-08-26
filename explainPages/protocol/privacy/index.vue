<template>
  <view class="wripper">
    <view class="time-box">
      <view class="row bold">更新时间：2024年7月1日</view>
      <view class="row bold">生效时间：2024年7月1日</view>
    </view>
    <view class="row">
      欢迎您使用由上海国信合创计算机网络科技有限公司提供的国信合创服务（以下简称“本服务”）。我们尊重并致力于保护您的个人隐私。本隐私协议旨在帮助您了解我们将如何收集、使用、共享和保护您在使用本服务时提供的个人信息。
    </view>
    <view class="h3">1. 收集的信息类型</view>
    <view class="row">我们可能会收集以下类型的个人信息：</view>
    <view class="row li"
      >● 基本信息：包括但不限于姓名、电子邮件地址、电话号码等。</view
    >
    <view class="row li"
      >● 使用信息：您使用本服务的方式和频率，例如浏览记录、交互行为等。</view
    >
    <view class="row li"
      >● 设备信息：用于识别设备的唯一标识符、操作系统版本、IP地址等。</view
    >
    <view class="row li">
      ● 位置信息：根据您的许可，我们可能会收集有关您设备地理位置的信息。
    </view>
    <view class="h3">2. 信息的使用</view>
    <view class="row">我们收集的信息主要用于：</view>
    <view class="row li">● 发送与服务相关的重要通知；</view>
    <view class="row li">● 分析服务使用趋势以改进产品；</view>
    <view class="row li">● 提升用户体验和服务质量；</view>
    <view class="row li">● 符合法律要求或回应司法机关的要求。</view>
    <view class="h3">3. 信息共享</view>
    <view class="row"
      >除非获得您的明确同意或者依据法律法规的规定，我们不会向任何第三方出售、出租或转让您的个人信息。</view
    >
    <view class="h3">4. 数据安全</view>
    <view class="row"
      >我们采取合理的物理、技术和管理措施来保护您的个人信息免遭丢失、误用、未经授权访问、披露或更改。</view
    >
    <view class="h3">5. 用户选择与控制</view>
    <view class="row"
      >您可以随时通过设置选项或联系我们的客服团队，来修改您提供给我们的个人信息或选择不再接收来自我们的营销邮件。</view
    >
    <view class="h3">6. 第三方链接</view>
    <view class="row"
      >本服务可能包含指向其他网站或应用程序的链接。请注意，一旦您离开我们的平台，即使该页面是通过我们的服务访问的，我们也无法控制其数据处理活动。请务必查阅这些第三方的隐私政策。</view
    >
    <view class="h3">7. 儿童隐私保护</view>
    <view class="row"
      >我们不会有意地收集14岁以下儿童的个人信息。如果我们得知无意中收集了这类信息，我们将立即采取措施予以删除。</view
    >
    <view class="h3">8. 协议变更</view>
    <view class="row"
      >我们保留在必要时更新本隐私协议的权利。所有更改将在发布后生效。如果您继续使用本服务，则表示您同意接受更新后的隐私协议。</view
    >
    <view class="h3">9. 联系方式</view>
    <view class="row"
      >如果您对本隐私协议有任何疑问或需要更多帮助，请联系我们：zhongzhifei@gxhc-cha.com</view
    >
  </view>
</template>

<script>
export default {
  data: function () {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
page {
  background: #ffffff;
}
.wripper {
  width: 100%;
  box-sizing: border-box;
  padding: 52rpx 32rpx;

  .time-box {
    width: 100%;
    margin-bottom: 32rpx;
  }
  .row {
    width: 100%;
    font-size: 32rpx;
    line-height: 48rpx;
    color: #2f3031;
  }
  .h3 {
    font-size: 32rpx;
    line-height: 48rpx;
    font-weight: bold;
    color: #2f3031;
    margin-bottom: 20rpx;
    margin-top: 32rpx;
  }
  .li {
    margin-bottom: 12rpx !important;
  }

  .bold {
    font-weight: bold;
  }
}
</style>
