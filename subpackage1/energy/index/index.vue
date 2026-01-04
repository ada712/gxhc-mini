<template>
  <view class="pages">
    <!-- 背景图 -->
    <image class="bg-image" src="/static/images/my/power/power-bg.png" mode="aspectFill"></image>
    <!-- 顶部标题区域 -->
    <view class="header-section">
      <view class="header-left">
        <text class="main-title">能量任务中心</text>
        <text class="subtitle">完成任务赚取能量,兑换更多权益</text>
      </view>
      <view class="header-right">
        <view class="energy-display">
          <image class="energy-icon" src="/static/images/my/wodenengliang.png" mode="aspectFit"></image>
          <text class="energy-value">{{ formatEnergy(energy) }}</text>
    </view>
        <text class="energy-label">当前能量值 (PTS)</text>
      </view>
    </view>

    <!-- 任务列表 -->
    <view class="task-list">
      <view class="task-card" v-for="(task, index) in taskList" :key="index">
        <image class="task-icon" :src="task.icon" mode="aspectFit"></image>
        <view class="task-content">
          <text class="task-title">{{ task.title }}</text>
          <text class="task-desc">{{ task.desc }}</text>
        </view>
        <view class="task-btn" :class="task.btnType" @click="handleTask(task)">
          <text class="task-btn-text">{{ task.btnText }}</text>
        </view>
      </view>
    </view>

    <!-- 底部提示 -->
    <view class="footer-tip">
      <text class="footer-tip-text">更多任务即将上线</text>
    </view>
  </view>
</template>

<script>
import { userEnergy } from "@/api/gxhc";

export default {
  data: function () {
    return {
      energy: 9700,
      taskList: [
        {
          id: 1,
          title: "邀请5位好友",
          desc: "没成功邀请1人 + 100pts",
          icon: "/static/images/my/power/pengyou.png",
          color: "orange",
          btnText: "去邀请",
          btnType: "btn-black",
        },
        {
          id: 2,
          title: "完善项目信息",
          desc: "没成功邀请1人+100pts",
          icon: "/static/images/my/power/xiangmu.png",
          color: "blue",
          btnText: "去完善",
          btnType: "btn-white",
        },
        {
          id: 3,
          title: "填写需求问卷",
          desc: "没成功邀请1人+ 100pts",
          icon: "/static/images/my/power/wenquan.png",
          color: "purple",
          btnText: "去填写",
          btnType: "btn-white",
        },
      ],
    };
  },
  onLoad(options) {
    this.getEnergyData();
  },
  methods: {
    getEnergyData() {
      userEnergy()
        .then((res) => {
          if (res.status === 200 && res.data) {
            this.energy = res.data.energy || 0;
          }
        })
        .catch((error) => {
          console.error("获取能量数据异常:", error);
        });
    },
    formatEnergy(energy) {
      return energy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    handleTask(task) {
      uni.showToast({
        title: `功能开发中: ${task.title}`,
        icon: "none",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
page {
  background: #ffffff;
}

.pages {
      position: relative;
  min-height: 100vh;
  padding: 32rpx 28rpx;
  padding-bottom: 100rpx;

  .bg-image {
        position: absolute;
    top: -30rpx;
    right: -20rpx;
    left: 0;
    width: 806.88rpx;
    height: 619.52rpx;
    opacity: 1;
    z-index: 0;
  }

  .header-section,
  .task-list,
  .footer-tip {
    position: relative;
    z-index: 1;
  }

  .header-section {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 40rpx;

    .header-left {
      flex: 1;

      .main-title {
        width: 288rpx;
        height: 60rpx;
        opacity: 1;
        color: #000000;
        text-align: left;
        font-size: 48rpx;
        font-weight: 600;
        font-family: "PingFang SC";
        line-height: 60rpx;
        display: block;
        margin-bottom: 16rpx;
      }

      .subtitle {
        font-size: 24rpx;
        color: #666666;
        display: block;
        font-family: "PingFang SC";
      }
    }

    .header-right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      .energy-display {
      display: flex;
      align-items: center;
        gap: 8rpx;
        margin-bottom: 8rpx;

        .energy-icon {
          width: 32rpx;
          height: 50rpx;
        }

        .energy-value {
          width: 152rpx;
          height: 80rpx;
          opacity: 1;
          color: #000000;
          text-align: left;
          font-size: 64rpx;
          font-weight: 600;
          font-family: "PingFang SC";
          line-height: 80rpx;
          display: block;
        }
      }

      .energy-label {
        width: 216rpx;
        height: 30rpx;
        opacity: 1;
        color: #757575;
        text-align: right;
        font-size: 24rpx;
        font-weight: 600;
        font-family: "PingFang SC";
        line-height: 30rpx;
      display: block;
    }
    }
  }

  .task-list {
    .task-card {
      width: 702rpx;
      height: 182rpx;
      border-radius: 28rpx;
      opacity: 1;
      border: 2rpx solid #f4f7fa;
      background: #ffffff;
      box-shadow: 0 4rpx 4rpx 0 #8384871a;
      display: flex;
      align-items: center;
      padding: 32rpx 24rpx;
      margin-bottom: 24rpx;
      box-sizing: border-box;

      .task-icon {
        width: 80rpx;
        height: 80rpx;
        margin-right: 36rpx;
        flex-shrink: 0;
      }

      .task-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 8rpx;

        .task-title {
          height: 40rpx;
          opacity: 1;
          color: #000000;
          text-align: left;
          font-size: 32rpx;
          font-weight: 400;
          font-family: "PingFang SC";
          line-height: 40rpx;
          display: block;
        }

        .task-desc {
          width: 260rpx;
          height: 30rpx;
          opacity: 1;
          color: #a4b0c2;
          text-align: left;
          font-size: 24rpx;
        font-weight: 500;
          font-family: "PingFang SC";
          line-height: 30rpx;
          display: block;
    }
  }

      .task-btn {
        width: 122rpx;
        height: 68rpx;
        border-radius: 12rpx;
        opacity: 1;
        border: 1rpx solid #000000;
        background: #ffffff;
    display: flex;
    align-items: center;
        justify-content: center;
        flex-shrink: 0;
        box-sizing: border-box;

        &.btn-black {
          background: #000000;
          border: 1rpx solid #000000;

          .task-btn-text {
            color: #ffffff;
          }
        }

        &.btn-white {
    background: #ffffff;
          border: 1rpx solid #000000;

          .task-btn-text {
            color: #000000;
          }
        }

        .task-btn-text {
          width: 72rpx;
          height: 30rpx;
          opacity: 1;
          color: #000000;
          text-align: left;
      font-size: 24rpx;
      font-weight: 600;
          font-family: "PingFang SC";
          line-height: 30rpx;
          display: block;
      }
    }
  }
  }

  .footer-tip {
    text-align: center;
    margin-top: 60rpx;

    .footer-tip-text {
      font-size: 24rpx;
      color: #cccccc;
      font-family: "PingFang SC";
    }
  }
}
</style>
