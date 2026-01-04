<template>
  <view class="pages">
    <view class="env" v-if="env == 'test'">
      <text class="env-t">测试环境</text>
    </view>
    
    <!-- 顶部视频展示区域 -->
    <view class="video-showcase">
      <image class="video-bg" src="/static/images/home/video_img.png" mode="aspectFill"></image>
      <view class="video-content">
        <view class="play-btn-wrapper" @click="handleVideoPlay">
          <image class="play-icon" src="/static/images/home/start.png" mode="aspectFit"></image>
        </view>
        <text class="video-text">PRODUCT SHOWCASE</text>
      </view>
    </view>

    <!-- 已开放功能 -->
    <view class="section">
      <view class="section-header">
        <view class="section-line"></view>
        <text class="section-title">已开放功能</text>
      </view>
      <view class="feature-cards">
        <view class="feature-card card-blue" @click="goPage('/subpackage1/bp/index/index')">
          <view class="card-content">
            <text class="card-title">Uni 1.0\nBP诊断Agent</text>
            <text class="card-subtitle">投资人是叫的优化建议</text>
            <view class="card-btn" @click.stop="goPage('/subpackage1/bp/index/index')">
              <text class="btn-text">立即使用</text>
              <image class="btn-icon" src="/static/images/home/huojian.png" mode="aspectFit"></image>
            </view>
          </view>
        </view>
        <view class="feature-card card-orange" @click="goPage('/subpackage1/bp/applyPlay/index')">
          <view class="card-content">
            <text class="card-title">创业导师\n直播连线</text>
            <text class="card-subtitle">30分钟导师深度咨询</text>
            <view class="card-btn" @click.stop="goPage('/subpackage1/bp/applyPlay/index')">
              <text class="btn-text">立即预约</text>
              <image class="btn-icon" src="/static/images/home/rili.png" mode="aspectFit"></image>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 用户反馈 -->
    <view class="feedback-section">
      <text class="feedback-label">——"来自用户的真实反馈"</text>
      <!-- 第一行：向左滚动 -->
      <view class="feedback-row feedback-row-left">
        <view class="feedback-content">
          <view class="feedback-item" v-for="(item, index) in feedbackList" :key="'left-' + index">
            <text class="feedback-text">"{{ item.text }}"</text>
            <text class="feedback-user">——@{{ item.user }}</text>
          </view>
          <!-- 复制一份实现无缝循环 -->
          <view class="feedback-item" v-for="(item, index) in feedbackList" :key="'left-copy-' + index">
            <text class="feedback-text">"{{ item.text }}"</text>
            <text class="feedback-user">——@{{ item.user }}</text>
          </view>
        </view>
      </view>
      <!-- 第二行：向右滚动 -->
      <view class="feedback-row feedback-row-right">
        <view class="feedback-content">
          <view class="feedback-item" v-for="(item, index) in feedbackList" :key="'right-' + index">
            <text class="feedback-text">"{{ item.text }}"</text>
            <text class="feedback-user">——@{{ item.user }}</text>
          </view>
          <!-- 复制一份实现无缝循环 -->
          <view class="feedback-item" v-for="(item, index) in feedbackList" :key="'right-copy-' + index">
            <text class="feedback-text">"{{ item.text }}"</text>
            <text class="feedback-user">——@{{ item.user }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 敬请期待 -->
    <view class="section">
      <view class="section-header">
        <view class="section-line"></view>
        <text class="section-title">敬请期待</text>
      </view>
      <view class="coming-soon-cards">
        <view class="coming-card" v-for="(item, index) in comingSoonList" :key="index">
          <image class="coming-icon" :src="item.icon" mode="aspectFit"></image>
          <text class="coming-text">{{ item.title }}</text>
        </view>
      </view>
    </view>

    <!-- 浮动客服按钮 -->
    <movable-area class="movable-area">
      <movable-view 
        class="customer-service-btn" 
        direction="all"
        :x="serviceBtnX"
        :y="serviceBtnY"
        @click="goCustomerService"
      >
        <image class="service-icon" src="/static/images/home/kefu.png" mode="aspectFit"></image>
      </movable-view>
    </movable-area>
  </view>
</template>

<script>
import { imgUrls } from "@/config/app";
import { getShare } from "@/api/public.js";
import { getShare as getShare2 } from "@/api/gxhc";
import { mapGetters } from "vuex";
export default {
  data: function () {
    return {
      imgUrl: imgUrls,
      shareInfo: {},
      feedbackList: [
        { text: "用了之后导师主动约我!", user: "深空-tech" },
        { text: "BP诊断很专业，帮助很大", user: "创业者A" },
        { text: "导师咨询非常有用", user: "创业者B" },
      ],
      comingSoonList: [
        { icon: "/static/images/home/people.png", title: "导师对练\nAgent" },
        { icon: "/static/images/home/company.png", title: "上市公司服务\nAgent" },
        { icon: "/static/images/home/paper.png", title: "行业研究\nAgent" },
      ],
      serviceBtnX: 0,
      serviceBtnY: 0,
    };
  },
  computed: { ...mapGetters(["uid"]) },
  //#ifdef MP
  onShareAppMessage() {
    let uid = this.uid ? this.uid : 0;
    if (this.shareInfo.img) {
      console.log({
        title: this.shareInfo.title,
        path: "/pages/home/index/index?spid=" + uid,
        imageUrl: this.shareInfo.img,
        desc: this.shareInfo.synopsis,
      });
      return {
        title: this.shareInfo.title,
        path: "/pages/home/index/index?spid=" + uid,
        imageUrl: this.shareInfo.img,
        desc: this.shareInfo.synopsis,
      };
    } else {
      return {
        title: this.shareInfo.title,
        path: "/pages/home/index/index?spid=" + uid,
        // imageUrl: this.shareInfo.img,
        // desc: this.shareInfo.synopsis
      };
    }
  },
  //#endif
  onLoad(options) {
    console.log(options);
    if (options.spid) {
      uni.setStorageSync("SPID", options.spid);
    }
    if (options.scene) {
      uni.setStorageSync("SCENE", options.scene);
    }
    getShare().then((res) => {
      this.shareInfo = res.data;
    });
    if (options.spread || options.spid) {
      getShare2({
        spread: options.spread || options.spid || 0,
      }).then((res) => {
        this.shareInfo = res.data;
      });
    }
    // 初始化客服按钮位置（右下角）
    this.$nextTick(() => {
      const systemInfo = uni.getSystemInfoSync();
      // movable-view 的 x 和 y 单位是 px，需要将 rpx 转换为 px
      const btnWidth = uni.upx2px(120); // 按钮宽度
      const btnHeight = uni.upx2px(120); // 按钮高度
      const rightMargin = uni.upx2px(32); // 右边距
      const bottomMargin = uni.upx2px(200); // 底部距离
      this.serviceBtnX = systemInfo.windowWidth - btnWidth - rightMargin;
      this.serviceBtnY = systemInfo.windowHeight - btnHeight - bottomMargin;
    });
    // if (options.spread) {
    //   uni.setStorageSync("SPID", options.spread);
    //   uni.navigateTo({
    //     url: "/subpackage1/share/index?spread=" + options.spread,
    //   });
    // }
  },
  onShow() {},
  methods: {
    goPage(url) {
      if (
        url == "/subpackage1/bp/index/index" &&
        !this.$store.state.app?.token
      ) {
        uni.navigateTo({
          url: "/pages/mine/login/index",
        });
        return;
      }
      if (!url) {
        return uni.showToast({
          title: "功能开发中，敬请期待",
          icon: "none",
        });
      }
      uni.navigateTo({
        url,
      });
    },
    goCha(type) {
      const url = "https://mp.weixin.qq.com/s/kCbiycoxR5xv5EPjwl7zaA";
      uni.navigateTo({
        url: `/pages/web/index?url=${encodeURIComponent(url)}`,
      });
    },
    handleVideoPlay() {
      // 处理视频播放
      uni.showToast({
        title: "视频播放功能开发中",
        icon: "none",
      });
    },
    goCustomerService() {
      uni.navigateTo({
        url: "/subpackage1/kf/index",
      });
    },
  },
};
</script>

<style>
page {
  background: #ffffff;
  padding-bottom: 200rpx;
}

uni-page-body {
  background: #ffffff;
}
</style>
<style lang="scss" scoped>
.pages {
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 200rpx;
  background: #fff;
  // 环境标识
  .env {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: linear-gradient(90deg, #ff6b6b, #ff8e53);
    padding: 16rpx;
    text-align: center;
    z-index: 9999;
    font-size: 26rpx;
    box-shadow: 0 4rpx 12rpx rgba(255, 107, 107, 0.3);

    .env-t {
      color: #ffffff;
      font-size: 28rpx;
      font-weight: 600;
      text-align: center;
      letter-spacing: 1rpx;
    }
  }

  // 顶部视频展示区域
  .video-showcase {
    height: 400rpx;
    position: relative;
    background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    .video-bg {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    .video-content {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 24rpx;
      z-index: 2;
      position: relative;
    }

    .play-btn-wrapper {
      z-index: 2;

      .play-icon {
        width: 80rpx;
        height: 80rpx;
      }
    }

    .video-text {
      height: 40rpx;
      opacity: 1;
      color: #ffffff;
      text-align: left;
      font-size: 28rpx;
      font-weight: 600;
      font-family: "PingFang SC";
      z-index: 2;
      display: block;
    }
  }

  // 通用区块样式
  .section {
    margin: 60rpx 28rpx 0;
    
    .section-header {
      display: flex;
      align-items: center;
      margin-bottom: 32rpx;

      .section-line {
        width: 8rpx;
        height: 32rpx;
        background: linear-gradient(180deg, #2969ff 0%, #1a56e5 100%);
        border-radius: 4rpx;
        margin-right: 20rpx;
      }

      .section-title {
        font-size: 24rpx;
        color: #596b86;
        font-weight: 600;
      }
    }
  }

  // 已开放功能卡片
  .feature-cards {
    display: flex;
    gap: 24rpx;
    margin-top: 24rpx;

    .feature-card {
      flex: 1;
      min-width: 334rpx;
      height: 420rpx;
      border-radius: 46rpx;
      padding: 32rpx;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
      box-shadow: 0 8rpx 20rpx 0 rgba(0, 0, 0, 0.2);

      &.card-blue {
        background: linear-gradient(155.4deg, #285ee7 0%, #403ccd 100%);
      }

      &.card-orange {
        background: linear-gradient(135.3deg, #fa9336 0%, #f69e0f 100%);
        
        .card-content .card-btn .btn-text {
          color: #ed6712;
        }
      }

      .card-content {
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
        z-index: 2;

        .card-title {
          height: 100rpx;
          opacity: 1;
          color: #ffffff;
          text-align: left;
          font-size: 40rpx;
          font-weight: 600;
          font-family: "PingFang SC";
          line-height: 50rpx;
          display: block;
          white-space: pre-line;
        }

        .card-subtitle {
          height: 30rpx;
          opacity: 1;
          color: #ffffff;
          text-align: left;
          font-size: 24rpx;
          font-weight: 400;
          font-family: "PingFang SC";
          line-height: 30rpx;
          display: block;
          margin-top: 20rpx;
          margin-bottom: 60rpx;
        }

        .card-btn {
          width: 240rpx;
          height: 90rpx;
          border-radius: 18rpx;
          opacity: 1;
          background: #ffffff;
          box-shadow: 0 8rpx 20rpx 0 rgba(16, 26, 134, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8rpx;

          .btn-text {
            width: 96rpx;
            height: 30rpx;
            opacity: 1;
            color: #3f5bda;
            text-align: left;
            font-size: 24rpx;
            font-weight: 600;
            font-family: "PingFang SC";
            line-height: 30rpx;
            display: block;
          }

          .btn-icon {
            width: 60rpx;
            height: 60rpx;
          }
        }
      }
    }
  }

  // 用户反馈区域
  .feedback-section {
    margin: 60rpx 32rpx 0;
    padding-bottom: 20rpx;

    .feedback-label {
      display: block;
      text-align: center;
      font-size: 24rpx;
      color: #999;
      margin-bottom: 24rpx;
    }

    .feedback-row {
      width: 100%;
      overflow: hidden;
      margin-bottom: 10rpx;

      .feedback-content {
        display: flex;
        white-space: nowrap;
        width: fit-content;
        padding: 10rpx;
      }

      &.feedback-row-left .feedback-content {
        animation: scrollLeft 40s linear infinite;
      }

      &.feedback-row-right .feedback-content {
        animation: scrollRight 40s linear infinite;
      }

      .feedback-item {
        display: inline-flex;
        align-items: center;
        padding: 0rpx 18rpx;
        height: 68rpx;
        border-radius: 48rpx;
        opacity: 1;
        background: #ffffff;
        box-shadow: 0 2px 6px 0 #0000001a;
        margin-right: 24rpx;
        min-width: 500rpx;
        flex-shrink: 0;
        gap: 16rpx;

        .feedback-text {
          font-size: 24rpx;
           color: #95a3b8;;
          line-height: 1.6;
          white-space: nowrap;
        }

        .feedback-user {
          font-size: 24rpx;
           color: #95a3b8;;
          white-space: nowrap;
        }
      }
    }
  }

  // 滚动动画
  @keyframes scrollLeft {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  @keyframes scrollRight {
    0% {
      transform: translateX(-50%);
    }
    100% {
      transform: translateX(0);
    }
  }

  // 敬请期待卡片
  .coming-soon-cards {
    display: flex;
    gap: 24rpx;
    margin-top: 24rpx;

    .coming-card {
      flex: 1;
      width: 224rpx;
      height: 244rpx;
      border-radius: 15rpx;
      opacity: 1;
      border: 1px solid #f3f6fa;
      background: #f8fafc;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 32rpx 24rpx;
      box-sizing: border-box;

      .coming-icon {
        width: 80rpx;
        height: 80rpx;
        margin-bottom: 20rpx;
      }

      .coming-text {
        font-size: 24rpx;
        color: #93a2b7;
        text-align: center;
        line-height: 1.6;
        font-weight: 600;
        white-space: pre-line;
      }
    }
  }

  // 可拖动客服按钮区域
  .movable-area {
    position: fixed;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    pointer-events: none;
  }

  // 浮动客服按钮
  .customer-service-btn {
    width: 120rpx;
    height: 120rpx;
    background: linear-gradient(135deg, #2969ff 0%, #1a56e5 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8rpx 24rpx rgba(41, 105, 255, 0.3);
    pointer-events: auto;

    .service-icon {
      width: 120rpx;
      height: 120rpx;
    }
  }
}
</style>
