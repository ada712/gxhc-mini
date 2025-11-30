<template>
  <x-load-page v-if="pageLoading" :loadingType="2" />
  <view class="pages" v-else>
    <text class="filename">{{ bpInfo.filename }}</text>
    <view class="base">
      <template v-if="bpInfo.status === 'SUCCEEDED' && bpInfo.progress == 100">
        <image class="icon" :src="imgUrl + '/subpackage1/head-icon.png'" />
        <text class="title">解锁成功</text>
        <text class="desc">恭喜您，已成功解锁BP诊断报告Base版</text>
        <view class="btn" @click="showBp">
          <text class="btn-t">立即在线查看</text>
        </view>
        <text class="tip" @click="copyBpUrl">复制下载链接</text>
      </template>
      <template
        v-else-if="
          ['QUEUED', 'RUNNING'].includes(bpInfo.status) && bpInfo.progress < 100
        "
      >
        <image class="icon" :src="imgUrl + '/subpackage1/head-icon2.png'" />
        <text class="title">诊断中</text>
        <text class="desc2">诊断报告正在诊断中，请稍后</text>
        <text class="desc2">报告获取预计时间十分钟，完成后会通过短信通知</text>
      </template>
      <template v-else-if="['FAILED', 'CANCELED'].includes(bpInfo.status)">
        <image class="icon" :src="imgUrl + '/subpackage1/head-icon3.png'" />
        <text class="title">诊断失败</text>
        <text class="desc">该诊断报告诊断失败，请重新诊断</text>
        <view class="btn" @click="showBp">
          <text class="btn-t">重新诊断</text>
        </view>
      </template>
    </view>

    <bp-introduction
      :bp-info="bpInfo"
      :img-url="imgUrl"
      :page-loading="pageLoading"
      :energy="energy"
      @toggle-energy-deduction="handleToggleEnergyDeduction"
      @go-pay="handleGoPay"
    />
  </view>
</template>

<script>
import BpIntroduction from "../../components/bp-introduction.vue";
import { imgUrls, HTTP_REQUEST_URL, TOKENNAME } from "@/config/app";
import { userEnergy, createOrder, pay, getBpInfo } from "@/api/gxhc";
import { getShare } from "@/api/public.js";

export default {
  components: {
    BpIntroduction,
  },
  data: function () {
    return {
      imgUrl: imgUrls,
      energy: 0,
      useEnergy: false,
      runId: "",
      bpInfo: {},
      shareInfo: {},
      pageLoading: true,
    };
  },
  computed: {
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
    if (options.runId) {
      this.runId = options.runId;
    }
    if (this.runId) {
      this.getBpInfoData();
    } else {
      this.pageLoading = false;
    }
  },
  onShow() {
    this.getUserEnergy();
  },
  methods: {
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
    getUserEnergy() {
      userEnergy().then((res) => {
        if (res.status === 200) {
          this.energy = res.data.energy;
        }
      });
    },
    getBpInfoData() {
      if (!this.runId) {
        console.warn("缺少runId参数");
        this.pageLoading = false;
        return;
      }

      getBpInfo({ run_id: this.runId, target: "export_preliminary" })
        .then((res) => {
          if (res.status === 200) {
            this.bpInfo = res.data;
          } else {
            uni.showToast({
              title: res.message || "获取BP信息失败",
              icon: "none",
            });
          }
        })
        .catch((error) => {
          console.error("获取BP信息异常:", error);
          uni.showToast({
            title: "网络错误",
            icon: "none",
          });
        })
        .finally(() => {
          this.pageLoading = false;
        });
    },
    handleToggleEnergyDeduction(useEnergy) {
      this.useEnergy = useEnergy;
    },
    handleGoPay(payData) {
      const payPrice = payData.useEnergy ? Math.max(299 - this.energy, 0) : 299;

      createOrder({
        run_id: this.runId,
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
    payOrder(order_id, pay_price) {
      pay({ order_id }).then((res) => {
        if (res.status === 200) {
          if (pay_price <= 0) {
            uni.showToast({
              title: "支付成功",
              icon: "none",
            });
            uni.navigateTo({
              url: "/subpackage1/bp/result/plus/index?runId=" + this.runId,
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
                  url: "/subpackage1/bp/result/plus/index?runId=" + this.runId,
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
  padding-bottom: 130rpx;
  .filename {
    margin: 40rpx 32rpx 0 32rpx;
    color: #182855;
    text-align: left;
    font-size: 24rpx;
    font-weight: 600;
    display: block;
    margin-top: 20rpx;
  }
  .base {
    margin: 20rpx 32rpx 0 32rpx;
    border-radius: 28rpx;
    background: #ffffff;
    padding: 0rpx 24rpx 40rpx 24rpx;
    text-align: center;
    overflow: hidden;

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
      font-size: 42rpx;
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
    .tip {
      color: #2969ff;
      font-size: 28rpx;
      font-weight: 400;
      margin-top: 40rpx;
      display: block;
    }
  }
}
</style>
