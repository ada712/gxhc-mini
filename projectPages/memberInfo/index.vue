<template>
  <view class="wripper">
    <view class="content">
      <view class="same-module">
        <view class="input-moudle">
          <view class="label-row">成员姓名<text class="sup">*</text></view>
          <view class="input-box">
            <input
              type="text"
              class="same-input"
              placeholder="请输入成员的真实姓名"
              v-model="teamParams.name"
              maxlength="20"
              placeholder-style="font-size: 24rpx;color: rgba(47,48,49,0.5);font-weight:normal;"
            />
          </view>
        </view>
        <view class="input-moudle">
          <view class="label-row">出生日期<text class="sup">*</text></view>
          <picker
            mode="date"
            :value="date"
            start="1970-01-01"
            end="2040-12-31"
            @change="bindChangeBirthday"
          >
            <view class="picker-row">
              <view class="picker-value" v-if="!teamParams.birthday">
                <text class="default-value">请选择成员的出生日期</text>
              </view>
              <view
                class="picker-value avtive-value"
                v-if="teamParams.birthday"
              >
                {{ teamParams.birthday }}
              </view>
              <image
                :src="imgUrl + '/icons/icon-gray-right2.png'"
                class="icon-right mr24"
              />
            </view>
          </picker>
        </view>
        <view class="input-moudle">
          <view class="label-row"
            >在团队中担任的主要职位<text class="sup">*</text></view
          >
          <picker
            mode="selector"
            :value="index"
            :range="mainPositions"
            @change="bindPositionChange"
          >
            <view class="picker-row">
              <view class="picker-value" v-if="!teamParams.position">
                <text class="default-value">请选择成员的主要职位</text>
              </view>
              <view
                class="picker-value avtive-value"
                v-if="teamParams.position"
              >
                {{ teamParams.position }}
              </view>
              <image
                :src="imgUrl + '/icons/icon-gray-right2.png'"
                class="icon-right mr24"
              />
            </view>
          </picker>
        </view>
        <view class="input-moudle">
          <view class="label-row">若兼任其他职位，请选择</view>
          <picker
            mode="selector"
            :value="index"
            :range="otherPositions"
            @change="bindPartPositionChange"
          >
            <view class="picker-row">
              <view class="picker-value" v-if="!teamParams.partPosition">
                <text class="default-value"
                  >如有兼职，请选择成员兼职的职位</text
                >
                <image
                  :src="imgUrl + '/icons/icon-gray-right2.png'"
                  class="icon-right mr24"
                />
              </view>
              <view
                class="picker-value avtive-value"
                v-if="teamParams.partPosition"
              >
                {{ teamParams.partPosition }}
              </view>
            </view>
          </picker>
        </view>
        <view class="input-moudle">
          <view class="label-row">当前职业状态<text class="sup">*</text></view>
          <picker
            mode="selector"
            :value="index"
            range-key="name"
            :range="careerOptions"
            @change="bindCareerChange"
          >
            <view class="picker-row">
              <view class="picker-value" v-if="!teamParams.careerStatus">
                <text class="default-value">请选择</text>
              </view>
              <view
                class="picker-value avtive-value"
                v-if="teamParams.careerStatus"
              >
                {{ teamParams.careerStatusName }}
              </view>
              <image
                :src="imgUrl + '/icons/icon-gray-right2.png'"
                class="icon-right mr24"
              />
            </view>
          </picker>
        </view>

        <view class="input-moudle">
          <view class="label-row">项目参与程度<text class="sup">*</text></view>
          <view class="radio-group">
            <view
              class="custom-radio"
              @click="radioChangeHandler('projInvolvement', 'fullTime')"
            >
              <image
                :src="
                  teamParams.projInvolvement == 'fullTime'
                    ? '/static/images/icons/icon-checkout-blue.png'
                    : '/static/images/icons/icon-checkout-gray.png'
                "
                class="radio-img"
              />
              <text
                :class="
                  teamParams.projInvolvement == 'fullTime' ? 'checkedT-txt' : ''
                "
                >全职</text
              >
            </view>
            <view
              class="custom-radio"
              @click="radioChangeHandler('projInvolvement', 'partTime')"
            >
              <image
                :src="
                  teamParams.projInvolvement == 'partTime'
                    ? '/static/images/icons/icon-checkout-blue.png'
                    : '/static/images/icons/icon-checkout-gray.png'
                "
                class="radio-img"
              />
              <text
                :class="
                  teamParams.projInvolvement == 'partTime' ? 'checkedT-txt' : ''
                "
                >兼职</text
              >
            </view>
          </view>
        </view>
        <view class="input-moudle mb0">
          <view class="label-row"
            >是否为技术型创始人？<text class="sup">*</text></view
          >
          <view class="radio-group">
            <view
              class="custom-radio"
              @click="radioChangeHandler('isTechFounder', 'true')"
            >
              <image
                :src="
                  teamParams.isTechFounder == 'true'
                    ? '/static/images/icons/icon-checkout-blue.png'
                    : '/static/images/icons/icon-checkout-gray.png'
                "
                class="radio-img"
              />
              <text
                :class="
                  teamParams.isTechFounder == 'true' ? 'checkedT-txt' : ''
                "
                >是</text
              >
            </view>
            <view
              class="custom-radio"
              @click="radioChangeHandler('isTechFounder', 'false')"
            >
              <image
                :src="
                  teamParams.isTechFounder == 'false'
                    ? '/static/images/icons/icon-checkout-blue.png'
                    : '/static/images/icons/icon-checkout-gray.png'
                "
                class="radio-img"
              />
              <text
                :class="
                  teamParams.isTechFounder == 'false' ? 'checkedT-txt' : ''
                "
                >否</text
              >
            </view>
          </view>
        </view>
      </view>

      <view class="same-module">
        <view class="title-row" @click="goEducationExpericence">
          <view class="label-row w70">教育背景<text class="sup">*</text></view>
          <image :src="imgUrl + '/icons/icon-write-add.png'" class="icon-add" />
        </view>
        <view class="remark"
          >请按时间顺序填写教育经历，并填写院校全称（例如：清华大学），从本科开始填写，若硕士、博士阶段无可不填写。</view
        >
        <view class="education-list">
          <view
            class="education-item"
            v-for="(item, index) in educationList"
            :key="index"
            @click="handleUpdateEducation(item)"
          >
            <view class="education-item_left">
              <image
                :src="imgUrl + '/icons/icon-school-logo.png'"
                class="school-logo"
              />
              <view class="school-info">
                <view class="school-name">{{ item.schoolName }}</view>
                <view class="gray5-ft24 mb12">
                  <text v-if="index == 0">本科</text>
                  <text v-if="index == 1">硕士</text>
                  <text v-if="index == 2">博士</text>
                  <text v-if="item.major">·{{ item.major }}</text>
                </view>
                <view class="gray5-ft24"
                  >{{ item.startDate
                  }}<text v-if="item.endDate">至{{ item.endDate }}</text></view
                >
              </view>
            </view>
            <view class="education-item_right">
              <image
                :src="imgUrl + '/icons/icon-gray-right2.png'"
                class="icon-right"
              />
            </view>
            <image
              :src="imgUrl + '/icons/icon-del-blue.png'"
              class="icon-del"
              @click.stop="handleDelEduItem(index)"
            />
          </view>
        </view>
        <block v-if="educationList.length > 0">
          <view class="input-moudle">
            <view class="label-row"
              >如果成员在校期间曾获得重要奖项、发表过学术论文或参与过科研项目，请在此处提及</view
            >
            <view class="textarea-box">
              <textarea
                class="same-textarea"
                placeholder="请输入"
                placeholder-style="font-size: 24rpx;color: rgba(47,48,49,0.5);font-weight:normal;"
                v-model="teamParams.schoolHonor"
                maxlength="-1"
              ></textarea>
            </view>
          </view>
        </block>
      </view>
      <view class="same-module">
        <view class="title-row" @click="goWorkExpericence">
          <view class="label-row w70">工作履历<text class="sup">*</text></view>
          <image :src="imgUrl + '/icons/icon-write-add.png'" class="icon-add" />
        </view>
        <view class="remark">含企业、高校、政府单位等全职经历</view>
        <view class="input-moudle">
          <view class="label-row ft28"
            >之前是否有过创业经历？<text class="sup">*</text></view
          >
          <view class="radio-group">
            <view
              class="custom-radio"
              @click="radioChangeHandler('hasPastStartupExp', 'true')"
            >
              <image
                :src="
                  teamParams.hasPastStartupExp == 'true'
                    ? '/static/images/icons/icon-checkout-blue.png'
                    : '/static/images/icons/icon-checkout-gray.png'
                "
                class="radio-img"
              />
              <text
                :class="
                  teamParams.hasPastStartupExp == 'true' ? 'checkedT-txt' : ''
                "
                >是</text
              >
            </view>
            <view
              class="custom-radio"
              @click="radioChangeHandler('hasPastStartupExp', 'false')"
            >
              <image
                :src="
                  teamParams.hasPastStartupExp == 'false'
                    ? '/static/images/icons/icon-checkout-blue.png'
                    : '/static/images/icons/icon-checkout-gray.png'
                "
                class="radio-img"
              />
              <text
                :class="
                  teamParams.hasPastStartupExp == 'false' ? 'checkedT-txt' : ''
                "
                >否</text
              >
            </view>
          </view>
        </view>

        <block v-if="teamParams.hasPastStartupExp == 'true'">
          <view class="input-moudle">
            <view class="label-row"
              >请填写创立的公司名称<text class="sup">*</text></view
            >
            <view class="input-box">
              <input
                type="text"
                class="same-input"
                placeholder="请输入您创立的公司名称"
                v-model="teamParams.companyName"
                maxlength="20"
                placeholder-style="font-size: 24rpx;color: rgba(47,48,49,0.5);font-weight:normal;"
              />
            </view>
          </view>
          <view class="input-moudle">
            <view class="label-row">请简述该段创业经历的成果</view>
            <view class="textarea-box">
              <textarea
                class="same-textarea"
                placeholder="请输入"
                placeholder-style="font-size: 24rpx;color: rgba(47,48,49,0.5);font-weight:normal;"
                v-model="teamParams.achievement"
                maxlength="-1"
              ></textarea>
            </view>
          </view>
        </block>

        <view class="input-moudle">
          <view class="label-row ft28"
            >之前是否有过职业经历？<text class="sup">*</text></view
          >
          <view class="radio-group">
            <view
              class="custom-radio"
              @click="radioChangeHandler('isWorkExperience', 'true')"
            >
              <image
                :src="
                  teamParams.isWorkExperience == 'true'
                    ? '/static/images/icons/icon-checkout-blue.png'
                    : '/static/images/icons/icon-checkout-gray.png'
                "
                class="radio-img"
              />
              <text
                :class="
                  teamParams.isWorkExperience == 'true' ? 'checkedT-txt' : ''
                "
                >是</text
              >
            </view>
            <view
              class="custom-radio"
              @click="radioChangeHandler('isWorkExperience', 'false')"
            >
              <image
                :src="
                  teamParams.isWorkExperience == 'false'
                    ? '/static/images/icons/icon-checkout-blue.png'
                    : '/static/images/icons/icon-checkout-gray.png'
                "
                class="radio-img"
              />
              <text
                :class="
                  teamParams.isWorkExperience == 'false' ? 'checkedT-txt' : ''
                "
                >否</text
              >
            </view>
          </view>
        </view>

        <block v-if="teamParams.isWorkExperience == 'true'">
          <view class="remark"
            >若您有一段或多段以上职业经历（非创业经历），请点击右上角“+”添加，最多添加3个。</view
          >
          <view
            class="work-list"
            v-for="(w, index) in workExpList"
            :key="index"
          >
            <view class="work-item" @click="handleUpdateWorkExp(w)">
              <view class="work-row mb4">
                <view class="work-row-left"
                  >{{ w.workUnit }}
                  <image
                    :src="imgUrl + '/icons/icon-gray-right2.png'"
                    class="icon-work-right"
                  />
                </view>
              </view>
              <view class="work-row gray75-ft22">
                {{ w.position }}
                <view class="work-data">
                  <text v-if="w.startDate">{{ w.startDate }}</text>
                  <text v-if="w.endDate">至 {{ w.endDate }}</text>
                </view>
              </view>
              <view class="work-row gray75-ft22 mt16 sheng">{{
                w.workContent
              }}</view>
              <image
                :src="imgUrl + '/icons/icon-del-blue.png'"
                class="icon-del"
                @click.stop="handleDelWorkItem(index)"
              />
            </view>
          </view>
        </block>

        <block v-if="teamParams.isWorkExperience == 'false'">
          <view class="label-row ft28"
            >若你暂无创业/工作经历，请列举你过去的实习经历</view
          >
          <view class="remark"
            >若您有一段或多段以上实习经历，请点击工作履历右上角“+”添加，最多添加3个。</view
          >
          <!--实习经历列表  -->
          <view
            class="work-list"
            v-for="(p, index) in practiceList"
            :key="index"
          >
            <view class="work-item" @click="handleUpdatePracticeExp(p)">
              <view class="work-row mb4">
                <view class="work-row-left">{{ p.unitName }}</view>
                <view class="work-row-right">
                  <view
                    class="work-date gray75-ft22"
                    v-if="p.startDate || p.endDate"
                  >
                    <text v-if="p.startDate">
                      {{ p.startDate }}
                    </text>
                    <text v-if="p.endDate"> 至 {{ p.endDate }} </text>
                  </view>
                  <image
                    :src="imgUrl + '/icons/icon-gray-right2.png'"
                    class="icon-right mr0"
                  />
                </view>
              </view>
              <view
                class="work-row gray75-ft22 mb16 one-row-show"
                v-if="p.position"
                >{{ p.position }}</view
              >
              <view class="work-row gray75-ft22 sheng">{{ p.content }}</view>
              <image
                :src="imgUrl + '/icons/icon-del-blue.png'"
                class="icon-del"
                @click.stop="handleDelPracticeItem(index)"
              />
            </view>
          </view>
        </block>
      </view>

      <view class="same-module">
        <view class="input-moudle">
          <view class="label-row ft28"
            >你是否曾在国家级重点实验室或国家级研究机构工作过？如果有，请填写相关信息。<text
              class="sup"
              >*</text
            ></view
          >
          <view class="radio-group">
            <view
              class="custom-radio"
              @click="radioChangeHandler('isWorkKeyUnit', 'true')"
            >
              <image
                :src="
                  teamParams.isWorkKeyUnit == 'true'
                    ? '/static/images/icons/icon-checkout-blue.png'
                    : '/static/images/icons/icon-checkout-gray.png'
                "
                class="radio-img"
              />
              <text
                :class="
                  teamParams.isWorkKeyUnit == 'true' ? 'checkedT-txt' : ''
                "
                >是</text
              >
            </view>
            <view
              class="custom-radio"
              @click="radioChangeHandler('isWorkKeyUnit', 'false')"
            >
              <image
                :src="
                  teamParams.isWorkKeyUnit == 'false'
                    ? '/static/images/icons/icon-checkout-blue.png'
                    : '/static/images/icons/icon-checkout-gray.png'
                "
                class="radio-img"
              />
              <text
                :class="
                  teamParams.isWorkKeyUnit == 'false' ? 'checkedT-txt' : ''
                "
                >否</text
              >
            </view>
          </view>
        </view>
        <block v-if="teamParams.isWorkKeyUnit == 'true'">
          <view class="input-moudle">
            <view class="label-row"
              >国家级重点实验室或国家级研究机构全称<text class="sup"
                >*</text
              ></view
            >
            <view class="input-box">
              <input
                type="text"
                class="same-input"
                placeholder="请输入"
                v-model="teamParams.keyUnitName"
                maxlength="20"
                placeholder-style="font-size: 24rpx;color: rgba(47,48,49,0.5);font-weight:normal;"
              />
            </view>
          </view>
          <view class="input-moudle">
            <view class="label-row"
              >起始年月和结束年月<text class="sup">*</text></view
            >
            <view class="date-box">
              <picker
                mode="date"
                :value="date"
                start="1980-01-01"
                end="2045-09-01"
                @change="bindImportUnitStartDateChange"
                class="picker-half"
                fields="month"
              >
                <view class="picker-value" v-if="!teamParams.unitStartDate">
                  <text class="default-value">请选择</text>
                  <image
                    :src="imgUrl + '/icons/icon-gray-right2.png'"
                    class="icon-right mr24"
                  />
                </view>
                <view
                  class="picker-value avtive-value"
                  v-if="teamParams.unitStartDate"
                >
                  {{ teamParams.unitStartDate }}
                </view>
              </picker>
              <view class="link-txt">至</view>
              <picker
                mode="date"
                :value="date"
                start="1980-01-01"
                end="2045-09-01"
                @change="bindImportUnitEndDateChange"
                class="picker-half"
                fields="month"
              >
                <view class="picker-value" v-if="!teamParams.unitEndDate">
                  <text class="default-value">请选择</text>
                  <image
                    :src="imgUrl + '/icons/icon-gray-right2.png'"
                    class="icon-right mr24"
                  />
                </view>
                <view
                  class="picker-value avtive-value"
                  v-if="teamParams.unitEndDate"
                >
                  {{ teamParams.unitEndDate }}
                </view>
              </picker>
            </view>
          </view>

          <view class="input-moudle">
            <view class="label-row"
              >主要研究方向或项目，以及您在该实验室或研究机构中担任的角色或职责</view
            >
            <view class="textarea-box">
              <textarea
                class="same-textarea"
                placeholder="请输入"
                placeholder-style="font-size: 24rpx;color: rgba(47,48,49,0.5);font-weight:normal;"
                v-model="teamParams.keyUnitContent"
                maxlength="-1"
              ></textarea>
            </view>
          </view>
        </block>
      </view>
      <view class="same-module">
        <view class="input-moudle">
          <view class="label-row ft28"
            >你是否获得过国家级学术/技术/人才荣誉或称号？<text class="sup"
              >*</text
            ></view
          >
          <view class="radio-group">
            <view
              class="custom-radio"
              @click="radioChangeHandler('isNationTitle', 'true')"
            >
              <image
                :src="
                  teamParams.isNationTitle == 'true'
                    ? '/static/images/icons/icon-checkout-blue.png'
                    : '/static/images/icons/icon-checkout-gray.png'
                "
                class="radio-img"
              />
              <text
                :class="
                  teamParams.isNationTitle == 'true' ? 'checkedT-txt' : ''
                "
                >是</text
              >
            </view>
            <view
              class="custom-radio"
              @click="radioChangeHandler('isNationTitle', 'false')"
            >
              <image
                :src="
                  teamParams.isNationTitle == 'false'
                    ? '/static/images/icons/icon-checkout-blue.png'
                    : '/static/images/icons/icon-checkout-gray.png'
                "
                class="radio-img"
              />
              <text
                :class="
                  teamParams.isNationTitle == 'false' ? 'checkedT-txt' : ''
                "
                >否</text
              >
            </view>
          </view>
        </view>
        <block v-if="teamParams.isNationTitle == 'true'">
          <view class="input-moudle">
            <view class="label-row"
              >荣誉或称号名称（例如：中国科学院院士、国家杰出青年科学基金获得者等）：<text
                class="sup"
                >*</text
              ></view
            >
            <view class="add-hornor-row" @click="handleAddHornorTitle">
              <text>添加获得的荣誉或称号</text>
              <image
                :src="imgUrl + '/icons/icon-add-gray.png'"
                class="icon-add-gray"
              />
            </view>
            <view
              class="input-box"
              v-for="(item, index) in honorList"
              :key="index"
            >
              <input
                type="text"
                class="same-input"
                placeholder="请输入您获得的荣誉称号名称"
                v-model="honorList[index]"
                maxlength="60"
                placeholder-style="font-size: 24rpx;color: rgba(47,48,49,0.5);font-weight:normal;"
              />
            </view>
          </view>
        </block>
      </view>
    </view>
    <view class="empty-box"></view>
    <view class="foot">
      <view class="sumit" @click="checkData">提交</view>
    </view>
  </view>
</template>

<script>
import { imgUrls } from "@/config/app";
export default {
  data: function () {
    return {
      imgUrl: imgUrls,
      teamParams: {
        name: "",
        birthday: "",
        position: "",
        partPosition: "",
        careerStatus: "",
        careerStatusName: "",
        projInvolvement: "",
        isTechFounder: null,
        educationBg: [],
        schoolHonor: "",
        hasPastStartupExp: null,
        companyName: "",
        achievement: "",
        isWorkExperience: null,
        workExperiences: [],
        practiceExperiences: [],
        isWorkKeyUnit: null,
        keyUnitName: "",
        unitStartDate: "",
        unitEndDate: "",
        keyUnitContent: "",
        isNationTitle: null,
      },
      careerOptions: [
        { name: "全职创业", value: "setuping" },
        { name: "在职工作", value: "working" },
        { name: "在校学习", value: "studying" },
      ],
      mainPositions: ["CEO", "CTO", "CFO", "CMO", "COO", "其他"],
      otherPositions: ["CTO", "CFO", "CMO", "COO", "其他", "无"],
      educationList: [],
      workExpList: [],
      practiceList: [],
      pageStatus: "",
      teamList: [],
      honorList: [],
    };
  },
  onLoad(options) {
    console.log("添加成员信息页面", options);
    if (options?.pageStatus) {
      this.pageStatus = options.pageStatus;
    }
    if (options?.item) {
      this.handleConvertData(JSON.parse(options.item));
    }
  },
  onShow() {
    if (this.pageStatus !== "update") {
      const lists = [
        { key: "educationList", storageKey: "educationList" },
        { key: "workExpList", storageKey: "workExpList" },
        { key: "practiceList", storageKey: "practiceList" },
        { key: "teamList", storageKey: "teamList" },
      ];
      lists.forEach((list) => {
        // 获取存储的数据
        const rawData = uni.getStorageSync(list.storageKey);
        // 设置数据到组件状态中
        this[list.key] = rawData.length > 0 ? rawData : [];
        console.log(rawData, list.key);
      });
      const data = uni.getStorageSync("tempTeamParamData");
      if (data) {
        this.teamParams = JSON.parse(data);
      }
    }
  },
  methods: {
    handleConvertData(param) {
      this.teamParams = param;
      this.educationList = param.educationBg;
      this.workExpList = param.workExperiences;
      this.practiceList = param.practiceExperiences;
      console.log("handleConvertData==>", param);
      console.log("teamParams.isTechFounder==>", this.teamParams.isTechFounder);
      console.log("handleConvertData==>222", this);
    },
    bindChangeBirthday(e) {
      this.teamParams.birthday = e.detail.value;
    },
    bindPositionChange(e) {
      const position = this.mainPositions[e.detail.value];
      this.teamParams.position = position;
    },
    bindPartPositionChange(e) {
      const position = this.otherPositions[e.detail.value];
      this.teamParams.partPosition = position;
    },
    bindCareerChange(e) {
      const idx = e.detail.value;
      const { value, name } = this.careerOptions[idx];
      this.teamParams.careerStatus = value;
      this.teamParams.careerStatusName = name;
    },
    handleUpdateEducation(item) {
      this.handleNavigation(
        item,
        "/projectPages/eduExperience/index",
        "update"
      );
    },
    handleUpdateWorkExp(item) {
      this.handleNavigation(
        item,
        "/projectPages/workExperience/index",
        "update"
      );
    },
    handleUpdatePracticeExp(item) {
      this.handleNavigation(
        item,
        "/projectPages/practiceExperience/index",
        "update"
      );
    },
    bindImportUnitStartDateChange(e) {
      const startDate = e.detail.value;
      if (startDate > this.teamParams.unitEndDate) {
        uni.showToast({
          title: "开始时间不能大于结束时间",
          icon: "none",
        });
        return;
      }
      this.teamParams.unitStartDate = startDate;
    },
    bindImportUnitEndDateChange(e) {
      const endDate = e.detail.value;
      if (endDate < this.teamParams.unitStartDate) {
        uni.showToast({
          title: "结束时间不能小于开始时间",
          icon: "none",
        });
        return;
      }
      this.teamParams.unitEndDate = endDate;
    },
    handleAddHornorTitle() {
      console.log(this.honorList.length);
      if (this.honorList.length > 5) {
        uni.showToast({
          title: "最多只能添加6个",
          icon: "none",
        });
        return;
      }
      this.honorList.push("");
    },
    handleDeleteItem(listKey, idx) {
      if (idx >= 0 && idx < this[listKey].length) {
        const arr = this[listKey];
        arr.splice(idx, 1);
        uni.setStorageSync(listKey, arr);
        this[listKey] = arr;
      }
    },
    handleDelPracticeItem(index) {
      this.handleDeleteItem("practiceList", index);
    },
    handleDelWorkItem(index) {
      this.handleDeleteItem("workExpList", index);
    },
    handleDelEduItem(index) {
      this.handleDeleteItem("educationList", index);
    },
    radioChangeHandler(fieldName, value) {
      console.log("fieldName=>", fieldName);
      console.log("value=>", value);
      this.teamParams[fieldName] = value;
    },
    setStorageTempValue() {
      uni.setStorageSync("tempTeamParamData", JSON.stringify(this.teamParams));
    },
    handleNavigation(item, url, pageStatus) {
      this.setStorageTempValue();
      uni.navigateTo({
        url: `${url}?pageStaus=${pageStatus}&item=${JSON.stringify(item)}`,
      });
    },
    goEducationExpericence() {
      if (this.educationList.length < 3) {
        this.handleNavigation("", "/projectPages/eduExperience/index", "add");
      } else {
        uni.showToast({
          title: "教育背景目前有且仅支持填写3个",
          icon: "none",
        });
      }
    },
    goWorkExpericence() {
      const url =
        this.teamParams.isWorkExperience === "true"
          ? "/projectPages/workExperience/index"
          : "/projectPages/practiceExperience/index";
      this.handleNavigation("", url, "add");
    },
    checkData() {
      let {
        teamParams,
        educationList,
        pageStatus,
        teamList,
        honorList,
        workExpList,
      } = this;

      const {
        name,
        birthday,
        position,
        careerStatus,
        projInvolvement,
        isTechFounder,
        hasPastStartupExp,
        companyName,
        isWorkKeyUnit,
        unitStartDate,
        unitEndDate,
        keyUnitName,
        isNationTitle,
        isWorkExperience,
      } = teamParams;

      console.log("必填项:", teamParams);
      console.log("必填项:", teamList);
      const filteredHonorList = honorList.filter((item) => item !== "");

      if (!name) {
        uni.showToast({
          title: "请输入当前成员的真实姓名",
          icon: "none",
        });
        return;
      }
      if (!birthday) {
        uni.showToast({
          title: "请选择当前成员的出生日期",
          icon: "none",
        });
        return;
      }
      if (!position) {
        uni.showToast({
          title: "请选择当前成员担任的职位",
          icon: "none",
        });
        return;
      }
      if (!careerStatus) {
        uni.showToast({
          title: "请选择当前成员当前的职业状态",
          icon: "none",
        });
        return;
      }
      if (!projInvolvement) {
        uni.showToast({
          title: "请选择当前成员对该项目的参与程度",
          icon: "none",
        });
        return;
      }
      if (!isTechFounder) {
        uni.showToast({
          title: "请选择当前成员是否为技术型创始人",
          icon: "none",
        });
        return;
      }

      if (educationList.length === 0) {
        uni.showToast({
          title: "请填写成员的教育背景信息",
          icon: "none",
        });
        return;
      }

      if (hasPastStartupExp === null) {
        uni.showToast({
          title: "请选择成员是否有过创业经历",
          icon: "none",
        });
        return;
      }

      if (hasPastStartupExp === "true" && !companyName) {
        uni.showToast({
          title: "请填写创立的公司的名称",
          icon: "none",
        });
        return;
      }

      if (isWorkExperience == null) {
        uni.showToast({
          title: "请选择当前成员是否有过职业经历",
          icon: "none",
        });
        return;
      }
      if (isWorkExperience === "true" && workExpList.length == 0) {
        uni.showToast({
          title: "点击右上角加号，请至少填写一段职业经历",
          icon: "none",
        });
        return;
      }

      if (isWorkKeyUnit === null) {
        uni.showToast({
          title: "请选择成员是否在国家级重点实验室或机构工作过",
          icon: "none",
        });
        return;
      }

      if (isWorkKeyUnit === "true" && !keyUnitName) {
        uni.showToast({
          title: "请填写国家级重点实验室或国家级研究机构全称",
          icon: "none",
        });
        return;
      }
      if (isWorkKeyUnit === "true" && !unitStartDate) {
        uni.showToast({
          title: "请填写您在国家重点实验室工作时间",
          icon: "none",
        });
        return;
      }
      if (isWorkKeyUnit === "true" && !unitEndDate) {
        uni.showToast({
          title: "请填写您在国家重点实验室工作时间",
          icon: "none",
        });
        return;
      }

      if (isNationTitle === null) {
        uni.showToast({
          title: "请选择成员是否获得过国家级学术/技术/人才荣誉称号",
          icon: "none",
        });
        return;
      }

      if (isNationTitle === "true" && filteredHonorList.length == 0) {
        uni.showToast({
          title: "请填写您获取的国家级荣誉或称号名称",
          icon: "none",
        });
        return;
      }

      if (hasPastStartupExp === "false") {
        teamParams.companyName = "";
        teamParams.achievement = "";
      }

      teamParams.educationBg = educationList;
      teamParams.workExperiences = this.workExpList;
      teamParams.practiceExperiences = this.practiceList;
      teamParams.honorTitles = filteredHonorList;

      console.log("提交成员信息参数:", JSON.stringify(teamParams));

      if (pageStatus === "update") {
        const index = teamList.findIndex((item) => item.id === teamParams.id);
        if (index !== -1) {
          Object.assign(teamList[index], teamParams);
        }
      } else {
        const newParam = { id: new Date().getTime(), ...teamParams };
        teamList.push(newParam);
        uni.setStorageSync("teamList", teamList);
      }

      uni.removeStorageSync("tempTeamParamData");
      uni.navigateBack();
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
.wripper {
  width: 100%;
  position: relative;

  .content {
    width: 100%;
    box-sizing: border-box;
    padding: 24rpx;
    .same-module {
      width: 100%;
      background: #ffffff;
      border-radius: 24rpx;
      box-sizing: border-box;
      padding: 24rpx 24rpx 2rpx 24rpx;
      margin-bottom: 24rpx;
      .label-row {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-weight: bold;
        font-size: 32rpx;
        color: #2f3031;
        line-height: 48rpx;
      }
      .sup {
        color: #ff0000;
        margin-left: 6rpx;
      }
      .input-moudle {
        width: 100%;
        margin-bottom: 24rpx;

        .input-box {
          margin-top: 16rpx;
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-around;
          height: 72rpx;
          background: #ffffff;
          border-radius: 12rpx;
          border: 1rpx solid #e5e6e6;
          .same-input {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding-left: 16rpx;
            font-size: 24rpx;
            color: #2f3031;
            line-height: 36rpx;
          }
        }

        .w92 {
          width: 92% !important;
        }
      }
      .icon-right {
        width: 17rpx;
        height: 24rpx;
        margin-right: 16rpx;
      }
      .icon-work-right {
        width: 17rpx;
        height: 24rpx;
        margin-left: 16rpx;
      }
      .title-row {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
      .icon-add {
        width: 40rpx;
        height: 40rpx;
      }
      .icon-add-gray {
        width: 28rpx;
        height: 28rpx;
        margin-left: 12rpx;
      }
      .w70 {
        width: 70% !important;
      }
      .ft28 {
        font-size: 28rpx;
        line-height: 42rpx;
      }
      .remark {
        font-size: 24rpx;
        color: rgba(47, 48, 49, 0.5);
        line-height: 36rpx;
        margin-top: 16rpx;
        margin-bottom: 24rpx;
      }
      .textarea-box {
        width: 100%;
        height: 240rpx;
        background: #ffffff;
        border-radius: 12rpx;
        border: 1rpx solid #e5e6e6;
        margin-top: 16rpx;
      }
      .same-textarea {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 16rpx;
        color: #2f3031;
        font-size: 24rpx;
        line-height: 36rpx;
      }
      .date-box {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 16rpx;
        .picker-half {
          width: 300rpx;
          height: 72rpx;
          background: #ffffff;
          border-radius: 12rpx;
          border: 1rpx solid #e5e6e6;
        }
        .link-txt {
          font-size: 28rpx;
          color: #2f3031;
          line-height: 42rpx;
          font-weight: bold;
          margin-left: 13rpx;
          margin-right: 13rpx;
        }
      }
      .picker-row {
        width: 100%;
        height: 72rpx;
        background: #ffffff;
        border-radius: 12rpx;
        border: 1rpx solid #e5e6e6;
        margin-top: 16rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .default-value {
        color: rgba(47, 48, 49, 0.5);
      }
      .avtive-value {
        color: #2f3031;
      }
      .picker-value {
        width: 100%;
        height: 72rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding-left: 16rpx;
        font-size: 24rpx;
        line-height: 36rpx;
      }
      .mr24 {
        margin-right: 24rpx;
      }
      .education-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        .education-item {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          background: #f5f9fd;
          border-radius: 12rpx;
          box-sizing: border-box;
          padding: 18rpx 16rpx 18rpx 32rpx;
          margin-bottom: 24rpx;
          position: relative;

          .education-item_left {
            width: 90%;
            display: flex;
            flex-direction: row;
            align-items: center;
            .school-logo {
              width: 88rpx;
              height: 88rpx;
              margin-right: 32rpx;
            }
            .school-info {
              display: flex;
              flex-direction: column;

              .school-name {
                font-size: 28rpx;
                color: #2f3031;
                line-height: 42rpx;
                font-weight: bold;
                margin-bottom: 4rpx;
              }
              .gray5-ft24 {
                font-size: 24rpx;
                color: rgba(47, 48, 49, 0.5);
                line-height: 33rpx;
              }
              .mb12 {
                margin-bottom: 12rpx;
              }
            }
          }
          .education-item_right {
            width: 10%;
            height: 100rpx;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;
          }
        }
      }
      .work-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 6rpx;
        .work-item {
          width: 100%;
          margin-bottom: 24rpx;
          background: #f5f9fd;
          border-radius: 12rpx;
          box-sizing: border-box;
          padding: 24rpx 16rpx 24rpx 24rpx;
          position: relative;
        }
        .work-row {
          display: flex;
          width: 100%;
          flex-direction: row;
          align-items: center;

          .work-row-left {
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 58%;
            font-weight: bold;
            font-size: 28rpx;
            color: #2f3031;
            line-height: 42rpx;
            overflow: hidden; /* 隐藏超出的部分 */
            white-space: nowrap; /* 不允许换行 */
            text-overflow: ellipsis; /* 超出部分用省略号表示 */
          }
          .work-data {
            display: flex;
            margin-left: 24rpx;
            flex-direction: row;
            align-items: center;
          }
        }
        .one-row-show {
          overflow: hidden; /* 隐藏超出的部分 */
          white-space: nowrap; /* 不允许换行 */
          text-overflow: ellipsis; /* 超出部分用省略号表示 */
        }
        .mr0 {
          margin-right: 0rpx;
        }
        .mt16 {
          margin-top: 16rpx;
        }
        .gray75-ft22 {
          font-size: 22rpx;
          color: rgba(47, 48, 49, 0.75);
          line-height: 34rpx;
        }
        .mb4 {
          margin-bottom: 4rpx;
        }
        .mb16 {
          margin-bottom: 16rpx;
        }
        .sheng {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .icon-del {
      width: 32rpx;
      height: 32rpx;
      position: absolute;
      top: 0;
      right: 0;
    }
    .mb0 {
      margin-bottom: 0rpx !important;
    }
    .radio-group {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
      .custom-radio {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 28rpx;
        color: rgba(47, 48, 49, 0.75);
        line-height: 42rpx;
        box-sizing: border-box;
        padding-top: 16rpx;
        padding-bottom: 24rpx;
        width: 180rpx;
      }
      .radio-img {
        width: 26rpx;
        height: 26rpx;
        margin-right: 8rpx;
      }
      .checkedT-txt {
        color: #2f3031;
        font-weight: bold;
      }
    }
    .add-hornor-row {
      width: 100%;
      background-color: #f4f4f4;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      padding: 16rpx 0rpx;
      font-size: 28rpx;
      color: rgba(47, 48, 49, 0.75);
      line-height: 42rpx;
      border-radius: 16rpx;
      margin-top: 16rpx;
      margin-bottom: 16rpx;
    }

    .active-radio {
      font-weight: bold;
      color: #2f3031;
    }
  }
  .empty-box {
    width: 100%;
    height: 200rpx;
  }
  .foot {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 200rpx;
    background-color: #ffffff;
    box-sizing: border-box;
    padding: 32rpx;
    z-index: 99;
    .sumit {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #2969ff;
      border-radius: 12rpx;
      height: 88rpx;
      font-size: 32rpx;
      color: #ffffff;
      line-height: 48rpx;
      font-weight: bold;
    }
  }
}
</style>
