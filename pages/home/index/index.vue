<template>
  <view class="pages">
    <view class="env" v-if="env == 'test'">
      <text class="env-t">测试环境</text>
    </view>
    <view class="video">
      <image class="video-bg" :src="imgUrl + '/index/video_bg.png'"></image>
      <image class="play-btn" :src="imgUrl + '/index/play_btn.png'"></image>
    </view>
    <view class="introduce">
      <view
        class="introduce-item"
        @click="goPage('/pages/home/introduce/index')"
      >
        <image class="int-icon" :src="imgUrl + '/index/int_icon1.png'" />
        <view class="introduce-info">
          <view class="int-t">
            <text>基金矩阵介绍</text>
            <view class="int-more">
              <text class="int-m-t">前往了解</text>
              <image
                class="right-icon"
                :src="imgUrl + '/index/icon_right_lan.png'"
              />
            </view>
          </view>
          <view class="int-b">
            <text class="int-b-t"
              >汇聚多元资本力量，构建产业升级新矩阵，驱动经济高质量发展新引擎</text
            >
          </view>
        </view>
      </view>
      <view class="introduce-item" @click="goCha">
        <image class="int-icon" :src="imgUrl + '/index/int_icon2.png'" />
        <view class="introduce-info">
          <view class="int-t">
            <text>理事会介绍</text>
            <view class="int-more">
              <text class="int-m-t">前往了解</text>
              <image
                class="right-icon"
                :src="imgUrl + '/index/icon_right_lan.png'"
              />
            </view>
          </view>
          <view class="int-b">
            <text class="int-b-t"
              >以孵化人工智能初创项目为主要目标的非盈利组织</text
            >
          </view>
        </view>
      </view>
    </view>
    <view class="report">
      <text class="title">AI创诊报告</text>
      <view class="report-list">
        <view
          class="report-item"
          @click="goPage('/subpackage1/bp/index/index')"
        >
          <text class="report-t">BP一键诊断</text>
          <view class="report-ts">
            <text class="report-t1">创业者专属！</text>
            <text class="report-t1"> 精准拆解短板</text>
          </view>
        </view>
        <view class="report-item gray" @click="goPage('')">
          <text class="report-t">投资分析Agent</text>
          <view class="report-ts">
            <text class="report-t1">金融从业者专属</text>
            <text class="report-t1"> 全维度市场分析</text>
          </view>
          <image class="report-icon" :src="imgUrl + '/index/qd.png'" />
        </view>
      </view>
    </view>
    <view class="invest">
      <text class="title">智能投顾助手</text>
      <view class="invest-list">
        <view class="invest-item">
          <image class="invest-icon" :src="imgUrl + '/index/gw_icon1.png'" />
          <text class="invest-t">上市公司服务AI</text>
          <text class="invest-d">暂未开放 敬请期待</text>
        </view>
        <view class="invest-item">
          <image class="invest-icon" :src="imgUrl + '/index/gw_icon2.png'" />
          <text class="invest-t">行业研究AI</text>
          <text class="invest-d">暂未开放 敬请期待</text>
        </view>
        <view class="invest-item">
          <image class="invest-icon" :src="imgUrl + '/index/gw_icon3.png'" />
          <text class="invest-t">专家BOT</text>
          <text class="invest-d">暂未开放 敬请期待</text>
        </view>
      </view>
    </view>
    <view class="media">
      <image class="media-bd" :src="imgUrl + '/index/xmt_bj.png'" />
      <view class="media-t">
        <text class="media-t1">新媒体赋能</text>
        <text class="media-t2">智媒破界，赋能新生</text>
        <text class="media-t3" v-if="false">去查看</text>
      </view>
    </view>
  </view>
</template>

<script>
import { imgUrls, env } from "@/config/app";
import { getShare } from "@/api/public.js";
import { getShare as getShare2 } from "@/api/gxhc";
import { mapGetters } from "vuex";
export default {
  data: function () {
    return {
      env: env,
      imgUrl: imgUrls,
      shareInfo: {},
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
  },
};
</script>

<style>
page {
  background: #f5f8ff;
  padding-bottom: 100rpx;
}
</style>
<style lang="scss" scoped>
.pages {
  width: 100%;
  box-sizing: border-box;
  // 环境标识优化
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
  .title {
    color: #182855;
    font-size: 24rpx;
    font-weight: 600;
  }
  .video {
    height: 412rpx;
    position: relative;
    .video-bg {
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    .play-btn {
      width: 80rpx;
      height: 80rpx;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 2;
    }
  }
  .introduce {
    position: relative;
    z-index: 3;
    margin: -30rpx 24rpx 0 24rpx;
    border-radius: 28rpx;
    background: #ffffff;
    padding: 32rpx 36rpx;
    .introduce-item {
      display: flex;
      &:first-child {
        margin-bottom: 30rpx;
      }
      .int-icon {
        width: 160rpx;
        height: 160rpx;
        flex-shrink: 0;
      }
      .introduce-info {
        margin-left: 50rpx;
        .int-t {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 26rpx;
        }
        .int-b {
          background: #f4faff;
          border-radius: 8rpx;
          padding: 12rpx 20rpx;
          .int-b-t {
            color: #60738e;
            font-size: 22rpx;
            font-weight: 400;
          }
        }
        .int-more {
          display: flex;
          align-items: center;
          .int-m-t {
            font-size: 24rpx;
            font-weight: 400;
            color: #bfc3cf;
          }
          .right-icon {
            width: 48rpx;
            height: 48rpx;
          }
        }
      }
    }
  }
  .report {
    border-radius: 28rpx;
    background: #ffffff;
    margin: 24rpx 24rpx 0 24rpx;
    padding: 34rpx 24rpx;
    .report-list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 24rpx;
    }
    .report-item {
      width: 316rpx;
      height: 182rpx;
      border-radius: 20rpx;
      padding: 0 18rpx;
      overflow: hidden;
      box-sizing: border-box;
      position: relative;
      @include bmgOss("/index/ai_bj2.png");
      &:last-child {
        @include bmgOss("/index/ai_bj11.png");
      }
      .report-icon {
        width: 126rpx;
        height: 34rpx;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 1;
      }
      .report-t {
        color: #ffffff;
        display: inline-block;
        text-align: center;
        font-size: 28rpx;
        font-weight: 500;
        margin-top: 22rpx;
      }
      .report-ts {
        margin-top: 30rpx;
        .report-t1 {
          display: block;
          color: #ffffff;
          text-align: left;
          font-size: 24rpx;
          font-weight: 300;
        }
      }
    }
  }
  .invest {
    border-radius: 28rpx;
    background: #ffffff;
    margin: 24rpx 24rpx 0 24rpx;
    padding: 34rpx 24rpx;
    .invest-list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 32rpx;
      .invest-item {
        .invest-icon {
          width: 88rpx;
          height: 88rpx;
          margin: 0 auto;
          display: block;
        }
        .invest-t {
          margin-top: 14rpx;
          display: block;
          text-align: center;
          color: #404040;
          font-size: 24rpx;
          font-weight: 400;
        }
        .invest-d {
          margin-top: 8rpx;
          display: block;
          opacity: 0.4;
          text-align: center;
          color: #de252b;
          font-size: 22rpx;
          font-weight: 400;
        }
      }
    }
  }
  .media {
    margin: 24rpx 24rpx 0 24rpx;
    position: relative;
    height: 100rpx;
    display: flex;
    align-items: center;
    .media-bd {
      width: 100%;
      height: 100%;
      border-radius: 28rpx;
      position: absolute;
      left: 0;
      z-index: 1;
    }
    .media-t {
      padding: 0rpx 24rpx;
      position: relative;
      z-index: 2;
      flex: 1;
      display: flex;
      align-items: center;
      .media-t1 {
        color: #ffffff;
        font-size: 28rpx;
        font-weight: 500;
      }
      .media-t2 {
        color: #ffffff;
        font-size: 27rpx;
        font-weight: 300;
        margin-left: 14rpx;
      }
      .media-t3 {
        width: 122rpx;
        height: 56rpx;
        border-radius: 290rpx;
        opacity: 1;
        background: #fc780c;
        color: #ffffff;
        text-align: center;
        line-height: 56rpx;
        margin-left: auto;
        font-size: 24rpx;
        font-weight: 400;
        display: inline-block;
      }
    }
  }
}
</style>
