<template>
  <view class="wripper">
    <view class="same-box">
      <view class="title-row">
        <image :src="imgPath+'/icons/icon-jf.png'" class="icon-jf" />
        <view class="bigtitle">积分制度的解释</view>
      </view>
      <view class="row"
        >国信合创（CHA）人工智能共创理事会的积分制度是一种公平的资源共享、利益共享和去中心化的机构合作机制。它基于“谁贡献、谁获得”的理念，为所有参与理事会“共建”的伙伴（无论是公司还是个人）提供积分发放。</view
      >
    </view>

    <view class="same-box">
      <view class="title-row">
        <image :src="imgPath+'/icons/icon-jf.png'" class="icon-jf" />
        <view class="bigtitle">积分对应权益</view>
      </view>
      <view class="row"
        >这些积分代表了理事会发起项目的部分股权收益权，包括股权增值收益和分红收益等权益，归全体积分持有者所有。</view
      >
    </view>

    <view class="same-box">
      <view class="title-row">
        <image :src="imgPath+'/icons/icon-jf.png'" class="icon-jf" />
        <view class="bigtitle">积分获取</view>
      </view>
      <view class="row"
        >1、您可以选择承担理事会的职务，我们将根据下表中的标准为您发放积分，同时理事会每年还会有额外的突出贡献积分奖励。</view
      >
      <view class="table">
        <view class="tr">
          <view class="td th solidr">职务</view>
          <view class="td th">积分发放数量/每人/年</view>
        </view>
        <view class="tr">
          <view class="td solidr">名誉理事长</view>
          <view class="td">500</view>
        </view>
        <view class="tr">
          <view class="td solidr">理事长</view>
          <view class="td">300</view>
        </view>
        <view class="tr">
          <view class="td solidr">常务理事</view>
          <view class="td">250</view>
        </view>
        <view class="tr">
          <view class="td solidr">秘书长</view>
          <view class="td">150</view>
        </view>
        <view class="tr">
          <view class="td solidr">理事会秘书</view>
          <view class="td">100</view>
        </view>
      </view>

      <view class="row mb24"
        >2、您可以选择积极参与理事会各项事务，我们将根据以下标准发放积分（具体事务开展根据当年实际情况发放积分）。</view
      >
      <view class="table">
        <view class="tr">
          <view class="td th solidr">事务类型</view>
          <view class="td th">积分发放数量/每人</view>
        </view>
        <view class="tr">
          <view class="td solidr">参加项目竞赛担任评委</view>
          <view class="td">30</view>
        </view>
        <view class="tr">
          <view class="td solidr">参加理事会论坛担任嘉宾</view>
          <view class="td">10</view>
        </view>
        <view class="tr">
          <view class="td solidr">参加理事会制度研讨会</view>
          <view class="td">10</view>
        </view>
        <view class="tr">
          <view class="td solidr">参加理事会事务工作评审</view>
          <view class="td">10</view>
        </view>
        <view class="tr">
          <view class="td solidr">参加理事会品牌宣传活动</view>
          <view class="td">20</view>
        </view>
      </view>

      <view class="row mb24"
        >3、您可以推荐项目在理事会进行孵化，项目发起成功且理事会顺利投资完成将对推荐人进行积分奖励，积分发放原则如下：</view
      >

      <view class="table">
        <view class="tr">
          <view class="td th solidr">项目情况</view>
          <view class="td th">积分发放数量</view>
        </view>
        <view class="tr">
          <view class="td solidr">成功发起</view>
          <view class="td">200</view>
        </view>
        <view class="tr">
          <view class="td solidr">落地理事会合作产业园</view>
          <view class="td">50</view>
        </view>
      </view>
      <view class="row"
        >成功发起项目后，获得理事会投资股比对应的积分情况：</view
      >
      <view class="table">
        <view class="tr">
          <view class="td th solidr">获得理事会投资股比</view>
          <view class="td th">积分</view>
        </view>
        <view class="tr">
          <view class="td solidr">3%-6%</view>
          <view class="td">100</view>
        </view>
        <view class="tr">
          <view class="td solidr">6%-10%</view>
          <view class="td">150</view>
        </view>
        <view class="tr">
          <view class="td solidr">>10%</view>
          <view class="td">250</view>
        </view>
      </view>

      <view class="row"
        >4、如果您是理事会的机构合作伙伴，每年理事会将从当年未发放积分中留存部分积分作为下一年理事会合作伙伴积分奖励池，将按季度根据合作伙伴贡献程度，确定奖励对象和具体积分数额。</view
      >
    </view>

    <view class="same-box">
      <view class="title-row">
        <image :src="imgPath+'/icons/icon-jf.png'" class="icon-jf" />
        <view class="bigtitle">积分发放的时间</view>
      </view>
      <view class="row"
        >理事会积分发放日为每年11月30日。理事会将对积分持有者开设专门的积分账户，每年11月30日理事会会将积分发放至积分账户中。</view
      >
    </view>
    <view class="same-box">
      <view class="title-row">
        <image :src="imgPath+'/icons/icon-jf.png'" class="icon-jf" />
        <view class="bigtitle">积分的兑换</view>
      </view>
      <view class="row"
        >当理事会孵化的项目成功退出（如通过收购、上市或其他方式）或分红，且产生现金收益时，将启动积分兑换程序。积分兑换日为当年12月31日</view
      >
    </view>
  </view>
</template>

<script>
import { imgUrls } from "@/config/app";
export default {
  data: function () {
    return {
      imgPath: imgUrls,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.wripper {
  width: 100%;
  box-sizing: border-box;
  padding: 24rpx;
  .same-box {
    width: 100%;
    background-color: #ffffff;
    border-radius: 24rpx;
    box-sizing: border-box;
    padding: 24rpx;
    margin-bottom: 24rpx;
  }

  .row {
    font-size: 28rpx;
    color: rgba(47, 48, 49, 0.75);
    line-height: 42rpx;
  }
  .subtitle {
    font-size: 28rpx;
    font-weight: bold;
    color: #2f3031;
    line-height: 42rpx;
    margin-bottom: 10rpx;
  }
  .title-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 24rpx;
    .icon-jf {
      width: 28rpx;
      height: 28rpx;
      margin-right: 12rpx;
    }
  }
  .bigtitle {
    font-size: 32rpx;
    font-weight: bold;
    color: #2f3031;
    line-height: 48rpx;
  }
  .mb24 {
    margin-bottom: 24rpx;
  }

  .table {
    width: 100%;
    border: 1rpx solid #f4f4f4;
    margin-top: 24rpx;
    margin-bottom: 24rpx;
    .tr {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height: 80rpx;
    }
    .tr:nth-child(2n-1) {
      background-color: #f4f4f4;
    }
    .td {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28rpx;
      color: rgba(47, 48, 49, 0.75);
      line-height: 42rpx;
      width: 50%;
      height: 80%;
    }
    .th {
      color: #2f3031;
      font-weight: bold;
    }
    .solidr {
      border-right: 1rpx solid #f4f4f4;
    }
    .w50 {
      width: 50%;
    }
  }
}
</style>
