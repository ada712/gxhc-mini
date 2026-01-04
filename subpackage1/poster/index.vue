<template>
  <view class="poster-container">
    <!-- 顶部固定背景 -->
    <view class="top-bg"></view>
    
    <!-- 海报内容 -->
    <view class="poster-card" id="poster-card">
      <!-- 火箭图标 -->
      <image class="rocket-icon" src="/static/images/paper/huojian.png" mode="aspectFit"></image>
      
      <!-- 标题 -->
      <text class="poster-title">国信合创 Lab</text>
      
      <!-- 副标题 -->
      <text class="poster-subtitle">专业的BP 诊断与融资加速平台</text>
      
      <!-- 邀请码区域 -->
      <view class="invite-code-section">
        <text class="invite-label">邀请码</text>
        <text class="invite-code">{{ inviteCode }}</text>
      </view>
      
      <!-- 二维码区域 -->
      <view class="qr-code-box">
        <zb-code
          ref="qrcode"
          :show="codeShow"
          cid="poster-qrcode"
          :val="qrcodeUrl"
          :size="246"
          :unit="'rpx'"
          :background="'#ffffff'"
          :foreground="'#000000'"
          :pdground="'#000000'"
          :onval="true"
          :loadMake="true"
          @result="qrResult"
        />
      </view>
      <text class="qr-code-tip">扫码加速—开启融资加速</text>
    </view>
    
    <!-- 保存海报按钮 -->
    <view class="save-btn" @click="savePoster">
      <image class="save-icon" src="/static/images/paper/share.png" mode="aspectFit"></image>
      <text class="save-text">保存海报并分享</text>
    </view>
  </view>
</template>

<script>
import { mapGetters } from "vuex";
import zbCode from "@/components/zb-code/zb-code.vue";

export default {
  components: {
    zbCode,
  },
  data() {
    return {
      inviteCode: "LANDFHEACV", // 邀请码，实际应该从接口获取
      codeShow: true,
      qrcodeUrl: "", // 二维码内容，实际应该从接口获取
      qrcodeResult: "", // 二维码生成后的图片地址
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  onLoad() {
    // 获取邀请码和二维码（实际应该调用接口）
    this.getInviteCode();
    // 生成二维码URL（实际应该从接口获取）
    this.qrcodeUrl = `https://your-domain.com/share?code=${this.inviteCode}`;
  },
  methods: {
    getInviteCode() {
      // TODO: 调用接口获取邀请码
      // 这里先使用默认值
    },
    qrResult(res) {
      // 二维码生成完成回调
      this.qrcodeResult = res;
    },
    savePoster() {
      // TODO: 实现保存海报功能
      // 可以使用 canvas 将整个海报绘制并保存
      uni.showToast({
        title: "海报保存功能开发中",
        icon: "none",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
page {
  background: #f8fafc;
}

::v-deep .uni-page-head {
  background: transparent !important;
}

::v-deep .uni-page-head__title {
  color: #000000 !important;
}

::v-deep .uni-page-head__back {
  color: #000000 !important;
}

::v-deep .uni-icon-back {
  color: #000000 !important;
}

::v-deep .uni-page-head__bd {
  background: transparent !important;
}

.poster-container {
  width: 100%;
  min-height: 100vh;
  padding: 40rpx 24rpx;
  padding-bottom: 120rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background: #fff;
}

.top-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 750rpx;
  height: 562rpx;
  opacity: 1;
  background: linear-gradient(180deg, #fdebf6 0%, #f8f5fa 100%);
  z-index: 0;
}

.poster-card {
  width: 700rpx;
  // height: 80vh;
  border-radius: 60rpx;
  opacity: 1;
  background: linear-gradient(180deg, #5541e1 0%, #6b31d8 100%);
  padding: 80rpx 40rpx 60rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);

  .rocket-icon {
    width: 152rpx;
    height: 134rpx;
    margin-bottom: 50rpx;
  }

  .poster-title {
    width: 294rpx;
    height: 60rpx;
    opacity: 1;
    color: #ffffff;
    text-align: center;
    font-size: 48rpx;
    font-weight: 600;
    font-family: "PingFang SC";
    line-height: 60rpx;
    margin-bottom: 30rpx;
    display: block;
  }

  .poster-subtitle {
    width: 492rpx;
    height: 70rpx;
    opacity: 1;
    color: #ffffff;
    text-align: center;
    font-size: 28rpx;
    font-weight: 400;
    font-family: "PingFang SC";
    line-height: 35rpx;
    margin-bottom: 80rpx;
    display: block;
  }

  .invite-code-section {
    width: 100%;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 24rpx;
    padding: 40rpx 32rpx;
    box-sizing: border-box;
    margin-bottom: 60rpx;
    display: flex;
    flex-direction: column;
    align-items: center;

    .invite-label {
      width: 96rpx;
      height: 40rpx;
      opacity: 1;
      color: #ffffff;
      text-align: center;
      font-size: 32rpx;
      font-weight: 600;
      font-family: "PingFang SC";
      line-height: 40rpx;
      margin-bottom: 20rpx;
      display: block;
    }

    .invite-code {
      width: 326rpx;
      height: 60rpx;
      opacity: 1;
      color: #ffffff;
      text-align: left;
      font-size: 48rpx;
      font-weight: 600;
      font-family: "PingFang SC";
      line-height: 60rpx;
      display: block;
    }
  }

  .qr-code-box {
    width: 246rpx;
    height: 246rpx;
    border-radius: 18rpx;
    opacity: 1;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30rpx;
    margin-top: 20rpx;
    padding: 0;
    box-sizing: border-box;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
    overflow: hidden;

    ::v-deep .zb-code-canvas {
      width: 246rpx !important;
      height: 246rpx !important;
      border-radius: 18rpx;
      opacity: 1;
      background: #ffffff;
    }

    ::v-deep image {
      width: 246rpx !important;
      height: 246rpx !important;
      border-radius: 18rpx;
    }
  }

  .qr-code-tip {
    width: 492rpx;
    height: 70rpx;
    opacity: 1;
    color: #ffffff;
    text-align: center;
    font-size: 28rpx;
    font-weight: 400;
    font-family: "PingFang SC";
    line-height: 35rpx;
    display: block;
  }
}

.save-btn {
  width: 702rpx;
  height: 128rpx;
  border-radius: 20rpx;
  opacity: 1;
  background: #0f172a;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  margin-top: 40rpx;
  position: fixed;
  bottom: 40rpx;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;

  .save-icon {
    width: 32rpx;
    height: 32rpx;
  }

  .save-text {
    width: 238rpx;
    height: 50.6rpx;
    opacity: 1;
    color: #ffffff;
    text-align: center;
    font-size: 32rpx;
    font-weight: 700;
    font-family: "Alibaba PuHuiTi 3.0";
    line-height: 50.6rpx;
    display: block;
  }
}
</style>

