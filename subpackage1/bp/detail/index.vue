<!-- /subpackage1/bp/detail/index.vue -->
<template>
  <x-load-page v-if="pageLoading" :loadingType="2" />
  <view class="pages" v-else>
    <view class="content">
      <text class="title">{{ bpInfo.filename || "文件未命名" }}</text>
      <view class="bp">
        <template
          v-if="bpInfo.status === 'SUCCEEDED' && bpInfo.progress == 100"
        >
          <image class="icon" :src="imgUrl + '/subpackage1/head-icon.png'" />
          <text class="title">诊断成功</text>
          <text class="desc">BP诊断报告已生成～</text>
        </template>
        <template
          v-else-if="
            ['QUEUED', 'RUNNING'].includes(bpInfo.status) &&
            bpInfo.progress < 100
          "
        >
          <image class="icon" :src="imgUrl + '/subpackage1/head-icon2.png'" />
          <text class="title">诊断中</text>
          <text class="desc2">诊断报告正在诊断中，请稍后</text>
          <text class="desc2"
            >报告获取预计时间十分钟，完成后会通过短信通知</text
          >
        </template>
        <template v-else-if="['FAILED', 'CANCELED'].includes(bpInfo.status)">
          <image class="icon" :src="imgUrl + '/subpackage1/head-icon3.png'" />
          <text class="title">诊断失败</text>
          <text class="desc">该诊断报告诊断失败，请重新诊断</text>
        </template>
      </view>
    </view>
    <template v-if="bpInfo.status === 'SUCCEEDED' && bpInfo.progress == 100">
      <view class="btn" @click="showBp">
        <text class="btn-t">查看诊断报告</text>
      </view>
      <text class="btn-tip" @click="copyBpUrl">复制下载链接</text>
    </template>

    <view class="info-list" v-if="false">
      <view class="info-item">
        <text class="info-label">创建时间：</text>
        <text class="info-value">{{ bpInfo.add_time || "未知" }}</text>
      </view>
    </view>

    <!-- 使用封装的组件 -->
    <bp-introduction
      :bp-info="bpInfo"
      :img-url="imgUrl"
      :page-loading="pageLoading"
      :energy="energy"
      @toggle-energy-deduction="toggleEnergyDeduction"
      @go-pay="goPay"
    />
  </view>
</template>

<script>
import BpIntroduction from "../components/bp-introduction.vue";
import { imgUrls, HTTP_REQUEST_URL, TOKENNAME } from "@/config/app";
import { userEnergy, createOrder, pay, getBpResultInfo } from "@/api/gxhc";
import { getShare } from "@/api/public.js";
import { mapGetters } from 'vuex';
export default {
  components: {
    BpIntroduction,
  },
  data: function () {
    return {
      imgUrl: imgUrls,
      bpInfo: {},
      id: null,
      pageLoading: true,
      energy: 0,
      useEnergy: false,
    };
  },
  computed: {
    ...mapGetters(["uid"]),
    remainingEnergy() {
      if (!this.useEnergy) {
        return this.energy;
      }
      const deducted = Math.min(this.energy, 299);
      return this.energy - deducted;
    },
    payAmount() {
      if (!this.useEnergy) {
        return 299;
      }
      return Math.max(299 - this.energy, 0);
    },
    deductedEnergy() {
      if (!this.useEnergy) {
        return 0;
      }
      return Math.min(this.energy, 299);
    },
  },
  //#ifdef MP
  onShareAppMessage() {
    let uid = this.uid ? this.uid : 0;
    if (this.shareInfo.img) {
      return {
        title: this.shareInfo.title,
        path: "/pages/home/index/index?spread=" + uid,
        imageUrl: this.shareInfo.img,
        desc: this.shareInfo.synopsis,
      };
    } else {
      return {
        title: this.shareInfo.title,
        path: "/pages/home/index/index?spread=" + uid,
        // imageUrl: this.shareInfo.img,
        // desc: this.shareInfo.synopsis
      };
    }
  },
  //#endif
  onLoad(options) {
    getShare().then((res) => {
      this.shareInfo = res.data;
    });
    if (options.id) {
      this.id = options.id;
    } else {
      uni.showToast({
        title: "缺少参数",
        icon: "none",
      });
      uni.navigateBack();
    }
  },
  onShow() {
    this.getUserEnergy();
    this.getBpDetail();
  },
  methods: {
    getBpDetail() {
      if (!this.id) return;
      this.pageLoading = true;

      getBpResultInfo({ id: this.id })
        .then((res) => {
          if (res.status === 200) {
            this.bpInfo = res.data || {};
          } else {
            uni.showToast({
              title: res.message || "获取详情失败",
              icon: "none",
            });
          }
        })
        .catch((err) => {
          console.error("获取BP详情异常:", err);
          // uni.showToast({
          //   title: "网络错误",
          //   icon: "none",
          // });
        })
        .finally(() => {
          this.pageLoading = false;
        });
    },
    getUserEnergy() {
      userEnergy().then((res) => {
        if (res.status === 200) {
          this.energy = res.data.energy;
        }
      });
    },
    goPage(type) {
      let url = "";
      if (type == "cha") {
        url = "https://mp.weixin.qq.com/s/kCbiycoxR5xv5EPjwl7zaA";
        url = `/pages/web/index?url=${encodeURIComponent(url)}`;
      } else if (type == "introduce") {
        url = `/pages/home/introduce/index`;
      } else if (type == 1) {
        url = "/subpackage1/energy/index/index";
      }
      uni.navigateTo({
        url,
      });
    },
    copyBpUrl() {
      if (!this.bpInfo || !this.bpInfo.file_id) {
        uni.showToast({
          title: "暂无下载链接",
          icon: "none",
        });
        return;
      }

      const downloadUrl =
        HTTP_REQUEST_URL + "/api/downloadBpUrl?file_id=" + this.bpInfo.file_id;

      uni.setClipboardData({
        data: downloadUrl,
        success: () => {
          uni.showToast({
            title: "链接已复制到剪贴板",
            icon: "none",
          });
        },
        fail: (err) => {
          console.error("复制链接失败", err);
          uni.showToast({
            title: "复制链接失败",
            icon: "none",
          });
        },
      });
    },
    showBp() {
      if (!this.bpInfo.file_id) {
        console.warn("缺少file_id参数");
        return;
      }
      uni.downloadFile({
        url:
          HTTP_REQUEST_URL +
          "/api/downloadBpUrl?file_id=" +
          this.bpInfo.file_id,
        header: {
          // #ifdef MP
          "Content-Type": "application/octet-stream",
          // #endif
          [TOKENNAME]: "Bearer " + this.$store.state.app.token,
        },
        success: (res) => {
          if (res.statusCode === 200) {
            const tempFilePath = res.tempFilePath;
            uni.openDocument({
              filePath: tempFilePath,
              fileType: "pdf",
              success: () => {},
              fail: (err) => {},
            });
          }
        },
        fail: (err) => {
          console.log(err);
        },
      });
    },
    toggleEnergyDeduction(useEnergy) {
      this.useEnergy = useEnergy;
    },
    payOrder(order_id, pay_price) {
      pay({ order_id }).then((res) => {
        if (res.status === 200) {
          if (pay_price <= 0) {
            uni.showToast({
              title: "支付成功",
              icon: "none",
            });
            uni.navigateTo({
              url:
                "/subpackage1/bp/result/plus/index?runId=" + this.bpInfo.run_id,
            });
            return;
          }
          const orderInfo = res.data.payInfo;
          const jsConfig = orderInfo.jsConfig;
          uni.requestPayment({
            provider: "wxpay",
            timeStamp: jsConfig.timestamp,
            nonceStr: jsConfig.nonceStr,
            package: jsConfig.package,
            signType: jsConfig.signType,
            paySign: jsConfig.paySign,
            success: (res) => {
              if (res.errMsg === "requestPayment:ok") {
                uni.showToast({
                  title: "支付成功",
                  icon: "none",
                });
                uni.navigateTo({
                  url: "/subpackage1/bp/result/plus/index?id=" + this.id,
                });
              }
            },
            fail: (err) => {
              if (err.errMsg === "requestPayment:fail cancel") {
                uni.showToast({
                  title: "取消支付",
                  icon: "none",
                });
                return;
              }
              console.error("支付失败:", err);
            },
          });
        } else {
          uni.showToast({
            title: "创建订单失败",
            icon: "none",
          });
        }
      });
    },
    goPay(payData) {
      const payPrice = payData.useEnergy ? Math.max(299 - this.energy, 0) : 299;
      createOrder({
        run_id: this.bpInfo.run_id,
        pay_price: payPrice,
        use_energy: payData.useEnergy,
        energy_amount: payData.useEnergy ? Math.min(this.energy, 299) : 0,
      })
        .then((res) => {
          if (res.status === 200) {
            const orderInfo = res.data;
            this.payOrder(orderInfo.order_id, payPrice);
          } else {
            uni.showToast({
              title: "创建订单失败",
              icon: "none",
            });
          }
        })
        .catch((error) => {
          uni.showToast({
            title: "网络错误",
            icon: "none",
          });
          console.error("创建订单异常:", error);
        });
    },
  },
};
</script>

<style>
page {
  background: #f5f8ff;
}
</style>
<style lang="scss" scoped>
.pages {
  padding-bottom: 50rpx;
  .img {
    width: 100%;
    height: 100%;
  }
  .play-bj {
    margin: 24rpx 32rpx;
    display: block;
    height: 598rpx;
    border-radius: 28rpx;
  }
  .qr-bj {
    margin: 24rpx 32rpx;
    display: block;
    height: 368rpx;
    border-radius: 28rpx;
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
  }
  .icon-list {
    margin: 24rpx 32rpx;
    .icon1 {
      height: 216rpx;
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
  .content {
    margin: 24rpx 32rpx;
    border-radius: 28rpx;
    background: #ffffff;
    padding: 20rpx 24rpx;
    .title {
      color: #182855;
      font-size: 24rpx;
      font-weight: 600;
      margin-bottom: 20rpx;
      display: block;
    }
    .bp {
      border-radius: 16rpx;
      overflow: hidden;
      background: #f8f9fa;
      padding-bottom: 40rpx;

      .icon {
        width: 336rpx;
        height: 336rpx;
        display: block;
        margin: 0 auto;
      }
      .title {
        display: block;
        color: #444444;
        text-align: center;
        font-size: 38rpx;
        font-weight: 500;
      }
      .desc {
        display: block;
        color: #999999;
        text-align: center;
        font-size: 28rpx;
        font-weight: 400;
        margin-top: 16rpx;
      }
      .desc2 {
        display: block;
        color: #999999;
        text-align: center;
        font-size: 26rpx;
        font-weight: 400;
        margin-top: 16rpx;
      }
      .btn {
        height: 88rpx;
        border-radius: 300rpx;
        margin: 40rpx 52rpx 0 52rpx;
        background: #2969ff;
        display: flex;
        align-items: center;
        justify-content: center;
        .btn-t {
          color: #ffffff;
          text-align: center;
          font-size: 28rpx;
          font-weight: 400;
        }
      }
    }
  }
  .btn {
    margin: 38rpx 76rpx 0 76rpx;
    height: 88rpx;
    border-radius: 300rpx;
    opacity: 1;
    background: #2969ff;
    display: flex;
    align-items: center;
    justify-content: center;
    .btn-t {
      color: #ffffff;
      font-size: 28rpx;
      font-weight: 400;
    }
  }
  .btn-tip {
    color: #2969ff;
    font-size: 28rpx;
    font-weight: 400;
    margin-top: 40rpx;
    display: block;
    text-align: center;
  }
}
</style>
