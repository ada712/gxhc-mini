<template>
  <view class="wripper">
    <view class="content">
      <button
        class="head-box"
        open-type="chooseAvatar"
        @chooseavatar="onChooseAvatar"
      >
        <image :src="userInfo.avatar" v-if="userInfo.avatar" class="img-head" />
        <image
          :src="imgPath + '/mine/default-head.png'"
          v-else
          class="img-head"
        />
        <view class="head-desc" @chooseavatar="onChooseAvatar"
          >点击更换头像</view
        >
      </button>

      <view class="row" @click="goPage(1)">
        <view class="label">能量</view>
        <view class="right">
          <text>{{ userInfo.energy }}</text>
          <image
            :src="imgPath + '/icons/icon-right-arrow.png'"
            class="icon-right-arrow"
          />
        </view>
      </view>

      <view class="row" @click="goPage(2)">
        <view class="label">身份</view>
        <view class="right">
          <text v-if="userInfo.auth">{{
            userInfo.auth.identity_type == "finance" ? "金融从业者" : "创业者"
          }}</text>
          <template v-else>
            <text class="input-place">请完善身份</text>
            <image
              :src="imgPath + '/icons/icon-right-arrow.png'"
              class="icon-right-arrow"
            />
          </template>
        </view>
      </view>

      <view class="row">
        <view class="label">昵称</view>
        <view class="right">
          <input
            type="nickname"
            placeholder="请输入昵称"
            class="same-input"
            placeholder-style="color: rgba(47,48,49,0.3);"
            data-type="nickname"
            v-model="userInfo.nickname"
            @blur="bindBlurInput"
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
            range-key="name"
            :range="genderList"
            @change="bindGenderChange"
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
            v-model="userInfo.email"
            class="same-input"
            placeholder-style="color: rgba(47,48,49,0.3);"
            @blur="bindBlurInput"
            data-type="email"
          />
        </view>
      </view>

      <view class="address-row" @click="goCreateAddress">
        <view class="label">收件地址</view>
        <view class="right">
          <!-- <view class="address active-value" v-if="userInfo.receiveAddress">{{
            userInfo.receiveAddress
          }}</view>
          <view class="address input-place" v-else>请输入常用收件地址</view> -->
          <image
            :src="imgPath + '/icons/icon-right-arrow.png'"
            class="icon-right-arrow"
          />
        </view>
      </view>
    </view>

    <view class="logout-btn" @click="handleLogout">退出登录</view>
    <!-- <view class="log-off-row">
      <text class="cancel" @click="handleWithdrawUser">注销账号</text
      >，注销后无法恢复，请谨慎操作！
    </view> -->
  </view>
</template>

<script>
import { imgUrls } from "@/config/app";
import Cache from "@/utils/cache";
import { userEdit, getLogout } from "@/api/user.js";
export default {
  data: function () {
    return {
      userInfo: {},
      imgPath: imgUrls,
      index: 0,
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
  computed: {
    bindMobile() {
      return this.userInfo.phone
        ? `${this.userInfo.phone.substring(
            0,
            3
          )}****${this.userInfo.phone.substring(7)}`
        : "";
    },
  },
  onShow() {
    this.userInfo = JSON.parse(Cache.get("USER_INFO"));
    console.log(this.userInfo);
  },
  methods: {
    goPage(type) {
      let url = "";
      if (type == 1) {
        url = "/subpackage1/energy/index/index?energy="+(this.userInfo.energy || 0);
      } else if (type == 2) {
        if (this.userInfo.auth) {
          return;
        }
        url = "/subpackage1/auth/index/index";
      }
      uni.navigateTo({
        url,
      });
    },
    bindGenderChange(e) {
      const idx = e.detail.value;
      const { value } = this.genderList[idx];
      this.userInfo.gender = value;
      this.formUpdate({
        gender: value,
      });
    },
    bindBlurInput(e) {
      const that = this;
      const type = e.currentTarget.dataset.type;
      if (type === "email") {
        that.validateAndHandleEmail(e.detail.value);
      } else if (type === "nickname") {
        that.handleNicknameInput(e.detail.value);
      }
    },
    validateAndHandleEmail(email) {
      const regex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!regex.test(email)) {
        this.$util.Tips({
          title: "请输入有效的邮箱地址",
          icon: "none",
        });
        return;
      }
      this.formUpdate({
        email: email,
      });
    },
    handleNicknameInput(nickname) {
      if (nickname.length <= 2) {
        this.$util.Tips({
          title: "昵称至少需要3个字符",
          icon: "none",
        });
        return;
      }
      this.formUpdate({
        nickname: nickname,
      });
    },
    goCreateAddress() {
      uni.navigateTo({
        url: "/pages/mine/customer/address/list/index",
      });
    },
    handleLogout() {
      uni.clearStorage();
      let that = this;
      uni.showModal({
        title: `提示`,
        content: `确认退出登录`,
        success: function (res) {
          if (res.confirm) {
            getLogout()
              .then((res) => {
                // uni.clearStorage()
                that.$store.commit("LOGOUT");
                uni.reLaunch({
                  url: "/pages/home/index/index",
                });
              })
              .catch((err) => {});
          } else if (res.cancel) {
          }
        },
      });
    },
    onChooseAvatar(e) {
      const { avatarUrl } = e.detail;
      this.$util.uploadImgs(
        "upload/image",
        avatarUrl,
        (res) => {
          this.userInfo.avatar = res.data.url;
          this.formUpdate({
            avatar: res.data.url,
          });
        },
        (err) => {
          console.log(err);
        }
      );
    },
    formUpdate(data) {
      userEdit(data)
        .then((res) => {
          uni.showToast({
            title: res.msg,
            icon: "none",
            duration: 2000,
          });
        })
        .catch((msg) => {
          uni.showToast({
            title: msg || `保存失败`,
            icon: "none",
            duration: 2000,
          });
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
    padding: 24rpx 24rpx 0 24rpx;
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
