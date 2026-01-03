<template>
  <view class="pages">
    <!-- BP文件上传区域 -->
    <view class="upload-card" @click="choosePDF">
      <view class="upload-icon-wrapper">
        <image class="upload-icon" src="/pages/users/static/home/file.png" mode="aspectFit"></image>
      </view>
      <text class="upload-title">选择BP文件上传</text>
      <text class="upload-subtitle">(支持PDF 格式)</text>
    </view>

    <!-- 功能卡片区域 -->
    <view class="feature-cards">
      <view class="feature-card" @click="goDiagnosisRecord">
        <view class="card-icon-wrapper">
          <image class="card-icon" src="/pages/users/static/home/time.png" mode="aspectFit"></image>
        </view>
        <text class="card-text">诊断记录</text>
      </view>
      <view class="feature-card" @click="goLiveBooking">
        <view class="card-icon-wrapper">
          <image class="card-icon" src="/pages/users/static/home/live.png" mode="aspectFit"></image>
        </view>
        <text class="card-text">预约直播</text>
      </view>
    </view>

    <!-- 注意事项 -->
    <view class="notice-box">
      <view class="notice-header">
        <image class="notice-icon" src="/pages/users/static/home/warning.png" mode="aspectFit"></image>
        <text class="notice-title">注意事项</text>
      </view>
      <text class="notice-content">报告获取时间约20分钟,诊断完成后 Uni Agent 会通过短信与服务号形式同时通知您</text>
    </view>

    <!-- 免责声明 -->
    <view class="disclaimer">
      <text class="disclaimer-title">免责声明</text>
      <text class="disclaimer-item">1. Agent生成内容完全由AI自动生成,信息内容来源于用户上传文件与全网信息,模型经过工程手段调优后仍可能存在幻觉,国信合创与Uuni项目组不对内容真实性进行任何保证诊断内容仅供用户参考。</text>
      <text class="disclaimer-item">2. 用户上传文件巾帼严格保密,仅用于模型分析,未经用户授权不会用于任何商业目的。</text>
    </view>
  </view>
</template>

<script>
import { runBp } from "@/api/gxhc.js";
import { HTTP_REQUEST_URL, TOKENNAME } from "@/config/app";
import { imgUrls } from "@/config/app";
export default {
  data: function () {
    return {
      uploading: false,
    };
  },
  onLoad() {
    // this.postBP();
  },
  methods: {
    goDiagnosisRecord() {
      uni.navigateTo({
        url: "/subpackage1/bp/list/index",
      });
    },
    goLiveBooking() {
      uni.navigateTo({
        url: "/subpackage1/bp/applyPlay/index",
      });
    },
    choosePDF() {
      if (this.uploading) {
        return;
      }

      // #ifdef MP-WEIXIN
      uni.chooseMessageFile({
        count: 1,
        type: "file",
        extension: ["pdf"],
        success: (res) => {
          const tempFiles = res.tempFiles;
          if (tempFiles && tempFiles.length > 0) {
            const file = tempFiles[0];
            if (file.size > 50 * 1024 * 1024) {
              uni.showToast({
                title: "文件大小不能超过50MB",
                icon: "none",
              });
              return;
            }
            this.uploadPDF(file);
          }
        },
        fail: (err) => {
          console.error("选择文件失败", err);
        },
      });
      // #endif

      // #ifdef H5
      uni.chooseFile({
        count: 1,
        type: "file",
        extension: ["pdf"],
        success: (res) => {
          const tempFiles = res.tempFiles;
          if (tempFiles && tempFiles.length > 0) {
            const file = tempFiles[0];
            if (file.size > 10 * 1024 * 1024) {
              uni.showToast({
                title: "文件大小不能超过10MB",
                icon: "none",
              });
              return;
            }
            this.uploadPDF(file);
          }
        },
        fail: (err) => {
          console.error("选择文件失败", err);
        },
      });
      // #endif
    },
    uploadPDF(file) {
      this.uploading = true;
      // 显示上传提示
      uni.showLoading({
        title: "上传中...",
      });
      uni.uploadFile({
        url: HTTP_REQUEST_URL + "/api/runBp", // 替换为实际的API地址
        // url: HTTP_REQUEST_URL+'/bp/api/runs', // 替换为实际的API地址
        // url: 'https://gxhc-agent.mahanova.com/api/runs', // 替换为实际的API地址
        filePath: file.path || file,
        name: "files",
        header: {
          // #ifdef MP
          "Content-Type": "multipart/form-data",
          // "Content-Type": "application/json",
          // #endif
          // 'Authorization': "Bearer sk-SDQ2J97ezAs1iILJzn00LQ"
          [TOKENNAME]: "Bearer " + this.$store.state.app.token,
        },
        formData: {
          // 其他需要提交的表单数据
          pipeline: "bp_diagnosis",
          target: "export_preliminary",
          filename: file.name || "unknown.pdf", // 添加原文件名
        },
        success: (uploadFileRes) => {
          uni.hideLoading();
          this.uploading = false;

          // 解析返回结果
          let data;
          try {
            data = JSON.parse(uploadFileRes.data);
          } catch (e) {
            console.error("解析响应失败", e);
            uni.showToast({
              title: "上传失败",
              icon: "none",
            });
            return;
          }
          console.log(data);
          // 判断上传是否成功
          if (data.status == 200) {
            // 跳转到加载页面
            uni.redirectTo({
              url: "/subpackage1/bp/loading/index?runId=" + data.data.run_id
            });
          } else {
            uni.showToast({
              title: data.msg || "上传失败",
              icon: "none",
            });
          }
        },
        fail: (err) => {
          uni.hideLoading();
          this.uploading = false;
          console.error("上传失败", err);
          uni.showToast({
            title: "上传失败",
            icon: "none",
          });
        },
      });
    },
    postBP() {
      runBp({}).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style>
page {
  background: #ffffff;
}
</style>
<style lang="scss" scoped>
.pages {
  width: 100%;
  box-sizing: border-box;
  padding: 32rpx 28rpx;
  background: #ffffff;

  // BP文件上传卡片
  .upload-card {
    width: 698rpx;
    height: 298rpx;
    border-radius: 46rpx;
    opacity: 1;
    background: linear-gradient(155.4deg, #285ee7 0%, #403ccd 100%);
    box-shadow: 0 8rpx 20rpx 0 #3715d333;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 32rpx;

    .upload-icon-wrapper {
      margin-bottom: 26rpx;

      .upload-icon {
        width: 106rpx;
        height: 106rpx;
        opacity: 1;
        border: 2rpx solid #ffffff66;
        background: #6379e5;
        border-radius: 50%;
        box-sizing: border-box;
      }
    }

    .upload-title {
      width: 260rpx;
      height: 44rpx;
      opacity: 1;
      color: #ffffff;
      text-align: center;
      font-size: 36rpx;
      font-weight: 700;
      font-family: "DIN Alternate";
      line-height: 44rpx;
      margin-bottom: 16rpx;
      display: block;
    }

    .upload-subtitle {
      width: 198rpx;
      height: 44rpx;
      opacity: 0.5;
      color: #ffffff;
      text-align: center;
      font-size: 24rpx;
      font-weight: 700;
      font-family: "DIN Alternate";
      line-height: 44rpx;
      display: block;
    }
  }

  // 功能卡片区域
  .feature-cards {
    display: flex;
    gap: 32rpx;
    margin-bottom: 32rpx;

    .feature-card {
      flex: 1;
      height: 214rpx;
      border-radius: 32rpx;
      opacity: 1;
      border: 2rpx solid #e6edf4;
      background: #f4f7fa;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24rpx;
      box-sizing: border-box;

      .card-icon-wrapper {
       
        border-radius: 50%;
        background: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 14rpx;

        .card-icon {
          width: 88rpx;
          height: 88rpx;
          opacity: 1;
        }
      }

      .card-text {
        width: 96rpx;
        height: 30rpx;
        opacity: 1;
        color: #000000;
        text-align: left;
        font-size: 24rpx;
        font-weight: 400;
        font-family: "PingFang SC";
        line-height: 30rpx;
        display: block;
      }
    }
  }

  // 注意事项
  .notice-box {
    height: 188rpx;
    border-radius: 32rpx;
    opacity: 1;
    border: 2rpx solid #fef7d9;
    background: #fffbeb;
    padding: 24rpx;
    margin-bottom: 32rpx;
    box-sizing: border-box;

    .notice-header {
      display: flex;
      align-items: center;
      margin-bottom: 16rpx;

      .notice-icon {
        width: 32rpx;
        height: 32rpx;
        margin-right: 12rpx;
      }

      .notice-title {
        width: 96rpx;
        height: 30rpx;
        opacity: 1;
        color: #d97757;
        text-align: left;
        font-size: 24rpx;
        font-weight: 600;
        font-family: "PingFang SC";
        line-height: 30rpx;
        display: block;
      }
    }

    .notice-content {
      width: 602rpx;
      height: 70rpx;
      opacity: 1;
      color: #ca854c;
      text-align: left;
      font-size: 24rpx;
      font-weight: 400;
      font-family: "PingFang SC";
      line-height: 30rpx;
      display: block;
    }
  }

  // 免责声明
  .disclaimer {
    .disclaimer-title {
      width: 96rpx;
      height: 30rpx;
      opacity: 1;
      color: #bcbcbc;
      text-align: left;
      font-size: 24rpx;
      font-weight: 600;
      font-family: "PingFang SC";
      line-height: 30rpx;
      display: block;
      margin-bottom: 16rpx;
    }

    .disclaimer-item {
      opacity: 1;
      color: #a8a8a8;
      text-align: left;
      font-size: 24rpx;
      font-weight: 400;
      font-family: "PingFang SC";
      line-height: 30rpx;
      display: block;
      margin-bottom: 16rpx;
    }
  }
}
</style>
