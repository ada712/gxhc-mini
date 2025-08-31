<template>
  <view class="container">
    <view class="list">
      <block v-for="(item, key) in banners" :key="key">
        <view class="banner-item">
          <image :src="item.imagePath" mode="aspectFit"></image>
          <view class="link">链接地址：{{ item.linkPath }}</view>
          <!-- <view>{{item.isWeb ? '微信公众号链接' : '其他链接'}}</view> -->
          <view class="del-btn" @click="deleteBanner(item)">删除</view>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
import { miniprogramUrl } from "@/config/app";
export default {
  data: function () {
    return {
      banners: [
        {
          _id: "3c0d6fb667db737b003474ff4302af50",
          imagePath:
            miniprogramUrl + "/upload/banner/202503200943-indexbanner1742435031514.jpg",
          linkPath: "https://mp.weixin.qq.com/s/zVu4raklWoYQwRDCw_XOTg",
          isWeb: true,
          position: "首页",
          createTime: 1742435195433,
          updateTime: 1742435195433,
        },
        {
          _id: "41e75df467db714a0033862f016a8a6a",
          imagePath:
            miniprogramUrl + "/upload/banner/202503200937-indexbanner1742434628572.jpg",
          linkPath: "/explainPages/news/mohe/index",
          isWeb: false,
          position: "首页",
          createTime: 1742434634187,
          updateTime: 1742434634187,
        },
      ],
    };
  },
  methods: {
    deleteBanner(item) {
      const id = item;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  padding: 24px;
}

.list {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.banner-item {
  background-color: #ffffff;
  width: 100%;
  box-sizing: border-box;
  padding: 24rpx;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  border-radius: 24rpx;
}

image {
  width: 100%;
  height: 320rpx;
}
.link {
  width: 100%;
  margin-top: 24rpx;
  font-size: 28rpx;
  line-height: 32rpx;
  color: rgba(47, 48, 49, 0.5);
  word-break: break-all;
}
.del-btn {
  margin-top: 32rpx;
  width: 100%;
  height: 72rpx;
  background: #ffffff;
  border-radius: 12rpx;
  border: 1rpx solid #e5e6e6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #020202;
  font-size: 28rpx;
}
</style>
