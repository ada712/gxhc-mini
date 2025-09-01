<template>
  <view class="follow-box">
    <view class="wirpper">
      <view class="content">
        <view class="same-title">项目名称：{{ projectName }}</view>
        <view class="same-title">公司最新业务进展</view>
        <view class="input-module">
          <textarea
            class="textareas"
            placeholder="请输入最新公司业务进展"
            maxlength="-1"
            v-model="latestBusines"
            placeholder-style="color: rgba(47,48,49,0.5);"
          />
        </view>
        <view class="same-title">需要理事会支持资源</view>
        <view class="input-module">
          <textarea
            class="textareas"
            placeholder="包含资金、资源、咨询各方面具体方向，理事会将推荐适合的理事成员"
            maxlength="-1"
            v-model="councilSuport"
            placeholder-style="color: rgba(47,48,49,0.5);"
          />
        </view>

        <view class="same-title">公司财务报表（需上传季度报表）</view>
        <view class="upload-module">
          <view class="same-font have-value" v-if="finacialReportName">{{
            finacialReportName
          }}</view>
          <view class="same-font nofile" v-else>未选择文件</view>
          <view class="upload-btn" @click="uploadFinanceFile">选择文件</view>
        </view>
      </view>
      <view class="foot-box">
        <view class="sumit-btn" @click="handleCheckData">提交</view>
      </view>
    </view>
  </view>
</template>

<script>
import { HTTP_REQUEST_URL, TOKENNAME } from "@/config/app";
import store from "@/store";
import { investProjectsUpdateSupply } from "@/api/gxhc";
export default {
  data: function () {
    return {
      projectId: "",
      projectName: "",
      latestBusines: "", // 最新进展
      finacialReport: "", // 财务报表云存储路径
      finacialReportName: "", // 财务报名名称
      councilSuport: "", // 理事会支持
    };
  },
  onLoad(options) {
    const { id, companyName } = options;
    console.log("9999=?", options);
    this.projectId = id;
    this.projectName = companyName;
  },
  methods: {
    uploadFinanceFile() {
      //#ifdef MP-WEIXIN
      wx.chooseMessageFile({
        count: 1,
        type: "file",
        success: (res) => {
          if (res.tempFiles[0].size <= 10485760) {
            this.uploadFileToFile("finacial", res.tempFiles[0]);
          } else {
            uni.showToast({
              title: "文件大小不能超过10M",
              icon: "none",
            });
          }
        },
        fail() {
          uni.showToast({
            title: "文件选择失败",
            icon: "none",
          });
        },
      });
      // #endif
      //#ifndef MP-WEIXIN
      uni.chooseFile({
        count: 1,
        type: "file",
        success: (res) => {
          if (res.tempFiles[0].size <= 10485760) {
            this.uploadFileToFile("finacial", res.tempFiles[0]);
          } else {
            uni.showToast({
              title: "文件大小不能超过10M",
              icon: "none",
            });
          }
        },
        fail() {
          uni.showToast({
            title: "文件选择失败",
            icon: "none",
          });
        },
      });
      // #endif
    },
    uploadFileToFile(fileType, tempFiles) {
      uni.showLoading({
        title: `文件上传中`,
      });
      console.log(tempFiles);
      uni.uploadFile({
        url: HTTP_REQUEST_URL + "/api/upload/file",
        filePath: tempFiles.path,
        name: "file",
        formData: {
          filename: "file",
        },
        header: {
          // #ifdef MP
          "Content-Type": "multipart/form-data",
          // #endif
          [TOKENNAME]: "Bearer " + store.state.app.token,
        },
        success: (res) => {
          uni.hideLoading();
          if (res.statusCode == 403) {
            this.$util.Tips({
              title: res.data,
            });
          } else {
            let data = res.data ? JSON.parse(res.data) : {};
            if (data.status == 200) {
              console.log("文件上传成功", data, res);
              this.finacialReportName = tempFiles.name;
              // 保存文件云存储路径
              if (fileType === "finacial") {
                this.finacialReport = data.data.url;
              }
              if (fileType === "plan") {
                this.bizPlan = data.data.url;
              }
            } else {
              this.$util.Tips({
                title: data.msg,
              });
            }
          }
        },
        fail: (err) => {
          uni.hideLoading();
          this.$util.Tips({
            title: `上传文件失败`,
          });
        },
      });
    },
    handleCheckData() {
      if (!this.latestBusines) {
        uni.showToast({
          title: "请填写公司最新业务进展",
          icon: "none",
        });
        return;
      }
      if (!this.councilSuport) {
        uni.showToast({
          title: "请填写需要的理事会支持",
          icon: "none",
        });
        return;
      }
      if (!this.finacialReport) {
        uni.showToast({
          title: "请上传公司财务报表",
          icon: "none",
        });
        return;
      }
      const applyParams = {
        id: this.projectId,
        latestBusines: this.latestBusines, // 最新进展
        finacialReport: this.finacialReport, // 财务报表云存储路径
        councilSuport2: this.councilSuport, // 理事会支持
      };
      uni.showLoading();
      this.fetchSupplyProjectData(applyParams);
    },
    fetchSupplyProjectData(params) {
      investProjectsUpdateSupply(params)
        .then((res) => {
          uni.hideLoading();
          console.log("res==>", res);
          setTimeout(() => {
            uni.switchTab({
              url: "/pages/home/index/index",
            });
          }, 2000);
          uni.showToast({
            title: "感谢您的支持与配合",
            icon: "none",
            mask: true,
            duration: 2500,
          });
        })
        .catch((error) => {
          uni.hideLoading();
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.follow-box {
  position: relative;
  width: 100%;
}
.wirpper {
  width: 100%;
  box-sizing: border-box;
  padding: 32rpx 24rpx;
  .content {
    width: 100%;
    background-color: #ffffff;
    border-radius: 24rpx;
    box-sizing: border-box;
    padding: 24rpx;
    .same-title {
      font-weight: 600;
      font-size: 28rpx;
      color: #2f3031;
      line-height: 42rpx;
      margin-bottom: 16rpx;
    }
    .input-module {
      position: relative;
      margin-bottom: 24rpx;
      display: flex;
      flex-direction: column;
    }
    .textareas {
      width: 100%;
      height: 240rpx;
      background: #ffffff;
      border-radius: 12rpx;
      border: 1rpx solid #e5e6e6;
      box-sizing: border-box;
      padding: 16rpx;
    }
    .remark {
      font-size: 24rpx;
      color: rgba(47, 48, 49, 0.5);
      line-height: 36rpx;
      margin-bottom: 24rpx;
    }
    .upload-module {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24rpx;
      position: relative;
      border-radius: 12rpx 12rpx 12rpx 12rpx;
      border: 1rpx solid #e5e6e6;
      .same-font {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 490rpx;
        height: 72rpx;
        background: #ffffff;
        font-size: 24rpx;
        box-sizing: border-box;
        padding-left: 10rpx;
      }
      .nofile {
        color: rgba(47, 48, 49, 0.5);
      }
      .have-value {
        color: #2f3031;
      }
      .upload-btn {
        width: 160rpx;
        height: 72rpx;
        background: rgba(41, 105, 255, 0.1);
        border-radius: 12rpx;
        border: 1rpx solid #2969ff;
        color: #2969ff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .mb8 {
      margin-bottom: 8rpx !important;
    }
  }
}
.foot-box {
  width: 100%;
  box-sizing: border-box;
  padding: 40rpx 32rpx 48rpx 32rpx;
  margin-top: 52rpx;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  .sumit-btn {
    width: 100%;
    font-weight: 600;
    font-size: 32rpx;
    color: #ffffff;
    line-height: 48rpx;
    width: 100%;
    height: 88rpx;
    background: #2969ff;
    border-radius: 12rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
