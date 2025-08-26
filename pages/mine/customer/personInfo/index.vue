<template>
  <view class="wripper">
    <view class="content">
      <button
        class="head-box"
        open-type="chooseAvatar"
        bindchooseavatar="onChooseAvatar"
      >
        <image
          :src="userInfo.avatarUrl"
          v-if="userInfo.avatarUrl"
          class="img-head"
        />
        <image
          :src="imgPath + '/mine/default-head.png'"
          wx:else
          class="img-head"
        />
        <view class="head-desc" chooseAvatar>点击更换头像</view>
      </button>

      <view class="row">
        <view class="label">昵称</view>
        <view class="right">
          <input
            type="nickname"
            placeholder="请输入昵称"
            class="same-input"
            placeholder-style="color: rgba(47,48,49,0.3);"
            :value="userInfo.nickname"
            bind:input="bandInputNickname"
            data-type="nickname"
            bindblur="bindBlurInput"
          />
          <image
            :src="imgPath + '/icons/icon-right-arrow.png'"
            class="icon-right-arrow"
          />
        </view>
      </view>

      <view class="row">
        <view class="label">性别</view>
        <view class="right">
          <picker
            mode="selector"
            :value="index"
            :data-value="genderList[index].value"
            range-key="name"
            :range="genderList"
            bindchange="bindGenderChange"
            class="picker-row"
          >
            <view class="picker-value" v-if="!userInfo.gender">
              <text class="input-place">请选择性别</text>
            </view>
            <view class="picker-value active-value" v-if="userInfo.gender">
              {{ userInfo.gender === "male" ? "男" : "女" }}
            </view>
          </picker>
          <image
            :src="imgPath + '/icons/icon-right-arrow.png'"
            class="icon-right-arrow"
          />
        </view>
      </view>
      <view class="row">
        <view class="label">绑定手机号</view>
        <view class="right">
          <view class="same-input">{{ bindMobile }}</view>
        </view>
      </view>
      <view class="row">
        <view class="label">常用邮箱</view>
        <view class="right">
          <input
            type="text"
            placeholder="请输入常用邮箱"
            :value="userInfo.email"
            class="same-input"
            placeholder-style="color: rgba(47,48,49,0.3);"
            bind:input="bandInputEmail"
            bindblur="bindBlurInput"
            data-type="email"
          />
        </view>
      </view>

      <view class="address-row">
        <view class="label">收件地址</view>
        <view class="right" @click="goCreateAddress">
          <view class="address active-value" v-if="userInfo.receiveAddress">{{
            userInfo.receiveAddress
          }}</view>
          <view class="address input-place" v-else>请输入常用收件地址</view>
          <image
            :src="imgPath + '/icons/icon-right-arrow.png'"
            class="icon-right-arrow"
          />
        </view>
      </view>
    </view>

    <view class="logout-btn" @click="handleLogout">退出登录</view>
    <view class="log-off-row">
      <text class="cancel" @click="handleWithdrawUser">注销账号</text
      >，注销后无法恢复，请谨慎操作！
    </view>
  </view>
</template>

<script>
import { imgUrls } from "@/config/app";
export default {
  data: function () {
    return {
      imgPath: imgUrls,
      userInfo: {
        gender: "",
      },
      bindMobile: "",
      genderList: [
        {
          value: "male",
          name: "男",
        },
        {
          value: "female",
          name: "女",
        },
      ],
    };
  },
  methods: {
    goCreateAddress() {
      uni.navigateTo({
        url: "/pages/mine/customer/adress/index",
      });
    },

    handleLogout() {
      uni.clearStorage();
      uni.switchTab({
        url: "/pages/mine/index/index",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.wripper {
  width: 100%;
  box-sizing: border-box;
  padding: 24rpx;
  .content {
    width: 100%;
    background: #ffffff;
    border-radius: 24rpx;
    box-sizing: border-box;
    padding: 0 24rpx;
    .head-box {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      margin: 0;
      padding: 40rpx 0 24rpx 0;
      .img-head {
        width: 160rpx;
        height: 160rpx;
        border-radius: 50%;
        border: 4rpx solid #ffffff;
      }
      .head-desc {
        font-size: 24rpx;
        color: #2f3031;
        line-height: 36rpx;
        margin-top: 24rpx;
      }
    }
    .row {
      width: 100%;
      height: 102rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
    .right {
      width: 75%;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      font-size: 32rpx;
      color: #2f3031;
      line-height: 48rpx;
    }
    .same-input {
      width: 100%;
      height: 70rpx;
      display: flex;
      text-align: right;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
    }
    .picker-row {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
    }
    .picker-value {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
    }

    .active-value {
      font-size: 32rpx;
      line-height: 48rpx;
      color: #2f3031;
    }

    .address {
      width: 448rpx;
      text-align: right;
    }
    .input-place {
      color: rgba(47, 48, 49, 0.3);
    }
    .label {
      width: 170rpx;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      font-size: 32rpx;
      color: rgba(47, 48, 49, 0.75);
      line-height: 48rpx;
    }

    .address-row {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 20rpx 0 32rpx 0;
      display: flex;
      align-items: flex-start;
    }
  }
  .icon-right-arrow {
    width: 40rpx;
    height: 39rpx;
    margin-left: 10rpx;
  }
  .logout-btn {
    width: 100%;
    height: 88rpx;
    margin-top: 80rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32rpx;
    font-weight: bold;
    color: rgba(47, 48, 49, 0.75);
    line-height: 48rpx;
    background: #ffffff;
    border-radius: 12rpx;
    border: 1rpx solid #e5e6e6;
  }
  .log-off-row {
    margin-top: 32rpx;
    font-size: 24rpx;
    color: rgba(47, 48, 49, 0.5);
    line-height: 36rpx;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .cancel {
      text-decoration: underline;
    }
  }
}
</style>
