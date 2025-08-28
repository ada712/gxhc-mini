<template>
  <view class="project-list">
    <!-- <scroll-view
      class="list"
      scroll-y="true"
      scroll-x="false"
    > -->
    <view class="item" v-for="(item, index) in projectList" :key="index">
      <view class="item-title">
        <view class="item-title-left">
          <image
            :src="imgPath + '/icons/icon_xiangmu.png'"
            class="icon-project"
          />
          <view class="project-title">{{ item.companyName }}</view>
        </view>

        <view class="item-title-right">
          <view
            class="project-status auditing"
            v-if="item.projectStatus === 'examining'"
            >审核中</view
          >
          <view
            class="project-status auditing"
            v-if="item.projectStatus === 'investViewing'"
            >面试中</view
          >
          <view
            class="project-status finishing"
            v-if="item.projectStatus === 'investPass'"
            >内部通过</view
          >
          <view
            class="project-status refuse"
            v-if="item.projectStatus === 'notPass'"
            >未通过</view
          >
          <view
            class="project-status finishing"
            v-if="item.projectStatus === 'publicity'"
            >公示中</view
          >
          <view
            class="project-status finishing"
            v-if="item.projectStatus === 'launch'"
            >成功发起</view
          >
        </view>
      </view>
      <view class="item-middle">
        <view class="item-row">
          <text class="item-label">所属行业</text>
          <text class="item-value">{{ item.industry }}</text>
        </view>
        <view class="item-row">
          <text class="item-label">申请人</text>
          <text class="item-value">{{ item.name }}</text>
        </view>
        <view class="item-row">
          <text class="item-label">项目简介</text>
          <text class="item-value">{{ item.projectBrief }}</text>
        </view>
        <view class="item-row between">
          <view class="left-row">
            <text class="item-label">申请时间：</text>
            <text class="item-value">{{ item.createTime }}</text>
          </view>
          <image
            :src="imgPath + '/icons/icon-gray-right2.png'"
            class="icon-right"
          />
        </view>
      </view>
    </view>
    <!-- </scroll-view> -->
  </view>
</template>

<script>
import { imgUrls } from "@/config/app";
export default {
  data: function () {
    return {
      imgPath: imgUrls,
      projectList: [],
      scrollHeight: 0,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
page {
  background-color: #f4f4f4;
}

.project-list {
  width: 100%;
  box-sizing: border-box;
  padding: 24rpx;

  .list {
    width: 100%;

    .item {
      width: 100%;
      background: #ffffff;
      border-radius: 32rpx;
      box-sizing: border-box;
      padding: 24rpx 32rpx 17rpx 32rpx;
      margin-bottom: 24rpx;
      .item-title {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .item-title-left {
          display: flex;
          flex-direction: row;
          align-items: center;
          width: 88%;
          .icon-project {
            width: 48rpx;
            height: 48rpx;
            margin-right: 24rpx;
          }
          .project-title {
            width: 440rpx;
            font-size: 32rpx;
            color: #2f3031;
            line-height: 48rpx;
            font-weight: bold;
          }
        }
        .item-title-right {
          display: flex;
          flex-direction: row;
          align-items: center;

          .project-status {
            width: 96rpx;
            height: 36rpx;
            border-radius: 4rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22rpx;
            color: #ffffff;
            line-height: 34rpx;
            border-radius: 6rpx;
          }
          .auditing {
            background: #66beff;
          }
          .finishing {
            background: #00cc66;
          }
          .refuse {
            background: #ff7263;
          }
        }
      }
      .item-middle {
        display: flex;
        flex-direction: column;
        margin-top: 32rpx;
        .item-row {
          display: flex;
          flex-direction: row;
          align-items: center;
          font-size: 24rpx;
          line-height: 36rpx;
          margin-bottom: 24rpx;
          .item-label {
            color: #2f3031;
            margin-right: 16rpx;
          }
          .item-value {
            color: rgba(47, 48, 49, 0.5);
          }
        }
      }
      .between {
        justify-content: space-between;
      }
      .icon-right {
        width: 17rpx;
        height: 24rpx;
      }
    }
  }
}
</style>
