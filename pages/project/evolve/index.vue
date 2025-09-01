<template>
  <view class="project-list" v-if="Object.keys(item).length">
    <view class="status-bg" v-if="item.remark">{{ item.remark }}</view>
    <view class="status-bg" v-else
      >国信合创（CHA）人工智能共创理事会的投资部正在对项目进行审核，请耐心等待</view
    >
    <view class="list">
      <view class="item">
        <view class="item-title">
          <view class="item-title-left">
            <image
              src="/static/images/icons/icon_xiangmu.png"
              class="icon-project"
            />
            <view class="project-title">{{ item.companyBrief }}</view>
          </view>

          <view class="item-title-right">
            <view :class="'project-status ' + item.statusClass">{{
              item.statusName
            }}</view>
          </view>
        </view>
        <view class="item-middle">
          <view class="middle-row">
            <text class="item-label">所属行业</text>
            <text class="item-value">{{ item.industry }}</text>
          </view>
          <view class="middle-row">
            <text class="item-label">申请人</text>
            <text class="item-value">{{ item.name }}</text>
          </view>
          <view class="middle-row">
            <view class="item-label mb16">项目简介</view>
            <view class="item-value truncate-3-lines">{{
              item.projectBrief
            }}</view>
          </view>
          <view class="middle-row">
            <text class="item-label">申请时间：</text>
            <text class="item-value">{{ item.createTime }}</text>
          </view>
        </view>
        <view class="item-bottom">
          <view
            class="search-more-btn"
            @click="handleRevokeProject(item.id)"
            v-if="item.projectStatus === 'examining'"
            >撤销</view
          >
          <view
            class="search-more-btn"
            @click="goUpdateProject(item.id)"
            v-if="item.projectStatus === 'examining'"
            >修改</view
          >
          <view class="search-more-btn" @click="goMoreDetail(item.id)"
            >查看更多</view
          >
        </view>
      </view>
    </view>
  </view>
   <view class="empty-box" v-else>
        <image :src="imgPath + '/index/img-no-data.png'" class="img-no-data" />
        <view class="subtitle">暂无项目</view>
      </view>
</template>

<script>
import { investProjectsDetails, investProjectsRevoke } from "@/api/gxhc";
import { FormatDateTime } from "@/utils/formatDate";
import { imgUrls } from "@/config/app";
import { projectStatusName, getStatusClass } from "@/utils/project";
export default {
  data: function () {
    return {
      imgPath: imgUrls,
      item: {},
    };
  },
  onLoad(options) {
    this.fetchCurrentUserProject();
  },
  methods: {
    goUpdateProject(id) {
      uni.navigateTo({
        url: "/pages/project/apply/index?id=" + id,
      });
    },
    goMoreDetail(id) {
      uni.navigateTo({
        url: "/pages/project/detail/index?id=" + id,
      });
    },
    handleRevokeProject(id) {
      console.log(id);
      uni.showModal({
        title: "温馨提示",
        content: `您确定要撤销「${this.item.companyName}」项目吗？一经撤销,将再不能查看和修改，请谨慎操作`,
        showCancel: true,
        cancelText: "确定",
        confirmText: "我再想想",
        success: (res) => {
          if (res.cancel) {
            uni.showLoading();
            this.fetchDelProductByd(id);
          }

          if (res.confirm) {
          }
        },
      });
    },
    fetchDelProductByd(id) {
      investProjectsRevoke({ id })
        .then((res) => {
          console.log("删除项目1", res);
          uni.showLoading();
          this.fetchCurrentUserProject();
        })
        .catch((error) => {
          uni.hideLoading();
          console.error(error);
        });
    },
    fetchCurrentUserProject() {
      uni.showLoading();
      investProjectsDetails()
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

<style>
page {
  background-color: #f4f4f4;
}
</style>
<style lang="scss" scoped>
.project-list {
  width: 100%;
  box-sizing: border-box;
  padding: 24rpx;
  .status-bg {
    background: #ebf5ff;
    color: #225aee;
    border-radius: 24rpx;
    margin-bottom: 24rpx;
    font-size: 24rpx;
    line-height: 32rpx;
    box-sizing: border-box;
    padding: 24rpx;
  }

  .list {
    width: 100%;
    .mb16 {
      margin-bottom: 16rpx;
    }
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
        .item-title-right {
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
      .item-middle {
        display: flex;
        flex-direction: column;
        margin-top: 32rpx;
        .middle-row {
          font-size: 24rpx;
          line-height: 36rpx;
          margin-bottom: 16rpx;
          .item-label {
            color: #2f3031;
            margin-right: 16rpx;
          }
          .item-value {
            color: rgba(47, 48, 49, 0.5);
          }
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
          background: #ffffff;
          border-radius: 32rpx;
          border: 1rpx solid #2969ff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24rpx;
          color: #2969ff;
          line-height: 36rpx;
          margin-left: 20rpx;
        }
      }
    }
  }
}
</style>
