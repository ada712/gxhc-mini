<template>
  <view class="pages">
    <text class="title">请选择您的身份</text>
    <text class="title-d">从下方选择您的身份类型，使用专属功能</text>
    <view class="ivt">
      <text class="label">邀请码（选填）</text>
      <input
        v-model="ivt"
        class="value"
        placeholder="请输入邀请码"
        placeholder-class="placeholder-class"
      />
    </view>
    <view class="select">
      <view
        class="select-item"
        @click="onSelect('finance')"
        :class="{ active: auth == 'finance' }"
      >
        <image class="bj" :src="imgUrl + '/subpackage1/auth-bj1.png'" />
        <view class="s-a">
          <view class="s-i">
            <text class="s-t">金融行业从业者</text>
            <text class="s-d">解锁投资机遇，尽在专属决策平台</text>
          </view>
          <view class="s-btn">
            <text class="s-btn-t">选择身份</text>
          </view>
        </view>
      </view>
      <view
        class="select-item"
        @click="onSelect('entrepreneur')"
        :class="{ active: auth == 'entrepreneur' }"
      >
        <image class="bj" :src="imgUrl + '/subpackage1/auth-bj2.png'" />
        <view class="s-a">
          <view class="s-i">
            <text class="s-t">创业者</text>
            <text class="s-d">开启创业征程，定制专属成长空间</text>
          </view>
          <view class="s-btn">
            <text class="s-btn-t">选择身份</text>
          </view>
        </view>
      </view>
    </view>
    <view class="btn" @click="onNext" :class="{ active: auth != '' }">
      <text class="btn-t">下一步</text>
    </view>
    <text class="tips" @click="goBack">暂不认证，跳过</text>
  </view>
</template>

<script>
import { imgUrls } from "@/config/app";
export default {
  data: function () {
    return {
      imgUrl: imgUrls,
      ivt: "",
      auth: "",
    };
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    onNext() {
      if (!this.auth) {
        uni.showToast({
          title: "请选择身份～",
          icon: "none",
        });
        return;
      }
      uni.navigateTo({
        url: `/subpackage1/auth/certifica/index?auth=${this.auth}`,
      });
    },
    onSelect(auth) {
      this.auth = auth;
    },
  },
};
</script>

<style>
page {
  background: #fff;
}
</style>
<style lang="scss" scoped>
.placeholder-class {
  color: #999999;
  font-size: 24rpx;
  font-weight: 400;
}
.pages {
  padding-bottom: 80rpx;
  margin: 0 32rpx;
  .title {
    display: block;
    color: #17233c;
    font-size: 48rpx;
    font-weight: 600;
    margin-top: 88rpx;
  }
  .title-d {
    color: #8c929e;
    text-align: left;
    font-size: 28rpx;
    font-weight: 400;
    display: block;
    margin-top: 20rpx;
  }
  .ivt {
    margin-top: 58rpx;
    padding-bottom: 28rpx;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .label {
      color: #404040;
      font-size: 24rpx;
      font-weight: 400;
    }
    .value {
      text-align: right;
      color: #182855;
      font-size: 24rpx;
      font-weight: 400;
    }
  }
  .select {
    margin-top: 6rpx;
    .select-item {
      margin-top: 40rpx;
      height: 200rpx;
      border-radius: 28rpx;
      position: relative;
      .bj {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
      }
      &:last-child.active::after {
        content: "";
        border-radius: 28rpx;
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
        background: linear-gradient(
          269.4deg,
          #0ea0b600 0%,
          rgb(14, 160, 182) 100%
        );
      }
      &:first-child.active::after {
        content: "";
        border-radius: 28rpx;
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
        background: linear-gradient(269.4deg, #51515300 0%, #0e6cb6 100%);
      }
      .s-a {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 9;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .s-i {
          margin-left: 32rpx;
          .s-t {
            color: #ffffff;
            font-size: 40rpx;
            font-weight: 700;
            display: block;
          }
          .s-d {
            margin-top: 20rpx;
            color: #ffffff;
            font-size: 22rpx;
            font-weight: 400;
            display: block;
          }
        }
        .s-btn {
          width: 180rpx;
          height: 56rpx;
          border-radius: 300rpx;
          background: #646464;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 32rpx;
          .s-btn-t {
            color: #ffffff;
            font-size: 28rpx;
            font-weight: 400;
          }
        }
      }
      &.active {
        .s-btn {
          background-color: #2969ff;
        }
      }
    }
  }
  .btn {
    margin: 60rpx 44rpx;
    border-radius: 300rpx;
    background: #a2a2a2;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24rpx 0;
    &.active {
      background: #2969ff;
    }
    .btn-t {
      color: #ffffff;
      text-align: center;
      font-size: 28rpx;
      font-weight: 400;
    }
  }
  .tips {
    position: fixed;
    left: 50%;
    bottom: 100rpx;
    transform: translateX(-50%);
    color: #3967a6;
    text-align: center;
    font-size: 28rpx;
    font-weight: 500;
    display: block;
  }
}
</style>
