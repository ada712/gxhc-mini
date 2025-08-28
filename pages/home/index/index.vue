<template>
  <view class="pages">
    <view class="video">
      <image class="video-bg" :src="imgUrl + '/index/video_bg.png'"></image>
      <image class="play-btn" :src="imgUrl + '/index/play_btn.png'"></image>
    </view>
    <view class="introduce">
      <view class="introduce-item">
        <image class="int-icon" :src="imgUrl + '/index/int_icon1.png'" />
        <view class="introduce-info">
          <view class="int-t">
            <text>基金矩阵介绍</text>
            <view class="int-more">
              <text class="int-m-t">前往了解</text>
              <image
                class="right-icon"
                :src="imgUrl + '/index/icon_right_lan.png'"
              />
            </view>
          </view>
          <view class="int-b">
            <text class="int-b-t"
              >汇聚多元资本力量，构建产业升级新矩阵，驱动经济高质量发展新引擎</text
            >
          </view>
        </view>
      </view>
      <view class="introduce-item">
        <image class="int-icon" :src="imgUrl + '/index/int_icon2.png'" />
        <view class="introduce-info">
          <view class="int-t">
            <text>孵化体系介绍</text>
            <view class="int-more">
              <text class="int-m-t">前往了解</text>
              <image
                class="right-icon"
                :src="imgUrl + '/index/icon_right_lan.png'"
              />
            </view>
          </view>
          <view class="int-b">
            <text class="int-b-t"
              >构建全周期孵化链条，链接资源共生网络，激活创新成长无限可能</text
            >
          </view>
        </view>
      </view>
    </view>
    <view class="report">
      <text class="title">AI创诊报告</text>
      <view class="report-list">
        <view class="report-item"></view>
        <view class="report-item"></view>
      </view>
    </view>
		<view class="invest">
      <text class="title">智能投顾助手</text>
      <view class="report-list">
        <view class="report-item"></view>
        <view class="report-item"></view>
      </view>
    </view>
  </view>
</template>

<script>
import { imgUrls2 } from "@/config/app";
export default {
  data: function () {
    return {
      imgUrl: imgUrls2,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
page {
  background: #f5f8ff;
	padding-bottom: 100rpx;
}
.pages {
  width: 100%;
  box-sizing: border-box;
  .title {
    color: #182855;
    font-size: 24rpx;
    font-weight: 600;
  }
  .video {
    height: 412rpx;
    position: relative;
    .video-bg {
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    .play-btn {
      width: 80rpx;
      height: 80rpx;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 2;
    }
  }
  .introduce {
    position: relative;
    z-index: 3;
    margin: -30rpx 24rpx 0 24rpx;
    border-radius: 28rpx;
    background: #ffffff;
    padding: 32rpx 36rpx;
    .introduce-item {
      display: flex;
      &:first-child {
        margin-bottom: 30rpx;
      }
      .int-icon {
        width: 160rpx;
        height: 160rpx;
        flex-shrink: 0;
      }
      .introduce-info {
        margin-left: 50rpx;
        .int-t {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 26rpx;
        }
        .int-b {
          background: #f4faff;
          border-radius: 8rpx;
          padding: 12rpx 20rpx;
          .int-b-t {
            color: #60738e;
            font-size: 22rpx;
            font-weight: 400;
          }
        }
        .int-more {
          display: flex;
          align-items: center;
          .int-m-t {
            font-size: 24rpx;
            font-weight: 400;
            color: #bfc3cf;
          }
          .right-icon {
            width: 48rpx;
            height: 48rpx;
          }
        }
      }
    }
  }
  .report {
    height: 320rpx;
    border-radius: 28rpx;
    background: #ffffff;
    margin: 24rpx 24rpx 0 24rpx;
    padding: 34rpx 24rpx;
  }
	.invest {
		height: 320rpx;
    border-radius: 28rpx;
    background: #ffffff;
    margin: 24rpx 24rpx 0 24rpx;
    padding: 34rpx 24rpx;
	}
}
</style>
