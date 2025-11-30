<template>
  <view class="pages">
    <view class="list">
      <view class="item" v-for="(item, index) in list" :key="index">
        <view class="top">
          <image class="icon" :src="item.userInfo.avatar || '/subpackage1/energy-icon.png'" />
          <view class="top-right">
            <view class="top-right-b">
              <text class="ti">{{ item.title }}</text>
              <text class="num">{{ item.number > 0 ? '+' : '' }}{{ item.number }}</text>
            </view>
            <view class="top-right-b">
              <text class="phone">{{ item.userInfo.phone }}</text>
              <text class="ye">能量余额{{ item.balance }}</text>
            </view>
          </view>
        </view>
        <view class="bottom">
          <text class="time">{{ item.add_time }}</text>
          <text class="no" v-if="false">订单编号 {{ item.orderNo }}</text>
        </view>
      </view>
      
      <!-- 加载更多提示 -->
      <view class="loading-tip" v-if="loading">
        <text>加载中...</text>
      </view>
      
      <!-- 没有更多数据提示 -->
      <view class="no-more" v-if="noMoreData && list.length > 0">
        <text>没有更多数据了</text>
      </view>
      
      <!-- 空数据提示 -->
      <view class="empty" v-if="list.length === 0 && !loading">
        <text>暂无能量明细</text>
      </view>
    </view>
  </view>
</template>

<script>
import { imgUrls } from "@/config/app";
import { energyList } from "@/api/gxhc";

export default {
  data: function () {
    return {
      imgUrl: imgUrls,
      list: [],
      page: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      noMoreData: false,
    };
  },
  onLoad(options) {
    if (options.energy) {
      this.energy = options.energy || 0;
    }
    this.getData();
  },
  onReachBottom() {
    // 触底加载更多
    this.loadMore();
  },
  onPullDownRefresh() {
    // 下拉刷新
    this.refresh();
  },
  methods: {
    getData() {
      this.loading = true;
      energyList({
        page: this.page,
        limit: this.pageSize
      })
        .then((res) => {
          this.loading = false;
          uni.stopPullDownRefresh(); // 停止下拉刷新
          
          if (res.status === 200 && res.data) {
            const { list, total } = res.data;
            
            if (this.page === 1) {
              this.list = list;
            } else {
              this.list = [...this.list, ...list];
            }
            
            this.total = total;
            this.noMoreData = this.list.length >= total;
          } else {
            uni.showToast({
              title: "获取能量数据失败",
              icon: "none",
            });
          }
        })
        .catch((error) => {
          this.loading = false;
          uni.stopPullDownRefresh();
          uni.showToast({
            title: "网络错误",
            icon: "none",
          });
          console.error("获取能量数据异常:", error);
        });
    },
    
    // 加载更多
    loadMore() {
      if (this.noMoreData || this.loading) return;
      
      this.page++;
      this.getData();
    },
    
    // 下拉刷新
    refresh() {
      this.page = 1;
      this.noMoreData = false;
      this.getData();
    },
    
    goPage() {
      uni.navigateTo({
        url: "/subpackage1/energy/list/index",
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
  padding-bottom: 100rpx;
  .list {
    margin: 24rpx;

    .item {
      padding: 22rpx 32rpx;
      box-sizing: border-box;
      border-radius: 28rpx;
      background-color: #fff;
      margin-bottom: 24rpx;
      .top {
        display: flex;
        border-bottom: 2rpx solid #f5f8ff;
        padding-bottom: 8rpx;
        margin-bottom: 10rpx;
        .icon {
          width: 60rpx;
          height: 60rpx;
          border-radius: 50%;
        }
        .top-right {
          margin-left: 24rpx;
          flex: 1;
          .top-right-b {
            display: flex;
            align-items: center;
            justify-content: space-between;
            &:last-child {
              margin-top: 8rpx;
            }
            .ti {
              color: #27282a;
              font-size: 28rpx;
              font-weight: 400;
            }
            .num {
              color: #1b2132;
              font-size: 32rpx;
              font-weight: 500;
            }
            .phone {
              color: #979797;
              font-size: 24rpx;
              font-weight: 400;
            }
            .ye {
              color: #979797;
              font-size: 24rpx;
              font-weight: 400;
            }
          }
        }
      }
      .bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .time {
          color: #979797;
          font-size: 24rpx;
          font-weight: 400;
        }
        .no {
          color: #979797;
          font-size: 24rpx;
          font-weight: 400;
        }
      }
    }
  }
  
  // 加载提示样式
  .loading-tip {
    text-align: center;
    padding: 20rpx;
    color: #999;
  }
  
  // 没有更多数据样式
  .no-more {
    text-align: center;
    padding: 20rpx;
    color: #999;
  }
  
  // 空数据样式
  .empty {
    text-align: center;
    padding: 100rpx 20rpx;
    color: #999;
  }
}
</style>