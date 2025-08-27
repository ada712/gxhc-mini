<template>
  <view class="wripper">
    <view class="list">
      <view
        class="item"
        v-for="(item, key) in list"
        :key="key"
        @click="searchProjectDetail(item)"
      >
        <view class="row-align-center info-row">
          <view class="logo">
            <image :src="item.logo" class="img-logo" />
          </view>
          <view class="info-col">
            <view class="company-title one-sheng">{{ item.name }}</view>
            <view class="brief one-sheng">{{ item.brief }}</view>
          </view>
        </view>
        <view class="row-align-center date-row">
          <view class="date-left"> 项目时间：{{ item.date }} </view>
          <view class="row-align-center date-right">
            <image
              :src="imgUrl + '/icons/icon-gray-right2.png'"
              class="icon-right"
            />
          </view>
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
      list: [
        {
          name: "北京开放传神OpenCSG",
          logo: `${imgUrls}/logo/opencsglogo.jpg`,
          brief:
            "一家致力于人工智能算力算法管理，大模型应用普惠化领域创新的领先企业",
          introduce:
            "开放传神(OpenCSG)成立于2023年，是一家致力于人工智能算力算法管理，大模型应用普惠化领域创新的领先企业。公司致力于大模型生态社区建设，汇集人工智能行业上下游企业链，共同为大模型在垂直行业的应用提供平台产品和解决方案。开放传神不断追求技术突破和产品创新，以满足客户在快速变化的市场中的需求。2024年初，公司发布StarNet(星展)系列产品的最新 Beta 版本，并且对开源开放的大模型生态社区平台传神生态社区做了同步升级。",
          date: "2023-12",
          articlesURL: "https://mp.weixin.qq.com/s/UxUWHOH3aw2OqmHDEfWpmg",
        },
        {
          name: "摩诃脉动",
          logo: `${imgUrls}/logo/mohelogo.jpg`,
          brief: "为企业提供定制化的LLM生成服务",
          introduce:
            "摩诃脉动致力于为企业提供定制化的LLM生成服务，他们依托自研RAG可控优化和角色引擎等技术，为企业提供全面的解决方案。他们的服务涵盖游戏、营销、品牌和专业领域等，提供对话应用的创建平台，包括角色引擎、角色接入和RAG技术。此外，他们还提供企业级API定制服务和角色模型定制，包括模型的微调和训练，以满足客户的特定需求。",
          date: "2024-03",
          articlesURL: "https://mp.weixin.qq.com/s/QG93ccQeDgLg57Oj7QMEzg",
        },
      ],
    };
  },
  methods: {
    searchProjectDetail(item) {
      const { articlesURL } = item;
      if (articlesURL) {
        uni.navigateTo({
          url: "/pages/web/index?url=" + articlesURL,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
page {
  background: #f5f5f5;
}
.wripper {
  width: 100%;
  box-sizing: border-box;
  padding: 24rpx;
  .list {
    width: 100%;
    display: flex;
    flex-direction: column;
    .item {
      width: 100%;
      box-sizing: border-box;
      padding: 0rpx 24rpx;
      display: flex;
      flex-direction: column;
      background-color: #ffffff;
      border-radius: 24rpx;
      margin-bottom: 24rpx;
      .row-align-center {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .info-row {
        width: 100%;
        box-sizing: border-box;
        padding: 24rpx 0;
      }
      .info-col {
        display: flex;
        flex-direction: column;
        width: 78%;
      }
      .one-sheng {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .logo {
        width: 108rpx;
        height: 108rpx;
        background: #f5f5f5;
        border-radius: 10rpx;
        margin-right: 24rpx;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .img-logo {
        width: 107rpx;
        height: 44rpx;
      }
      .company-title {
        font-size: 32rpx;
        color: #2f3031;
        line-height: 48rpx;
        font-weight: bold;
        margin-bottom: 4rpx;
      }
      .brief {
        font-size: 28rpx;
        color: rgba(47, 48, 49, 0.75);
        line-height: 42rpx;
      }
      .date-left {
        font-size: 24rpx;
        color: rgba(47, 48, 49, 0.5);
        line-height: 36rpx;
      }
      .date-row {
        justify-content: space-between;
        border-top: 1rpx solid #f5f5f5;
        box-sizing: border-box;
        padding: 16rpx 0;
      }
      .icon-right {
        width: 13rpx;
        height: 22rpx;
      }
      .date-right {
        justify-content: flex-end;
      }
    }
  }
}
</style>
