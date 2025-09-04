<template>
  <view class="pages">
    <view class="content">
      <text class="title">BP文件名称名称名称名称名称名称名</text>
      <view class="bp"></view>
    </view>
    <view class="btn" @click="downloadBp">
      <text class="btn-t">诊断报告下载</text>
    </view>

    <view class="introduce">
      <image class="int-icon" :src="imgUrl + '/index/int_icon2.png'" />
      <view class="introduce-content">
        <view class="introduce-item" @click="goPage('introduce')">
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
        <view class="introduce-item" @click="goPage('cha')">
          <view class="introduce-info">
            <view class="int-t">
              <text>理事会介绍</text>
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
                >以孵化人工智能初创项目为主要目标的非盈利组织</text
              >
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { imgUrls } from "@/config/app";
export default {
  data: function () {
    return {
      imgUrl: imgUrls,
      showPopup: false,
    };
  },
  methods: {
    goPage(type) {
      let url = "";
      if (type == "cha") {
        url = "https://mp.weixin.qq.com/s/kCbiycoxR5xv5EPjwl7zaA";
        url = `/pages/web/index?url=${encodeURIComponent(url)}`;
      } else if (type == "introduce") {
        url = `/pages/home/introduce/index`;
      }
      uni.navigateTo({
        url,
      });
    },
    downloadBp() {
      uni.showModal({
        title: "诊断完成",
        content: "您是否需要更多投资意见支持?",
        cancelText: "否",
        confirmText: "是",
        success(res) {
          if (res.confirm) {
            uni.navigateTo({
              url: "/pages/introduce/index",
            });
          }
        },
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
  padding-bottom: 50rpx;
  .content {
    margin: 24rpx 32rpx;
    border-radius: 28rpx;
    background: #ffffff;
    padding: 20rpx 24rpx;
    .title {
      color: #182855;
      font-size: 24rpx;
      font-weight: 600;
    }
    .bp {
      height: 300px;
    }
  }
  .btn {
    margin: 38rpx 76rpx 0 76rpx;
    height: 88rpx;
    border-radius: 300rpx;
    opacity: 1;
    background: #2969ff;
    display: flex;
    align-items: center;
    justify-content: center;
    .btn-t {
      color: #ffffff;
      font-size: 28rpx;
      font-weight: 400;
    }
  }
  .introduce {
    margin: 30rpx 24rpx 0 24rpx;
    border-radius: 28rpx;
    background: #ffffff;
    padding: 32rpx 36rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .int-icon {
      width: 160rpx;
      height: 160rpx;
      flex-shrink: 0;
    }
    .introduce-content {
      margin-left: 28rpx;
    }
    .introduce-item {
      display: flex;
      &:first-child {
        margin-bottom: 30rpx;
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
}
</style>
