<template>
  <view class="wripper">
    <view class="content">
      <view class="col fen-card">
        <view class="col">
          <view class="score">{{ totalPoint }}</view>
          <view class="title">我的积分</view>
        </view>
        <view class="row system-row" @click="goRulePage"
          >积分管理制度
          <image
            :src="imgPath + '/icons/icon-write-info.png'"
            class="icon-info"
          />
        </view>
      </view>

      <view class="row title-row">
        <view class="row left">
          <view class="title-line"></view>
          <view class="title-txt">积分明细</view>
        </view>
        <view class="row right" @click="goObtainPage">
          积分获取方式
          <image
            :src="imgPath + '/icons/icon-black-right.png'"
            class="icon-right"
          />
        </view>
      </view>
      <view class="list">
        <view class="item" v-for="(item, key) in pointDetails" :key="key">
          <view class="col w75">
            <view class="describe">{{ item.title }}</view>
            <view class="desc" v-if="false">{{ item.mark }}</view>
            <view class="time">发生时间：{{ item.add_time }}</view>
          </view>
          <view class="score {{item.isMinus?'minus':'plus'}}">
            <block v-if="item.pm">+</block>
            {{ item.number }}
          </view>
        </view>
      </view>

      <view class="col empty-box" v-if="pointDetails.length == 0">
        <image :src="imgPath + '/index/img-no-data.png'" class="img-no-data" />
        <view class="subtitle">暂未产生贡献值无积分</view>
        <view class="row other-txt">
          了解<text class="special" @click="goObtainPage">积分获取方式</text
          >，赚取积分吧
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getUserInfo, getIntegralList } from "@/api/user.js";
import { imgUrls } from "@/config/app";
export default {
  data: function () {
    return {
      imgPath: imgUrls,
      totalPoint: 0,
      page: 1,
      limit: 10,
      loadend: false,
      loading: false,
      loadTitle: `加载更多`,
      pointDetails: [],
    };
  },
  onLoad() {
    this.getUserInfo();
    this.getIntegralList();
  },
  onReachBottom: function () {
    this.getIntegralList();
  },
  methods: {
    getUserInfo() {
      getUserInfo().then((res) => {
        this.totalPoint = res.data.integral;
      });
    },
    /**
     * 获取积分明细
     */
    getIntegralList() {
      if (this.loading) return;
      if (this.loadend) return;
      this.loading = true;
      this.loadTitle = "";
      getIntegralList({
        page: this.page,
        limit: this.limit,
      }).then((res)  => {
          let list = res.data,
            loadend = list.length < this.limit;
          this.pointDetails = this.$util.SplitArray(list, this.pointDetails);
          this.page = this.page + 1;
          this.loading = false;
          this.loadend = loadend;
          this.loadTitle = loadend ? `我也是有底线的` : `加载更多`;
        },
        (res) => {
          this.loading = false;
          this.loadTitle = `加载更多`;
        }
      );
    },
    handleNavigation(url) {
      uni.navigateTo({
        url: `${url}`,
      });
    },
    goRulePage() {
      this.handleNavigation("/explainPages/points/ruleState/index");
    },
    goObtainPage() {
      this.handleNavigation("/explainPages/points/obtain/index");
    },
  },
};
</script>

<style lang="scss" scoped>
page {
  background: #f4f4f4;
}
.wripper {
  width: 100%;
  box-sizing: border-box;
  padding: 24rpx;
}
.col {
  display: flex;
  flex-direction: column;
}
.row {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.fen-card {
  width: 100%;
  height: 200rpx;
  border-radius: 24rpx;
  color: #ffffff;
  position: relative;
  background-color: #1d89ff;
  box-sizing: border-box;
  padding: 40rpx 24rpx 0rpx 40rpx;
  display: flex;
  flex-direction: row;
  .score {
    font-weight: bold;
    font-size: 72rpx;
    line-height: 80rpx;
  }
  .title {
    font-size: 24rpx;
    line-height: 36rpx;
    margin-top: 8rpx;
  }
  .system-row {
    font-size: 28rpx;
    line-height: 42rpx;
    position: absolute;
    top: 40rpx;
    right: 24rpx;
    .icon-info {
      width: 24rpx;
      height: 24rpx;
      margin-left: 8rpx;
    }
  }
}
.title-row {
  width: 100%;
  box-sizing: border-box;
  padding: 24rpx 0;
  justify-content: space-between;
  .title-line {
    width: 6rpx;
    height: 32rpx;
    background: #2969ff;
    border-radius: 4rpx;
    margin-right: 16rpx;
  }
  .title-txt {
    font-weight: bold;
    font-size: 34rpx;
    color: #2f3031;
    line-height: 52rpx;
  }
  .right {
    font-size: 24rpx;
    color: #2f3031;
    line-height: 36rpx;
    .icon-right {
      width: 14rpx;
      height: 22rpx;
      margin-top: 2rpx;
      margin-left: 8rpx;
    }
  }
}
.list {
  width: 100%;
  display: flex;
  flex-direction: column;
  .item {
    width: 100%;
    background: #ffffff;
    border-radius: 24rpx;
    box-sizing: border-box;
    padding: 24rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24rpx;

    .describe {
      font-size: 32rpx;
      font-weight: bold;
      color: #2f3031;
      line-height: 48rpx;
      margin-bottom: 8rpx;
    }
    .desc {
      font-size: 24rpx;
      color: rgba(47, 48, 49, 0.75);
      line-height: 36rpx;
      margin-bottom: 10rpx;
    }
    .time {
      font-size: 24rpx;
      color: rgba(47, 48, 49, 0.5);
      line-height: 36rpx;
    }
    .score {
      font-size: 34rpx;
      font-weight: bold;
      line-height: 52rpx;
    }
    .plus {
      color: #0d73f3;
    }
    .minus {
      color: red;
    }
  }
  .w75 {
    width: 75%;
  }
}
.empty-box {
  width: 100%;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding-top: 120rpx;
  .img-no-data {
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 40rpx;
  }
  .subtitle {
    font-size: 32rpx;
    color: #2f3031;
    line-height: 48rpx;
    font-weight: bold;
    margin-bottom: 12rpx;
  }
  .other-txt {
    font-size: 28rpx;
    color: rgba(47, 48, 49, 0.5);
    line-height: 42rpx;
  }
  .special {
    color: #2969ff;
    text-decoration: underline;
  }
}
</style>
