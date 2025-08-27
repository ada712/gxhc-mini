<template>
  <view class="project-list">
    <view class="head">
      <view class="nav-tab">
        <view
          class="nav-tab-item"
          :class="{ 'active-tab': activeTab === item.code }"
          v-for="(item, code) in tabList"
          :key="code"
          @click="onChangeTab"
          data-code="{{item.code}}"
        >
          {{ item.name }}
          <view class="tab-line" :hidden="activeTab !== item.code"></view>
        </view>
      </view>

      <view class="search-box">
        <view class="search-module">
          <image
            :src="imgUrl + '/icons/icon-search-gray.png'"
            class="icon-search"
          />
          <input
            type="text"
            class="search-input"
            placeholder="输入项目名/申请人搜索"
            placeholder-style="color: rgba(47,48,49,0.3);"
            maxlength="20"
            :value="searchKeyword"
            bindinput="handelInputSearch"
          />
        </view>
      </view>
    </view>

    <scroll-view
      class="list"
      scroll-y="true"
      scroll-x="false"
      v-if="list.length > 0"
    >
      <view class="item" v-for="(item, key) in list" :key="key">
        <view
          class="item-title"
          @click="searchProjectDeatil(item)"
        >
          <view class="item-title-left">
            <image
              :src="imgUrl + '/icons/icon_xiangmu.png'"
              class="icon-project"
            />
            <view class="project-title">{{ item.industry }}</view>
          </view>

          <view class="item-title-right" v-if="activeTab !== 'fail'">
            <view class="score">{{ item.totalScore }}</view>
            <text class="unit gray5">分</text>
          </view>
        </view>
        <view
          class="item-middle"
          @click="searchProjectDeatil(item)"
        >
          <view class="same-row middle-row black" v-if="activeTab == 'fail'">
            项目名称：{{ item.companyName }}
          </view>
          <view class="same-row middle-row black" v-else>
            项目名称：{{ item.companyName }}
          </view>

          <view class="same-row middle-row">
            <view class="same-row w60">
              <text class="item-label">项目状态：</text>
              <text class="black bold">{{ item.statusName }}</text>
            </view>
            <view class="right-row">
              <text class="item-label">成立时间：</text>
              <text class="gray5">{{ item.setupDate }}</text>
            </view>
          </view>

          <view class="same-row middle-row">
            <view class="same-row w60">
              <text class="item-label">目标市场规模：</text>
              <text class="gray5">{{ item.marketSize }}亿</text>
            </view>
            <view class="right-row">
              <text class="item-label">本轮计划估值：</text>
              <text class="gray5">{{ item.valuation }}万</text>
            </view>
          </view>
          <view class="same-row middle-row">
            <view class="same-row w60">
              <text class="item-label">申请人：</text>
              <text class="gray5">{{ item.name }}</text>
            </view>
            <view class="right-row" v-if="activeTab == 'fail'">
              <text class="item-label">项目得分：</text>
              <text class="gray5">{{ item.totalScore }}分</text>
            </view>
          </view>
          <view class="same-row middle-row between">
            <view class="same-row">
              <text class="item-label">申请时间：</text>
              <text class="gray5">{{ item.createTime }}</text>
            </view>

            <image
              :src="imgUrl + '/icons/icon-gray-right2.png'"
              class="icon-right"
            />
          </view>
        </view>
        <view class="item-bottom">
          <view class="same-btn" @click="goMobileMessage">发送短信</view>
          <view
            class="same-btn"
            @click="goSendNotice"
            data-openid="{{item.openid}}"
            >推送站内信</view
          >
          <block v-if="item.projectStatus == 'investPass'">
            <view class="same-btn" @click="goSupplyInfo" data-id="{{item._id}}"
              >补充项目信息</view
            >
          </block>
        </view>
        <image
          :src="imgUrl + '/icons/img-not-pass.png'"
          class="img-not-pass"
          v-if="activeTab == 'fail'"
        />
      </view>

      <view class="empty-show" v-if="list.length == 0">暂无数据</view>
    </scroll-view>

    <fixed-bg v-if="maskHidden" bindcloseFixedbg="handleCloseFixedbg" />
    <view class="mask-content" v-if="maskHidden">
      <view class="mask-head">
        <view class="head-title">发送站内消息</view>
        <view class="head-close" @click="handleCloseFixedbg">
          <image
            :src="imgUrl + '/icons/icon-close-gray.png'"
            class="icon-close"
          />
        </view>
      </view>
      <view class="input-module">
        <textarea
          class="textarea"
          placeholder="请输入..."
          maxlength="300"
          :value="noticeText"
          bindinput="handleInputNotice"
        ></textarea>
        <view class="count-font">{{ noticeText.length }}/200</view>
      </view>
      <view class="btn-row">
        <view class="same-btn cancle" @click="handleCancleNotice">取消</view>
        <view class="same-btn send" @click="handleSendMessageNotice">发送</view>
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
      tabList: [
        { code: "", name: "全部" },
        { code: "above", name: "大于50分" },
        { code: "below", name: "未通过" },
      ],
      activeTab: "above",
      list: [
        {
          _id: "073a77ac6805e84e019045964f3f5195",
          bizPlan: "",
          businessModel: "测试",
          businessPlan: "测试",
          companyBrief: "测试1",
          companyName: "测试1",
          coreCompete: "测试",
          councilSuport2: "",
          councilSupport: "张",
          egInvestBrief: "",
          email: "kk",
          equityStruct: "测试",
          finacialReport: "",
          financePlan: "测试",
          founderStockRat: "80",
          industry: "大模型",
          isCouncilMember: null,
          isExternalInvest: "0",
          isFounderCtrl: true,
          isTeamInvested: true,
          isTechCoreTeam: true,
          latestBusines: "",
          marketPain: "测试",
          marketSize: "100",
          mobile: "18968",
          name: "z",
          other: "",
          productIntro: "",
          productPlan: "测试",
          projectBrief: "测试",
          projectStatus: "examining",
          referrer: "测试",
          referrerMobile: "11",
          setupDate: "2025-04",
          sizeMeasurement: "200",
          teamDevPlan: "测试",
          teamList: [
            {
              achievement: "",
              birthday: "2025-04-21",
              careerStatus: "setuping",
              careerStatusName: "全职创业",
              companyName: "大金你说",
              educationBg: [
                {
                  endDate: "2025-04",
                  id: 1745217454037,
                  major: "游戏",
                  schoolName: "浙江大学",
                  startDate: "2025-04",
                },
              ],
              hasPastStartupExp: "true",
              honorTitles: [],
              id: 1745217473243,
              isNationTitle: "false",
              isTechFounder: "true",
              isWorkExperience: "false",
              isWorkKeyUnit: "false",
              keyUnitContent: "",
              keyUnitName: "",
              name: "张测试",
              partPosition: "CTO",
              position: "CEO",
              practiceExperiences: [],
              projInvolvement: "fullTime",
              schoolHonor: "张",
              unitEndDate: "",
              unitStartDate: "",
              workExperiences: [],
            },
          ],
          uploadBPPath:
            "cloud://prod-cloud-env-9gqq29j68db5f470.7072-prod-cloud-env-9gqq29j68db5f470-1326719267/miniprogram/bp/202504211440-测试1的BP",
          valuation: "100",
          remark: "",
          createdAt: 1745217614543,
          updatedAt: 1745217615167,
          openid: "ou-4N7Ydrc3FSoQypNuIZwNJSsL4",
          unionid: "",
          scoreState:
            "创始团队实际控制股比大于等于80%，记为15分；目标市场规模,100-300亿，记为5分；团队教育背景得分：0；团队商业背景得分：0；团队成员平均年龄小于35岁，记为15分；",
          totalScore: 35,
        },
      ],
      scrollHeight: 0,
      searchKeyword: "",
      maskHidden: false,
      noticeText: "",
    };
  },
  onLoad(options) {},
  methods: {
    searchProjectDeatil(item) {
      const id = item._id;
      uni.navigateTo({
        url: "/pages/project/detail/index?id=" + id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.project-list {
  width: 100%;
  position: relative;
  .head {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    .nav-tab {
      width: 100%;
      height: 88rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      background: #ffffff;
      .nav-tab-item {
        display: flex;
        width: 33%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        font-size: 32rpx;
        color: #2f3031;
        line-height: 48rpx;
      }
      .active-tab {
        font-weight: bold;
      }
      .tab-line {
        width: 48rpx;
        height: 8rpx;
        background: linear-gradient(270deg, #1a9dff 0%, #1a5eff 100%);
        border-radius: 10rpx;
        position: absolute;
        bottom: 4rpx;
      }
    }
    .search-box {
      width: 100%;
      height: 120rpx;
      background: #ffffff;
      box-sizing: border-box;
      padding: 24rpx;
      .search-module {
        display: flex;
        flex-direction: row;
        align-items: center;
        box-sizing: border-box;
        padding-left: 27rpx;
        width: 100%;
        height: 72rpx;
        background: #f4f6f9;
        border-radius: 36rpx;
        .icon-search {
          width: 28rpx;
          height: 28rpx;
        }
        .search-input {
          width: 80%;
          height: 100%;
          box-sizing: border-box;
          padding-left: 10rpx;
          font-size: 28rpx;
          color: #2f3031;
          line-height: 42rpx;
        }
      }
    }
  }
  .list {
    width: 100%;
    box-sizing: border-box;
    padding: 24rpx 24rpx 24rpx 24rpx;

    position: fixed;
    top: 208rpx;
    left: 0;

    .item {
      width: 100%;
      background: #ffffff;
      border-radius: 32rpx;
      box-sizing: border-box;
      padding: 24rpx 32rpx 24rpx 32rpx;
      margin-bottom: 24rpx;
      position: relative;
      .item-title {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .item-title-left {
          display: flex;
          flex-direction: row;
          align-items: center;
          width: 88%;
          .icon-project {
            width: 48rpx;
            height: 48rpx;
            margin-right: 20rpx;
          }
          .project-title {
            width: 446rpx;
            font-size: 32rpx;
            color: #2f3031;
            line-height: 48rpx;
            font-weight: bold;
          }
        }
        .item-title-right {
          display: flex;
          flex-direction: row;
          align-items: center;
          .score {
            color: #2969ff;
            font-size: 32rpx;
            line-height: 48rpx;
            font-weight: bold;
          }
          .unit {
            font-size: 24rpx;
            line-height: 32rpx;
            margin-left: 4rpx;
            margin-top: 5rpx;
          }
        }
      }
      .icon-right {
        width: 13rpx;
        height: 22rpx;
        margin-left: 10rpx;
      }
      .gray5 {
        color: rgba(47, 48, 49, 0.5);
      }
      .black {
        color: #2f3031;
      }
      .item-middle {
        display: flex;
        flex-direction: column;
        margin-top: 32rpx;
        .same-row {
          display: flex;
          flex-direction: row;
          align-items: center;
          font-size: 28rpx;
          line-height: 42rpx;
        }
        .w60 {
          width: 52%;
        }
        .middle-row {
          width: 100%;
          margin-bottom: 20rpx;
        }
        .between {
          justify-content: space-between;
        }
        .right-row {
          width: 46%;
          display: flex;
          flex-direction: row;
          align-items: center;
          box-sizing: border-box;
          padding-left: 16rpx;
        }
        .item-label {
          color: #2f3031;
          margin-right: 8rpx;
        }
      }

      .item-bottom {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        font-size: 24rpx;
        line-height: 36rpx;
        border-top: 1rpx solid #e5e6e6;
        box-sizing: border-box;
        padding-top: 24rpx;
        .same-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 56rpx;
          background: #ffffff;
          border-radius: 32rpx;
          box-sizing: border-box;
          padding: 0 26rpx;
          margin-left: 20rpx;
          border: 1rpx solid #e5e5e5;
          color: #2f3031;
          font-size: 24rpx;
          line-height: 36rpx;
        }
      }
      .img-not-pass {
        width: 160rpx;
        height: 120rpx;
        position: absolute;
        top: 12rpx;
        right: 24rpx;
        z-index: 23;
      }
    }
  }
  .empty-show {
    width: 100%;
    margin-top: 52rpx;
    font-size: 28rpx;
    color: rgba(47, 48, 49, 0.5);
    line-height: 42rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bold {
    font-weight: bold;
  }
  .mask-content {
    width: 80%;
    background-color: #ffffff;
    border-radius: 24rpx;
    z-index: 998;
    position: fixed;
    top: 25%;
    left: 10%;
    display: flex;
    flex-direction: column;
    .mask-head {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 110rpx;
      box-sizing: border-box;
      padding-left: 32rpx;
      .head-title {
        font-size: 32rpx;
        line-height: 48rpx;
        color: #2f3031;
        font-weight: bold;
      }

      .head-close {
        width: 20%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        box-sizing: border-box;
        padding-right: 32rpx;
        .icon-close {
          width: 32rpx;
          height: 32rpx;
        }
      }
    }
    .input-module {
      width: 100%;
      display: flex;
      box-sizing: border-box;
      padding: 0rpx 32rpx;
      position: relative;
      .textarea {
        width: 100%;
        height: 250rpx;
        font-size: 28rpx;
        line-height: 42rpx;
        color: #2f3031;
        box-sizing: border-box;
        padding: 24rpx 24rpx 32rpx 24rpx;
        background: #e5e5e5;
        border-radius: 12rpx;
      }
      .count-font {
        position: absolute;
        right: 48rpx;
        bottom: 14rpx;
        font-size: 24rpx;
        line-height: 36rpx;
        color: rgba(47, 48, 49, 0.5);
      }
    }
    .btn-row {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100rpx;
      margin-top: 30rpx;
      box-sizing: border-box;
      padding-bottom: 24rpx;
      .same-btn {
        width: 229rpx;
        height: 70rpx;
        font-size: 28rpx;
        line-height: 42rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 32rpx;
      }
      .cancle {
        color: #2f3031;
        border: 1rpx solid #e5e6e6;
        background-color: #ffffff;
      }
      .send {
        color: #ffffff;
        background-color: #2969ff;
        margin-left: 24rpx;
      }
    }
  }
}
</style>
