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
          <text class="desc"
            >检测到您上传的文档似乎不是一份完整的商业计划书，无法提取有效信息，请检查文件是否正确。</text
          >
        </template>
      </view>
    </view>
    <template v-if="bpInfo.status === 'SUCCEEDED' && bpInfo.progress == 100">
      <view class="btn" @click="showBp">
        <text class="btn-t">查看诊断报告</text>
      </view>
      <text class="btn-tip" @click="copyBpUrl">复制下载链接</text>
    </template>

    <view
      class="info-list"
      v-if="bpInfo.target === 'export_optimization' && bpInfo.order_info"
    >
      <view class="info-item">
        <text class="info-label">订单号：</text>
        <text class="info-value">{{ bpInfo.order_id || "-" }}</text>
      </view>
      <view class="info-item">
        <text class="info-label">总金额：</text>
        <text class="info-value">299</text>
      </view>
      <view class="info-item" v-if="bpInfo.order_info.deduction_price">
        <text class="info-label">抵扣金额：</text>
        <text class="info-value">{{ bpInfo.order_info.deduction_price }}</text>
      </view>
      <view class="info-item">
        <text class="info-label">支付金额：</text>
        <view class="payment-row">
          <text class="info-value">{{ bpInfo.order_info.pay_price }}</text>
          <button
            class="invoice-btn"
            v-if="bpInfo.order_info.pay_price > 0"
            @click="invoiceApply"
          >
            开发票
          </button>
        </view>
      </view>
    </view>

    <!-- 使用封装的组件 -->
    <bp-introduction
      :shareCount="shareCount"
      :bp-info="bpInfo"
      :img-url="imgUrl"
      :page-loading="pageLoading"
      :energy="energy"
      @toggle-energy-deduction="toggleEnergyDeduction"
      @go-pay="goPay"
    />

    <view class="feedback-section">
      <view class="popup-btn" @click="handleGoFeedback">
        <text class="popup-btn-t2">我要反馈</text>
      </view>
    </view>

    <invoice-picker
      :inv-show="invShow"
      :is-special="special_invoice"
      :url-query="urlQuery"
      :inv-checked="invChecked"
      :order-id="bpInfo.order_id"
      :inv-list="invList"
      :is-order="1"
      @inv-close="invClose"
      @inv-change="invSub"
      @inv-cancel="invCancel"
    ></invoice-picker>
  </view>
</template>

<script>
import { getUserInfo, invoiceList, makeUpinvoice } from "@/api/user.js";
import invoicePicker from "../components/invoicePicker/index.vue";
import BpIntroduction from "../components/bp-introduction.vue";
import { imgUrls, HTTP_REQUEST_URL, TOKENNAME } from "@/config/app";
import {
  userEnergy,
  createOrder,
  pay,
  getBpResultInfo,
  shareSet,
} from "@/api/gxhc";
import { getShare } from "@/api/public.js";
import { mapGetters } from "vuex";
export default {
  components: {
    invoicePicker,
    BpIntroduction,
  },
  data: function () {
    return {
      imgUrl: imgUrls,
      bpInfo: {},
      id: null,
      pageLoading: true,
      energy: 0,
      shareCount: 0,
      useEnergy: false,
      // 发票相关数据
      invShow: false,
      special_invoice: 0,
      urlQuery: "",
      invChecked: {},
      invList: [],
      userInfo: {},
      moreBtn: false,
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
    shareSet({
      spread: uid,
    }).then((res) => {});
    console.log(this.shareInfo);
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
    this.getInvoiceList();
  },
  methods: {
    handleGoFeedback() {
      uni.navigateTo({
        url: "/subpackage1/bp/feedback/index",
      });
    },
    // 关闭发票弹窗
    invClose() {
      this.invShow = false;
      // 如果需要刷新发票列表可以调用此方法
      this.getInvoiceList();
    },

    // 申请开票
    invoiceApply() {
      // 设置特殊发票参数
      // this.urlQuery = `&specialInvoice=${this.userInfo?.special_invoice || 0}`;
      // 获取发票列表
      this.getInvoiceList();
      this.moreBtn = false;
      this.invShow = true;
    },

    // 获取发票列表（需要根据实际API实现）
    getInvoiceList() {
      uni.showLoading({
        title: `正在加载中`,
      });
      invoiceList()
        .then((res) => {
          uni.hideLoading();
          this.invList = res.data.map((item) => {
            item.id = item.id.toString();
            return item;
          });
          const result = this.invList.find(
            (item) => item.id == this.invChecked
          );
          if (result) {
            let name = "";
            name += result.header_type === 1 ? `个人` : `企业`;
            name += result.type === 1 ? `普通` : `专用`;
            name += `发票`;
            this.invTitle = name;
          }
        })
        .catch((err) => {
          uni.showToast({
            title: err,
            icon: "none",
          });
        });
    },

    // 选择发票
    invSub(id) {
      this.invChecked = id;
      let data = {
        order_id: this.bpInfo.order_id,
        invoice_id: this.invChecked,
      };
      makeUpinvoice(data)
        .then((res) => {
          uni.showToast({
            title: `申请成功`,
            icon: "success",
          });
          this.invShow = false;
          this.aleartStatus = true;
          this.getBpDetail();
        })
        .catch((err) => {
          uni.showToast({
            title: err,
            icon: "none",
          });
        });
    },

    // 取消发票选择
    invCancel() {
      this.invShow = false;
      this.invChecked = {};
    },

    getBpDetail() {
      if (!this.id) return;
      this.pageLoading = true;
      getBpResultInfo({ id: this.id })
        .then((res) => {
          if (res.status === 200) {
            this.bpInfo = res.data || {};
            if (this.bpInfo.target === "export_optimization") {
              uni.setNavigationBarTitle({
                title: "BP-PLUS诊断报告",
              });
            }
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
          this.shareCount = res.data.shareCount;
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
      uni.showLoading({
        title: "下载中",
        mask: true,
      });
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
        complete: () => {
          uni.hideLoading();
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
  padding-bottom: 150rpx;
  .payment-row {
    display: flex;
    align-items: center;
    flex: 1;

    .info-value {
      color: #182855;
      font-size: 28rpx;
      font-weight: 600;
      margin-right: 20rpx;
    }

    .invoice-btn {
      height: 56rpx;
      line-height: 56rpx;
      padding: 0 24rpx;
      background: #2969ff;
      border-radius: 28rpx;
      color: #ffffff;
      font-size: 24rpx;
      font-weight: 400;
      border: none;
      min-width: 120rpx;

      &::after {
        border: none;
      }
    }
  }
  .info-list {
    margin: 24rpx 32rpx;
    border-radius: 24rpx;
    background: #ffffff;
    padding: 15rpx 30rpx;
  }

  .info-item {
    display: flex;
    align-items: center;
    padding: 15rpx 0;

    .info-label {
      color: #666666;
      font-size: 28rpx;
      font-weight: 500;
      min-width: 120rpx;
    }

    .info-value {
      color: #182855;
      font-size: 28rpx;
      font-weight: 600;
      flex: 1;
      word-break: break-all;
    }
  }
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

  .feedback-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40rpx;
    .feedback-badge {
      display: flex;
      align-items: center;
      background: #f0f9ff;
      border: 1rpx solid #ccecff;
      border-radius: 30rpx;
      padding: 10rpx 20rpx;
      margin-bottom: 20rpx;
    }

    .feedback-icon {
      width: 28rpx;
      height: 28rpx;
      margin-right: 10rpx;
    }

    .feedback-text {
      color: #2969ff;
      font-size: 24rpx;
      font-weight: 500;
    }

    .popup-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #2969ff, #2dd4bf);
      border-radius: 30rpx;
      padding: 20rpx 40rpx;
      box-shadow: 0 4rpx 12rpx rgba(41, 105, 255, 0.3);
      transition: all 0.3s ease;
    }

    .popup-btn:active {
      transform: translateY(2rpx);
      box-shadow: 0 2rpx 6rpx rgba(41, 105, 255, 0.2);
    }

    .popup-icon {
      width: 32rpx;
      height: 32rpx;
      margin-right: 12rpx;
    }

    .popup-btn-t2 {
      color: #ffffff;
      font-size: 28rpx;
      font-weight: 500;
      letter-spacing: 1rpx;
    }
  }
}
</style>
