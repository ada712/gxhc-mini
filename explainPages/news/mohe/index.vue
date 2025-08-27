<template>
  <view class="container">
    <image class="header-image" :src="imgUrl + '/logo/mohelogo.jpg'"></image>
    <view class="title"
      >摩诃脉动2024年发展纪实：技术突破、项目落地与荣誉收获</view
    >
    <view class="content">
      <view class="module">
        <view class="subtitle">技术与产品发展</view>
        <view class="row">
          ●
          个性化AI生成引擎优化：摩诃脉动作为模型驱动的个性化AI生成引擎提供商，致力于结合先进的通用人工智能技术、数据技术、信息融合等技术，在特定场景开展模型训练、微调和推理，进一步开发个性化、可控的、场景化的AGI应用系统，降低模型应用门槛。
        </view>
        <view class="row"
          >●
          拓展应用场景：其研发的个性化AI角色引擎、人工智能专家引擎等模型可控生成技术，在泛娱乐、游戏、品牌等领域不断拓展丰富应用场景，同时也为法律、金融、商业分析等专业领域的智能化转型持续赋能。
        </view>
      </view>

      <view class="module">
        <view class="subtitle">项目与业务拓展</view>
        <view class="row"
          >●
          项目落地徐汇：摩诃脉动项目落地徐汇，致力于打造个性化、有情感的下一代人工智能对话系统。
        </view>
        <view class="row"
          >●
          参与北京国际电影节活动：摩诃脉动参与了第14届北京国际电影节“光影未来”电影科技活动单元。作为人工智能大模型应用公司，摩诃脉动在该活动中展示了其在电影科技领域的应用成果和技术实力，与众多科技企业及影视行业企业共同探讨科技与影视的结合。
        </view>
      </view>

      <view class="module">
        <view class="subtitle">荣誉与认可</view>
        <view class="row"
          >● 一年一度的世界人工智能大会（WAIC）于 7 月 4 日至 7
          日在中国上海举行。摩诃脉动荣幸入选 FutureTech100
          未来之星项目展，并带来最新行业实践和研发成果 ——“摩诃文略”
          大模型（Mohewenlue-7b-v1）。“摩诃文略” 是专注强化 LLM
          法律推理能力的垂类大模型，在权威数据集（LawBench
          数据集）测试中评分大幅超越 GPT-4，领跑法律垂类模型榜单。
        </view>
        <view class="row"
          >● “华为云杯” 2024
          人工智能应用创新大赛，是由华为（苏州）人工智能创新中心、SISPARK（苏州国际科技园）主办，以
          “云聚园区，智享未来”
          为主题，面向全国的人工智能交流赛事。摩诃脉动荣获该大赛企业组二等奖。</view
        >
      </view>

      <view class="module">
        <view class="subtitle">交流与合作 </view>
        <view class="row"
          >参与RTE Open Day活动：摩诃脉动CEO朱亦周参与了RTE Open
          Day活动的圆桌论坛。
        </view>
      </view>
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
  methods: {},
};
</script>

<style lang="scss" scoped>
page {
  box-sizing: border-box;
  padding: 24rpx;
  width: 100%;
}

.container {
  width: 100%;
  box-sizing: border-box;
  padding: 32rpx 24rpx;
  background-color: #ffffff;
  border-radius: 24rpx;
  .header-image {
    width: 100%;
    height: 240rpx;
    margin-bottom: 24rpx;
  }
  .title {
    font-size: 48rpx;
    font-weight: bold;
    margin-bottom: 32rpx;
  }
  .bold {
    font-weight: bold;
  }
  .content {
    width: 100%;
    .module {
      margin-bottom: 40rpx;
      .subtitle {
        font-weight: bold;
        font-size: 32rpx;
        line-height: 48rpx;
        color: #2f3031;
        margin-bottom: 32rpx;
      }
      .row {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 28rpx;
        line-height: 42rpx;
        color: rgba(47, 48, 49, 0.75);
        margin-bottom: 24rpx;
        .circle {
          width: 5rpx;
          height: 5rpx;
          border-radius: 50%;
          background-color: #2f3031;
          margin-right: 10rpx;
        }
      }
    }
  }
}
</style>
