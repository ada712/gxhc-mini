<template>
  <x-load-page v-if="pageLoading" :loadingType="2" />
  <view class="pages" v-else>
    <text class="title">{{ bpInfo.filename || "文件未命名" }}</text>
    <view class="base">
      <template v-if="bpInfo.status === 'SUCCEEDED' && bpInfo.progress == 100">
        <image class="icon" :src="imgUrl + '/subpackage1/base-icon3.png'" />
        <text class="title">解锁成功</text>
        <text class="desc">恭喜您，已成功解锁BP诊断报告Plus版</text>
        <view class="btn" @click="showBp">
          <text class="btn-t">立即在线查看</text>
        </view>
        <text class="tip" @click="copyBpUrl">复制下载链接</text>
      </template>
      <template
        v-else-if="
          ['QUEUED', 'RUNNING'].includes(bpInfo.status) && bpInfo.progress < 100
        "
      >
        <image class="icon" :src="imgUrl + '/subpackage1/head-icon2.png'" />
        <text class="title">诊断中</text>
        <text class="desc2">诊断报告正在诊断中，请稍后</text>
        <text class="desc2">报告获取预计时间十分钟，完成后会通过短信通知</text>
      </template>
      <template v-else-if="['FAILED', 'CANCELED'].includes(bpInfo.status)">
        <image class="icon" :src="imgUrl + '/subpackage1/head-icon3.png'" />
        <text class="title">诊断失败</text>
        <text class="desc">该诊断报告诊断失败，请重新诊断</text>
        <view class="btn" @click="showBp">
          <text class="btn-t">重新诊断</text>
        </view>
      </template>
    </view>
    <template v-if="bpInfo.status === 'SUCCEEDED' && bpInfo.progress == 100">
      <view class="play">
        <image class="banner" :src="imgUrl + '/subpackage1/play-bj.png'" />
      </view>
      <view class="play-btn" @click="goPage">立即报名参与直播课</view>
    </template>
  </view>
</template>

<script>
import { imgUrls, HTTP_REQUEST_URL, TOKENNAME } from "@/config/app";
import { getBpInfo } from "@/api/gxhc";
import { previewPDF } from "@/utils/project";

export default {
  data: function () {
    return {
      imgUrl: imgUrls,
      runId: "",
      bpInfo: {},
      pageLoading: true,
    };
  },
  onLoad(options) {
    if (options.runId) {
      this.runId = options.runId;
      this.getBpInfoData();
    } else {
      this.pageLoading = false;
    }
  },
  methods: {
    getBpInfoData() {
      if (!this.runId) {
        console.warn("缺少runId参数");
        this.pageLoading = false;
        return;
      }

      getBpInfo({ run_id: this.runId, target: "export_optimization" })
        .then((res) => {
          if (res.status === 200) {
            this.bpInfo = res.data;
          } else {
            uni.showToast({
              title: res.message || "获取BP信息失败",
              icon: "none",
            });
          }
        })
        .catch((error) => {
          console.error("获取BP信息异常:", error);
          uni.showToast({
            title: "网络错误",
            icon: "none",
          });
        })
        .finally(() => {
          this.pageLoading = false;
        });
    },
    showBp() {
      if (!this.bpInfo.file_id) {
        console.warn("缺少file_id参数");
        return;
      }
      uni.downloadFile({
        url:
          HTTP_REQUEST_URL +
          "/api/downloadBpUrl?file_id=" +
          this.bpInfo.file_id,
        header: {
          // #ifdef MP
          "Content-Type": "application/octet-stream",
          // #endif
          [TOKENNAME]: "Bearer " + this.$store.state.app.token,
        },
        success: (res) => {
          if (res.statusCode === 200) {
            const tempFilePath = res.tempFilePath;
            uni.openDocument({
              filePath: tempFilePath,
              fileType: "pdf",
              success: () => {},
              fail: (err) => {
                console.error("打开文档失败:", err);
              },
            });
          }
        },
        fail: (err) => {
          console.log(err);
          uni.showToast({
            title: "下载失败",
            icon: "none",
          });
        },
      });
    },
    copyBpUrl() {
      if (!this.bpInfo || !this.bpInfo.file_id) {
        uni.showToast({
          title: "暂无下载链接",
          icon: "none",
        });
        return;
      }

      const downloadUrl =
        HTTP_REQUEST_URL + "/api/downloadBpUrl?file_id=" + this.bpInfo.file_id;

      uni.setClipboardData({
        data: downloadUrl,
        success: () => {
          uni.showToast({
            title: "链接已复制到剪贴板",
            icon: "none",
          });
        },
        fail: (err) => {
          console.error("复制链接失败", err);
          uni.showToast({
            title: "复制链接失败",
            icon: "none",
          });
        },
      });
    },
    goPage() {
      uni.navigateTo({
        url: "/subpackage1/bp/applyPlay/index",
      });
    },
  },
};
</script>

<style>
page {
  background: #f5f8ff;
}
</style>
<style lang="scss" scoped>
.pages {
  padding-bottom: 80rpx;
  .title {
    color: #182855;
    font-size: 24rpx;
    font-weight: 600;
    margin-top: 20rpx;
    margin-left: 20rpx;
    display: block;
  }
  .play {
    margin: 20rpx 32rpx 0 32rpx;
    height: 598rpx;
    border-radius: 28rpx;
    position: relative;
    z-index: 1;
    .banner {
      width: 100%;
      height: 100%;
    }
  }
  .play-btn {
    position: relative;
    z-index: 2;
    width: 598rpx;
    height: 88rpx;
    border-radius: 300rpx;
    opacity: 1;
    background: #ff2b2b;
    color: #ffffff;
    text-align: center;
    font-size: 28rpx;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: -10rpx auto 0 auto;
  }
  .base {
    margin: 20rpx 32rpx 0 32rpx;
    border-radius: 28rpx;
    background: #ffffff;
    padding: 0rpx 24rpx 40rpx 24rpx;
    text-align: center;
    .icon {
      width: 336rpx;
      height: 336rpx;
      display: block;
      margin: 0 auto;
    }
    .title {
      display: block;
      color: #444444;
      text-align: center;
      font-size: 42rpx;
      font-weight: 500;
    }
    .desc,
    .desc2 {
      display: block;
      color: #999999;
      text-align: center;
      font-size: 28rpx;
      font-weight: 400;
      margin-top: 16rpx;
    }
    .desc2 {
      font-size: 26rpx;
    }
    .btn {
      height: 88rpx;
      border-radius: 300rpx;
      margin: 40rpx 52rpx 0 52rpx;
      background: #2969ff;
      display: flex;
      align-items: center;
      justify-content: center;
      .btn-t {
        color: #ffffff;
        text-align: center;
        font-size: 28rpx;
        font-weight: 400;
      }
    }
    .tip {
      color: #2969ff;
      font-size: 28rpx;
      font-weight: 400;
      margin-top: 40rpx;
      display: block;
    }
  }
}
</style>
