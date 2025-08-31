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
        <project-detail :item="item" />
      </view>
    </view>
  </view>
</template>

<script>
import projectDetail from "@/components/project-detail";
import { investProjectsByUser } from "@/api/gxhc";
import { FormatDateTime } from "@/utils/formatDate";
import { projectStatusName, getStatusClass } from '@/utils/project'

export default {
  components: { projectDetail },
  data: function () {
    return {
      item: {},
    };
  },
  onLoad(options) {
    this.fetchCurrentUserProject();
  },
  methods: {
    fetchCurrentUserProject() {
      uni.showLoading();
      investProjectsByUser()
        .then((res) => {
          uni.hideLoading();
          console.log(
            "res==>",
            res,
            res.status == 200 && Object.keys(res.data).length > 0
          );
          if (res.status == 200 && Object.keys(res.data).length > 0) {
            const result = res.data;
            result.createTime = FormatDateTime(
              result.createdAt,
              "yyyy年MM月dd日 hh:mm:ss"
            );
            result.statusName = projectStatusName(result.projectStatus);
            result.statusClass = getStatusClass(result.projectStatus);
            this.item = result;
          } else {
            uni.showModal({
              content: "未找到您提交的项目，通过首页-->发起项目进行项目申请吧~",
              showCancel: false,
              confirmText: "我知道了",
              success(res) {
                if (res.confirm) {
                  uni.navigateBack();
                }
              },
            });
          }
        })
        .catch((error) => {
          uni.hideLoading();
          this.item = {};
        });
    },
  },
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
