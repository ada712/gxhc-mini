<template>
  <view class="wripper">
    <view class="tips" v-if="is_sm == 1">已申请审核，等待平台审核中～</view>
    <view class="tips suc" v-else-if="is_sm == 2"
      >您已经实名认证，如需重新认证，请重新上传身份信息!</view
    >
    <view class="tips err" v-else-if="is_sm == 3"
      >认证失败！原因：{{ refuse }}</view
    >
    <view class="content">
      <view class="row">
        <view class="label">真实姓名</view>
        <input
          type="text"
          placeholder="请输入真实姓名"
          class="same-input"
          maxlength="20"
          placeholder-style="color: rgba(47,48,49,0.3);"
          v-model="userInfo.certName"
        />
      </view>
      <view class="row">
        <view class="label">身份证号</view>
        <input
          type="text"
          placeholder="请输入18位身份证号"
          class="same-input"
          maxlength="18"
          placeholder-style="color: rgba(47,48,49,0.3);"
          v-model="userInfo.certNo"
        />
      </view>
    </view>
    <view class="title">请上传身份证正反面照片</view>
    <view class="upload-module">
      <view class="upload-box" @click="chooseImage($event, 'front')">
        <view class="top" v-if="!userInfo.cert_front">
          <image
            :src="imgPath + '/mine/img_sfzzm.png'"
            class="img-identity-bg"
          />
          <image
            :src="imgPath + '/mine/icon_photo_gray.png'"
            class="icon-photo"
          />
        </view>
        <view class="top" v-if="userInfo.cert_front">
          <image :src="userInfo.cert_front" class="img-identity" />
        </view>
        <view class="bottom"> 点击上传/拍摄人像面 </view>
      </view>
      <view class="upload-box" @click="chooseImage($event, 'back')">
        <view class="top" v-if="!userInfo.cert_back">
          <image
            :src="imgPath + '/mine/img_sfzfm.png'"
            class="img-identity-bg"
          />
          <image
            :src="imgPath + '/mine/icon_photo_gray.png'"
            class="icon-photo"
          />
        </view>
        <view class="top" v-if="userInfo.cert_back">
          <image :src="userInfo.cert_back" class="img-identity" />
        </view>
        <view class="bottom"> 点击上传/拍摄国徽面 </view>
      </view>
    </view>
    <view class="submit-btn" @click="submitInfo">
      <text v-if="is_sm == 0">立即提交</text>
      <text v-else-if="is_sm == 1">审核中</text>
      <text v-else-if="is_sm == 2">修改信息</text>
      <text v-else-if="is_sm == 3">重新申请</text>
      <text v-else>立即提交</text>
    </view>
  </view>
</template>

<script>
import { imgUrls } from "@/config/app";
import { TOKENNAME, HTTP_REQUEST_URL } from "@/config/app.js";
import { realName, getRealName } from "@/api/user";
export default {
  data: function () {
    return {
      imgPath: imgUrls,
      userInfo: {
        id: "",
        certName: "",
        certNo: "",
        cert_front: "",
        cert_back: "",
      },
      isShowUpdate: false,
      is_sm: 0,
      refuse: "",
    };
  },
  onLoad() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      getRealName()
        .then((res) => {
          if (res.status === 200 && res.data) {
            const data = res.data;
            this.is_sm = data.status; // 设置认证状态

            if (data.status === 3) {
              // 认证失败，设置拒绝原因
              this.refuse = data.refuse || "";
            }

            if (data.certName && data.certNo) {
              // 如果已有认证信息，填充到表单中
              this.userInfo = {
                ...this.userInfo,
                certName: data.certName,
                certNo: data.certNo,
                cert_front: data.cert_front || "",
                cert_back: data.cert_back || "",
              };
            }
          } else {
            console.error("获取实名认证信息失败:", res);
          }
        })
        .catch((error) => {
          console.error("获取实名认证信息异常:", error);
          uni.showToast({
            title: "获取信息失败，请稍后重试",
            icon: "none",
          });
        });
    },
    chooseImage(e, imgType) {
      if (!this.userInfo.certName) {
        uni.showToast({
          title: "请输入您的真实姓名后再上传身份证照片",
          icon: "none",
        });
        return;
      }
      let that = this;
      //#ifdef H5
      uni.chooseImage({
        count: 1,
        mediaType: ["image"],
        sourceType: ["album", "camera"],
        sizeType: ["original", "compressed"],
        camera: "back",
        success(res) {
          console.log(res.tempFiles[0]);
          console.log(res.tempFiles[0].tempFilePath);
          if (res.tempFiles[0].size > 10 * 1024 * 1024) {
            // 如果图片大小超过9MB
            uni.showToast({
              title: "图片大于10M，请重新选择",
              icon: "none",
            });
          } else {
            // 图片大小合适，可以继续处理
            const imgName =
              imgType === "front"
                ? `${that.userInfo.certName}正面`
                : `${that.userInfo.certName}反面`;
            that.uploadIdentityImgToCloud(res, imgType, imgName);
          }
        },
      });
      //#endif

      //#ifdef MP-WEIXIN
      uni.chooseMedia({
        count: 1,
        mediaType: ["image"],
        sourceType: ["album", "camera"],
        sizeType: ["original", "compressed"],
        camera: "back",
        success(res) {
          console.log(res.tempFiles[0]);
          console.log(res.tempFiles[0].tempFilePath);
          if (res.tempFiles[0].size > 10 * 1024 * 1024) {
            // 如果图片大小超过9MB
            uni.showToast({
              title: "图片大于10M，请重新选择",
              icon: "none",
            });
          } else {
            // 图片大小合适，可以继续处理
            const imgName =
              imgType === "front"
                ? `${that.userInfo.certName}正面`
                : `${that.userInfo.certName}反面`;
            that.uploadIdentityImgToCloud(res, imgType, imgName);
          }
        },
      });
      //#endif
    },
    uploadIdentityImgToCloud(res, imgType, imgName) {
      const that = this;
      uni.uploadFile({
        url: HTTP_REQUEST_URL + "/api/upload/image",
        filePath: res.tempFilePaths[0],
        fileType: "image",
        name: "pics",
        formData: {
          filename: "pics",
        },
        header: {
          // #ifdef MP
          "Content-Type": "multipart/form-data",
          // #endif
          [TOKENNAME]: "Bearer " + that.$store.state.app.token,
        },
        success: function (res) {
          uni.hideLoading();
          if (res.statusCode == 403) {
            that.Tips({
              title: res.data,
            });
          } else {
            let data = res.data ? JSON.parse(res.data) : {};
            if (data.status == 200) {
              console.log("上传成功，文件ID:", data.data);
              if (imgType === "front") {
                that.userInfo.cert_front = data.data.url;
              } else {
                that.userInfo.cert_back = data.data.url;
              }
            } else {
              errorCallback && errorCallback(data);
              that.Tips({
                title: data.msg,
              });
            }
          }
        },
        fail: function (res) {
          uni.hideLoading();
          that.Tips({
            title: `上传图片失败`,
          });
        },
      });
    },
    submitInfo() {
      const { certName, certNo, cert_front, cert_back } = this.userInfo;
      if (!certName) {
        uni.showToast({
          title: "请输入真实姓名",
          icon: "none",
        });
        return;
      }
      if (!certNo) {
        uni.showToast({
          title: "请输入身份证号",
          icon: "none",
        });
        return;
      }
      if (!cert_front) {
        uni.showToast({
          title: "请上传身份证正面照片",
          icon: "none",
        });
        return;
      }
      if (!cert_back) {
        uni.showToast({
          title: "请输入身份反面照片",
          icon: "none",
        });
        return;
      }
      uni.showLoading();
      this.fetchUpdateUserInfo();
    },
    fetchUpdateUserInfo: function () {
      realName(this.userInfo)
        .then((res) => {
          uni.hideLoading();
          console.log("res", res);
          if (res.status == 200) {
            uni.showModal({
              content: "实名认证成功",
              confirmText: "我知道了",
              showCancel: false,
              success(res1) {
                if (res1.confirm) {
                  uni.navigateBack();
                }
              },
            });
            this.getUserInfo()
          } else {
            uni.showToast({
              title: res.msg,
              icon: "none",
            });
          }
        })
        .catch((error) => {
          uni.hideLoading();
          uni.showToast({
              title: error,
              icon: "none",
            });
          console.log(error);
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
    &.suc {
      color: #67c23a;
    }
    &.err {
      padding: 20rpx 30rpx;
      color: #ff3333;
    }
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
