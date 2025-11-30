<template>
  <view class="int">
    <template v-if="!(bpInfo.status === 'SUCCEEDED' && bpInfo.progress == 100)">
      <view class="icon-list">
        <view class="icon1">
          <image
            @click="handleLockClick"
            class="img"
            :src="imgUrl + '/subpackage1/lock-icon2.png'"
          />
        </view>
      </view>
      <view class="int2">
        <view class="introduce" v-if="false">
          <view class="title">
            <text class="title-t">诊断样本案例</text>
          </view>
          <view
            class="item"
            @click="handleShowPdf(item.link)"
            v-for="(item, key) in internalDemos"
            :key="key"
          >
            <view class="top">
              <text class="title">{{ item.title }}</text>
              <view class="more">
                <image
                  class="right-icon"
                  :src="imgUrl + '/icons/icon-black-right.png'"
                ></image>
              </view>
            </view>
            <text class="time">{{ item.time }}</text>
          </view>
        </view>
        <view class="icon2" v-if="false">
          <image
            @click="handleShareClick"
            class="img"
            :src="imgUrl + '/subpackage1/share-icon11.png'"
          />
          <view class="rule" @click="handleRuleClick">
            <text class="rule1">能量与邀请规则</text>
            <text class="rule2">查看</text>
          </view>
        </view>
        <view class="icon3">
          <image
            @click="handleJyClick"
            class="img"
            :src="imgUrl + '/subpackage1/youhua.png'"
          />
        </view>
        <view class="icon4">
          <image
            @click="handleShareClick"
            class="img"
            :src="imgUrl + '/subpackage1/share-icon11.png'"
          />
        </view>
      </view>
      <view class="icon5">
        <image class="img" :src="imgUrl + '/subpackage1/duibi.png'" />
      </view>
    </template>
    <template v-else>
      <view class="play-bj">
        <image class="img" :src="imgUrl + '/subpackage1/wwc1.png'" />
      </view>
      <view class="qr-bj">
        <image class="img" :src="imgUrl + '/subpackage1/wwc2.png'" />
      </view>
      <view class="btn-footer">
        <view class="bb-btn" @click="goPage1"> 报名预约1v1连麦指导 </view>
      </view>
    </template>

    <!-- 升级plus -->
    <view class="masks" v-if="internalShowPopup && !pageLoading">
      <view class="popup2">
        <view class="popup-content">
          <text class="title">Plus版</text>
          <text class="p-t">299可解锁PLUS版</text>
          <text class="p-t">或者邀请会员获取能量抵扣</text>
          <view class="p-ivt" @click="handleInviteClick">
            <text class="p-t2">立即邀请会员</text>
            <image
              class="ivt-icon"
              :src="imgUrl + '/subpackage1/base-icon4.png'"
            />
          </view>
          <view class="nl">
            <view class="nl-item">
              <text class="nl-t">能量抵扣</text>
              <view class="nl-r" @click="handleToggleEnergyDeduction">
                <text class="nl-t2">勾选可抵扣现金</text>
                <image
                  class="nl-select"
                  :src="
                    imgUrl +
                    (internalUseEnergy
                      ? '/subpackage1/select2.png'
                      : '/subpackage1/select1.png')
                  "
                />
              </view>
            </view>
            <view class="nl-item">
              <text class="nl-t4">剩余能量{{ internalRemainingEnergy }}</text>
              <text class="nl-t4" v-if="internalUseEnergy"
                >已抵扣{{ internalDeductedEnergy }}元</text
              >
            </view>
          </view>
        </view>
        <view class="popup-btns">
          <view class="popup-btn" @click="handleCancelPopup">
            <text class="popup-btn-t1">取消</text>
          </view>
          <view class="popup-btn" @click="handleGoPay">
            <text class="popup-btn-t2">{{
              internalUseEnergy ? `支付 ${internalPayAmount}` : "299付费"
            }}</text>
          </view>
        </view>
      </view>
    </view>
    <!-- 分享 -->
    <x-popup
      :round="20"
      :show="internalSharePopup && !pageLoading"
      @close="handleCloseSharePopup"
    >
      <view class="popup">
        <view class="head">
          <text class="title">邀请会员获取能量</text>
          <image
            @click="handleCloseSharePopup"
            class="close"
            :src="imgUrl + '/subpackage1/close.png'"
          />
        </view>
        <view class="list">
          <!-- <view class="item">
            <image class="item-icon" :src="imgUrl + '/subpackage1/lj.png'" />
            <text class="item-t">分享链接</text>
          </view> -->
          <view class="item">
            <button open-type="share">
              <image class="item-icon" :src="imgUrl + '/subpackage1/hy.png'" />
              <text class="item-t">微信好友</text>
            </button>
          </view>
          <!-- <view class="item">
            <button open-type="shareTimeline">
              <image class="item-icon" :src="imgUrl + '/subpackage1/pyq.png'" />
              <text class="item-t">朋友圈</text>
            </button>
          </view> -->
        </view>
      </view>
    </x-popup>
  </view>
</template>

<script>
import { HTTP_REQUEST_URL } from "@/config/app";
import { previewPDF } from "@/utils/project";

export default {
  name: "BpIntroduction",
  props: {
    bpInfo: {
      type: Object,
      default: () => ({}),
    },
    imgUrl: {
      type: String,
      default: "",
    },
    pageLoading: {
      type: Boolean,
      default: false,
    },
    energy: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      internalShowPopup: false,
      internalSharePopup: false,
      internalUseEnergy: false,
      internalRemainingEnergy: 0,
      internalDeductedEnergy: 0,
      internalPayAmount: 299,
      internalDemos: [
        {
          title: "ZPAI-BP诊断与优化建议",
          time: "2025-09-27 10:00",
          link: HTTP_REQUEST_URL + "/ZPAI-BP诊断与优化建议.pdf",
        },
        {
          title: "YSKJ-BP诊断与优化建议",
          time: "2025-09-27 10:00",
          link: HTTP_REQUEST_URL + "/YSKJ-BP诊断与优化建议.pdf",
        },
      ],
    };
  },
  watch: {
    energy: {
      handler() {
        this.calculateEnergyValues();
      },
      immediate: true,
    },
    internalUseEnergy: {
      handler() {
        this.calculateEnergyValues();
      },
    },
  },
  methods: {
    goPage1() {
      uni.navigateTo({
        url: "/subpackage1/bp/applyPlay/index",
      });
    },
    handleLockClick() {
      this.internalShowPopup = true;
    },
    handleJyClick() {
      uni.navigateTo({
        url: "/subpackage1/bp/internalList/index",
      });
    },
    handleShareClick() {
      this.internalSharePopup = true;
    },
    handleCloseSharePopup() {
      this.internalSharePopup = false;
    },
    handleShowPdf(url) {
      previewPDF(url);
    },
    handleRuleClick() {
      uni.navigateTo({
        url: "/subpackage1/energy/index/index",
      });
    },
    handleInviteClick() {
      this.internalShowPopup = false;
      this.internalSharePopup = true;
    },
    handleToggleEnergyDeduction() {
      this.internalUseEnergy = !this.internalUseEnergy;
      this.$emit("toggle-energy-deduction", this.internalUseEnergy);
    },
    handleCancelPopup() {
      this.internalShowPopup = false;
    },
    handleGoPay() {
      const payData = {
        useEnergy: this.internalUseEnergy,
        payAmount: this.internalPayAmount,
        deductedEnergy: this.internalDeductedEnergy,
        remainingEnergy: this.internalRemainingEnergy,
      };
      this.$emit("go-pay", payData);
    },
    calculateEnergyValues() {
      if (!this.internalUseEnergy) {
        this.internalRemainingEnergy = this.energy;
        this.internalDeductedEnergy = 0;
        this.internalPayAmount = 299;
        return;
      }

      const deducted = Math.min(this.energy, 299);
      this.internalRemainingEnergy = this.energy - deducted;
      this.internalDeductedEnergy = deducted;
      this.internalPayAmount = Math.max(299 - this.energy, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.int {
  .popup {
    height: 468rpx;
    .head {
      margin: 32rpx 30rpx;
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: center;
      position: relative;
      .close {
        position: absolute;
        right: 0;
        top: 0;
        width: 48rpx;
        height: 48rpx;
      }
    }
    .list {
      display: flex;
      align-items: center;
      text-align: center;
      margin: 50rpx 60rpx 0 60rpx;
      .item {
        margin-right: 66rpx;
        &:last-child {
          margin-right: 0;
        }
        .item-icon {
          width: 96rpx;
          height: 96rpx;
          display: block;
        }
        .item-t {
          color: #1b2132;
          font-size: 28rpx;
          margin-top: 20rpx;
          display: block;
          font-weight: 500;
        }
      }
    }
  }
  .masks {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(#000000, 0.3);
    z-index: 9;
    .popup2 {
      margin: 40% 100rpx 0 100rpx;
      border-radius: 16rpx;
      opacity: 1;
      border: 0 solid #979797;
      background: #ffffff;
      position: relative;
      z-index: 10;
      .popup-content {
        min-height: 200rpx;
        text-align: center;
        padding-top: 48rpx;
        .title {
          display: block;
          color: #1a1a1a;
          text-align: center;
          font-size: 32rpx;
          font-weight: 500;
          margin-bottom: 16rpx;
        }
        .p-t {
          display: block;
          color: #404040;
          text-align: center;
          font-size: 28rpx;
          font-weight: 400;
          margin-top: 3rpx;
        }
        .p-ivt {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 28rpx;
        }
        .ivt-icon {
          width: 32rpx;
          height: 32rpx;
          margin-left: 10rpx;
        }
        .p-t2 {
          color: #e96f03;
          font-size: 28rpx;
          font-weight: 500;
        }
        .nl {
          border-top: 1px solid #f5f5f5;
          padding: 26rpx 24rpx;
          margin-top: 32rpx;
          .nl-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .nl-t {
              color: #404040;
              font-size: 24rpx;
              font-weight: 400;
            }
            .nl-t2 {
              color: #bebebe;
              font-size: 24rpx;
              font-weight: 400;
            }
            .nl-t4 {
              color: #909090;
              font-size: 22rpx;
              font-weight: 400;
              display: block;
              margin-top: 10rpx;
            }
            .nl-r {
              display: flex;
              align-items: center;
              .nl-select {
                width: 28.01rpx;
                height: 28.01rpx;
                margin-left: 10rpx;
              }
            }
          }
        }
      }
      .popup-btns {
        display: flex;
        align-items: center;
        .popup-btn {
          width: 50%;
          padding: 22rpx 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-top: 1px solid #f6f6f6;
          &:last-child {
            border-left: 1px solid #f6f6f6;
          }
          .popup-btn-t1 {
            color: #404040;
            text-align: center;
            font-size: 32rpx;
            font-weight: 400;
          }
          .popup-btn-t2 {
            color: #2969ff;
            text-align: center;
            font-size: 32rpx;
            font-weight: 400;
          }
        }
      }
    }
  }
  .img {
    width: 100%;
    height: 100%;
  }
  .play-bj {
    margin: 24rpx 32rpx;
    display: block;
    height: 646rpx;
    border-radius: 28rpx;
  }
  .qr-bj {
    margin: 24rpx 32rpx;
    display: block;
    height: 428rpx;
    border-radius: 28rpx;
    margin-bottom: 100rpx;
  }
  .btn-footer {
    position: fixed;
    bottom: 0rpx;
    left: 0;
    width: 100%;
    background: linear-gradient(180deg, #d8d8d800 0%, #ffffff 100%);
    .bb-btn {
      width: 598rpx;
      height: 88rpx;
      margin-left: 50%;
      transform: translateX(-50%);
      border-radius: 300rpx;
      margin-bottom: 24rpx;
      opacity: 1;
      background: #ff2b2b;
      color: #ffffff;
      text-align: center;
      font-size: 28rpx;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .int2 {
    display: flex;
    justify-content: space-between;
    margin: 24rpx;
    .icon2 {
      width: 336rpx;
      height: 184rpx;
      border-radius: 28rpx;
      position: relative;
      .rule {
        border-radius: 28rpx;
        padding: 18rpx 26rpx;
        background: #ffffff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: absolute;
        width: 332rpx;
        box-sizing: border-box;
        bottom: -90rpx;
        left: 0;
        .rule1 {
          color: #182855;
          text-align: left;
          font-size: 24rpx;
          font-weight: 400;
        }
        .rule2 {
          color: #e96f03;
          text-align: right;
          font-size: 24rpx;
          font-weight: 600;
        }
      }
    }
    .icon3 {
      width: 336rpx;
      height: 164rpx;
      border-radius: 28rpx;
    }
    .icon4 {
      width: 336rpx;
      height: 164rpx;
      border-radius: 28rpx;
    }
  }
  .icon5 {
    width: 702rpx;
    height: 624rpx;
    border-radius: 28rpx;
    margin: 0 auto;
  }
  .icon-list {
    margin: 24rpx 32rpx;
    .icon1 {
      height: 164rpx;
      border-radius: 28rpx;
    }
  }
  .introduce {
    border-radius: 28rpx;
    background: #ffffff;
    padding: 32rpx 24rpx 4rpx 24rpx;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title-t {
        color: #182855;
        font-size: 24rpx;
        font-weight: 600;
      }
    }
    .item {
      padding: 30rpx 0 20rpx 0;
      border-bottom: 1px solid #f3f3f3;
      .top {
        display: flex;
        justify-content: space-between;
      }
      .time {
        color: #182855;
        font-size: 22rpx;
        font-weight: 400;
      }
      &:last-child {
        border: none;
      }
      .title {
        color: #182855;
        text-align: left;
        font-size: 24rpx;
        font-weight: 600;
      }
      .more {
        display: flex;
        justify-content: flex-end;
        .more-t {
          color: #182855;
          text-align: right;
          font-size: 24rpx;
          font-weight: 400;
          margin-right: 20rpx;
        }
        .right-icon {
          width: 14.2rpx;
          height: 24.8rpx;
          margin-top: 5rpx;
        }
      }
    }
  }
}
</style>
