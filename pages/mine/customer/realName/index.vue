<template></template>

<script>
export default {
  data: function () {
    return {};
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
  }
  .title {
    font-size: 28rpx;
    color: #2f3031;
    line-height: 42rpx;
    width: 100%;
    box-sizing: border-box;
    padding: 24rpx 0 48rpx 24rpx;
  }
  .upload-module {
    width: 100%;
    box-sizing: border-box;
    padding: 0 84rpx;
    .upload-box {
      background-color: #ffffff;
      box-shadow: 0rpx 4rpx 8rpx -4rpx rgba(0, 0, 0, 0.08);
      border-radius: 8rpx;
      margin-bottom: 48rpx;
      width: 100%;
      .top {
        width: 100%;
        height: 308rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        .img-identity-bg {
          width: 322rpx;
          height: 200rpx;
        }
        .icon-photo {
          width: 100rpx;
          height: 100rpx;
          position: absolute;
          top: 102rpx;
          left: 240rpx;
        }
      }
      .img-identity {
        width: 100%;
        height: 308rpx;
      }
      .bottom {
        width: 100%;
        height: 96rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28rpx;
        color: rgba(47, 48, 49, 0.75);
        line-height: 42rpx;
        border-top: 2rpx solid #f5f5f5;
      }
    }
  }
  .submit-btn {
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
