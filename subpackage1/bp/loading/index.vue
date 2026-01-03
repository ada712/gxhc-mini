<template>
  <view class="pages">
    <!-- 加载动画区域 -->
    <view class="loading-container">
      <!-- 圆形加载动画 -->
      <view class="loading-circle">
        <view class="circle-progress">
          <svg class="progress-svg" viewBox="0 0 200 200">
            <circle
              class="progress-circle-bg"
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="#e0e7ff"
              stroke-width="8"
            ></circle>
            <circle
              class="progress-circle"
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="#285ee7"
              stroke-width="8"
              stroke-linecap="round"
              :style="{ strokeDasharray: `${progress * 565} 565` }"
            ></circle>
          </svg>
        </view>
        <!-- 文档+放大镜图标 -->
        <view class="loading-icon-wrapper">
          <image class="loading-icon" src="/pages/users/static/home/file.png" mode="aspectFit"></image>
        </view>
      </view>

      <!-- 主文本 -->
      <text class="loading-main-text">正在解析 BP 结构..</text>

      <!-- 副文本 -->
      <text class="loading-sub-text">AI引擎正在提取关键商业要素</text>
    </view>

    <!-- 底部进度条 -->
    <view class="progress-bar-container">
      <view class="progress-bar" :style="{ width: progressPercent + '%' }"></view>
    </view>
  </view>
</template>

<script>
import { getBpInfo } from "@/api/gxhc.js";

export default {
  data() {
    return {
      progress: 0, // 0-1 之间的进度值
      progressPercent: 0, // 0-100 的百分比
      runId: "",
      timer: null,
      checkTimer: null,
    };
  },
  onLoad(options) {
    if (options.runId) {
      this.runId = options.runId;
      this.startProgress();
      this.checkStatus();
    }
  },
  onUnload() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.checkTimer) {
      clearInterval(this.checkTimer);
    }
  },
  methods: {
    startProgress() {
      // 模拟进度增长
      this.timer = setInterval(() => {
        if (this.progress < 0.9) {
          this.progress += 0.02;
          this.progressPercent = Math.min(Math.floor(this.progress * 100), 90);
        }
      }, 500);
    },
    checkStatus() {
      // 轮询检查状态
      this.checkTimer = setInterval(() => {
        getBpInfo({ run_id: this.runId, target: "export_preliminary" })
          .then((res) => {
            if (res.status === 200 && res.data) {
              const bpInfo = res.data;
              // 更新进度
              if (bpInfo.progress !== undefined) {
                this.progress = bpInfo.progress / 100;
                this.progressPercent = bpInfo.progress;
              }
              
              // 如果进度达到100%或状态为成功，跳转到结果页面
              if (
                (bpInfo.progress >= 100 || bpInfo.status === "SUCCEEDED") &&
                bpInfo.progress == 100
              ) {
                clearInterval(this.checkTimer);
                clearInterval(this.timer);
                // 跳转到结果页面
                uni.redirectTo({
                  url: `/subpackage1/bp/result/base/index?runId=${this.runId}`,
                });
              } else if (["FAILED", "CANCELED"].includes(bpInfo.status)) {
                // 如果失败，也跳转到结果页面显示失败状态
                clearInterval(this.checkTimer);
                clearInterval(this.timer);
                uni.redirectTo({
                  url: `/subpackage1/bp/result/base/index?runId=${this.runId}`,
                });
              }
            }
          })
          .catch((error) => {
            console.error("检查BP状态异常:", error);
            // 不中断轮询，继续检查
          });
      }, 2000);
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  padding: 0 28rpx;
  box-sizing: border-box;
  position: relative;

  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;

    .loading-circle {
      position: relative;
      width: 200rpx;
      height: 200rpx;
      margin-bottom: 60rpx;

      .circle-progress {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;

        .progress-svg {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }

        .progress-circle-bg {
          opacity: 0.3;
        }

        .progress-circle {
          transition: stroke-dasharray 0.3s ease;
        }
      }

      .loading-icon-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80rpx;
        height: 80rpx;
        display: flex;
        align-items: center;
        justify-content: center;

        .loading-icon {
          width: 60rpx;
          height: 60rpx;
        }
      }
    }

    .loading-main-text {
      font-size: 36rpx;
      font-weight: 600;
      color: #182855;
      margin-bottom: 24rpx;
      font-family: "PingFang SC";
    }

    .loading-sub-text {
      font-size: 28rpx;
      color: #909399;
      font-family: "PingFang SC";
    }
  }

  .progress-bar-container {
    position: absolute;
    bottom: 100rpx;
    left: 28rpx;
    right: 28rpx;
    height: 8rpx;
    background: #e0e7ff;
    border-radius: 4rpx;
    overflow: hidden;

    .progress-bar {
      height: 100%;
      background: linear-gradient(90deg, #285ee7 0%, #403ccd 100%);
      border-radius: 4rpx;
      transition: width 0.3s ease;
    }
  }
}
</style>

