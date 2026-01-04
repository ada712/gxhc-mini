<template>
  <view class="record-page">
    <x-navbar title="生成记录" :letfArrow="true">
      <template #right>
        <view class="navbar-right-icons">
          <view class="icon-btn" @click="handleMoreClick">⋯</view>
          <view class="icon-btn" @click="handleEyeClick">👁</view>
        </view>
      </template>
    </x-navbar>

    <!-- 顶部背景区域 -->
    <view class="top-background"></view>

    <view class="page-content">
      <view class="subtitle">共有 {{ recordList.length }} 条记录</view>

      <view class="record-list">
        <view
          class="record-item"
          v-for="(item, index) in recordList"
          :key="index"
        >
          <view class="record-left">
            <image src="/static/images/code/gift.png" class="record-icon" mode="aspectFit" />
          </view>
          <view class="record-middle">
            <view class="record-code">{{ item.code }}</view>
            <view class="record-time">{{ item.createTime }}</view>
          </view>
          <view class="record-right">
            <view class="status-badge" :class="item.status">
              {{ item.statusText }}
            </view>
          </view>
          <view class="record-bottom">
            <view class="record-info">
              <view class="energy-box">
                <image src="/static/images/code/p.png" class="energy-icon" mode="aspectFit" />
                <text class="energy-value">{{ item.points }} pts</text>
              </view>
              <text class="energy-type">{{ item.type }}</text>
            </view>
            <view class="copy-button" @click="copyCode(item.code)">去复制</view>
          </view>
        </view>
      </view>

      <view class="load-tip" v-if="recordList.length > 0">
        — 已加载全部记录 —
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      recordList: [
        {
          code: "HDEFEF-GEF-001",
          createTime: "2027-10-24 13:23",
          status: "used",
          statusText: "已使用",
          points: 9700,
          type: "能量转赠",
        },
        {
          code: "HDEFEF-GEF-001",
          createTime: "2027-10-24 13:23",
          status: "used",
          statusText: "已使用",
          points: 9700,
          type: "能量转赠",
        },
      ],
    };
  },
  onLoad() {
    // 可以在这里调用API获取记录列表
    // this.getRecordList();
  },
  methods: {
    handleMoreClick() {
      uni.showToast({
        title: "功能开发中",
        icon: "none",
      });
    },
    handleEyeClick() {
      uni.showToast({
        title: "功能开发中",
        icon: "none",
      });
    },
    copyCode(code) {
      uni.setClipboardData({
        data: code,
        success: () => {
          uni.showToast({
            title: "复制成功",
            icon: "success",
          });
        },
      });
    },
    // getRecordList() {
    //   getRedeemRecord({ page: 1, limit: 20 })
    //     .then((res) => {
    //       if (res.status === 200 && res.data) {
    //         this.recordList = res.data.list || [];
    //       }
    //     })
    //     .catch((error) => {
    //       console.error("获取生成记录异常:", error);
    //     });
    // },
  },
};
</script>

<style lang="scss" scoped>
.record-page {
  min-height: 100vh;
  background: #ffffff;
  position: relative;
}

.top-background {
  width: 100%;
  height: 562rpx;
  opacity: 1;
  background: linear-gradient(180deg, #e2faf1 5%, #ffffff 97%);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}

.page-content {
  padding: 20rpx 24rpx;
  position: relative;
  z-index: 1;
}

.subtitle {
  font-size: 28rpx;
  color: #606266;
  margin-bottom: 24rpx;
  padding: 0 8rpx;
  text-align: center;
}

.record-list {
  .record-item {
    width: 716rpx;
    height: 260rpx;
    border-radius: 16rpx;
    opacity: 1;
    border: 2rpx solid #f1f5f9;
    background: #ffffff;
    padding: 24rpx;
    margin: 0 auto 24rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    position: relative;

    .record-left {
      position: absolute;
      left: 24rpx;
      top: 24rpx;

      .record-icon {
        width: 68rpx;
        height: 68rpx;
      }
    }

    .record-middle {
      margin-left: 100rpx;
      margin-bottom: 10rpx;

      .record-code {
        width: 280rpx;
        height: 40rpx;
        opacity: 1;
        color: #000000;
        text-align: left;
        font-size: 32rpx;
        font-weight: 600;
        font-family: "PingFang SC";
        line-height: 40rpx;
        margin-bottom: 8rpx;
      }

      .record-time {
        width: 264rpx;
        height: 40rpx;
        opacity: 0.5;
        color: #000000;
        text-align: left;
        font-size: 28rpx;
        font-weight: 400;
        font-family: "PingFang SC";
        line-height: 35rpx;
      }
    }

    .record-right {
      position: absolute;
      right: 24rpx;
      top: 24rpx;

      .status-badge {
        width: 112rpx;
        height: 48rpx;
        border-radius: 38rpx;
        opacity: 1;
        border: 2rpx solid #e2e8f0;
        background: #f1f5f9;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24rpx;
        color: #606266;
        box-sizing: border-box;

        &.used {
          border: 2rpx solid #e2e8f0;
          background: #f1f5f9;
          color: #606266;
        }

        &.unused {
          background: #4caf50;
          border: none;
          color: #ffffff;
        }
      }
    }

    .record-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20rpx;
      padding-top: 20rpx;
      border-top: 1rpx solid #f1f5f9;

      .record-info {
        display: flex;
        align-items: center;
        gap: 8rpx;

        .energy-box {
          width: 166rpx;
          height: 52rpx;
          border-radius: 36rpx;
          opacity: 1;
          border: 2rpx solid #fef3c7;
          background: #fffbeb;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8rpx;
          box-sizing: border-box;
          padding: 0;

          .energy-icon {
            width: 24rpx;
            height: 24rpx;
          }

          .energy-value {
            font-size: 24rpx;
            color: #ff9800;
            font-weight: 600;
          }
        }

        .energy-type {
          width: 88rpx;
          height: 28rpx;
          opacity: 1;
          color: #979797;
          text-align: center;
          font-size: 22rpx;
          font-weight: 600;
          font-family: "PingFang SC";
          line-height: 27.5rpx;
          margin-left: 8rpx;
        }
      }

      .copy-button {
        width: 122rpx;
        height: 58rpx;
        border-radius: 12rpx;
        opacity: 1;
        background: #000000;
        color: #ffffff;
        text-align: left;
        font-size: 24rpx;
        font-weight: 600;
        font-family: "PingFang SC";
        line-height: 30rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        padding: 0;
      }
    }
  }
}

.load-tip {
  text-align: center;
  font-size: 24rpx;
  color: #909399;
  padding: 40rpx 0;
}

// 导航栏右侧图标
.navbar-right-icons {
  display: flex;
  align-items: center;
  gap: 24rpx;

  .icon-btn {
    width: 44rpx;
    height: 44rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36rpx;
    color: #333333;
    cursor: pointer;
  }
}
</style>

