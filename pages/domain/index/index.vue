<template>
  <view class="pages">
    <!-- 实时战报区域 -->
    <view class="realtime-report">
      <image class="report-bg" src="/pages/users/static/domain/img-bg.png" mode="aspectFill"></image>
      <view class="report-header">
        <view class="report-title-wrapper">
          <view class="report-dot"></view>
          <text class="report-title">Uni 1.0 实时战报</text>
        </view>
        <image class="live-stats-btn" src="/pages/users/static/domain/live_start.png" mode="widthFix"></image>
      </view>
      <view class="stats-grid">
        <view class="stat-item">
          <image class="stat-icon" src="/pages/users/static/domain/top1.png" mode="aspectFit"></image>
          <view class="stat-content">
            <view class="stat-value-wrapper">
              <text class="stat-value">320</text>
              <text class="stat-unit">个</text>
            </view>
            <text class="stat-label">创业者提交诊断</text>
          </view>
        </view>
        <view class="stat-item">
          <image class="stat-icon" src="/pages/users/static/domain/top2.png" mode="aspectFit"></image>
          <view class="stat-content">
            <view class="stat-value-wrapper">
              <text class="stat-value">45</text>
              <text class="stat-unit">位</text>
            </view>
            <text class="stat-label">导师深度使用</text>
          </view>
        </view>
        <view class="stat-item">
          <image class="stat-icon" src="/pages/users/static/domain/top3.png" mode="aspectFit"></image>
          <view class="stat-content">
            <view class="stat-value-wrapper">
              <text class="stat-value">580</text>
              <text class="stat-unit">份</text>
            </view>
            <text class="stat-label">Ai诊断报告生成</text>
          </view>
        </view>
        <view class="stat-item">
          <image class="stat-icon" src="/pages/users/static/domain/top4.png" mode="aspectFit"></image>
          <view class="stat-content">
            <view class="stat-value-wrapper">
              <text class="stat-value">8</text>
              <text class="stat-unit">家</text>
            </view>
            <text class="stat-label">生态合作伙伴</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 直播实战精华和最新动态 -->
    <view class="sections-container">
      <!-- 直播实战精华 -->
      <view class="section section-left">
        <view class="section-header section-header-red">
          <view class="section-line"></view>
          <text class="section-title">直播实战精华</text>
        </view>
        <view class="live-highlight-card">
          <image class="video-thumbnail" src="/pages/users/static/home/video_img.png" mode="aspectFill"></image>
          <!-- 左上角标签 -->
          <view class="video-tag">
            <text class="video-tag-text">ju DSEJF</text>
          </view>
          <!-- 底部文字覆盖层 -->
          <view class="video-overlay">
            <text class="highlight-text">导师点评:车水的的的...</text>
          </view>
          <!-- 底部按钮 -->
          <view class="more-btn" @click="goMoreHighlights">
            <text class="more-btn-text">更多实战点评</text>
            <image class="more-btn-arrow" src="/pages/users/static/domain/more.png" mode="aspectFit"></image>
          </view>
        </view>
      </view>

      <!-- 最新动态 -->
      <view class="section section-right">
        <view class="section-header section-header-blue">
          <view class="section-line"></view>
          <text class="section-title">最新动态</text>
        </view>
        <view class="updates-container">
          <view class="updates-list">
            <view class="update-item" v-for="(item, index) in updatesList" :key="index">
              <text class="update-text">{{ item.text }}</text>
              <text class="update-time">{{ item.time }}</text>
            </view>
          </view>
          <image class="full-updates-btn" src="/pages/users/static/domain/com.png" mode="widthFix" @click="goFullUpdates"></image>
        </view>
      </view>
    </view>

    <!-- 常见问题 -->
    <view class="section question">
      <view class="section-header section-header-red">
        <view class="section-line"></view>
        <text class="section-title">常见问题</text>
      </view>
      <view class="faq-list">
        <view class="faq-item" v-for="(item, index) in faqList" :key="index" @click="goFaqDetail(item)">
          <image class="faq-icon" src="/pages/users/static/domain/question.png" mode="aspectFit"></image>
          <view class="faq-content">
            <text class="faq-question">{{ item.question }}</text>
            <text class="faq-answer">{{ item.answer }}</text>
          </view>
          <image class="faq-arrow" src="/pages/users/static/domain/more.png" mode="aspectFit"></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      updatesList: [
        { text: "导师点评:车水的的的...", time: "刚才" },
        { text: "导师点评:车水的的的...", time: "2H前" },
        { text: "导师点评:车水的的的...", time: "1D前" },
      ],
      faqList: [
        {
          question: "如何提升 BP 诊断的准确度?",
          answer: "尽量上传完整,PDF格式的BP..",
        },
        {
          question: "如何提升 BP 诊断的准确度?",
          answer: "尽量上传完整,PDF格式的BP..",
        },
        {
          question: "如何提升 BP 诊断的准确度?",
          answer: "尽量上传完整,PDF格式的BP..",
        },
      ],
    };
  },
  methods: {
    goMoreHighlights() {
      uni.showToast({
        title: "功能开发中",
        icon: "none",
      });
    },
    goFullUpdates() {
      uni.showToast({
        title: "功能开发中",
        icon: "none",
      });
    },
    goFaqDetail(item) {
      uni.showToast({
        title: "功能开发中",
          icon: "none",
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
  padding-bottom: 200rpx;
  background: #ffffff;

  // 实时战报区域
  .realtime-report {
    position: relative;
    padding: 32rpx 28rpx;
    padding-left:120rpx;
    padding-right:96rpx;
    margin-bottom: 32rpx;
    overflow: hidden;

    .report-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 532rpx;
      z-index: 1;
    }

    .report-header {
      position: relative;
      z-index: 2;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32rpx;

      .report-title-wrapper {
        display: flex;
        align-items: center;
        gap: 12rpx;

        .report-dot {
          width: 16rpx;
          height: 16rpx;
          border-radius: 50%;
          background: #2969ff;
        }

        .report-title {
          width: 212rpx;
          height: 40rpx;
          opacity: 1;
          color: #ffffff;
          text-align: left;
          font-size: 28rpx;
          font-weight: 600;
          font-family: "PingFang SC";
          display: block;
        }
      }

          .live-stats-btn {
            width: 152rpx;
            height: 42rpx;
            display: block;
            flex-shrink: 0;
          }
    }

    .stats-grid {
      position: relative;
      z-index: 2;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24rpx;

          .stat-item {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            gap: 16rpx;

            .stat-icon {
              width: 52rpx;
              height: 52rpx;
              flex-shrink: 0;
              margin-top: 10rpx;
            }

            .stat-content {
              flex: 1;
          display: flex;
          flex-direction: column;
              gap: 8rpx;

          .stat-value-wrapper {
            display: flex;
            align-items: baseline;
            gap: 4rpx;

            .stat-value {
              height: 78rpx;
              opacity: 1;
              color: #ffffff;
              text-align: left;
              font-size: 56rpx;
              font-weight: 600;
              font-family: "PingFang SC";
              line-height: 78rpx;
              display: block;
            }

            .stat-unit {
              font-size: 24rpx;
              color: #ffffff;
              font-weight: 400;
              font-family: "PingFang SC";
            }
          }

          .stat-label {
            height: 30rpx;
            opacity: 1;
            color: #dbeafe;
            text-align: left;
            font-size: 22rpx;
            font-weight: 600;
            font-family: "PingFang SC";
            line-height: 30rpx;
            display: block;
          }
        }
      }
    }
  }

  // 通用区块样式
  .sections-container {
    display: flex;
    gap: 24rpx;
    margin: 32rpx 28rpx 0;
    align-items: flex-start;
  }

  .question{
    margin: 24rpx;
    margin-top: 80rpx;
  }
  .section {
    flex: 1;

    .section-header {
      display: flex;
      align-items: center;
      margin-bottom: 24rpx;

      .section-line {
        width: 8rpx;
        height: 32rpx;
        border-radius: 4rpx;
        margin-right: 20rpx;
      }

      &.section-header-red .section-line {
        background: linear-gradient(180deg, #ff4444 0%, #ff6666 100%);
      }

      &.section-header-blue .section-line {
        background: linear-gradient(180deg, #2969ff 0%, #1a56e5 100%);
      }

      .section-title {
        width: 174rpx;
        height: 32rpx;
        opacity: 1;
        color: #000000;
        text-align: left;
        font-size: 24rpx;
        font-weight: 600;
        font-family: "PingFang SC";
        line-height: 32rpx;
        letter-spacing: 2rpx;
        display: block;
      }
    }
  }

  // 直播实战精华
  .live-highlight-card {
    width: 336rpx;
    height: 510rpx;
    border-radius: 54rpx;
    opacity: 1;
    background: #3b82f6;
    box-shadow: 0 8rpx 20rpx 0 #00000033;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;

    .video-thumbnail {
      width: 100%;
      height: 436rpx;
      opacity: 1;
      flex-shrink: 0;
    }

    .video-tag {
      position: absolute;
      top: 16rpx;
      left: 16rpx;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 20rpx;
      padding: 8rpx 16rpx;
      z-index: 2;

      .video-tag-text {
        font-size: 20rpx;
        color: #ffffff;
        font-weight: 500;
        font-family: "PingFang SC";
      }
    }

    .video-overlay {
      position: absolute;
      bottom: 74rpx;
      left: 0;
      right: 0;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 100%);
      padding: 24rpx 16rpx 16rpx;
      z-index: 2;

      .highlight-text {
        width: 240rpx;
        height: 30rpx;
        opacity: 1;
        color: #dbeafe;
        text-align: left;
        font-size: 22rpx;
        font-weight: 600;
        font-family: "PingFang SC";
        line-height: 30rpx;
        display: block;
      }
    }

    .more-btn {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8rpx;
      height: 74rpx;
      padding: 0 24rpx;
      background: linear-gradient(135deg, #2969ff 0%, #1a56e5 100%);
      border-radius: 0 0 54rpx 54rpx;
      box-sizing: border-box;
      z-index: 2;

      .more-btn-text {
        font-size: 24rpx;
        color: #ffffff;
        font-weight: 500;
        font-family: "PingFang SC";
      }

      .more-btn-arrow {
        width: 24rpx;
        height: 24rpx;
      }
    }
  }

  // 最新动态
  .updates-container {
    width: 336rpx;
    height: 510rpx;
    border-radius: 54rpx;
    opacity: 1;
    background: #ffffff;
    box-shadow: 0 8rpx 20rpx 0 #00000033;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 44rpx;
    box-sizing: border-box;
  }

  .updates-list {
    margin-bottom: 16rpx;

    .update-item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 16rpx 0;

      &:last-child {
        border-bottom: none;
      }

      .update-text {
        width: 238rpx;
        height: 30rpx;
        opacity: 1;
        color: #16171a;
        text-align: left;
        font-size: 22rpx;
        font-weight: 500;
        font-family: "Alibaba PuHuiTi 3.0";
        line-height: 30rpx;
        display: block;
        margin-bottom: 8rpx;
      }

      .update-time {
        width: 46rpx;
        height: 28rpx;
        opacity: 1;
        color: #a8b4d0;
        text-align: left;
        font-size: 20rpx;
        font-weight: 400;
        font-family: "Alibaba PuHuiTi 3.0";
        line-height: 28rpx;
        display: block;
      }
    }
  }

  .full-updates-btn {
    width: 268rpx;
    height: 62rpx;
    display: block;
  }

  // 常见问题
  .faq-list {
    height: 436rpx;
    border-radius: 54rpx;
    opacity: 1;
    background: #ffffff;
    box-shadow: 0 8rpx 20rpx 0 #00000033;
    padding: 24rpx;
    box-sizing: border-box;

    .faq-item {
      display: flex;
      align-items: center;
      padding: 24rpx;
      background: #ffffff;
      border-radius: 16rpx;
      margin-bottom: 16rpx;

      .faq-icon {
        width: 70rpx;
        height: 70rpx;
        flex-shrink: 0;
        margin-right: 28rpx;
      }

      .faq-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 8rpx;

        .faq-question {
          width: 328rpx;
          height: 36rpx;
          opacity: 1;
          color: #16171a;
          text-align: left;
          font-size: 26rpx;
          font-weight: 500;
          font-family: "Alibaba PuHuiTi 3.0";
          line-height: 36rpx;
          display: block;
        }

        .faq-answer {
          width: 270rpx;
          height: 28rpx;
          opacity: 1;
          color: #a8b4d0;
          text-align: left;
          font-size: 20rpx;
          font-weight: 400;
          font-family: "Alibaba PuHuiTi 3.0";
          line-height: 28rpx;
          display: block;
        }
      }

      .faq-arrow {
        width: 24rpx;
        height: 24rpx;
        margin-left: 16rpx;
      }
    }
  }
}
</style>
