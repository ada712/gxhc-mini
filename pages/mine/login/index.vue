<template>
  <view>
    <view class="login-wripper">
      <view class="logo-box">
        <image :src="imgPath + '/index/gxhclogo.jpg'" class="logo-img" />
        <!-- <view class="logo-text">国信合创（CHA）人工智能共创理事会</view> -->
      </view>

      <view class="phone-login-box">
        <button
          class="login-btn light-btn"
          open-type="getPhoneNumber"
          @getphonenumber="getphonenumber"
          v-if="isAgreeProtocol"
        >
          手机号快速登录
        </button>
        <button
          class="login-btn gray-btn"
          @click="onClickLogin"
          v-if="!isAgreeProtocol"
        >
          手机号快速登录
        </button>
        <view class="read-row" @click="toggleAgree">
          <image
            :src="isAgreeProtocol ? checkedImageUrl : uncheckedImageUrl"
            class="icon-agree-default"
          />
          <view class="read-txt">阅读并同意遵守</view>
          <view class="blue-protocol" @click="onOpenProtocol"
            >《用户服务协议》</view
          >
          <view class="blue-protocol" @click="onOpenPrivacy"
            >与《隐私政策》</view
          >
        </view>
      </view>
    </view>
    1{{ isShow }}
    <block>
      <editUserModal
        :isShow="isShow"
        @closeEdit="closeEdit"
        @editSuccess="editSuccess"
      >
      </editUserModal>
    </block>
  </view>
</template>

<script>
const app = getApp();
import { routineBindingPhone } from "@/api/public";
import { getUserInfo } from "@/api/user.js";
import Routine from "@/libs/routine";
import { imgUrls } from "@/config/app";
import editUserModal from '@/components/eidtUserModal/index'
export default {
  components: {
    editUserModal
  },
  data: function () {
    return {
      isShow: false,
      imgPath: imgUrls,
      isAgreeProtocol: false, // 是否阅读了协议
      checkedImageUrl: `${imgUrls}/icons/icon-agree-active.png`,
      uncheckedImageUrl: `${imgUrls}/icons/icon-agree-default.png`,
      pageSource: "",
      authKey: "",
    };
  },
  methods: {
    closeEdit() {
      this.isShow = false;
      this.$util.Tips(
        {
          title: this.$t(`登录成功`),
          icon: "success",
        },
        {
          tab: 3,
        }
      );
    },
    editSuccess() {
      console.log('editSuccess');
      this.isShow = false
      uni.redirectTo({
        url: "/subpackage1/auth/index/index",
      });
    },
    // 小程序获取手机号码
    getphonenumber(e) {
      if (e.detail.errMsg != "getPhoneNumber:ok") {
        uni.showToast({
          title: "获取手机号码失败",
          icon: "none",
          duration: 2000,
        });
        this.getUserInfo(1);
        return;
      }
      uni.showLoading({
        title: `正在登录中`,
      });
      Routine.getCode()
        .then((code) => {
          this.getUserPhoneNumber(e.detail.encryptedData, e.detail.iv, code);
        })
        .catch((error) => {
          uni.$emit("closePage", false);
          uni.hideLoading();
        });
    },
    // 小程序获取手机号码回调
    getUserPhoneNumber(encryptedData, iv, code) {
      routineBindingPhone({
        encryptedData: encryptedData,
        iv: iv,
        code: code,
        spread_spid: app.globalData.spid,
        shopId: this.$Cache.get("shopId"),
        spread_code: app.globalData.code,
        key: this.authKey,
      })
        .then((res) => {
          let time = res.data.expires_time - this.$Cache.time();
          this.$store.commit("LOGIN", {
            token: res.data.token,
            time: time,
          });
          this.$Cache.clear("snsapiKey");
          this.getUserInfo(res.data.bindName);
        })
        .catch((res) => {
          uni.hideLoading();
          uni.showToast({
            title: res,
            icon: "none",
            duration: 2000,
          });
        });
    },
    /**
     * 获取个人用户信息
     */
    getUserInfo(new_user, back_url) {
      let that = this;
      getUserInfo()
        .then((res) => {
          uni.hideLoading();
          that.userInfo = res.data;
          that.$store.commit("SETUID", res.data.uid);
          that.$store.commit("UPDATE_USERINFO", res.data);
          if (new_user) {
            // this.isShow = true;
            uni.redirectTo({
              url: "/subpackage1/auth/index/index",
            });
          } else {
            // #ifdef MP
            that.$util.Tips(
              {
                title: `登录成功`,
                icon: "success",
              },
              {
                tab: 3,
              }
            );
            // #endif
            // #ifndef MP
            that.$util.Tips(
              {
                title: `登录成功`,
                icon: "success",
              },
              {
                tab: 4,
                url: back_url || "/pages/mine/index/index",
              }
            );
            // #endif
          }
        })
        .catch((err) => {
          uni.hideLoading();
          uni.showToast({
            title: err.msg,
            icon: "none",
            duration: 2000,
          });
        });
    },
    onClickLogin() {
      if (!this.isAgreeProtocol) {
        uni.showToast({
          title: "请勾选同意用户协议和隐私政策后再进行登录",
          icon: "none",
          mask: true,
        });
      }
    },
    toggleAgree() {
      // 切换选中状态
      this.isAgreeProtocol = !this.isAgreeProtocol;
    },
    /**
     * 打开用户协议
     */
    onOpenProtocol() {
      uni.navigateTo({
        url: "/explainPages/protocol/privacy/index?type=4",
      });
    },
    /**
     * 打开隐私政策
     */
    onOpenPrivacy() {
      uni.navigateTo({
        url: "/explainPages/protocol/privacy/index?type=3",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-wripper {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding: 160rpx 75rpx 0 75rpx;
  background: #ffffff;

  .logo-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .logo-img {
      width: 240rpx;
      height: 194rpx;
      margin-bottom: 48rpx;
    }
    .logo-text {
      color: #2f3031;
      font-size: 32rpx;
      line-height: 48rpx;
      font-weight: bold;
    }
  }
  .phone-login-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 48rpx;
    .login-btn {
      width: 600rpx;
      height: 88rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: 32rpx;
      line-height: 48rpx;
      font-weight: bold;
      border-radius: 44rpx;
    }
    .gray-btn {
      background-color: #bebfc1;
    }
    .light-btn {
      background-color: #2969ff;
    }
    .read-row {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 24rpx;
      line-height: 36rpx;
      margin-top: 40rpx;
      .icon-agree-default {
        width: 28rpx;
        height: 28rpx;
        margin-right: 10rpx;
      }
      .read-txt {
        color: rgba(47, 48, 49, 0.5);
      }
      .blue-protocol {
        color: #08448e;
      }
    }
  }
}
</style>
