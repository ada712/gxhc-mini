<template>
  <!-- 添加页面初始化加载动画 -->
  <x-load-page v-if="pageLoading" :loadingType="2" />
  <view class="pages" v-else>
    <picker
      mode="selector"
      :range="categories"
      range-key="label"
      :value="currentCategoryIndex"
      @change="onPickerChange"
      ref="picker"
    >
      <view class="cate" @click="showPicker">
        <text class="cate-t">{{ currentCategory.label }}</text>
        <view class="cate-sj"></view>
      </view>
    </picker>
    <view class="content">
      <view
        class="item"
        @click="goPage(item.id, item.target)"
        v-for="(item, key) in list"
        :key="key"
      >
        <view class="top">
          <text class="title">{{ item.filename || "文件未命名" }}</text>
          <view class="more">
            <text
              class="more-t"
              v-if="item.status === 'SUCCEEDED' && item.progress == 100"
              >查看BP详情</text
            >
            <text
              class="more-t2"
              v-else-if="
                ['QUEUED', 'RUNNING'].includes(item.status) &&
                item.progress < 100
              "
              >诊断中</text
            >
            <text
              class="more-t3"
              v-else-if="['FAILED', 'CANCELED'].includes(item.status)"
              >诊断失败</text
            >
            <image
              class="right-icon"
              src="/cloud/miniprogram/images/icons/icon-black-right.png"
            ></image>
          </view>
        </view>
        <text class="time">{{ item.add_time }}</text>
        <view class="bottom" v-if="item.target == 'export_optimization'">
          <text class="order">
            <template v-if="item.order_id">订单号 {{ item.order_id }}</template>
          </text>
          <view class="price">
            <text class="price-t">plus版</text>
            <text class="price-t2" v-if="item.pay_price"
              >-{{ item.pay_price || 0 }}元</text
            >
          </view>
        </view>
      </view>

      <!-- 加载状态提示 -->
      <view class="loading-status" v-if="loading">
        <text>加载中...</text>
      </view>
      <view class="loading-status" v-else-if="noMore">
        <text>没有更多数据了</text>
      </view>
    </view>
  </view>
</template>

<script>
import { getBpResultList } from "@/api/gxhc.js";
import { imgUrls } from "@/config/app";

export default {
  data: function () {
    return {
      list: [],
      page: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      noMore: false,
      // 添加页面加载状态
      pageLoading: true,
      // 筛选相关数据
      currentCategoryIndex: 0,
      currentCategory: {
        value: "",
        label: "BP类型",
      },
      categories: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "export_preliminary",
          label: "Base版",
        },
        {
          value: "export_optimization",
          label: "Plus版",
        },
      ],
      filterType: "", // 当前筛选类型
    };
  },
  onLoad() {
    this.getData();
  },
  onReachBottom() {
    // 触底加载更多
    if (!this.loading && !this.noMore) {
      this.page++;
      this.getData();
    }
  },
  methods: {
    // 显示 picker
    showPicker() {
      // 触发 picker 组件的点击事件
      const pickerElement = this.$refs.picker;
      if (pickerElement && pickerElement.$el) {
        pickerElement.$el.click();
      }
    },

    // picker 选择改变时的回调
    onPickerChange(e) {
      const selectedIndex = e.detail.value;
      this.currentCategoryIndex = selectedIndex;
      this.currentCategory = this.categories[selectedIndex];
      this.filterType = this.currentCategory.value;

      // 重置分页并重新加载数据
      this.page = 1;
      this.list = [];
      this.pageLoading = true;
      this.getData();
    },

    getData() {
      if (this.loading) return;

      this.loading = true;

      // 构造请求参数
      const params = {
        page: this.page,
        limit: this.pageSize,
      };

      // 如果有筛选类型，则添加到参数中
      if (this.filterType) {
        params.type = this.filterType;
      }

      getBpResultList(params)
        .then((res) => {
          this.loading = false;

          if (res.status === 200) {
            const newData = res.data.list || [];
            this.total = res.data.total || 0;

            if (this.page === 1) {
              // 首页加载
              this.list = newData;
              // 首页数据加载完成后，关闭页面加载动画
              this.pageLoading = false;
            } else {
              // 加载更多
              this.list = [...this.list, ...newData];
            }

            // 判断是否还有更多数据
            this.noMore = this.list.length >= this.total;
          } else {
            // 处理错误情况
            uni.showToast({
              title: res.message || "数据加载失败",
              icon: "none",
            });

            // 如果是加载更多时出错，回退页码
            if (this.page > 1) {
              this.page--;
            }
            // 错误时也关闭页面加载动画
            if (this.page === 1) {
              this.pageLoading = false;
            }
          }
        })
        .catch((err) => {
          this.loading = false;

          // 处理异常情况
          uni.showToast({
            title: "网络错误",
            icon: "none",
          });

          // 如果是加载更多时出错，回退页码
          if (this.page > 1) {
            this.page--;
          }
          // 异常时也关闭页面加载动画
          if (this.page === 1) {
            this.pageLoading = false;
          }
        });
    },
    goPage(id, target) {
      uni.navigateTo({
        url: "/subpackage1/bp/detail/index?id=" + id + "&target=" + target,
      });
    },
  },
};
</script>

<style>
page {
  background: #f5f8ff;
  padding-bottom: 40rpx;
}
</style>
<style lang="scss" scoped>
.pages {
  .cate {
    padding: 0 32rpx;
    margin-top: 38rpx;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 10;
    .cate-t {
      color: #323333;
      text-align: right;
      font-size: 28rpx;
      font-weight: 500;
    }
    .cate-sj {
      width: 0;
      height: 0;
      border-left: 8rpx solid transparent;
      border-right: 8rpx solid transparent;
      border-top: 13rpx solid #323333;
      margin-left: 10rpx;
      margin-top: 5rpx;
    }
  }

  // 隐藏 picker 占位元素
  .picker-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .content {
    margin: 24rpx 32rpx;
    border-radius: 28rpx;
    background: #ffffff;
    padding: 6rpx 24rpx;
    .item {
      padding: 30rpx 0 20rpx 0;
      border-bottom: 1px solid #f3f3f3;
      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .order {
          color: #182855;
          text-align: right;
          font-size: 22rpx;
          font-weight: 400;
        }
        .price {
          .price-t {
            color: #2969ff;
            text-align: left;
            font-size: 22rpx;
            font-weight: 600;
          }
          .price-t2 {
            color: #2969ff;
            text-align: left;
            font-size: 22rpx;
            font-weight: 400;
            margin-left: 12rpx;
          }
        }
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
        font-size: 24rpx;
        font-weight: 600;
        display: block;
        width: 70%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .more {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .more-t {
          color: #182855;
          text-align: right;
          font-size: 24rpx;
          font-weight: 400;
          margin-right: 20rpx;
        }
        .more-t2 {
          opacity: 0.8;
          color: #182855;
          font-size: 24rpx;
          font-weight: 400;
          margin-right: 20rpx;
        }
        .more-t3 {
          color: #de252b;
          text-align: right;
          font-size: 24rpx;
          font-weight: 400;
          margin-right: 20rpx;
        }
        .right-icon {
          width: 14.2rpx;
          height: 24.8rpx;
        }
      }
    }
  }

  .loading-status {
    text-align: center;
    padding: 20rpx 0;
    color: #999;
    font-size: 24rpx;
  }
}
</style>
