<template>
  <view class="apply-wripper">
    <view class="step-box">
      <view class="step-point-box">
        <image
          :src="
            isFinishFirstModule
              ? '/static/images/icons/icon-bluewancheng.png'
              : '/static/images/icons/icon-steppoints-blue.png'
          "
          class="icon-point"
          bindtap="onSwitchBaseNav"
        />
        <view
          :class="
            'step-line ' + (isFinishFirstModule ? 'blue-gray' : 'line-gray')
          "
        ></view>
        <image
          :src="
            isFinishSecondModule
              ? '/static/images/icons/icon-bluewancheng.png'
              : '/static/images/icons/icon-steppoints-gray.png'
          "
          class="icon-point"
          bindtap="onSwitchPersonNav"
        />
        <view
          :class="
            'step-line ' + (isFinishSecondModule ? 'blue-gray' : 'line-gray')
          "
        ></view>
        <image
          src="/static/images/icons/icon-steppoints-gray.png"
          class="icon-point"
          bindtap="onSwitchOtherNav"
        />
      </view>
      <view class="step-title">
        <view class="step-title_item mr103" bindtap="onSwitchBaseNav"
          >项目信息</view
        >
        <view class="step-title_item mr103" bindtap="onSwitchPersonNav"
          >团队信息</view
        >
        <view class="step-title_item" bindtap="onSwitchOtherNav">其他信息</view>
      </view>
    </view>
    <view class="content-box">
      <!-- 第一步 -->
      <view class="base-box" v-if="firstModule">
        <view class="same-box">
          <view class="subtitle">基本信息</view>
          <view class="subcontent">
            <view class="input-moudle">
              <view class="same-label"
                >公司全称<view class="star">*</view>
              </view>
              <view class="same-input-box single-row">
                <input
                  type="text"
                  placeholder="如公司未注册可填项目名称"
                  class="single-input"
                  v-model="applyParams.companyName"
                  maxlength="60"
                  placeholder-class="placeholder-style"
                />
              </view>
            </view>
            <view class="input-moudle">
              <view class="same-label"
                >公司简称<view class="star">*</view>
              </view>
              <view class="same-input-box single-row">
                <input
                  type="text"
                  placeholder="如公司未注册可填项目简称"
                  class="single-input"
                  v-model="applyParams.companyBrief"
                  maxlength="20"
                  placeholder-class="placeholder-style"
                />
              </view>
            </view>
            <view class="input-moudle">
              <view class="same-label"
                >成立时间<view class="star">*</view>
              </view>
              <picker
                mode="date"
                :value="applyParams.setupDate"
                start="2004-01-01"
                end="2045-12-31"
                fields="month"
                @change="bindSetupDateChange"
                class="same-input-box picker-box"
              >
                <view class="default-data" v-if="applyParams.setupDate === ''"
                  >请选择公司成立时间</view
                >
                <view class="active-date" v-if="applyParams.setupDate">
                  {{ applyParams.setupDate }}
                </view>
              </picker>
            </view>
            <view class="input-moudle">
              <view class="same-label"
                >项目简介<view class="star">*</view>
              </view>
              <view class="same-input-box multiple-row">
                <textarea
                  class="same-textarea"
                  placeholder="一句话描述您是做什么？"
                  maxlength="200"
                  placeholder-class="placeholder-style"
                  v-model="applyParams.projectBrief"
                />
              </view>
            </view>
            <view class="input-moudle">
              <view class="same-label"
                >项目所属行业<view class="star">*</view>
              </view>
              <view
                class="select-row"
                v-if="!applyParams.industry"
                @click="onOpenIndustryList"
              >
                <view class="single-select">请选择项目所属行业</view>
                <image
                  :src="imgUrl + '/icons/icon-crude-ra-gray.png'"
                  class="icon-right-gray"
                />
              </view>
              <view
                class="select-row"
                v-if="applyParams.industry"
                @click="onOpenIndustryList"
              >
                <view class="select-active">{{ applyParams.industry }}</view>
                <image
                  :src="imgUrl + '/icons/icon-crude-ra-gray.png'"
                  class="icon-right-gray"
                />
              </view>
            </view>
          </view>
        </view>
        <view class="same-box">
          <view class="subtitle">项目介绍 </view>
          <view class="subcontent">
            <view class="input-moudle">
              <view class="same-label second-title"
                >商业模式<view class="star">*</view>
              </view>
              <view class="same-input-box multiple-row">
                <textarea
                  class="same-textarea"
                  placeholder="介绍公司/项目的具体商业模式，明确商业化路径（To-B/C）,盈利模式/收费方式等"
                  maxlength="-1"
                  placeholder-class="placeholder-style"
                  v-model="applyParams.businessModel"
                />
              </view>
            </view>
            <view class="input-moudle">
              <view class="same-label second-title"
                >市场痛点<view class="star">*</view>
              </view>
              <view class="same-input-box multiple-row">
                <textarea
                  v-model="applyParams.marketPain"
                  class="same-textarea"
                  ref="tipMarketPoint"
                  placeholder-class="placeholder-style"
                  placeholder-style="white-space: pre-line;text-align: justify;"
                  :placeholder="`1.您的产品/服务,解决了什么问题……\n2.……\n……`"
                  maxlength="-1"
                ></textarea>
              </view>
            </view>
            <view class="input-moudle">
              <view class="same-label second-title"
                >目标市场规模<view class="star">*</view>
              </view>
              <view class="same-input-box single-row">
                <input
                  type="number"
                  placeholder="请填写具体的数字，例如：100"
                  class="single-input w90"
                  placeholder-style="color: rgba(47,48,49,0.5);"
                  maxlength="8"
                  v-model="applyParams.marketSize"
                />
                <text class="unit">亿</text>
              </view>
            </view>
            <view class="input-moudle">
              <view class="same-label second-title"
                >市场规模测定依据<view class="star">*</view>
              </view>
              <view class="same-input-box multiple-row">
                <textarea
                  v-model="applyParams.sizeMeasurement"
                  class="same-textarea"
                  placeholder="解释市场规模测定的过程与依据"
                  placeholder-style="color: rgba(47,48,49,0.5);"
                  maxlength="-1"
                ></textarea>
              </view>
            </view>
            <view class="input-moudle">
              <view class="same-label">产品介绍 </view>
              <view class="same-input-box multiple-row">
                <textarea
                  class="same-textarea"
                  placeholder="产品方案介绍及产品亮点"
                  maxlength="800"
                  v-model="applyParams.productIntro"
                  placeholder-class="placeholder-style"
                />
              </view>
            </view>

            <view class="input-moudle">
              <view class="same-label"
                >市场竞争情况分析<view class="star">*</view>
              </view>
              <view class="same-input-box multiple-row">
                <textarea
                  class="same-textarea"
                  placeholder="请列举主要竞争对手、对标公司/产品（如有），并简要分析企业/产品的竞争情况及核心竞争力/竞争优势"
                  placeholder-style="color: rgba(47,48,49,0.5);"
                  maxlength="-1"
                  v-model="applyParams.coreCompete"
                ></textarea>
              </view>
            </view>
            <view class="input-moudle">
              <view class="same-label second-title"
                >公司业务发展计划<view class="star">*</view>
              </view>
              <view class="same-input-box multiple-row">
                <textarea
                  v-model="applyParams.businessPlan"
                  class="same-textarea"
                  placeholder-class="placeholder-style"
                  placeholder-style="white-space: pre-line;text-align: justify;"
                  :placeholder="`1.……\n2.……\n……\n注：计划需要包含时间节点`"
                  maxlength="-1"
                ></textarea>
              </view>
            </view>
            <view class="input-moudle">
              <view class="same-label second-title"
                >公司产品计划<view class="star">*</view>
              </view>
              <view class="same-input-box multiple-row">
                <textarea
                  v-model="applyParams.productPlan"
                  class="same-textarea"
                  @focus="onFocusProductPlan"
                  @blur="onBlurProductPlan"
                  placeholder-class="placeholder-style"
                  placeholder-style="white-space: pre-line;text-align: justify;"
                  :placeholder="`1.aaa产品上线，预计x月上线。\n2.bbb产品上线，预计x月上线。\n注：计划需要包含时间节点`"
                  maxlength="-1"
                ></textarea>
              </view>
            </view>
            <view class="input-moudle">
              <view class="same-label second-title"
                >财务及融资计划<view class="star">*</view>
              </view>
              <view class="same-input-box multiple-row">
                <textarea
                  v-model="applyParams.financePlan"
                  class="same-textarea"
                  @focus="onFocusMoneyPlan"
                  @blur="onBlurMoneyPlan"
                  placeholder-class="placeholder-style"
                  placeholder-style="white-space: pre-line;text-align: justify;"
                  :placeholder="`1.种子轮，？个月内，xxx万级别融资。\n2.A轮，？个月，xxxx万级别融资。\n注：计划需要包含时间节点`"
                  maxlength="-1"
                ></textarea>
              </view>
            </view>
            <view class="input-moudle">
              <view class="same-label second-title"
                >团队发展计划<view class="star">*</view>
              </view>
              <view class="same-input-box multiple-row">
                <textarea
                  v-model="applyParams.teamDevPlan"
                  class="same-textarea"
                  placeholder="请输入团队发展计划，注：计划需要包含时间节点"
                  placeholder-class="placeholder-style"
                  maxlength="-1"
                ></textarea>
              </view>
            </view>
          </view>
        </view>
        <view class="same-box">
          <view class="subtitle">项目/公司过往融资情况</view>
          <view class="subcontent">
            <view class="input-moudle">
              <view class="same-label second-title"
                >是否曾获得外部投资？<view class="star">*</view>
              </view>
              <radio-group
                class="radio-group"
                name="activityType"
                :value="applyParams.isExternalInvest"
                @change="isInvestedRadioChange"
              >
                <label
                  class="radio-label"
                  v-for="(item, unique) in investRadios"
                  :key="unique"
                >
                  <radio
                    style="transform: scale(0.7)"
                    :value="item.value"
                    color="#2969FF"
                    :checked="item.value === applyParams.isExternalInvest"
                  />{{ item.name }}
                </label>
              </radio-group>
            </view>
            <view
              class="input-moudle"
              v-if="
                applyParams.isExternalInvest !== 0 &&
                applyParams.isExternalInvest !== null
              "
            >
              <view class="same-label second-title"
                >获得的投资情况<view class="star">*</view>
              </view>
              <view class="same-input-box multiple-row">
                <textarea
                  v-model="applyParams.egInvestBrief"
                  class="same-textarea"
                  placeholder="请简要列举每个轮次的投资方、投资轮次、投资规模、投前估值"
                  placeholder-class="placeholder-style"
                  maxlength="-1"
                ></textarea>
              </view>
            </view>
          </view>
        </view>

        <view class="same-box">
          <view class="subtitle">本轮计划</view>
          <view class="subcontent">
            <view class="same-row-input">
              <view class="left-label"
                >本轮计划估值<text class="star">*</text></view
              >
              <view class="right-input">
                <input
                  type="number"
                  maxlength="6"
                  placeholder="请填写数字，如：100"
                  class="input-value pr32"
                  placeholder-style="color: rgba(47,48,49,0.5);"
                  v-model="applyParams.valuation"
                />
                <text class="input-unit">万</text>
              </view>
            </view>
            <view class="radio-row">
              <view class="radio-left"
                >创始人/发起人是否为公司实际控制人<text class="star"
                  >*</text
                ></view
              >
              <view class="radio-right">
                <view class="radio-item" @click="onChangeIsFounderControl('Y')">
                  <image
                    :src="
                      isFounderCtrl == 'Y'
                        ? '/static/images/icons/icon-checkout-blue.png'
                        : '/static/images/icons/icon-checkout-gray.png'
                    "
                    class="icon-checkbox"
                  />
                  <text class="radio-txt">是</text>
                </view>
                <view class="radio-item" @click="onChangeIsFounderControl('N')">
                  <image
                    :src="
                      isFounderCtrl == 'N'
                        ? '/static/images/icons/icon-checkout-blue.png'
                        : '/static/images/icons/icon-checkout-gray.png'
                    "
                    class="icon-checkbox"
                  />
                  <text class="radio-txt">否</text>
                </view>
              </view>
            </view>
            <view class="radio-row">
              <view class="radio-left"
                >核心技术人员是否为创始团队成员<text class="star">*</text></view
              >
              <view class="radio-right">
                <view
                  class="radio-item"
                  @click="onChangeIsTechnicalCoreTeam('Y')"
                >
                  <image
                    :src="
                      isTechCoreTeam == 'Y'
                        ? '/static/images/icons/icon-checkout-blue.png'
                        : '/static/images/icons/icon-checkout-gray.png'
                    "
                    class="icon-checkbox"
                  />
                  <text class="radio-txt">是</text>
                </view>
                <view
                  class="radio-item"
                  @click="onChangeIsTechnicalCoreTeam('N')"
                >
                  <image
                    :src="
                      isTechCoreTeam == 'N'
                        ? '/static/images/icons/icon-checkout-blue.png'
                        : '/static/images/icons/icon-checkout-gray.png'
                    "
                    class="icon-checkbox"
                  />
                  <text class="radio-txt">否</text>
                </view>
              </view>
            </view>
            <view class="radio-row">
              <view class="radio-left"
                >创始人及核心团队成员是否实际出资<text class="star"
                  >*</text
                ></view
              >
              <view class="radio-right">
                <view class="radio-item" @click="onChangeIsTeamInvest('Y')">
                  <image
                    :src="
                      isTeamInvested == 'Y'
                        ? '/static/images/icons/icon-checkout-blue.png'
                        : '/static/images/icons/icon-checkout-gray.png'
                    "
                    class="icon-checkbox"
                  />
                  <text class="radio-txt">是</text>
                </view>
                <view class="radio-item" @click="onChangeIsTeamInvest('N')">
                  <image
                    :src="
                      isTeamInvested == 'N'
                        ? '/static/images/icons/icon-checkout-blue.png'
                        : '/static/images/icons/icon-checkout-gray.png'
                    "
                    class="icon-checkbox"
                  />
                  <text class="radio-txt">否</text>
                </view>
              </view>
            </view>
            <view class="same-row-input">
              <view class="left-label"
                >创始团队合计实际控制股比<text class="star">*</text></view
              >
              <view class="right-input">
                <input
                  type="number"
                  maxlength="2"
                  placeholder="请填写数字，如：80"
                  class="input-value pr32"
                  placeholder-style="color: rgba(47,48,49,0.5);"
                  v-model="applyParams.founderStockRat"
                />
                <text class="input-unit">%</text>
              </view>
            </view>
            <view class="input-moudle">
              <view class="same-label second-title"
                >公司股权结构<view class="star">*</view>
              </view>
              <view class="same-input-box multiple-row">
                <textarea
                  v-model="applyParams.equityStruct"
                  class="same-textarea"
                  placeholder="请请描述公司当前的股权结构详情，如果公司未注册，可填写拟定的股权结构"
                  placeholder-class="placeholder-style"
                  maxlength="-1"
                ></textarea>
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- 第二步 -->
      <view class="person-box" v-if="secondModule">
        <view class="team-list">
          <view
            class="team-item"
            v-for="(item, index) in teamList"
            :key="index"
          >
            <view class="team-info">
              <image
                :src="imgUrl + '/icons/icon-chengyuan.png'"
                class="team-info_left"
              />
              <view class="team-info_right">
                <view class="info-row">
                  <text class="info-label">姓名：</text>
                  <text class="info-value">{{ item.name }}</text>
                </view>
                <view class="info-row">
                  <text class="info-label">职位：</text>
                  <text class="info-value">{{ item.position }}</text>
                </view>
              </view>
            </view>
            <view class="team-menu">
              <view class="menu-item" @click="handleDelTeamMemberById(index)"
                >删除</view
              >
              <view class="menu-item" @click="hanldeEditTeamMemberById(item)"
                >编辑</view
              >
            </view>
          </view>
        </view>
        <view
          class="add-member-box"
          @click="goAddMemberInfo"
          v-if="teamList.length < 6"
        >
          <image
            src="/static/images/icons/icon-blue-add.png"
            class="icon-add-member"
          />
          <view class="blue-font">添加创始团队成员信息</view>
          <view class="gray-font">（最多可添加6个）</view>
        </view>
      </view>
      <!-- 第三步 -->
      <view class="other-box" v-if="thirdModule">
        <view class="same-box pt24">
          <view class="input-moudle">
            <view class="same-label"
              >您希望国信合创CHA理事会提供什么支持？<view class="star">*</view>
            </view>
            <view class="same-input-box multiple-row">
              <textarea
                v-model="applyParams.councilSupport"
                class="same-textarea"
                placeholder="包含资金、资源、咨询各方面具体方向，理事"
                placeholder-class="placeholder-style"
                maxlength="-1"
              />
              <!-- <view class="input-count">0/1000</view> -->
            </view>
          </view>
          <view class="input-moudle">
            <view class="same-label">您的姓名<view class="star">*</view> </view>
            <view class="same-input-box single-row">
              <input
                type="text"
                placeholder="请输入您的姓名"
                class="single-input"
                v-model="applyParams.name"
                placeholder-class="placeholder-style"
              />
            </view>
          </view>
          <view class="input-moudle">
            <view class="same-label"
              >您的手机号<view class="star">*</view>
            </view>
            <view class="same-input-box single-row">
              <input
                type="number"
                maxlength="11"
                placeholder="请输入您的手机号"
                class="single-input"
                v-model="applyParams.mobile"
                placeholder-class="placeholder-style"
              />
            </view>
          </view>
          <view class="input-moudle">
            <view class="same-label"
              >您的常用邮箱<text class="star">*</text>
            </view>
            <view class="same-input-box single-row">
              <input
                type="text"
                placeholder="请输入您的邮箱，接收项目反馈信息"
                class="single-input"
                v-model="applyParams.email"
                maxlength="40"
                placeholder-class="placeholder-style"
              />
            </view>
          </view>

          <view class="input-moudle">
            <view class="same-label">推荐人<view class="star">*</view> </view>
            <view class="same-input-box single-row">
              <input
                type="text"
                placeholder="您通过谁认识了我们？"
                class="single-input"
                v-model="applyParams.referrer"
                placeholder-class="placeholder-style"
              />
            </view>
          </view>
          <view class="input-moudle">
            <view class="same-label">推荐人的联系方式 </view>
            <view class="same-input-box single-row">
              <input
                type="text"
                placeholder="请输入推荐人手机号"
                class="single-input"
                v-model="applyParams.referrerMobile"
                placeholder-class="placeholder-style"
                maxlength="11"
              />
            </view>
          </view>

          <view class="input-moudle">
            <view class="same-label"
              >上传BP介绍<view class="star">*</view>
            </view>
            <view class="notes-desc"
              >注：仅支持PDF文件上传，上传失败有可能是文件太大了，需要处理一下后再上传试试</view
            >
            <view class="upload-box">
              <view
                class="upload-btn"
                v-if="!bpFilePath"
                @click="uploadChooseFile"
              >
                +添加PDF文件
              </view>
              <view class="upload-name" v-if="bpFileName">{{
                bpFileName
              }}</view>
            </view>
          </view>
          <!-- <view class="input-moudle">
          <view class="same-label">产品Demo展示
          </view>
          <view class="notes-desc">注：仅支持10M以下的视频</view>
          <view class="upload-box">
            <view class="upload-btn" v-if="{{!productFilePath}}" bindtap="uploadProductFile">
              +添加PDF文件
            </view>
            <view class="upload-name" v-if="{{productFileName}}">{{productFileName}}</view>
          </view>
        </view> -->
        </view>
      </view>
    </view>
    <view class="empty-box"></view>
    <view class="foot-box">
      <!-- <view class="next-btn" @click="testScore" v-if="{{firstModule}}">下一步</view> -->
      <view class="next-btn" @click="goStepTwo" v-if="firstModule">下一步</view>
      <view class="next-btn" @click="goStepThree" v-if="secondModule"
        >下一步</view
      >
      <view class="next-btn" @click="submitApply" v-if="thirdModule">提交</view>
    </view>
    <project-belong-industry
      v-if="maskHidden"
      :industryName="applyParams.industry"
      @closeIndustry="maskHidden = false"
      @sureIndustry="handleSureIndustry"
    />
  </view>
</template>

<script>
import { checkStepOneInfoData, checkStepTwoInfoData } from "./checkData";
import projectBelongIndustry from "@/components/projectBelongIndustry";
import { imgUrls, HTTP_REQUEST_URL, TOKENNAME } from "@/config/app";
import { PROJECT_BASE_DATA } from "@/const/project";
import {
  investProjectsSave,
  investProjectsUpdateScore,
  investProjectsDetails,
} from "@/api/gxhc";
import store from "@/store";
export default {
  components: { projectBelongIndustry },
  data: function () {
    return {
      imgUrl: imgUrls,
      applyParams: {
        setupDate: "",
      },
      // firstModule: true,
      firstModule: true,
      secondModule: false,
      thirdModule: false,
      maskHidden: false,
      isTeamInvested: null,
      isTechCoreTeam: null,
      isFounderCtrl: null,

      // windowHeight: app.globalData.windowHeight,
      isFinishFirstModule: false,
      isFinishSecondModule: false,
      footBtnLabel: "下一步",
      isCouncilMember: null,
      bpFilePath: "",
      bpFileName: "",
      updateId: "", // 更新的id
      isUpdate: false, // 是否是数据修改
      investRadios: [
        {
          name: "无",
          value: 0,
        },
        {
          name: "有，项目最新一轮估值小于或等于3000万人民币",
          value: 1,
        },
        {
          name: "有，项目最新一轮估值大于3000万人民币，且小于或等于5000万人民币",
          value: 2,
        },
        {
          name: "有，项目最新一轮估值大于5000万人民币",
          value: 3,
        },
      ],
      teamList: [],
      collegesList: [],
      enterpriseList: [],
    };
  },
  onLoad(options) {
    console.log("项目申请页面=》", options);
    if (options && options.id) {
      // 判断是否修改
      const id = options.id;
      this.updateId = id;
      this.fetchProjectById(id);
    } else {
      this.applyParams = JSON.parse(JSON.stringify(PROJECT_BASE_DATA));
      this.isUpdate = false;
      const platform = uni.getDeviceInfo().osName;
      if (platform === "android" || platform === "ios") {
        uni.showModal({
          title: "温馨提示",
          content:
            "亲爱的用户，项目填写信息比较多，填写耗时约3分钟以上，优先推荐您在电脑端打开小程序进行项目的申请填写，感谢您的信任和支持",
          showCancel: false,
          confirmText: "我知道了",
        });
      }
    }
  },
  onShow() {
    // 获取团队信息
    if (!this.isUpdate) {
      let list = uni.getStorageSync("teamList");
      console.log("获取的团队信息有", list);
      this.teamList = list.length > 0 ? list : [];
    }
  },
  methods: {
    submitApply() {
      const { applyParams, teamList } = this;
      const checkStatus2 = checkStepTwoInfoData(applyParams);
      console.log(applyParams);
      if (!checkStatus2.status) {
        uni.showToast({
          title: checkStatus2.message,
          icon: "none",
        });
        return;
      }
      const newObj = {
        ...applyParams,
        teamList,
      };
      console.log("所有资料都填写了，耶耶耶耶", JSON.stringify(newObj));
      console.log("恭喜你，成功了~~~");
      if (this.isUpdate) {
        uni.showLoading();
        this.fetchUpdateProject(newObj);
      } else {
        uni.showLoading({
          title: "提交中...",
        });
        this.fetchAddProject(newObj);
      }
      // let testString = {"companyName":"鹦鹉人APP","projectBrief":"鹦鹉人APP项目简介","industry":"大模型","teamIntro":"鹦鹉人APP团队介绍","businessModel":"鹦鹉人APP商业模式","productIntro":"鹦鹉人APP产品介绍","benchmarks":"鹦鹉人APP对标公司、产品","coreCompete":"鹦鹉人APP核心竞争力","marketPain":"鹦鹉人APP市场痛点","marketSize":"500","sizeMeasurement":"鹦鹉人APP测定依据","businessPlan":"鹦鹉人APP业务发展计划","productPlan":"鹦鹉人APP产品计划","financePlan":"鹦鹉人APP财务及融资计划","teamDevPlan":"鹦鹉人APP团队发展计划","valuation":"600","isFounderCtrl":true,"isTechCoreTeam":true,"founderStockRat":"鹦鹉人APP控制股比","isTeamInvested":true,"equityStruct":"鹦鹉人APP公司股权结构","other":"鹦鹉人APP其他","isCouncilMember":true,"councilSupport":"鹦鹉人APP提供支持","name":"马明涛22","mobile":"15222222222","email":"zhangyuxue@gxhc-cha.com","referrer":"推荐人","referrerMobile":"18888888888","uploadBPPath":"cloud://cloud1-1gy9whla01ef426e.636c-cloud1-1gy9whla01ef426e-1326719267/miniprogram/bp/202406260930-鹦鹉人APP的BP","projectStatus":"investViewing"}
      // console.log('所有资料都填写了，耶耶耶耶', testString)
      // that.fetchAddProject(testString)
    },
    goStepThree() {
      if (this.teamList.length > 0) {
        this.isFinishFirstModule = true;
        this.isFinishSecondModule = true;
        this.firstModule = false;
        this.secondModule = false;
        this.thirdModule = true;
        this.footBtnLabel = "提交";
      } else {
        uni.showToast({
          title: "请添加至少一位团队成员信息",
          icon: "none",
        });
      }
    },
    goStepTwo() {
      this.applyParams.isFounderCtrl = this.isFounderCtrl === "Y";
      this.applyParams.isTechCoreTeam = this.isTechCoreTeam === "Y";
      this.applyParams.isTeamInvested = this.isTeamInvested === "Y";
      const checkStatus = checkStepOneInfoData(this.applyParams);
      // 将估值从万转换为元
      const valuationInYuan = parseFloat(this.applyParams.valuation) * 10000;
      if (valuationInYuan > 100000000) {
        // 超过1亿
        uni.showToast({
          title: "您的本轮项目估值超过1亿人民币，不符合该平台的申请条件",
          icon: "none",
        });
        return;
      }
      if (parseFloat(this.applyParams.founderStockRat) < 40) {
        // 超过1亿
        uni.showToast({
          title: "创始团队合计实际控制股比低于40%，不符合该平台的申请条件",
          icon: "none",
        });
        return;
      }
      if (checkStatus.status) {
        this.isFinishFirstModule = true;
        this.firstModule = false;
        this.secondModule = true;
        this.thirdModule = false;
        uni.pageScrollTo({
          scrollTop: 0,
        });
      } else {
        uni.showToast({
          icon: "none",
          title: checkStatus.message,
          duration: 2000,
        });
      }
    },
    calculateScores(data) {
      const { founderStockRat, marketSize, teamList } = data;
      const { collegesList, enterpriseList } = this;
      let totalScore = 0;
      let scoreState = "";
      // 创始团队实际控制股比大于等于80%，记为15分；65%-80%，记为10分；50%-65%，记为5分；低于50%，记为0分
      const stockRatio = parseFloat(founderStockRat);
      if (stockRatio >= 80) {
        totalScore += 15;
        scoreState = "创始团队实际控制股比大于等于80%，记为15分；";
      } else if (stockRatio >= 65) {
        totalScore += 10;
        scoreState = "创始团队实际控制股比在65%-80%，记为10分；";
      } else if (stockRatio >= 50) {
        totalScore += 5;
        scoreState = "创始团队实际控制股比在50%-65%，记为5分；";
      }

      // 目标市场规模: 大于等于500亿人民币，记为15分；300-500亿，记为10分；100-300亿，记为5分；否则记为0分
      const marketData = parseFloat(marketSize);
      if (marketData >= 500) {
        totalScore += 15;
        scoreState += "目标市场规模,大于等于500亿人民币，记为15分；";
      } else if (marketData >= 300) {
        totalScore += 10;
        scoreState += "目标市场规模,300-500亿，记为10分；";
      } else if (marketData >= 100) {
        totalScore += 5;
        scoreState += "目标市场规模,100-300亿，记为5分；";
      }

      // 教育背景得分：教育背景25=（CEO的分数*50%）+(团队其他成员总分的平均分*50%)
      const educationScores = data.teamList.reduce(
        (acc, member) => {
          // 本硕博中任一项教育背景记录
          const randomEdu =
            member.educationBg[
              Math.floor(Math.random() * member.educationBg.length)
            ];
          const schoolName = randomEdu.schoolName;

          const college = collegesList.find(
            (college) => college.name === schoolName
          );

          let score = 0;
          if (college) {
            score = college.type === "top" ? 25 : 10;
          }

          // 如果是 CEO，则按50%计算；否则按总得分计算
          if (member.position === "CEO") {
            acc.ceoScore = score * 0.5;
          } else {
            acc.nonCeoScores.push(score);
          }
          return acc;
        },
        { ceoScore: 0, nonCeoScores: [] }
      );

      // 计算非 CEO 成员的平均得分
      const averageNonCeoScore =
        educationScores.nonCeoScores.length > 0
          ? educationScores.nonCeoScores.reduce((acc, cur) => acc + cur, 0) /
            educationScores.nonCeoScores.length
          : 0;

      // 最终教育背景得分
      const finalEducationScore =
        educationScores.ceoScore + averageNonCeoScore * 0.5;
      totalScore += finalEducationScore;
      scoreState += `团队教育背景得分：${finalEducationScore}；`;

      // 商业背景得分：商业背景最高得分25=（CEO的企业分数*50%）+(团队其他成员总企业得分的平均分*50%)
      const businessBackgroundScores = data.teamList.reduce(
        (acc, member) => {
          // 只取第一条工作经历
          const firstWorkExperience = member.workExperiences[0];
          if (firstWorkExperience) {
            const workUnit = firstWorkExperience.workUnit;
            const enterprise = enterpriseList.find(
              (ent) =>
                simplifyCompanyName(ent.name) === simplifyCompanyName(workUnit)
            );

            let score = 0;
            if (enterprise) {
              score = enterprise.type === "top" ? 25 : 10;
            }

            // 如果是 CEO，则按50%计算；否则按总得分计算
            if (member.position === "CEO") {
              acc.ceoScore = score * 0.5;
            } else {
              acc.nonCeoScores.push(score);
            }
          }
          return acc;
        },
        { ceoScore: 0, nonCeoScores: [] }
      );

      // 计算非 CEO 成员的平均得分
      const averageNonCeoScore2 =
        businessBackgroundScores.nonCeoScores.length > 0
          ? businessBackgroundScores.nonCeoScores.reduce(
              (acc, cur) => acc + cur,
              0
            ) / businessBackgroundScores.nonCeoScores.length
          : 0;
      // debugger;
      // 最终商业背景得分
      const finalBusinessScore =
        businessBackgroundScores.ceoScore + averageNonCeoScore2 * 0.5;
      totalScore += finalBusinessScore;
      scoreState += `团队商业背景得分：${finalBusinessScore}；`;

      // 计算团队成员年龄，若团队成员平均年龄小于35岁，记为15分；平均35-45岁，记为8分，平均年龄为45岁以上，记为0分
      const currentYear = new Date().getFullYear();
      const ages = teamList.map((member) => {
        const birthYear = parseInt(member.birthday.split("-")[0]);
        return currentYear - birthYear;
      });
      const avgAge = ages.reduce((acc, cur) => acc + cur, 0) / ages.length;
      if (avgAge < 35) {
        totalScore += 15;
        scoreState += "团队成员平均年龄小于35岁，记为15分；";
      } else if (avgAge <= 45) {
        totalScore += 8;
        scoreState += "团队成员平均35-45岁，记为8分；";
      }

      // 检查是否有创业经历并计算得分
      const hasEntrepreneurship = teamList.some(
        (member) =>
          member.companyName &&
          (member.companyName.includes("有限公司") ||
            member.companyName.includes("有限责任公司") ||
            member.companyName.includes("股份公司"))
      );
      if (hasEntrepreneurship) {
        totalScore += 10;
        scoreState += "有创业经历，记10分；";
      }

      // 计算科研成果转化得分
      const researchContribution = teamList.some(
        (member) =>
          member.keyUnitName &&
          (member.keyUnitName.includes("研究院") ||
            member.keyUnitName.includes("实验室")) &&
          (new Date(member.unitEndDate) - new Date(member.unitStartDate)) /
            (1000 * 60 * 60 * 24 * 365) >=
            3
      );
      if (researchContribution) {
        totalScore += 5;
        scoreState += "在国家重点实验室工作过，记5分；";
      }

      // 计算国家级学术荣誉或称号,每个得3分
      const honorTitlesCount = data.teamList.reduce((acc, member) => {
        return acc + member.honorTitles.length;
      }, 0);
      if (honorTitlesCount) {
        totalScore += honorTitlesCount * 3;
        scoreState += `获得国家级学术荣誉和称号共${honorTitlesCount}个，每个得3分，共计${
          honorTitlesCount * 3
        }分。`;
      }

      console.log("得分=》", totalScore);
      console.log("得分说明=》", scoreState);

      return {
        totalScore,
        scoreState,
      };
    },
    fetchUpdateProjectScore(projectId, params) {
      investProjectsUpdateScore({ ...params, id: projectId })
        .then((res) => {
          console.log("cloundFunProjectScoreInfo=>", res);
          if (res.status === 200) {
            console.log("打分成功");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchAddProject(params) {
      investProjectsSave(params)
        .then((res) => {
          console.log("cloundFunAddProjectInfo=>", res);
          uni.hideLoading();
          if (res.status === 200) {
            //  根据返回的id,更新项目的得分情况
            const investProjectId = res.data.id;
            const scoreParam = this.calculateScores(params);
            console.log("计算得分反馈=>", scoreParam);
            this.fetchUpdateProjectScore(investProjectId, scoreParam);
            this.clearProjectStorage();
            uni.showModal({
              content:
                "项目提交成功！项目将进入审核阶段，约1-3天后可在功能-->项目进展查看具体情况，或关注手机短信或邮件通知",
              showCancel: false,
              confirmText: "我知道了",
              success(res) {
                if (res.confirm) {
                  uni.switchTab({
                    url: "/pages/domain/index/index",
                  });
                }
              },
            });
            return;
          }
          uni.showToast({
            title: "申请失败，请稍后再试",
            icon: "none",
          });
        })
        .catch((error) => {
          uni.hideLoading();
          uni.showToast({
            title: "申请失败，请稍后再试",
            icon: "none",
          });
          console.error(error);
        });
    },
    fetchUpdateProject(params) {
      investProjectsSave({ id: this.updateId, ...params })
        .then((res) => {
          console.log("cloundFunAddProjectInfo=>", res);
          uni.hideLoading();
          this.clearProjectStorage();
          if (res.status == 200) {
            uni.showModal({
              content: "项目更新成功",
              showCancel: false,
              confirmText: "我知道了",
              success(res) {
                if (res.confirm) {
                  uni.navigateTo({
                    url: "/pages/project/evolve/index",
                  });
                }
              },
            });
          } else {
            uni.showToast({
              title: "更新失败，请稍后再试",
              icon: "none",
            });
          }
        })
        .catch((error) => {
          uni.hideLoading();
          uni.showToast({
            title: "更新失败，请稍后再试",
            icon: "none",
          });
          console.error(error);
        });
    },
    /**
     * 清除项目信息的相关缓存
     */
    clearProjectStorage() {
      uni.removeStorageSync("teamList");
      uni.removeStorageSync("tempTeamParamData");
      uni.removeStorageSync("workExpList");
      uni.removeStorageSync("enterprises");
      uni.removeStorageSync("colleges");
    },
    fetchProjectById(id) {
      uni.showLoading();
      investProjectsDetails({ id })
        .then((res) => {
          uni.hideLoading();
          console.log("res==>", res);
          if (res.status == 200) {
            const result = res.data;
            this.isUpdate = true;
            this.applyParams = result;
            this.teamList = result.teamList ? JSON.parse(result.teamList) : [];
            this.isFounderCtrl = result.isFounderCtrl ? "Y" : "N";
            this.isTechCoreTeam = result.isTechCoreTeam ? "Y" : "N";
            this.isTeamInvested = result.isTeamInvested ? "Y" : "N";
            this.isCouncilMember = result.isCouncilMember ? "Y" : "N";
            this.tipMarketPoint = false;
            this.tipBusinessPlan = false;
            this.tipProductPlan = false;
            this.tipMoneyPlan = false;
            this.bpFilePath = result.uploadBPPath;
            this.bpFileName = result.uploadBPPath;
          } else {
            this.applyParams = JSON.parse(JSON.stringify(PROJECT_BASE_DATA));
            this.isUpdate = false;
          }
        })
        .catch((error) => {
          uni.hideLoading();
        });
    },
    uploadChooseFile() {
      //#ifdef MP-WEIXIN
      wx.chooseMessageFile({
        count: 1,
        type: "file",
        extension: ["pdf"],
        success: (res) => {
          if (res.tempFiles[0].size <= 10485760) {
            this.uploadBPFile(res.tempFiles[0]);
          } else {
            uni.showToast({
              title: "文件大小不能超过10M",
              icon: "none",
            });
          }
        },
        fail() {
          uni.showToast({
            title: "文件选择失败",
            icon: "none",
          });
        },
      });
      // #endif
      //#ifndef MP-WEIXIN
      uni.chooseFile({
        count: 1,
        type: "file",
        extension: ["pdf"],
        success: (res) => {
          if (res.tempFiles[0].size <= 10485760) {
            this.uploadBPFile(res.tempFiles[0]);
          } else {
            uni.showToast({
              title: "文件大小不能超过10M",
              icon: "none",
            });
          }
        },
        fail() {
          uni.showToast({
            title: "文件选择失败",
            icon: "none",
          });
        },
      });
      // #endif
    },
    uploadBPFile(tempFiles) {
      uni.showLoading({
        title: `文件上传中`,
      });
      uni.uploadFile({
        url: HTTP_REQUEST_URL + "/api/upload/pdf",
        filePath: tempFiles.path,
        fileType: "pdf",
        name: "file",
        formData: {
          filename: "file",
        },
        header: {
          // #ifdef MP
          "Content-Type": "multipart/form-data",
          // #endif
          [TOKENNAME]: "Bearer " + store.state.app.token,
        },
        success: (res) => {
          uni.hideLoading();
          if (res.statusCode == 403) {
            this.$util.Tips({
              title: res.data,
            });
          } else {
            let data = res.data ? JSON.parse(res.data) : {};
            if (data.status == 200) {
              this.bpFilePath = tempFiles.path;
              this.bpFileName = tempFiles.name;
              console.log("文件上传成功", data, res);
              // 保存文件云存储路径
              this.applyParams.uploadBPPath = data.data.url;
            } else {
              this.$util.Tips({
                title: data.msg,
              });
            }
          }
        },
        fail: (err) => {
          uni.hideLoading();
          this.$util.Tips({
            title: `上传文件失败`,
          });
        },
      });
    },
    handleDelTeamMemberById(idx) {
      let arr = this.teamList;
      if (idx >= 0 && idx < arr.length) {
        arr.splice(idx, 1); // 删除索引为index处的一个元素
        uni.setStorageSync("teamList", arr);
        this.teamList = arr; // 更新页面数据
      }
    },
    hanldeEditTeamMemberById(item) {
      uni.removeStorageSync("educationList");
      uni.removeStorageSync("workExpList");
      uni.removeStorageSync("practiceList");
      uni.removeStorageSync("tempTeamParamData");
      uni.navigateTo({
        url: `/projectPages/memberInfo/index?pageStatus=${"update"}&item=${JSON.stringify(
          item
        )}`,
      });
    },
    goAddMemberInfo() {
      uni.removeStorageSync("tempTeamParamData");
      uni.removeStorageSync("educationList");
      uni.removeStorageSync("workExpList");
      uni.removeStorageSync("practiceList");
      uni.navigateTo({
        url: "/projectPages/memberInfo/index?pageStatus=add",
      });
    },
    onChangeIsTeamInvest(newValue) {
      this.isTeamInvested = newValue;
    },
    onChangeIsTechnicalCoreTeam(newValue) {
      this.isTechCoreTeam = newValue;
    },
    onChangeIsFounderControl(newValue) {
      this.isFounderCtrl = newValue;
    },
    isInvestedRadioChange(e) {
      this.applyParams.isExternalInvest = e.detail.value;
    },
    handleSureIndustry(e) {
      this.applyParams.industry = e.industryName;
    },
    bindSetupDateChange(e) {
      this.applyParams.setupDate = e.detail.value;
    },
    onOpenIndustryList() {
      this.maskHidden = true;
    },
  },
};
</script>

<style>
page {
  background: #f5f5f5;
}
</style>
<style lang="scss" scoped>
.apply-wripper {
  width: 100%;
  position: relative;
  .step-box {
    width: 100%;
    height: 140rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #ffffff;
    position: fixed;
    left: 0;
    //#ifdef MP
    top: 0;
    //#endif
    //#ifdef H5
    top: 44px;
    //#endif
    z-index: 12;
    .step-point-box {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .icon-point {
        width: 28rpx;
        height: 28rpx;
      }
      .step-line {
        width: 199rpx;
        height: 2rpx;

        border-radius: 1rpx;
        margin-left: 18rpx;
        margin-right: 18rpx;
      }
      .line-gray {
        background: #eff0f0;
      }
      .blue-gray {
        background: #2969ff;
      }
    }
    .step-title {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      .step-title_item {
        width: 160rpx;
        height: 36rpx;
        font-weight: bold;
        font-size: 24rpx;
        color: #2f3031;
        line-height: 36rpx;
        text-align: center;
        box-sizing: border-box;
        padding-top: 24rpx;
      }

      .mr103 {
        margin-right: 103rpx;
      }
    }
  }
  .content-box {
    width: 100%;
    box-sizing: border-box;
    padding: 24rpx;
    margin-top: 140rpx;
    .mt24 {
      margin-top: 24rpx;
    }
    .ml20 {
      margin-left: 20rpx;
    }
    .star {
      color: #ff0000;
      margin-left: 8rpx;
    }
    .small-row {
      border-bottom: 1rpx solid #eff0f0;
      box-sizing: border-box;
      padding-bottom: 12rpx;
    }
    .same-box {
      width: 100%;
      background: #ffffff;
      border-radius: 24rpx;
      margin-bottom: 24rpx;
      box-sizing: border-box;
      padding: 0rpx 24rpx 12rpx 24rpx;
      .subtitle {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100rpx;
        font-size: 34rpx;
        line-height: 48rpx;
        color: #2f3031;
        font-weight: bold;
        // border-bottom: 1rpx solid #EFF0F0;
      }
      .subcontent {
        width: 100%;
        box-sizing: border-box;
        // padding-top: 24rpx;
      }
      .same-label {
        font-weight: bold;
        font-size: 28rpx;
        color: #2f3031;
        line-height: 42rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .input-moudle {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 24rpx;
        .radio-group {
          width: 100%;
          display: flex;
          flex-direction: column;
          margin-top: 16rpx;
        }

        /* radio标签样式 */
        .radio-label {
          display: flex;
          width: 100%;
          align-items: center;
          margin-bottom: 12px;
          color: rgba(47, 48, 49, 0.7);
          font-size: 26rpx;
          line-height: 38rpx;
        }
        .single-row {
          width: 100%;
          height: 72rpx;
        }
        .multiple-row {
          width: 100%;
          height: 240rpx;
          position: relative;
        }
        .select-row {
          width: 100%;
          height: 72rpx;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 24rpx;
          color: rgba(47, 48, 49, 0.5);
          line-height: 36rpx;
          box-sizing: border-box;
          padding-left: 16rpx;
          border-radius: 12rpx;
          border: 1rpx solid #e5e6e6;
          margin-top: 16rpx;
        }
        .select-active {
          color: #2f3031;
        }
        .single-select {
          width: 50%;
          height: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          font-size: 24rpx;
          color: rgba(47, 48, 49, 0.5);
          line-height: 36rpx;
        }
        .icon-right-gray {
          width: 16rpx;
          height: 28rpx;
          margin-right: 20rpx;
        }
        .same-input-box {
          background: #ffffff;
          border-radius: 12rpx;
          border: 1rpx solid #e5e6e6;
          margin-top: 16rpx;
          position: relative;
        }
        .single-input {
          width: 100%;
          height: 100%;
          font-size: 24rpx;
          color: #2f3031;
          line-height: 36rpx;
          box-sizing: border-box;
          padding: 0 16rpx;
        }
        .same-textarea {
          box-sizing: border-box;
          padding: 16rpx;
          font-size: 24rpx;
          color: #2f3031;
          line-height: 36rpx;
          width: 100%;
          height: 240rpx;
        }
        .value-input {
          color: #333333;
        }
        .picker-box {
          width: 100%;
          height: 72rpx;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          padding-left: 16rpx;
          .active-date {
            font-size: 24rpx;
            color: #2f3031;
            line-height: 42rpx;
          }
          .default-data {
            font-size: 24rpx;
            color: rgba(47, 48, 49, 0.5);
            line-height: 36rpx;
          }
        }
        .notes {
          font-size: 20rpx;
          line-height: 32rpx;
          margin-top: 4rpx;
        }
        .input-demo-module {
          display: flex;
          flex-direction: column;
          font-size: 24rpx;
          color: rgba(47, 48, 49, 0.5);
          line-height: 36rpx;
          position: absolute;
          top: 12rpx;
          left: 12rpx;
        }
      }
      .same-row-input {
        width: 100%;
        height: 98rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .left-label {
          font-size: 28rpx;
          color: #2f3031;
          line-height: 42rpx;
          width: 55%;
        }
        .right-input {
          width: 45%;
          display: flex;
          flex-direction: row;
          align-items: center;
          position: relative;
          .input-value {
            width: 100%;
            height: 100%;
            font-size: 24rpx;
            color: #2f3031;
            line-height: 36rpx;
            box-sizing: border-box;
            text-align: right;
          }
          .input-unit {
            font-size: 28rpx;
            color: #2f3031;
            position: absolute;
            right: 0rpx;
          }
        }
      }
      .pr32 {
        padding-right: 32rpx;
      }
      .radio-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 98rpx;
        .radio-left {
          font-size: 28rpx;
          color: #2f3031;
          line-height: 42rpx;
        }
        .radio-right {
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 100%;
        }
      }
      .scale-row {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin-top: 28rpx;
        margin-bottom: 29rpx;
        .scale-radio-item {
          margin-right: 102rpx;
          margin-left: 0rpx;
        }
      }
      .radio-item {
        display: flex;
        height: 100%;
        flex-direction: row;
        align-items: center;
        margin-left: 24rpx;
        box-sizing: border-box;
        padding: 5rpx 10rpx 5rpx 0rpx;
        .icon-checkbox {
          width: 24rpx;
          height: 24rpx;
          margin-right: 12rpx;
        }
        .radio-txt {
          font-size: 28rpx;
          color: rgba(47, 48, 49, 0.75);
          line-height: 42rpx;
        }
      }
      .notes-desc {
        font-size: 24rpx;
        color: rgba(47, 48, 49, 0.5);
        line-height: 36rpx;
        margin-top: 8rpx;
      }
      .second-title {
        font-size: 28rpx;
        line-height: 42rpx;
      }
      .w90 {
        width: 100%;
      }
      .unit {
        font-size: 28rpx;
        color: #2f3031;
        position: absolute;
        right: 24rpx;
        top: 18rpx;
      }
      .upload-box {
        width: 100%;
        height: 160rpx;
        margin-top: 24rpx;
        background: #f3f8ff;
        border-radius: 24rpx;
        border: 1rpx dashed #d6d8e2;
        display: flex;
        align-items: center;
        justify-content: center;
        .upload-btn {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          width: 207rpx;
          height: 56rpx;
          background: #ffffff;
          border-radius: 44rpx;
          border: 1rpx solid #e5e6e6;
          font-size: 24rpx;
          color: rgba(47, 48, 49, 0.75);
          line-height: 36rpx;
        }
        .upload-name {
          color: #2f3031;
          font-size: 24rpx;
          line-height: 36rpx;
          word-break: break-all;
          padding: 0 20rpx;
        }
      }
    }
    .person-box {
      width: 100%;

      .team-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        .team-item {
          width: 100%;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border-radius: 24rpx;
          box-sizing: border-box;
          padding: 24rpx;
          margin-bottom: 24rpx;
          .team-info {
            display: flex;
            flex-direction: row;
            align-items: center;
            .team-info_left {
              width: 64rpx;
              height: 64rpx;
              margin-right: 24rpx;
              border-radius: 12rpx;
            }
            .team-info_right {
              display: flex;
              flex-direction: column;
              .info-row {
                display: flex;
                flex-direction: row;
                align-items: center;
                margin-bottom: 12rpx;
                .info-label {
                  font-size: 28rpx;
                  color: rgba(47, 48, 49, 0.5);
                  line-height: 42rpx;
                }
                .info-value {
                  font-size: 28rpx;
                  color: #2f3031;
                  line-height: 42rpx;
                }
              }
            }
          }
          .team-menu {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;
            width: 100%;
            margin-top: 16rpx;
            .menu-item {
              width: 140rpx;
              height: 56rpx;
              background: #ffffff;
              border-radius: 28rpx;
              border: 1rpx solid #e5e6e6;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 24rpx;
              color: rgba(47, 48, 49, 0.75);
              line-height: 36rpx;
              margin-left: 24rpx;
            }
          }
        }
      }
      .add-member-box {
        width: 100%;
        height: 103rpx;
        background: #ffffff;
        border-radius: 10rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        box-sizing: border-box;
        padding-left: 44rpx;
        font-size: 28rpx;
        line-height: 32rpx;
        .icon-add-member {
          width: 32rpx;
          height: 32rpx;
          margin-right: 20rpx;
        }
        .blue-font {
          color: #2969ff;
          font-weight: bold;
        }
        .gray-font {
          color: #999999;
        }
      }
    }
    .pt24 {
      padding-top: 24rpx;
    }
  }
  .empty-box {
    width: 100%;
    height: 152rpx;
  }
  .foot-box {
    width: 100%;
    height: 152rpx;
    position: fixed;
    left: 0;
    bottom: 0;
    background: #ffffff;
    box-sizing: border-box;
    padding: 32rpx 32rpx 0 32rpx;
    z-index: 66;
    .next-btn {
      width: 100%;
      height: 88rpx;
      background: #2969ff;
      border-radius: 12rpx;
      font-weight: bold;
      font-size: 32rpx;
      color: #ffffff;
      line-height: 48rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
