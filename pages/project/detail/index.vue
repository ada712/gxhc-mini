<template>
  <view class="detail-module">
    <view class="same-box">
      <view class="title-row">
        <view class="title-left">
          <image
            src="/static/images/icons/icon_xiangmu.png"
            class="icon-project"
          />
          <view class="project-title">{{ item.companyBrief }}</view>
        </view>
        <view class="title-right">
          <view class="project-status {{item.statusClass}} ">{{
            item.statusName
          }}</view>
        </view>
      </view>

      <view class="detail-component">
        <project-detail item="{{item}}" />
      </view>
    </view>
  </view>
</template>

<script>
import projectDetail from "@/components/project-detail";
export default {
  components: { projectDetail },
  data: function () {
    return {
      item: "",
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
page {
  background: #f4f4f4;
}
.detail-module {
  width: 100%;
  box-sizing: border-box;
  padding: 24rpx 24rpx 50rpx 24rpx;

  .title-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .title-left {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 75%;
      .icon-project {
        width: 48rpx;
        height: 48rpx;
        margin-right: 24rpx;
      }
      .project-title {
        width: 395rpx;
        font-size: 32rpx;
        color: #2f3031;
        line-height: 48rpx;
        font-weight: bold;
      }
    }
    .title-right {
      display: flex;
      flex-direction: row;
      align-items: center;

      .project-status {
        box-sizing: border-box;
        padding: 6rpx 10rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24rpx;
        color: #ffffff;
        line-height: 36rpx;
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

  .same-box {
    width: 100%;
    background: #ffffff;
    border-radius: 32rpx;
    box-sizing: border-box;
    padding: 24rpx 32rpx;
    margin-bottom: 24rpx;
  }
  .detail-component {
    margin-top: 16rpx;
  }
}
</style>
