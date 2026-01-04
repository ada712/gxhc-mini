<template>
  <view class="exchange-page">
    <x-navbar title="兑换中心" :letfArrow="true">
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
      <!-- 标签页 -->
      <view class="tabs-container">
        <view
          class="tab-item"
          :class="{ active: activeTab === 'redeem' }"
          @click="switchTab('redeem')"
        >
          兑换权益
        </view>
        <view
          class="tab-item"
          :class="{ active: activeTab === 'generate' }"
          @click="switchTab('generate')"
        >
          兑换码生成
        </view>
      </view>

      <!-- 兑换权益内容 -->
      <view class="content-wrapper" v-if="activeTab === 'redeem'">
        <view class="redeem-card">
          <image src="/static/images/code/gift.png" class="gift-icon" mode="aspectFit" />
          <view class="card-title">输入兑换码</view>
          <view class="card-desc">
            输入您的活动兑换码,领取直播券或能量奖励
          </view>
          <view class="input-wrapper">
            <input
              class="code-input"
              v-model="redeemCode"
              placeholder="在此输入代码"
              placeholder-class="code-input-placeholder"
              @input="onCodeInput"
            />
          </view>
          <view class="button-wrapper">
            <button
              class="redeem-button"
              :class="{ disabled: !canRedeem }"
              :disabled="!canRedeem"
              @click="handleRedeem"
            >
              立即兑换
            </button>
          </view>
        </view>
        <view class="bottom-link" @click="goToGenerateRecord">
          查看生成记录
        </view>
      </view>

      <!-- 兑换失败弹窗 -->
      <view class="modal-overlay" v-if="showFailModal" @click="closeFailModal">
        <view class="fail-modal" @click.stop>
          <view class="fail-icon-wrapper">
            <image src="/static/images/code/error.png" class="fail-icon" mode="aspectFit" />
          </view>
          <view class="fail-title">全部失效</view>
          <view class="fail-desc">您的余额能量不足,兑换失败</view>
          <view class="fail-button" @click="closeFailModal">
            <text class="fail-button-text">返回</text>
          </view>
        </view>
      </view>

      <!-- 兑换码生成内容 -->
      <view class="content-wrapper" v-if="activeTab === 'generate'">
        <view class="generate-card">
          <view class="card-header">
            <view class="section-title">配置生成参数</view>
            <view class="balance-box">
              <text class="balance-icon">⚡</text>
              <text class="balance-text">余额 9700</text>
            </view>
          </view>

          <view class="form-section">
            <view class="form-label">权益类型</view>
            <view class="benefit-type-card" :class="{ active: benefitType === 'energy' }">
              <image src="/static/images/code/power.png" class="benefit-icon" mode="aspectFit" />
              <text class="benefit-text">能量点数转赠</text>
            </view>
          </view>

          <view class="form-section">
            <view class="form-label">生成面额 (pts)</view>
            <view class="input-with-arrows">
              <input
                class="denomination-input"
                type="number"
                v-model.number="denomination"
                placeholder="输入要在装换的能量值"
                placeholder-class="denomination-input-placeholder"
                @input="onDenominationInput"
              />
              <view class="arrow-buttons">
                <view class="arrow-btn" @click="adjustDenomination('up')">
                  <text class="arrow-up">▲</text>
                </view>
                <view class="arrow-btn" @click="adjustDenomination('down')">
                  <text class="arrow-down">▼</text>
                </view>
              </view>
            </view>
          </view>

          <view class="button-wrapper">
            <button class="generate-button" @click="handleGenerate" :disabled="!canGenerate">
              <image src="/static/images/code/upd.png" class="generate-icon" mode="aspectFit" />
              <text class="generate-text">一键生成</text>
            </button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { redeemCode, userEnergy, generateRedeemCode } from "@/api/gxhc.js";

export default {
  data() {
    return {
      activeTab: "redeem", // 'redeem' | 'generate'
      redeemCode: "",
      showFailModal: false, // 显示失败弹窗
      balance: 0, // 能量余额
      benefitType: "energy", // 权益类型
      denomination: "", // 生成面额
    };
  },
  computed: {
    canRedeem() {
      return this.redeemCode.trim().length > 0;
    },
    canGenerate() {
      return (
        this.denomination &&
        this.denomination > 0 &&
        this.denomination <= this.balance
      );
    },
  },
  onShow() {
    // 获取用户能量余额
    this.getUserBalance();
  },
  methods: {
    switchTab(tab) {
      this.activeTab = tab;
      if (tab === "redeem") {
        // 切换到兑换权益时，可以重置输入
      } else if (tab === "generate") {
        // 切换到生成页面时，获取余额
        this.getUserBalance();
      }
    },
    getUserBalance() {
      userEnergy()
        .then((res) => {
          if (res.status === 200 && res.data) {
            this.balance = res.data.energy || 0;
          }
        })
        .catch((error) => {
          console.error("获取能量余额异常:", error);
        });
    },
    formatEnergy(energy) {
      if (energy >= 1000) {
        return (energy / 1000).toFixed(1) + "k";
      }
      return energy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    onDenominationInput(e) {
      let value = e.detail.value;
      // 确保输入的是正数
      if (value < 0) {
        value = 0;
      }
      // 不能超过余额
      if (value > this.balance) {
        value = this.balance;
        uni.showToast({
          title: "输入值不能超过余额",
          icon: "none",
        });
      }
      this.denomination = value;
    },
    adjustDenomination(direction) {
      if (direction === "up") {
        if (this.denomination < this.balance) {
          this.denomination = Math.min(
            (this.denomination || 0) + 1,
            this.balance
          );
        }
      } else {
        if (this.denomination > 0) {
          this.denomination = Math.max((this.denomination || 0) - 1, 0);
        }
      }
    },
    handleGenerate() {
      if (!this.canGenerate) {
        if (!this.denomination || this.denomination <= 0) {
          uni.showToast({
            title: "请输入生成面额",
            icon: "none",
          });
        } else if (this.denomination > this.balance) {
          uni.showToast({
            title: "生成面额不能超过余额",
            icon: "none",
          });
        }
        return;
      }

      uni.showLoading({
        title: "生成中...",
      });

      generateRedeemCode({
        type: this.benefitType,
        denomination: this.denomination,
      })
        .then((res) => {
          uni.hideLoading();
          if (res.status === 200) {
            uni.showToast({
              title: res.msg || "生成成功",
              icon: "success",
            });
            // 刷新余额
            this.getUserBalance();
            // 重置输入
            this.denomination = "";
            // 可以跳转到生成记录页面或显示生成的兑换码
            if (res.data && res.data.code) {
              // 显示生成的兑换码
              uni.showModal({
                title: "生成成功",
                content: `兑换码：${res.data.code}`,
                showCancel: false,
                confirmText: "确定",
              });
            }
          } else {
            uni.showToast({
              title: res.msg || "生成失败",
              icon: "none",
            });
          }
        })
        .catch((err) => {
          uni.hideLoading();
          uni.showToast({
            title: err.msg || "生成失败，请稍后重试",
            icon: "none",
          });
        });
    },
    onCodeInput(e) {
      this.redeemCode = e.detail.value;
    },
    handleRedeem() {
      if (!this.canRedeem) {
        return;
      }
      const code = this.redeemCode.trim();
      if (!code) {
        uni.showToast({
          title: "请输入兑换码",
          icon: "none",
        });
        return;
      }

      // 模拟：输入111时显示兑换失败弹窗
      if (code === "111") {
        this.showFailModal = true;
        return;
      }

      // 调用兑换接口
      uni.showLoading({
        title: "兑换中...",
      });

      // 调用兑换API
      redeemCode({ code })
        .then((res) => {
          uni.hideLoading();
          if (res.status === 200) {
            uni.showToast({
              title: res.msg || "兑换成功",
              icon: "success",
            });
            this.redeemCode = "";
          } else {
            uni.showToast({
              title: res.msg || "兑换失败",
              icon: "none",
            });
          }
        })
        .catch((err) => {
          uni.hideLoading();
          uni.showToast({
            title: err.msg || "兑换失败，请稍后重试",
            icon: "none",
          });
        });
    },
    handleMoreClick() {
      // 更多操作
      uni.showToast({
        title: "功能开发中",
        icon: "none",
      });
    },
    handleEyeClick() {
      // 查看操作
      uni.showToast({
        title: "功能开发中",
        icon: "none",
      });
    },
    goToGenerateRecord() {
      // 跳转到生成记录页面
      uni.navigateTo({
        url: "/pages/mine/exchange/record/index",
      });
    },
    closeFailModal() {
      this.showFailModal = false;
      this.redeemCode = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.exchange-page {
  min-height: 100vh;
  background: #ffffff;
}

.top-background {
  width: 100%;
  height: 562rpx;
  opacity: 1;
  background: linear-gradient(180deg, #e2faf1 5%, #ebfdfa 98%);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}

.page-content {
  padding-top: 20rpx;
  position: relative;
  z-index: 1;
}

// 标签页样式
.tabs-container {
  width: 716rpx;
  height: 98rpx;
  border-radius: 12rpx;
  opacity: 1;
  background: #f1f5f9;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 auto 52rpx;
  padding: 8rpx;
  box-sizing: border-box;
  gap: 0;

  .tab-item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 110rpx;
    height: 28rpx;
    opacity: 1;
    color: #979797;
    text-align: center;
    font-size: 22rpx;
    font-weight: 600;
    font-family: "PingFang SC";
    line-height: 27.5rpx;
    background: transparent;
    transition: all 0.3s;

    &.active {
      width: 366rpx;
      height: 86rpx;
      border-radius: 12rpx;
      opacity: 1;
      background: #ffffff;
      color: #000000;
      text-align: center;
      font-size: 22rpx;
      font-weight: 600;
      font-family: "PingFang SC";
      line-height: 27.5rpx;
    }
  }
}

.content-wrapper {
  width: 716rpx;
  height: 938rpx;
  border-radius: 60rpx;
  opacity: 1;
  border: 2rpx solid #f1f5f9;
  background: #ffffff;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0;
}

// 兑换卡片样式
.redeem-card {
  width: 716rpx;
  height: 938rpx;
  border-radius: 60rpx;
  opacity: 1;
  border: 2rpx solid #f1f5f9;
  background: #ffffff;
  padding: 60rpx 40rpx;
  padding-top:162rpx;
  padding-bottom: 32rpx ;
  box-sizing: border-box;
  margin: 0 auto 40rpx;

  .gift-icon {
    width: 152rpx;
    height: 152rpx;
    display: block;
    margin: 0 auto 40rpx;
  }

  .card-title {
    width: 240rpx;
    height: 60rpx;
    opacity: 1;
    color: #000000;
    text-align: center;
    font-size: 48rpx;
    font-weight: 600;
    font-family: "PingFang SC";
    line-height: 60rpx;
    margin: 0 auto 20rpx;
  }

  .card-desc {
    width: 492rpx;
    height: 70rpx;
    opacity: 0.5;
    color: #000000;
    text-align: center;
    font-size: 28rpx;
    font-weight: 400;
    font-family: "PingFang SC";
    line-height: 35rpx;
    margin: 0 auto 60rpx;
  }

  .input-wrapper {
    width: 564rpx;
    height: 108rpx;
    border-radius: 60rpx;
    opacity: 1;
    background: #f8fafc;
    margin: 0 auto 40rpx;
    box-sizing: border-box;

    .code-input {
      width: 100%;
      height: 100%;
      background: transparent;
      border-radius: 60rpx;
      padding: 0 32rpx;
      font-size: 32rpx;
      color: #1a1a1a;
      box-sizing: border-box;
      text-align: center;
      line-height: 108rpx;
    }

    .code-input-placeholder {
      width: 492rpx;
      height: 70rpx;
      opacity: 1;
      color: #cbd5e1;
      text-align: center;
      font-size: 32rpx;
      font-weight: 600;
      font-family: "PingFang SC";
      line-height: 108rpx;
    }
  }

  .button-wrapper {
    width: 564rpx;
    height: 108rpx;
    border-radius: 60rpx;
    opacity: 1;
    background: #e2e8f0;
    margin: 0 auto;

    .redeem-button {
      width: 100%;
      height: 100%;
      background: transparent;
      border-radius: 60rpx;
      color: #ffffff;
      font-size: 32rpx;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      transition: all 0.3s;

      &::after {
        display: none;
      }

      &.disabled {
        color: #909399;
      }

      &:not(.disabled) {
        background: #4caf50;
      }

      &:not(.disabled):active {
        opacity: 0.8;
      }
    }
  }
}

.bottom-link {
  width: 168rpx;
  height: 36rpx;
  opacity: 1;
  color: #0f9b6f;
  text-align: center;
  font-size: 28rpx;
  font-weight: 600;
  font-family: "PingFang SC";
  line-height: 35rpx;
  margin: 0 auto;
  padding: 20rpx 0;
}

// 生成内容样式
.generate-card {
  width: 716rpx;
  height: 938rpx;
  border-radius: 60rpx;
  opacity: 1;
  border: 2rpx solid #f1f5f9;
  background: #ffffff;
  padding: 40rpx;
  box-sizing: border-box;
  margin: 0 auto;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40rpx;

    .section-title {
      width: 192rpx;
      height: 40rpx;
      opacity: 1;
      color: #000000;
      text-align: left;
      font-size: 32rpx;
      font-weight: 600;
      font-family: "PingFang SC";
      line-height: 40rpx;
    }

    .balance-box {
      display: flex;
      align-items: center;
      gap: 8rpx;
      background: #fff3e0;
      border-radius: 12rpx;
      padding: 8rpx 16rpx;
      box-sizing: border-box;

      .balance-icon {
        font-size: 24rpx;
        color: #ff9800;
      }

      .balance-text {
        width: 104rpx;
        height: 28rpx;
        opacity: 1;
        color: #dd851d;
        text-align: left;
        font-size: 22rpx;
        font-weight: 600;
        font-family: "PingFang SC";
        line-height: 27.5rpx;
      }
    }
  }

  .form-section {
    margin-bottom: 40rpx;

    .form-label {
      width: 492rpx;
      height: 40rpx;
      opacity: 0.5;
      color: #000000;
      text-align: left;
      font-size: 28rpx;
      font-weight: 400;
      font-family: "PingFang SC";
      line-height: 35rpx;
      margin-bottom: 20rpx;
    }

    .benefit-type-card {
      display: flex;
      align-items: center;
      gap: 16rpx;
      padding: 24rpx;
      border: 2rpx solid #e0e0e0;
      border-radius: 16rpx;
      background: #ffffff;
      transition: all 0.3s;

      &.active {
        width: 606rpx;
        height: 108rpx;
        border-radius: 8rpx;
        opacity: 1;
        border: 2rpx solid #fef3c7;
        background: #fffbeb;
        box-sizing: border-box;
      }

      .benefit-icon {
        width: 56rpx;
        height: 56rpx;
      }

      .benefit-text {
        width: 168rpx;
        height: 36rpx;
        opacity: 1;
        color: #b45309;
        text-align: left;
        font-size: 28rpx;
        font-weight: 600;
        font-family: "PingFang SC";
        line-height: 35rpx;
      }
    }

    .input-with-arrows {
      width: 606rpx;
      height: 94rpx;
      border-radius: 8rpx;
      opacity: 1;
      border: 1rpx solid #cbd5e1;
      background: #f8fafc;
      display: flex;
      align-items: center;
      padding: 0 20rpx;
      box-sizing: border-box;

      .denomination-input {
        flex: 1;
        height: 96rpx;
        font-size: 32rpx;
        color: #1a1a1a;
        background: transparent;
        border: none;
        text-align: left;
      }

      .denomination-input-placeholder {
        width: 280rpx;
        height: 36rpx;
        opacity: 1;
        color: #ced7e3;
        text-align: left;
        font-size: 28rpx;
        font-weight: 600;
        font-family: "PingFang SC";
        line-height: 35rpx;
      }

      .arrow-buttons {
        display: flex;
        flex-direction: column;
        gap: 4rpx;

        .arrow-btn {
          width: 40rpx;
          height: 40rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          border-radius: 8rpx;
          cursor: pointer;
          transition: all 0.2s;

          &:active {
            background: #e0e0e0;
          }

          .arrow-up,
          .arrow-down {
            font-size: 20rpx;
            color: #606266;
            line-height: 1;
          }
        }
      }
    }
  }

  .button-wrapper {
    width: 606rpx;
    height: 94rpx;
    border-radius: 20rpx;
    opacity: 1;
    background: #0f172a;
    margin: 40rpx auto 0;
    box-sizing: border-box;

    .generate-button {
      width: 100%;
      height: 100%;
      background: transparent;
      border-radius: 20rpx;
      color: #ffffff;
      font-size: 32rpx;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12rpx;
      border: none;
      transition: all 0.3s;

      &::after {
        display: none;
      }

      &:disabled {
        opacity: 0.5;
        color: #909399;
      }

      &:not(:disabled):active {
        opacity: 0.8;
      }

      .generate-icon {
        width: 32rpx;
        height: 32rpx;
      }

      .generate-text {
        width: 130rpx;
        height: 50.6rpx;
        opacity: 1;
        color: #ffffff;
        text-align: left;
        font-size: 32rpx;
        font-weight: 700;
        font-family: "Alibaba PuHuiTi 3.0";
        line-height: 50.6rpx;
      }
    }
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

// 兑换失败弹窗
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

.fail-modal {
  width: 700rpx;
  height: 562rpx;
  border-radius: 60rpx;
  opacity: 1;
  background: #ffffff;
  padding: 60rpx 40rpx 40rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;

  .fail-icon-wrapper {
    margin-bottom: 40rpx;
    display: flex;
    justify-content: center;

    .fail-icon {
      width: 152rpx;
      height: 152rpx;
    }
  }

  .fail-title {
    width: 160rpx;
    height: 50rpx;
    opacity: 1;
    color: #000000;
    text-align: center;
    font-size: 40rpx;
    font-weight: 600;
    font-family: "PingFang SC";
    line-height: 50rpx;
    margin: 0 auto 20rpx;
  }

  .fail-desc {
    width: 492rpx;
    height: 70rpx;
    opacity: 1;
    color: #64748b;
    text-align: center;
    font-size: 24rpx;
    font-weight: 400;
    font-family: "PingFang SC";
    line-height: 30rpx;
    margin: 0 auto 60rpx;
  }

  .fail-button {
    width: 582rpx;
    height: 94rpx;
    border-radius: 24rpx;
    opacity: 1;
    border: 1rpx solid #ffedd5;
    background: #f1f5f9;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    box-sizing: border-box;

    .fail-button-text {
      width: 56rpx;
      height: 36rpx;
      opacity: 1;
      color: #475569;
      text-align: center;
      font-size: 28rpx;
      font-weight: 600;
      font-family: "PingFang SC";
      line-height: 35rpx;
    }
  }
}
</style>

