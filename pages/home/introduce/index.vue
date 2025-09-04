<template>
  <view class="pages">
    <image class="bg" :src="imgUrl + '/subpackage1/introduce-bj.png'"></image>
    <view class="block mf">
      <text class="title">国信中数介绍</text>
      <view class="block-content">
        <text class="desc"
          >汇聚多元资本力量，构建产业升级新矩阵，驱动经济高质量发展新引擎驱动经济高质量发展新引擎驱动经济高质量发展新引擎驱动经济高质量发展新引擎
          汇聚多元资本力量，构建产业升级新矩阵，驱动经济高质量发展新引擎驱动经济高质量发展新引擎驱动经济高质量发展新引擎驱动经济高质量发展新引擎
          汇聚多元资本力量，构建产业升级新矩阵，驱动经济高质量发展新引擎驱动经济高质量发展新引擎驱动经济高质量发展新引擎驱动经济高质量发展新引擎</text
        >
      </view>
    </view>
    <view class="block">
      <text class="title">基金矩阵介绍</text>
      <view class="block-content">
        <text class="desc"
          >汇聚多元资本力量，构建产业升级新矩阵，驱动经济高质量发展新引擎驱动经济高质量发展新引擎驱动经济高质量发展新引擎驱动经济高质量发展新引擎
          汇聚多元资本力量，构建产业升级新矩阵，驱动经济高质量发展新引擎驱动经济高质量发展新引擎驱动经济高质量发展新引擎驱动经济高质量发展新引擎
          汇聚多元资本力量，构建产业升级新矩阵，驱动经济高质量发展新引擎驱动经济高质量发展新引擎驱动经济高质量发展新引擎驱动经济高质量发展新引擎</text
        >
      </view>
      <view class="icon-list">
        <view class="icon-item">
          <image
            class="icon-item-icon"
            :src="imgUrl + '/subpackage1/introduce-icon1.png'"
          ></image>
          <text class="icon-item-t">种子基金</text>
          <text class="icon-item-d">萌芽启梦 资本护航</text>
        </view>
        <view class="icon-item">
          <image
            class="icon-item-icon"
            :src="imgUrl + '/subpackage1/introduce-icon2.png'"
          ></image>
          <text class="icon-item-t">早期基金</text>
          <text class="icon-item-d">初创助力 点燃希望</text>
        </view>
        <view class="icon-item">
          <image
            class="icon-item-icon"
            :src="imgUrl + '/subpackage1/introduce-icon3.png'"
          ></image>
          <text class="icon-item-t">成长期基金</text>
          <text class="icon-item-d">加速进阶 赋能腾飞</text>
        </view>
      </view>
    </view>
    <view class="block">
      <text class="title">部分投资案例</text>
      <view class="introduce">
        <view class="introduce-item">
          <image class="int-icon" :src="imgUrl + '/index/int_icon1.png'" />
          <view class="introduce-info">
            <view class="int-t">
              <text>往昔征途・资本印记</text>
            </view>
            <view class="int-b">
              <text class="int-b-t"
                >汇聚多元资本力量，构建产业升级新矩阵，驱动经济高质量发展新引擎</text
              >
            </view>
          </view>
        </view>
        <view class="introduce-item">
          <image class="int-icon" :src="imgUrl + '/index/int_icon1.png'" />
          <view class="introduce-info">
            <view class="int-t">
              <text>经典投资・闪耀轨迹</text>
            </view>
            <view class="int-b">
              <text class="int-b-t"
                >汇聚多元资本力量，构建产业升级新矩阵，驱动经济高质量发展新引擎</text
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
    };
  },
  methods: {
    goPage(id) {
      uni.navigateTo({
        url: "/subpackage1/bp/detail/index?id" + id,
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
  padding-bottom: 40rpx;
  .bg {
    width: 100%;
    height: 266rpx;
  }
  .block {
    margin: 24rpx 32rpx;
    border-radius: 28rpx;
    background: #ffffff;
    padding: 34rpx 48rpx;
    position: relative;
    &.mf {
      margin-top: -140rpx;
    }
    .title {
      color: #182855;
      font-size: 24rpx;
      font-weight: 600;
    }
    .block-content {
      background: #f4faff;
      border-radius: 8rpx;
      padding: 24rpx 30rpx;
      margin-top: 18rpx;
      .desc {
        color: #60738e;
        font-size: 22rpx;
        font-weight: 400;
      }
    }
    .icon-list {
      margin-top: 50rpx;
      margin-bottom: 30rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .icon-item {
        .icon-item-icon {
          width: 78rpx;
          height: 78rpx;
          display: block;
          margin: 0 auto;
        }
        .icon-item-t {
          color: #404040;
          text-align: center;
          font-size: 24rpx;
          font-weight: 400;
          display: block;
          margin-top: 8rpx;
        }
        .icon-item-d {
          color: #b7b7b7;
          text-align: center;
          font-size: 22rpx;
          font-weight: 400;
          display: block;
          margin-top: 8rpx;
        }
      }
    }
  }
  .introduce {
    margin-top: 20rpx;
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
          margin-bottom: 16rpx;
          color: #404040;
          text-align: left;
          font-size: 28rpx;
          font-weight: 500;
        }
        .int-b {
          .int-b-t {
            color: #b7b7b7;
            text-align: left;
            font-size: 24rpx;
            font-weight: 400;
          }
        }
      }
    }
  }
}
</style>
