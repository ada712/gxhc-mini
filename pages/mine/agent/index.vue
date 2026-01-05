<template>
  <view class="agent-page">
    <x-navbar title="代理与协议中心" :letfArrow="true" :customBack="goBackToMine">
    </x-navbar>

    <view class="page-content">
      <!-- 我要成为代理按钮 -->
      <view class="become-agent-button" @click="handleBecomeAgent">
        <view class="button-top">
          <image src="/static/images/my/people.png" class="button-icon" mode="aspectFit" />
          <view class="button-title">我要成为代理</view>
        </view>
        <view class="button-subtitle">点击联系人工客服开通</view>
      </view>

      <!-- 代理签约状态 -->
      <view class="status-card">
        <view class="card-header">
          <view class="card-left">
            <text class="card-text">代理签约状态</text>
          </view>
          <view class="card-right" @click="toggleAgentStatus">
            <image
              :src="agentStatus ? '/static/images/my/open.png' : '/static/images/my/close.png'"
              class="status-switch"
              mode="aspectFit"
            />
          </view>
        </view>
        
        <!-- 代理合作协议 -->
        <view class="agreement-link" v-if="agentStatus" @click="viewAgreement">
          <view class="doc-icon">📄</view>
          <text class="agreement-text">代理合作协议.pdf</text>
          <image
            src="/static/images/icons/icon-gray-right2.png"
            class="arrow-icon"
            mode="aspectFit"
          />
        </view>

        <!-- 本月拉新任务 -->
        <view class="task-section" v-if="agentStatus">
          <view class="task-title">本月拉新任务</view>
          <view class="progress-bar-wrapper">
            <view class="progress-bar-bg">
              <view class="progress-bar-fill" :style="{ width: taskProgress + '%' }"></view>
            </view>
          </view>
        </view>
      </view>

      <!-- 协议卡片 -->
      <view class="agreement-card">
        <!-- 用户服务协议 -->
        <view class="link-item" @click="goToUserAgreement">
          <view class="card-left">
            <text class="card-text">用户服务协议</text>
          </view>
          <view class="card-right">
            <image
              src="https://test.acture-hub.com/statics/miniprogram/images/icons/icon-gray-right2.png"
              class="arrow-icon"
              mode="aspectFit"
            />
          </view>
        </view>
        
        <!-- 分隔线 -->
        <view class="divider"></view>
        
        <!-- 隐私政策 -->
        <view class="link-item" @click="goToPrivacyPolicy">
          <view class="card-left">
            <text class="card-text">隐私政策</text>
          </view>
          <view class="card-right">
            <image
              src="https://test.acture-hub.com/statics/miniprogram/images/icons/icon-gray-right2.png"
              class="arrow-icon"
              mode="aspectFit"
            />
          </view>
        </view>
      </view>
    </view>

    <!-- 联系客服弹窗 -->
    <view class="modal-overlay" v-if="showContactModal" @click="closeContactModal">
      <view class="contact-modal" @click.stop>
        <image src="/static/images/my/clear.png" class="modal-close" mode="aspectFit" @click="closeContactModal" />
        <image src="/static/images/my/add.png" class="modal-icon" mode="aspectFit" />
        <view class="modal-title">联系人工客服开通</view>
        <view class="modal-desc">
          请添加官方客服微信,发送"申请代理"进行人工审核
        </view>
        <view class="modal-input-wrapper">
          <view class="wechat-id-box">
            <text class="wechat-id-text">LANDFHEACV</text>
          </view>
          <view class="copy-button-box" @click="copyWechatId">
            <text class="copy-button-text">复制</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      agentStatus: true, // 代理签约状态
      taskProgress: 60, // 本月拉新任务进度（百分比）
      showContactModal: false, // 显示联系客服弹窗
    };
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
    handleBecomeAgent() {
      // 显示联系客服弹窗
      this.showContactModal = true;
    },
    closeContactModal() {
      this.showContactModal = false;
    },
    copyWechatId() {
      // 复制微信ID
      uni.setClipboardData({
        data: "LANDFHEACV",
        success: () => {
          uni.showToast({
            title: "复制成功",
            icon: "success",
          });
        },
      });
    },
    toggleAgentStatus() {
      this.agentStatus = !this.agentStatus;
      // 可以在这里调用API更新状态
      // this.updateAgentStatus(this.agentStatus);
    },
    goToUserAgreement() {
      // 跳转到用户服务协议页面
      uni.navigateTo({
        url: "/explainPages/protocol/index",
      });
    },
    goToPrivacyPolicy() {
      // 跳转到隐私政策页面
      uni.navigateTo({
        url: "/explainPages/protocol/privacy/index",
      });
    },
    viewAgreement() {
      // 查看代理合作协议
      uni.showToast({
        title: "功能开发中",
        icon: "none",
      });
      // 可以跳转到PDF查看页面或下载
      // uni.navigateTo({
      //   url: '/pages/mine/agent/agreement/index'
      // });
    },
    goBackToMine() {
      // 返回到"我的"页面（tabBar页面）
      uni.switchTab({
        url: "/pages/mine/index/index",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.agent-page {
  min-height: 100vh;
  background: #ffffff;
}

.page-content {
  padding: 24rpx;
}

// 我要成为代理按钮
.become-agent-button {
  width: 698rpx;
  height: 196rpx;
  border-radius: 46rpx;
  opacity: 1;
  background: linear-gradient(90deg, #1e74e6 0%, #29d1c1 100%);
  box-shadow: 0 8rpx 30rpx 0 rgba(21, 52, 211, 0.3);
  padding: 32rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
  margin: 0 auto 32rpx;

  .button-top {
    display: flex;
    align-items: center;
    gap: 12rpx;
    
    .button-icon {
      width: 34rpx;
      height: 28rpx;
      flex-shrink: 0;
    }

    .button-title {
      height: 44rpx;
      opacity: 1;
      color: #ffffff;
      text-align: left;
      font-size: 36rpx;
      font-weight: 700;
      font-family: "DIN Alternate";
      line-height: 44rpx;
    }
  }

  .button-subtitle {
    height: 44rpx;
    opacity: 0.5;
    color: #ffffff;
    text-align: center;
    font-size: 24rpx;
    font-weight: 700;
    font-family: "DIN Alternate";
    line-height: 44rpx;
  }
}

// 卡片样式
.status-card {
  width: 696rpx;
  min-height: 154rpx;
  border-radius: 36rpx;
  opacity: 1;
  background: #ffffff;
  box-shadow: 0 0 8rpx 0 rgba(0, 0, 0, 0.1);
  padding: 32rpx;
  margin: 0 auto 24rpx;
  box-sizing: border-box;

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0;

    .card-left {
      flex: 1;

      .card-text {
        width: 190rpx;
        height: 44rpx;
        opacity: 1;
        color: #16171a;
        text-align: left;
        font-size: 32rpx;
        font-weight: 500;
        font-family: "Alibaba PuHuiTi 3.0";
        line-height: 44rpx;
      }
    }

    .card-right {
      display: flex;
      align-items: center;
      cursor: pointer;

      .status-switch {
        width: 100rpx;
        height: 64rpx;
      }
    }
  }

  .agreement-link {
    display: flex;
    align-items: center;
    padding: 24rpx 0;
    border-top: 1rpx solid #f1f5f9;
    margin-top: 24rpx;
    cursor: pointer;

    .doc-icon {
      width: 32rpx;
      height: 32rpx;
      margin-right: 16rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28rpx;
      color: #ef4444;
    }

    .agreement-text {
      flex: 1;
      font-size: 28rpx;
      color: #1a1a1a;
    }

    .arrow-icon {
      width: 12rpx;
      height: 24rpx;
    }
  }

  .task-section {
    margin-top: 24rpx;
    padding-top: 24rpx;
    border-top: 1rpx solid #f1f5f9;
    
    .task-title {
      opacity: 1;
      color: #16171a;
      text-align: left;
      font-size: 28rpx;
      font-weight: 500;
      font-family: "Alibaba PuHuiTi 3.0";
      margin-bottom: 16rpx;
    }

    .progress-bar-wrapper {
      .progress-bar-bg {
        width: 100%;
        height: 16rpx;
        background: #f1f5f9;
        border-radius: 8rpx;
        overflow: hidden;

        .progress-bar-fill {
          height: 100%;
          background: #3B82F6;
          border-radius: 8rpx;
          transition: width 0.3s;
        }
      }
    }
  }
}

.agreement-card {
  width: 100%;
  margin-bottom: 24rpx;
  box-sizing: border-box;
  overflow: hidden;

  .link-item {
    width: 696rpx;
    height: 154rpx;
    border-radius: 36rpx 36rpx 0 0;
    opacity: 1;
    background: #ffffff;
    box-shadow: 0 0 8rpx 0 rgba(0, 0, 0, 0.1);
    padding: 32rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.3s;
    margin: 0 auto;

    &:first-child {
      border-radius: 36rpx 36rpx 0 0;
    }

    &:last-child {
      border-radius: 0 0 36rpx 36rpx;
      box-shadow: 0 0 8rpx 0 rgba(0, 0, 0, 0.1);
    }

    &:active {
      opacity: 0.7;
    }

    .card-left {
      flex: 1;

      .card-text {
        font-size: 32rpx;
        color: #1a1a1a;
        font-weight: 500;
      }
    }

    .card-right {
      display: flex;
      align-items: center;

      .arrow-icon {
        width: 12rpx;
        height: 24rpx;
      }
    }
  }

  .divider {
    height: 1rpx;
    background: #f1f5f9;
    margin: 0 32rpx;
  }
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

// 联系客服弹窗
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.contact-modal {
  width: 700rpx;
  height: 712rpx;
  border-radius: 60rpx;
  opacity: 1;
  background: #ffffff;
  padding: 60rpx 40rpx 40rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .modal-close {
    position: absolute;
    top: 24rpx;
    right: 24rpx;
    width: 48rpx;
    height: 48rpx;
    cursor: pointer;
  }

  .modal-icon {
    width: 152rpx;
    height: 152rpx;
    margin-bottom: 40rpx;
  }

  .modal-title {
    width: 320rpx;
    height: 50rpx;
    opacity: 1;
    color: #000000;
    text-align: left;
    font-size: 40rpx;
    font-weight: 600;
    font-family: "PingFang SC";
    line-height: 50rpx;
    margin: 0 auto 24rpx;
  }

  .modal-desc {
    width: 492rpx;
    height: 70rpx;
    opacity: 1;
    color: #64748b;
    text-align: center;
    font-size: 24rpx;
    font-weight: 400;
    font-family: "PingFang SC";
    line-height: 30rpx;
    margin: 0 auto 40rpx;
  }

  .modal-input-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20rpx;

    .wechat-id-box {
      width: 582rpx;
      height: 94rpx;
      border-radius: 24rpx;
      opacity: 1;
      border: 1rpx solid #f1f5f9;
      background: #f8fafc;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 24rpx;
      box-sizing: border-box;

      .wechat-id-text {
        width: 190rpx;
        height: 36rpx;
        opacity: 1;
        color: #000000;
        text-align: left;
        font-size: 28rpx;
        font-weight: 600;
        font-family: "PingFang SC";
        line-height: 35rpx;
      }
    }

    .copy-button-box {
      width: 582rpx;
      height: 94rpx;
      border-radius: 24rpx;
      opacity: 1;
      border: 1rpx solid #ffedd5;
      background: #fff7ed;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s;

      &:active {
        opacity: 0.8;
      }

      .copy-button-text {
        font-size: 32rpx;
        color: #ff9800;
        font-weight: 600;
      }
    }
  }
}
</style>

