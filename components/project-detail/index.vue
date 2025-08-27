<template>
  <view class="detail-components">
    <view class="detail-box">
      <view class="row">
        <text class="item-label mr16">项目名称</text>
        <text class="item-value">{{ item.companyName }}</text>
      </view>

      <view class="row">
        <text class="item-label mr16">所属行业</text>
        <text class="item-value">{{ item.industry }}</text>
      </view>
      <view class="row">
        <text class="item-label mr16">申请人</text>
        <text class="item-value">{{ item.name }}</text>
      </view>
      <view class="col">
        <view class="item-label">项目简介</view>
        <view class="item-value">{{ item.projectBrief }}</view>
      </view>
      <view class="row">
        <text class="item-label mr16">成立时间</text>
        <text class="item-value">{{ item.setupDate }}</text>
      </view>
      <view class="col">
        <view class="item-label">商业模式</view>
        <view class="item-value">{{ item.businessModel }}</view>
      </view>
      <view class="col">
        <view class="item-label">市场痛点</view>
        <view class="item-value">{{ item.marketPain }}</view>
      </view>
      <view class="row">
        <text class="item-label mr16">目标市场规模</text>
        <text class="item-value">{{ item.marketSize }} 亿</text>
      </view>
      <view class="col">
        <view class="item-label">市场规模测定依据</view>
        <view class="item-value">{{ item.sizeMeasurement }}</view>
      </view>
      <view class="col">
        <view class="item-label">产品介绍</view>
        <view class="item-value">{{ item.productIntro }}</view>
      </view>
      <view class="col">
        <view class="item-label">对标公司/产品</view>
        <view class="item-value">{{ item.benchmarks }}</view>
      </view>
      <view class="col">
        <view class="item-label">核心竞争力/竞争优势</view>
        <view class="item-value">{{ item.coreCompete }}</view>
      </view>
      <view class="col">
        <view class="item-label">公司业务发展计划</view>
        <view class="item-value">{{ item.businessPlan }}</view>
      </view>
      <view class="col">
        <view class="item-label">公司产品计划</view>
        <view class="item-value">{{ item.productPlan }}</view>
      </view>
      <view class="col">
        <view class="item-label">财务及融资计划</view>
        <view class="item-value">{{ item.financePlan }}</view>
      </view>
      <view class="col">
        <view class="item-label">团队发展计划</view>
        <view class="item-value">{{ item.teamDevPlan }}</view>
      </view>
      <view class="row">
        <text class="item-label mr16">本轮计划估值</text>
        <text class="item-value">{{ item.valuation }} 万</text>
      </view>
      <view class="row">
        <text class="item-label mr16">创始人/发起人是否为公司实际控制人</text>
        <text class="item-value">{{ item.isFounderCtrl ? "是" : "否" }}</text>
      </view>
      <view class="row">
        <text class="item-label mr16">核心技术人员是否为创始团队成员</text>
        <text class="item-value">{{ item.isTechCoreTeam ? "是" : "否" }}</text>
      </view>
      <view class="row">
        <text class="item-label mr16">创始人及核心团队成员是否实际出资</text>
        <text class="item-value">{{ item.isTeamInvested ? "是" : "否" }}</text>
      </view>
      <view class="row">
        <text class="item-label mr16">创始团队合计实际控制股比</text>
        <text class="item-value">{{ item.founderStockRat }}%</text>
      </view>
      <view class="row">
        <text class="item-label mr16">是否曾获得外部投资</text>
        <text class="item-value">{{
          item.isExternalInvest !== "0" ? "是" : "否"
        }}</text>
      </view>
      <view class="col" v-if="item.egInvestBrief">
        <view class="item-label">曾获得外部投资情况</view>
        <view class="item-value">{{ item.egInvestBrief }}</view>
      </view>
      <view class="col">
        <view class="item-label">公司股权结构</view>
        <view class="item-value">{{ item.equityStruct }}</view>
      </view>

      <view class="team-list">
        <view class="team-title">团队介绍</view>
        <view
          class="team-item"
          v-for="(item, index) in item.teamList"
          :key="index"
          wx:for-item="t"
        >
          <view class="team-row">姓名：{{ t.name }}</view>
          <view class="team-row">职位：{{ t.position }}</view>
          <view class="team-row">兼任其他职位：{{ t.partPosition }}</view>
          <view class="team-row">当前职业状态：{{ t.careerStatusName }}</view>
          <view class="team-row"
            >项目参与程度：{{
              t.projInvolvement == "fullTime" ? "全职" : "兼职"
            }}</view
          >
          <view class="team-row"
            >是否为技术型创始人：{{ t.isTechFounder ? "是" : "否" }}</view
          >
          <view class="team-row"
            >是否有过创业经历：{{ t.hasPastStartupExp ? "是" : "否" }}</view
          >
          <view class="team-row"
            >是否有过职场经历：{{ t.isWorkExperience ? "是" : "否" }}</view
          >
          <view class="team-row w100"
            >是否国家实验室/机构工作过：{{
              t.isWorkKeyUnit ? "是" : "否"
            }}</view
          >
          <view class="team-row w100"
            >是否获得国家级学术/技术/人才荣誉或称号：{{
              t.isNationTitle ? "是" : "否"
            }}</view
          >
          <block v-for="(edu, index) in t.educationBg" :key="index">
            <view class="team-row w100"
              >{{ edu.period }}学校：{{ edu.schoolName }}</view
            >
            <view class="team-row w100">专业：{{ edu.major }}</view>
            <view class="team-row w100"
              >就读时间：{{ edu.startDate }}-{{ edu.endDate }}</view
            >
          </block>
          <view class="team-row w100" v-if="item.schoolHonor"
            >在校获得荣誉：{{ item.schoolHonor }}</view
          >
          <block
            v-if="t.workExperiences.length > 0"
            v-for="(work, index) in t.workExperiences"
            wx:for-item="work"
            :key="index"
          >
            <view class="team-row w100">曾经工作单位：{{ work.workUnit }}</view>
            <view class="team-row w100">担任职位：{{ work.position }}</view>
            <view class="team-row w100"
              >工作时间：{{ work.startDate }}-{{ work.endDate }}</view
            >
            <view class="team-row w100" v-if="work.workContent"
              >工作内容：{{ work.workContent }}</view
            >
          </block>
          <block
            v-if="t.practiceExperiences.length > 0"
            v-for="(p, index) in t.practiceExperiences"
            :key="index"
          >
            <view class="team-row w100">实习单位：{{ p.unit }}</view>
            <view class="team-row w100">实习岗位：{{ p.position }}</view>
            <view class="team-row w100"
              >实习时间：{{ p.startDate }}-{{ p.endDate }}</view
            >
            <view class="team-row w100">实习内容：{{ p.content }}</view>
          </block>
          <block v-if="t.honorTitles.length > 0">
            <view class="team-row w100">荣誉或称号名称：</view>
            <view
              class="team-row w100"
              v-for="(title, index) in t.honorTitles"
              wx:key="index"
              >{{ title }}</view
            >
          </block>
        </view>
      </view>

      <view class="col">
        <view class="item-label">需要理事会支持</view>
        <view class="item-value">{{ item.councilSupport }}</view>
      </view>
      <view class="row">
        <text class="item-label mr16">邮箱</text>
        <text class="item-value">{{ item.email }}</text>
      </view>
      <view class="row">
        <text class="item-label mr16">推荐人</text>
        <text class="item-value">{{ item.referrer }}</text>
      </view>
      <view class="row" v-if="item.referrerMobile">
        <text class="item-label">推荐人联系方式</text>
        <text class="item-value">{{ item.referrerMobile }}</text>
      </view>
      <view class="bottom-row">
        <view class="row" v-if="item.createTime">
          <text class="item-label">申请时间</text>
          <text class="item-value">{{ item.createTime }}</text>
        </view>

        <view
          class="search-btn"
          v-if="item.uploadBPPath"
          bind:tap="handleSeeBp"
          >查看BP</view
        >
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    item: {
      type: String,
      default: "",
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.detail-components {
  .detail-box {
    width: 100%;
    font-size: 28rpx;
    line-height: 42rpx;
    .row {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 16rpx;
      .item-label {
        margin-right: 16rpx;
      }
    }
    .item-label {
      color: #2f3031;
    }
    .item-value {
      color: rgba(47, 48, 49, 0.5);
    }
    .col {
      display: flex;
      flex-direction: column;
      margin-bottom: 16rpx;
      .item-label {
        margin-bottom: 16rpx;
      }
    }
  }
  .team-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 24rpx;
    background-color: #f4f4f4;
    border-radius: 24rpx;
    .team-title {
      box-sizing: border-box;
      padding: 24rpx 24rpx 0rpx 24rpx;
      font-size: 28rpx;
      color: #2f3031;
      line-height: 42rpx;
      font-weight: bold;
    }
    .team-item {
      width: 100%;
      box-sizing: border-box;
      padding: 24rpx;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      border-radius: 24rpx;

      .team-row {
        width: 290rpx;
        margin-bottom: 16rpx;
        font-size: 24rpx;
        color: #2f3031;
        line-height: 36rpx;
      }
      .w100 {
        width: 100%;
      }
    }
  }
  .bottom-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-top: 1rpx solid #e5e6e6;
    box-sizing: border-box;
    padding-top: 24rpx;
    .search-btn {
      width: 120rpx;
      height: 52rpx;
      border-radius: 10rpx;
      color: #2969ff;
      border: 1rpx solid #2969ff;
      font-size: 28rpx;
      line-height: 42rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .bold {
    font-weight: bold;
  }
}
</style>
