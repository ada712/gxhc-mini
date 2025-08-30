<template>
  <view>
    <scroll-view class="council-list" scroll-x="false" scroll-y="true">
      <view class="label-box">名誉理事长</view>
      <view
        class="council-item"
        v-for="(item, key) in reputationDirectors"
        :key="key"
        @click="onGetDirectorById(item)"
      >
        <image :src="item.photo" class="item-head" />
        <view class="item-info">
          <view class="item-name">{{ item.name }}</view>
          <view class="item-brief">{{ item.introduction }}</view>
        </view>
        <view class="item-right">
          <image
            :src="imgUrl + '/icons/icon_next_right.png'"
            class="right-arrow"
          />
        </view>
      </view>

      <view class="label-box">理事长</view>
      <view
        class="council-item"
        v-for="(item, key) in executiveDirectors"
        :key="key"
        @click="onGetDirectorById(item)"
      >
        <image :src="item.photo" class="item-head" />
        <view class="item-info">
          <view class="item-name">{{ item.name }}</view>
          <view class="item-brief">{{ item.introduction }}</view>
        </view>
        <view class="item-right">
          <image
            :src="imgUrl + '/icons/icon_next_right.png'"
            class="right-arrow"
          />
        </view>
      </view>

      <view class="label-box">理事会顾问</view>
      <view
        class="council-item"
        v-for="(item, key) in consultantDirectors"
        :key="key"
        @click="onGetDirectorById(item)"
      >
        <image :src="item.photo" class="item-head" />
        <view class="item-info">
          <view class="item-name">{{ item.name }}</view>
          <view class="item-brief">{{ item.introduction }}</view>
        </view>
        <view class="item-right">
          <image
            :src="imgUrl + '/icons/icon_next_right.png'"
            class="right-arrow"
          />
        </view>
      </view>
      <view class="label-box">理事成员</view>
      <view
        class="council-item"
        v-for="(item, key) in memberDirectors"
        :key="key"
        @click="onGetDirectorById(item)"
      >
        <image :src="item.photo" class="item-head" />
        <view class="item-info">
          <view class="item-name">{{ item.name }}</view>
          <view class="item-brief">{{ item.introduction }}</view>
        </view>
        <view class="item-right">
          <image
            :src="imgUrl + '/icons/icon_next_right.png'"
            class="right-arrow"
          />
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { imgUrls } from "@/config/app";
import { getDirectorMember } from "@/api/gxhc";
export default {
  data: function () {
    return {
      imgUrl: imgUrls,
      reputationDirectors: [], // 名誉理事长
      executiveDirectors: [], // 常务理事长
      consultantDirectors: [], // 理事会顾问
      memberDirectors: [], // 理事成员
    };
  },
  onLoad(options) {
    this.getData();
  },
  methods: {
    getData() {
      getDirectorMember({}).then((res) => {
        this.reputationDirectors = res.data.reputation;
        this.executiveDirectors = res.data.executive;
        this.consultantDirectors = res.data.consultant;
        this.memberDirectors = res.data.member;
      });
    },
    onGetDirectorById(item) {
      const { id } = item;
      console.log("999=>", id);
      if (id) {
        uni.navigateTo({
          url: "/pages/director/detail/index?id=" + id,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
page {
  background: #f4f4f4;
}
.council-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 16rpx;
  box-sizing: border-box;
  padding: 24rpx 24rpx 40rpx 24rpx;
  .label-box {
    width: 100%;
    margin-bottom: 24rpx;
    font-weight: bold;
    font-size: 32rpx;
    line-height: 48rpx;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    box-sizing: border-box;
    padding-left: 24rpx;
    color: #2f3031;
  }
  .council-item {
    width: 100%;
    height: 144rpx;
    background: #ffffff;
    border-radius: 24rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    padding: 0 32rpx 0 24rpx;
    margin-bottom: 24rpx;
  }
  .item-head {
    width: 96rpx;
    height: 96rpx;
    border-radius: 50%;
    background: #a2afbc;
    border: 3rpx solid #ffffff;
  }
  .item-info {
    display: flex;
    flex-direction: column;
    width: 432rpx;
    margin-left: 24rpx;
  }
  .item-name {
    font-weight: bold;
    font-size: 32rpx;
    color: #2f3031;
    line-height: 48rpx;
  }
  .item-brief {
    font-size: 24rpx;
    color: rgba(47, 48, 49, 0.75);
    line-height: 36rpx;
    margin-top: 4rpx;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /* 限制在一个块元素显示的文本的行数，这里是2行 */
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item-right {
    width: 10%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 50rpx;
  }
  .right-arrow {
    width: 40rpx;
    height: 40rpx;
  }
}
</style>
