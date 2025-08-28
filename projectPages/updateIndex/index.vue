<template>
  <view class="wripper">
    <view class="row-module" @click="goUpdateBp">
      <view class="follow-row">
        <view class="">更新商业计划书（BP）</view>
        <image
          :src="imgUrl + '/icons/icon-gray-right2.png'"
          class="icon-center-right"
        />
      </view>
      <view class="remark"
        >项目成功发起2个月内须向理事会提交完整商业计划书，后续如有更新及时提交至理事会</view
      >
    </view>

    <view class="row-module" @click="handleGoFollow">
      <view class="follow-row">
        <view class="">更新业务/财务报表</view>
        <image
          :src="imgUrl + '/icons/icon-gray-right2.png'"
          class="icon-center-right"
        />
      </view>
      <view class="remark"
        >项目成功发起后每季度向理事会报告业务进展情况，财务报表等</view
      >
    </view>
  </view>
</template>

<script>
import { imgUrls } from "@/config/app";
export default {
  data: function () {
    return {
      item: "",
      imgUrl: imgUrls,
    };
  },
  methods: {
    goUpdateBp() {
      const item = this.item;
      uni.navigateTo({
        url: `/projectPages/updateBP/index?id=${item._id}&companyName=${item.companyName}`,
      });
    },

    handleGoFollow() {
      const item = this.item;
      if (item._id) {
        uni.navigateTo({
          url: `/projectPages/updateFinance/index?id=${item._id}&companyName=${item.companyName}`,
        });
      } else {
        uni.showModal({
          title: "抱歉，您未在理事会发起过项目,无需填写项目跟踪",
          showCancel: false,
          confirmText: "我知道了",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
page {
  background-color: #f5f5f5;
}
.wripper {
  width: 100%;
  box-sizing: border-box;
  padding: 24rpx 24rpx;

  .row-module {
    width: 100%;
    box-sizing: border-box;
    padding: 24rpx;
    border-radius: 24rpx;
    background: #ffffff;
    margin-bottom: 24rpx;
    display: flex;
    flex-direction: column;

    .follow-row {
      width: 100%;
      font-size: 28rpx;
      line-height: 42rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .icon-center-right {
        width: 16rpx;
        height: 26rpx;
      }
    }
    .remark {
      font-size: 24rpx;
      line-height: 36rpx;
      color: rgba(47, 48, 49, 0.75);
      margin-top: 24rpx;
    }
    .bold {
      font-weight: bold;
    }
  }
}
</style>
