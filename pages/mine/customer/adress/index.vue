<template>
  <view class="wripper">
    <view class="tips" wx:if="{{isUpdate}}"
      >您已经填写收件地址信息，如需更改请直接修改即可</view
    >
    <view class="content">
      <view class="row">
        <view class="label">收件人姓名</view>
        <input
          type="text"
          placeholder="请输入收件人姓名"
          class="same-input"
          maxlength="20"
          placeholder-style="color: rgba(47,48,49,0.3);"
          value="{{userInfo.recipient}}"
          bindinput="bandInputName"
        />
      </view>
      <view class="row">
        <view class="label">收件人手机号</view>
        <input
          type="number"
          placeholder="请输入收件人手机号"
          class="same-input"
          maxlength="11"
          placeholder-style="color: rgba(47,48,49,0.3);"
          value="{{userInfo.receiveMobile}}"
          bindinput="bandInputMobile"
        />
      </view>
      <view class="col">
        <view class="label">收件地址信息</view>
        <textarea
          value="{{userInfo.receiveAddress}}"
          class="address"
          placeholder="请输入收件地址信息"
          placeholder-style="color: rgba(47,48,49,0.3);"
          maxlength="200"
          bindinput="bandInputAdress"
        />
      </view>
    </view>
    <view class="save-btn" bind:tap="handleSaveAddress">保存地址</view>
  </view>
</template>

<script>
export default {
  data: function () {
    return {
      userInfo: {
        _id: "",
        recipient: "",
        receiveMobile: "",
        receiveAddress: "",
      },
      isUpdate: false,
      isClickOnce: true,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.wripper {
  width: 100%;
  box-sizing: border-box;
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  .tips {
    width: 100%;
    background: #eef6ff;
    height: 72rpx;
    box-sizing: border-box;
    padding-left: 24rpx;
    font-size: 28rpx;
    line-height: 36rpx;
    color: #2969ff;
    margin-bottom: 24rpx;
    border-radius: 36rpx;
    display: flex;
    align-items: center;
  }
  .content {
    background-color: #ffffff;
    box-shadow: 0rpx 4rpx 8rpx -4rpx rgba(0, 0, 0, 0.08);
    border-radius: 24rpx;
    width: 100%;
    box-sizing: border-box;
    padding: 0 24rpx;
    .row {
      width: 100%;
      height: 104rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1rpx solid #f5f5f5;
    }
    .label {
      font-size: 32rpx;
      color: rgba(47, 48, 49, 0.75);
      line-height: 48rpx;
    }
    .same-input {
      width: 50%;
      height: 100%;
      font-size: 32rpx;
      color: #2f3031;
      line-height: 48rpx;
      text-align: right;
    }
    .col {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding: 28rpx 0 24rpx 0;
      .address {
        width: 100%;
        height: 200rpx;
        border: 1rpx solid #f5f5f5;
        box-sizing: border-box;
        padding: 20rpx 16rpx;
        margin-top: 24rpx;
        font-size: 32rpx;
        color: #2f3031;
        line-height: 48rpx;
        border-radius: 24rpx;
      }
    }
  }
  .save-btn {
    width: 638rpx;
    height: 88rpx;
    font-weight: bold;
    margin-top: 36rpx;
    font-size: 32rpx;
    color: #ffffff;
    line-height: 45rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #2969ff;
    border-radius: 12rpx;
  }
}
</style>
