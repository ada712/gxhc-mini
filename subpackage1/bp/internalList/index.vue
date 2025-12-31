<template>
  <view class="introduce">
    <view class="title">
      <text class="title-t">诊断样本案例</text>
    </view>
    <view
      class="item"
      @click="handleShowPdf(item.link)"
      v-for="(item, key) in internalDemos"
      :key="key"
    >
      <view class="top">
        <text class="title">{{ item.title }}</text>
        <view class="more">
          <image
            class="right-icon"
            :src="imgUrl + '/icons/icon-black-right.png'"
          ></image>
        </view>
      </view>
      <text class="time">{{ item.time }}</text>
    </view>
  </view>
</template>

<script>
import { HTTP_REQUEST_URL, imgUrls } from "@/config/app";
import { previewPDF } from "@/utils/project";
export default {
  data() {
    return {
      imgUrl: imgUrls,
      internalDemos: [
        // {
        //   title: "ZPAI-BP诊断与优化建议",
        //   time: "2025-09-27 10:00",
        //   link: HTTP_REQUEST_URL + "/ZPAI-BP诊断与优化建议.pdf",
        // },
        // {
        //   title: "YSKJ-BP诊断与优化建议",
        //   time: "2025-09-27 10:00",
        //   link: HTTP_REQUEST_URL + "/YSKJ-BP诊断与优化建议.pdf",
        // },
        {
          title: "具身智能独角兽_BP商业计划优化建议书",
          time: "2025-12-21 17:00",
          link: HTTP_REQUEST_URL + "/具身智能独角兽_BP商业计划优化建议书.pdf",
        },
      ],
    };
  },
  methods: {
    handleShowPdf(url) {
      previewPDF(url);
    },
  },
};
</script>

<style lang="scss" scoped>
.introduce {
  border-radius: 28rpx;
  background: #ffffff;
  margin: 20rpx;
  padding: 32rpx 24rpx 4rpx 24rpx;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title-t {
      color: #182855;
      font-size: 24rpx;
      font-weight: 600;
    }
  }
  .item {
    padding: 30rpx 0 20rpx 0;
    border-bottom: 1px solid #f3f3f3;
    .top {
      display: flex;
      justify-content: space-between;
    }
    .time {
      color: #182855;
      font-size: 22rpx;
      font-weight: 400;
    }
    &:last-child {
      border: none;
    }
    .title {
      color: #182855;
      text-align: left;
      font-size: 24rpx;
      font-weight: 600;
    }
    .more {
      display: flex;
      justify-content: flex-end;
      .more-t {
        color: #182855;
        text-align: right;
        font-size: 24rpx;
        font-weight: 400;
        margin-right: 20rpx;
      }
      .right-icon {
        width: 14.2rpx;
        height: 24.8rpx;
        margin-top: 5rpx;
      }
    }
  }
}
</style>
