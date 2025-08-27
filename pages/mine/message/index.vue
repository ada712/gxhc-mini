<template>
  <view class="wripper">
    <scroll-view
      wx:if="{{list.length > 0}}"
      class="list"
      scroll-x="false"
      scroll-y="true"
      :style="'height: ' + scollHeight + 'px;'"
    >
      <view
        class="item"
        v-for="(item, key) in list"
        :key="index"
        data-id="{{item._id}}"
        data-idx="{{index}}"
        @click="changeReadStatus"
      >
        <view class="time">{{ item.createTime }}</view>
        <view class="message">{{ item.content }}</view>
        <view class="circle" v-if="item.readStatus == false"></view>
      </view>
    </scroll-view>

    <view class="empty-box" v-if="list.length == 0">
      <image :src="imgPath + '/index/img-no-data.png'" class="img-no-data" />
      <view class="subtitle">暂无任何信息</view>
    </view>
  </view>
</template>

<script>
import { imgUrls } from "@/config/app";
export default {
  data: function () {
    return {
      imgPath: imgUrls,
      scollHeight: 0,
      list: [],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.wripper {
  width: 100%;
  box-sizing: border-box;
  padding: 24rpx;
  .list {
    width: 100%;
    display: flex;
    flex-direction: column;
    .item {
      background: #ffffff;
      margin-bottom: 24rpx;
      display: flex;
      flex-direction: column;
      border-radius: 24rpx;
      box-sizing: border-box;
      padding: 24rpx;
      position: relative;
      .time {
        color: rgba(47, 48, 49, 0.75);
        font-size: 24rpx;
        line-height: 36rpx;
      }
      .message {
        font-size: 28rpx;
        color: #2f3031;
        line-height: 42rpx;
        margin-top: 24rpx;
      }
      .circle {
        width: 16rpx;
        height: 16rpx;
        background-color: red;
        border-radius: 50%;
        position: absolute;
        top: 30rpx;
        right: 24rpx;
      }
    }
  }
}
</style>
