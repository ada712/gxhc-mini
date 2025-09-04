<template>
  <view class="pages">
    <view class="card">
      <text class="card-t">您目前已获得能量</text>
      <text class="card-n">5348</text>
      <view class="line">
        <text class="line-t">已邀请</text>
        <text class="line-t">16 位</text>
      </view>
    </view>
    <view class="energy-more" @click="goPage">
      <text class="energy-more-t">积分明细</text>
      <view class="more">
        <text class="more-t">查看明细</text>
        <image
          class="right-icon"
          src="/cloud/miniprogram/images/icons/icon-black-right.png"
        ></image>
      </view>
    </view>
    <view class="tips">
      <text class="tips-t">积分说明</text>
      <text class="tips-p">
        一、“能量”定义与规则
        “能量”是国信合创AI共创理事会小程序内的专属代币。能量可直接用于兑换或抵扣完整版BP诊断报告等指定增值服务。
        能量用途： 能量是平台内重要的兑换凭证，不可提现，亦不可在用户间转赠。
      </text>
      <text class="tips-p">
        二、 如何获取能量？ 目前，您可以通过邀请好友加入我们，轻松获取能量。
        发起邀请：
        在活动页面生成您的专属邀请链接或海报，分享给需要进行BP诊断的好友。
        有效邀请认定：
        您邀请的好友通过您的专属链接成功注册，并完成首次BP上传及基础版诊断后，即视为一次“有效邀请”。
        能量发放： 每成功邀请一位有效好友，系统将自动向您的账户发放 60能量。
      </text>
      <text class="tips-p">
        三、 如何解锁完整版BP诊断报告？
        当您需要获取完整版BP诊断报告（价值299元）时，可在结算页面选择以下任一方式进行解锁：
        方式一：直接支付 您可以选择直接支付299元，解锁完整版报告。
        方式二：能量兑换与抵扣 您可以灵活使用账户中的能量来完成支付。 全额兑换：
        当您的能量账户余额不少于299时，可选择消耗299能量，免费兑换完整版报告。
        组合支付：
        当您的能量不足299时，可选择组合支付。系统将自动用尽您账户内的全部可用能量进行抵扣（抵扣时，1能量等同于1元价值），您仅需支付剩余差额部分即可。
        示例： 您账户中有100能量，在解锁报告时可抵扣100元，您仅需再支付199元。
      </text>
      <text class="tips-p">
        四、 详细规则与条款
        受邀好友必须为未使用过本小程序的新用户，且通过您的专属邀请链接完成指定流程，邀请方可生效。
        “有效邀请”的判定标准以国信合创AI共创理事会系统后台记录为准。
        能量积分长期有效，若未来规则变更，我们将通过平台公告等方式提前通知。
        严禁通过任何作弊、违规或利用系统漏洞等不正当手段获取能量。一经发现，我们有权对违规账户进行处理，包括但不限于清空能量、限制账户功能，乃至封禁账户。
      </text>
      <text class="tips-p">
        本规则的最终解释权在法律允许的范围内归国信合创AI共创理事会所有。
      </text>
    </view>
  </view>
</template>

<script>
import { imgUrls } from "@/config/app";
export default {
  data: function () {
    return {
      imgUrl: imgUrls,
    };
  },
  methods: {
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
  padding-bottom: 80rpx;
  .card {
    margin: 24rpx;
    border-radius: 28rpx;
    overflow: hidden;
    padding-bottom: 46rpx;
    @include bmgOss("/subpackage1/energy-icon.png");
    .card-t {
      color: #404040;
      font-size: 28rpx;
      font-weight: 500;
      margin-left: 24rpx;
      margin-top: 62rpx;
      display: block;
    }
    .card-n {
      color: #000000;
      font-size: 72rpx;
      margin-left: 24rpx;
      margin-top: 4rpx;
      font-weight: 500;
      display: block;
    }
    .line {
      margin: 40rpx 24rpx 0 24rpx;
      border-radius: 28rpx;
      background: #ffffff;
      padding: 28rpx 24rpx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .line-t {
        color: #e96f03;
        font-size: 28rpx;
        font-weight: 500;
      }
    }
  }
  .energy-more {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 28rpx;
    background: #ffffff;
    padding: 20rpx 24rpx;
    margin: 32rpx 24rpx 0 24rpx;
    box-sizing: border-box;
    .energy-more-t {
      color: #182855;
      font-size: 24rpx;
      font-weight: 600;
    }
    .more {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .more-t {
        color: #182855;
        font-size: 24rpx;
        font-weight: 400;
        margin-right: 14rpx;
      }
      .right-icon {
        width: 14.2rpx;
        height: 24.8rpx;
      }
    }
  }
  .tips {
    border-radius: 28rpx;
    background: #ffffff;
    padding: 20rpx 24rpx;
    margin: 32rpx 24rpx 0 24rpx;
    box-sizing: border-box;
    .tips-t {
      color: #182855;
      font-size: 24rpx;
      font-weight: 600;
      display: block;
      margin-bottom: 14rpx;
    }
    .tips-p {
      margin-bottom: 14rpx;
      line-height: 42.4rpx;
      color: #3d3d3d;
      font-size: 24rpx;
      font-weight: 600;
      display: block;
    }
  }
}
</style>
