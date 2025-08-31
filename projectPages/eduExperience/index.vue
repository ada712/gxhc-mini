<template>
  <view class="wripper">
    <view class="content">
      <view class="same-module">
        <view class="input-moudle">
          <view class="label-row">就读院校<text class="sup">*</text></view>
          <view class="input-box">
            <input
              type="text"
              class="same-input w80"
              placeholder="请输入成员就读学校名称"
              v-model="schoolName"
              maxlength="40"
              placeholder-style="font-size: 24rpx;color: rgba(47,48,49,0.5);font-weight:normal;"
              @input="handleInputSchoolName"
              @focus="handleFocusSchoolName"
            />
            <view
              class="search-btn"
              v-if="showSearchModule"
              @click="handleSureSchoolName"
              >{{ schoolName ? "确认" : "取消" }}</view
            >
          </view>
          <view class="search-module" v-if="showSearchModule">
            <scroll-view scroll-y class="list">
              <view v-for="(item, index) in richScoolsList" :key="index">
                <rich-text
                  class="item"
                  :nodes="item.html"
                  :key="index"
                  @click="changeSchoolName(item)"
                ></rich-text>
              </view>
            </scroll-view>
          </view>
        </view>

        <view class="input-moudle">
          <view class="label-row">就读专业<text class="sup">*</text></view>
          <view class="input-box">
            <input
              type="text"
              class="same-input"
              placeholder="请输入成员就读专业名称"
              v-model="major"
              maxlength="30"
              placeholder-style="font-size: 24rpx;color: rgba(47,48,49,0.5);font-weight:normal;"
            />
          </view>
        </view>
        <view class="input-moudle">
          <view class="label-row">就读时间<text class="sup">*</text></view>
          <view class="date-box">
            <picker
              mode="date"
              :value="date"
              start="1980-09-01"
              end="2045-12-31"
              @change="bindStartDateChange"
              class="picker-half"
              fields="month"
            >
              <view class="picker-value" v-if="!startDate">
                <text class="default-value">请选择</text>
                <image
                  :src="imgUrl + '/icons/icon-gray-right2.png'"
                  class="icon-right mr24"
                />
              </view>
              <view class="picker-value avtive-value" v-if="startDate">
                {{ startDate }}
              </view>
            </picker>
            <view class="link-txt">至</view>
            <picker
              mode="date"
              :value="date"
              start="1980-01-01"
              end="2045-09-01"
              @change="bindEndDateChange"
              class="picker-half"
              fields="month"
            >
              <view class="picker-value" v-if="!endDate">
                <text class="default-value">请选择</text>
                <image
                  :src="imgUrl + '/icons/icon-gray-right2.png'"
                  class="icon-right mr24"
                />
              </view>
              <view class="picker-value avtive-value" v-if="endDate">
                {{ endDate }}
              </view>
            </picker>
          </view>
        </view>
      </view>
    </view>
    <view class="foot">
      <view class="sumit" @click="checkData">{{ footLabel }}</view>
    </view>
  </view>
</template>

<script>
import { imgUrls } from "@/config/app";
import { getColleges } from "@/api/public";
export default {
  data: function () {
    return {
      imgUrl: imgUrls,
      schoolName: "",
      major: "",
      startDate: "",
      endDate: "",
      pageStaus: "add",
      footLabel: "保存",
      educationList: [],
      updateId: "",
      showSearchModule: false,
      collegesList: [],
      searchBtnLabel: "取消",
    };
  },
  onLoad(options) {
    console.log("教育页面=>", options);
    const { pageStaus, item } = options;
    if (pageStaus) {
      this.pageStatus = pageStaus;
      this.footLabel = pageStaus === "add" ? "保存" : "修改";
    }
    if (item) {
      const tempItem = JSON.parse(item);
      this.schoolName = tempItem.schoolName;
      this.major = tempItem.major;
      this.startDate = tempItem.startDate;
      this.endDate = tempItem.endDate;
      this.updateId = tempItem.id;
    }
    this.fetchSchoolList();
  },

  onShow() {
    // 获取缓存中的历史数据
    const list = uni.getStorageSync("educationList");
    this.educationList = list.length > 0 ? list : [];
    let title = "";
    if (this.pageStatus === "add") {
      title =
        list.length === 2
          ? "硕士教育经历"
          : list.length === 3
          ? "博士教育经历"
          : "本科教育经历";
    } else {
      title = "修改教育经历";
    }
    uni.setNavigationBarTitle({ title });
  },
  computed: {
    richScoolsList() {
      if (!this.schoolName) return this.richScools;
      return this.collegesList
        .map((item) => {
          if (
            typeof item.name === "string" &&
            item.name.includes(this.schoolName)
          ) {
            // 使用正则表达式替换匹配的文本
            const highlighted = item.name.replace(
              new RegExp(this.schoolName, "gi"),
              (match) => `<span class="highlight">${this.schoolName}</span>`
            );
            return { ...item, html: highlighted };
          }
          return { ...item, html: item.name };
        })
        .filter((item) => {
          // 只保留包含搜索文本的项目
          return this.schoolName ? item.name.includes(this.schoolName) : true;
        });
    },
  },
  methods: {
    bindStartDateChange(e) {
      this.startDate = e.detail.value;
    },
    bindEndDateChange(e) {
      const endDate = e.detail.value;
      if (endDate < this.startDate) {
        uni.showToast({
          title: "结束时间小于开始时间，请重新选择",
          icon: "none",
        });
        return;
      }
      this.endDate = endDate;
    },
    handleInputSchoolName() {
      this.showSearchModule = this.richScoolsList.length > 0;
    },
    changeSchoolName(item) {
      this.showSearchModule = false;
      this.schoolName = item.name;
    },
    handleSureSchoolName() {
      if (this.schoolName && this.schoolName.length < 2) {
        uni.showToast({
          title: "请输入完整的学校名称",
          icon: "none",
        });
        return;
      }
      this.showSearchModule = false;
    },
    handleFocusSchoolName() {
      this.showSearchModule = true;
    },
    handleCollegesData(data) {
      const list = data.map((item) => ({ ...item, html: item.name }));
      this.collegesList = data;
      this.richScools = list;
    },
    fetchSchoolList() {
      try {
        const collegesData = uni.getStorageSync("colleges");
        console.log("缓存中的学校数据=》", collegesData.length);
        if (collegesData) {
          this.handleCollegesData(collegesData);
        } else {
          console.log("我走请求缓存数据");
          getColleges().then((res) => {
            uni.setStorageSync("colleges", res.data);
            this.handleCollegesData(res.data);
          });
        }
      } catch (e) {
        console.error("读取缓存失败", e);
      }
    },
    checkData() {
      const { schoolName, major, startDate, endDate, educationList, updateId } =
        this;

      if (!schoolName) {
        uni.showToast({
          title: "请输入学校名称",
          icon: "none",
        });
        return;
      }
      if (!major) {
        uni.showToast({
          title: "请输入就读专业",
          icon: "none",
        });
        return;
      }
      if (!startDate || !endDate) {
        uni.showToast({
          title: "请输入就读时间",
          icon: "none",
        });
        return;
      }

      const newItem = {
        id: updateId || new Date().getTime(),
        schoolName,
        major,
        startDate,
        endDate,
      };

      if (this.pageStatus === "add") {
        this.educationList.push(newItem);
      } else {
        const index = educationList.findIndex((item) => item.id === updateId);
        if (index !== -1) {
          this.educationList[index] = newItem;
        }
      }
      console.log("educationList", this.educationList);
      uni.setStorageSync("educationList", this.educationList);
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
    }
    .search-module {
      background-color: #ffffff;
      width: 100%;
      position: absolute;
      left: 0;
      top: 145rpx;
      z-index: 23;
      box-shadow: 0 8rpx 16rpx rgba(0, 0, 0, 0.2);
      .list {
        width: 100%;
        height: 350rpx;
        display: flex;
        flex-direction: column;
        .item {
          width: 100%;
          height: 90rpx;
          box-sizing: border-box;
          padding: 0 24rpx;
          font-size: 28rpx;
          line-height: 42rpx;
          color: #2f3031;
          display: flex;
          flex-direction: row;
          align-items: center;
          border-bottom: 1rpx solid #f4f4f4;
        }
      }
    }
    .highlight {
      font-weight: bold;
      color: #2969ff;
    }
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
      position: relative;
      .input-box {
        margin-top: 16rpx;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;

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
      .w80 {
        width: 80% !important;
      }

      .w92 {
        width: 92% !important;
      }
    }
    .search-btn {
      width: 120rpx;
      height: 70rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 32rpx;
      color: #2f3031;
      line-height: 48rpx;
    }
    .icon-right {
      width: 17rpx;
      height: 24rpx;
      margin-right: 16rpx;
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
      .picker-row {
        width: 100%;
        height: 72rpx;
        background: #ffffff;
        border-radius: 12rpx;
        border: 1rpx solid #e5e6e6;
        margin-top: 16rpx;
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
