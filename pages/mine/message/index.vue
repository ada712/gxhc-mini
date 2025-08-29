<template>
  <view class="wripper">
    <view class="list" v-if="list.length">
      <view
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="changeReadStatus(item)"
      >
        <view class="time">{{ item.add_time }}</view>
        <view class="message">{{ item.content }}</view>
        <view class="circle" v-if="!item.look"></view>
      </view>
    </view>
    <view class="empty-box" v-if="!list.length && !loading">
      <image :src="imgPath + '/index/img-no-data.png'" class="img-no-data" />
      <view class="subtitle">暂无任何信息</view>
    </view>
  </view>
</template>

<script>
import { messageSystem, getMsgDetails } from "@/api/user.js";
import { imgUrls } from "@/config/app";
export default {
  data: function () {
    return {
      imgPath: imgUrls,
      list: [],
      page: 1,
      limit: 20,
      loading: false,
      finished: false,
    };
  },
  onShow() {
    this.page = 1;
    this.list = [];
    this.messageSystem();
  },
  onReachBottom() {
    this.messageSystem();
  },
  onPullDownRefresh() {
    this.page = 1;
    this.finished = false;
    this.list = [];
    this.messageSystem();
  },
  methods: {
    changeReadStatus(item) {
      getMsgDetails(item.id)
        .then((res) => {
          item.look = 1;
        })
        .catch((err) => {
          return this.$util.Tips({
            title: err,
          });
        });
    },
    // 站内信
    messageSystem() {
      // if (this.loading || this.finished) {
      //   return;
      // }
      this.loading = true;
      uni.showLoading({
        title: `加载中`,
      });
      messageSystem({
        page: this.page,
        limit: this.limit,
      })
        .then((res) => {
          let data = res.data;
          uni.hideLoading();
          this.loading = false;
          this.list = this.list.concat(data.list);
          this.finished = data.list.length < this.limit;
          this.page += 1;
          uni.stopPullDownRefresh();
        })
        .catch((err) => {
          uni.showToast({
            title: err.msg,
            icon: "none",
          });
        });
    },
  },
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
