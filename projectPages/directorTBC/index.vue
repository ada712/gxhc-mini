<template>
  <view class="project-list">
    <!-- <scroll-view class="list" scroll-y="true" scroll-x="false" style="flex: 1"> -->
      <view
        class="item"
        v-if="projectList.length > 0"
        v-for="(item, index) in projectList"
        :key="index"
      >
        <view class="item-title">
          <view class="item-title-left">
            <image
              :src="imgPath + '/icons/icon_xiangmu.png'"
              class="icon-project"
            />
            <view class="project-title sheng-lines">{{
              item.companyName
            }}</view>
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
          <view class="item-col">
            <view class="item-label mb16">项目简介</view>
            <view class="item-value truncate-3-lines">{{
              item.projectBrief
            }}</view>
          </view>
          <scroll-view class=""></scroll-view>
          <view class="item-row">
            <text class="item-label">申请时间：</text>
            <text class="item-value">{{ item.createTime }}</text>
          </view>
        </view>
        <view class="item-bottom">
          <view
            class="search-more-btn defaule-btn"
            bind:tap="lookMoreDetail"
            data-item="{{item}}"
            >查看更多</view
          >
          <view
            class="search-more-btn blue-btn"
            bind:tap="goJoinPage"
            data-id="{{item._id}}"
            >我要参与</view
          >
        </view>
      </view>

      <view class="empty-box" v-if="projectList.length == 0">
        <image :src="imgPath + '/index/img-no-data.png'" class="img-no-data" />
        <view class="subtitle">暂无待确认项目</view>
      </view>
    <!-- </scroll-view> -->

    <fixed-bg v-if="maskHidden" bindcloseFixedbg="handleCloseFixedbg" />
    <view class="detail-module" v-if="maskHidden">
      <view class="head">
        <view class="head-title">项目详情</view>
        <view class="head-close" catch:tap="handleCloseFixedbg">
          <image
            :src="imgPath + '/icons/icon-close-gray.png'"
            class="icon-close"
          />
        </view>
      </view>
      <scroll-view class="detail-content" scroll-x="false" scroll-y="true">
        <view class="item-name">项目名称 {{ item.companyName }}</view>
        <project-detail v-if="maskHidden" item="{{item}}" />
      </scroll-view>
    </view>
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
      maskHidden: false,
      item: "",
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
page {
  background-color: #f4f4f4;
  position: relative;
}

.project-list {
  width: 100%;
  box-sizing: border-box;
  padding: 24rpx;

  .list {
    width: 100%;
    height: 100%;
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
        font-size: 24rpx;
        line-height: 36rpx;
        .item-row {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 24rpx;
        }
        .mb16 {
          margin-bottom: 16rpx;
        }
        .item-col {
          display: flex;
          flex-direction: column;
          margin-bottom: 24rpx;
        }
        .item-label {
          color: #2f3031;
          margin-right: 16rpx;
        }
        .item-value {
          color: rgba(47, 48, 49, 0.5);
        }
      }
      .item-bottom {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        .item-bottom-left {
          font-size: 24rpx;
          color: rgba(47, 48, 49, 0.5);
          line-height: 36rpx;
        }
        .search-more-btn {
          width: 140rpx;
          height: 56rpx;

          border-radius: 32rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24rpx;
          color: #2f3031;
          line-height: 36rpx;
          margin-left: 20rpx;
        }
        .defaule-btn {
          background-color: #ffffff;
          color: #2969ff;
          border: 1rpx solid #2969ff;
        }
        .blue-btn {
          background-color: #2969ff;
          color: #ffffff;
        }
      }
    }
  }

  .detail-module {
    width: 100%;
    height: 0rpx;
    background-color: #ffffff;
    border-radius: 24rpx 24rpx 0rpx 0rpx;
    z-index: 101;
    position: fixed;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    padding-bottom: 50rpx;
    animation: slideUp 0.5s ease-out forwards;
    .head {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 112rpx;
      border-radius: 24rpx 24rpx 0rpx 0rpx;
      box-sizing: border-box;
      padding-left: 32rpx;
      border-bottom: 1rpx solid #e5e6e6;
      .head-title {
        font-size: 32rpx;
        color: #2f3031;
        line-height: 48rpx;
        font-weight: bold;
        width: 86%;
      }
      .head-close {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        box-sizing: border-box;
        padding-right: 36rpx;
        width: 10%;
        height: 100%;

        .icon-close {
          width: 24rpx;
          height: 24rpx;
        }
      }
    }
    .detail-content {
      width: 100%;
      height: 889rpx;
      box-sizing: border-box;
      padding: 24rpx;

      .item-name {
        margin-bottom: 20rpx;
        color: #2f3031;
        font-weight: bold;
        font-size: 28rpx;
        line-height: 42rpx;
      }
    }
  }

  @keyframes slideUp {
    from {
      height: 0;
    }
    to {
      height: 1000rpx;
    }
  }
}
</style>
