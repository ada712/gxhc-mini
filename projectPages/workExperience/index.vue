<template>
  <view class="wripper">
    <view class="content">
      <view class="same-module">
        <view class="input-moudle">
          <view class="label-row">任职单位<text class="sup">*</text></view>
          <view class="input-box">
            <input
              type="text"
              class="same-input w80"
              placeholder="请输入任职单位简称，例如：华为"
              v-model="workUnit"
              maxlength="40"
              placeholder-style="font-size: 24rpx;color: rgba(47,48,49,0.5);font-weight:normal;"
              @input="handleInputWorkName"
              @focus="handleFocusName"
            />
            <view
              class="search-btn"
              v-if="showSearchModule"
              @click="handleSureName"
              >{{ workUnit ? "确认" : "取消" }}</view
            >
          </view>

          <view class="search-module" v-if="showSearchModule">
            <scroll-view scroll-y class="list">
              <view v-for="(item, index) in richEnterprisesList" :key="index">
                <rich-text
                  class="item"
                  :key="index"
                  :nodes="item.html"
                  @click="changeEnteriseName(item)"
                ></rich-text>
              </view>
            </scroll-view>
          </view>
        </view>

        <view class="input-moudle">
          <view class="label-row">担任的职位<text class="sup">*</text></view>
          <view class="input-box">
            <input
              type="text"
              class="same-input"
              placeholder="请输入担任的职位"
              v-model="position"
              maxlength="30"
              placeholder-style="font-size: 24rpx;color: rgba(47,48,49,0.5);font-weight:normal;"
            />
          </view>
        </view>
        <view class="input-moudle">
          <view class="label-row">任职时间<text class="sup">*</text></view>
          <view class="date-box">
            <picker
              mode="date"
              :value="date"
              start="1980-01-01"
              end="2045-09-01"
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

        <view class="input-moudle">
          <view class="label-row"
            >请描述核心工作内容（包括参与的重大项目以及取得的重要成就）</view
          >
          <view class="textarea-box">
            <textarea
              class="same-textarea"
              placeholder="请输入"
              placeholder-style="font-size: 24rpx;color: rgba(47,48,49,0.5);font-weight:normal;"
              v-model="workContent"
              maxlength="-1"
            ></textarea>
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
import { getEnterprise } from "@/api/public";
export default {
  data: function () {
    return {
      imgUrl: imgUrls,
      workUnit: "",
      position: "",
      startDate: "",
      endDate: "",
      workContent: "",
      updateId: "",
      footLabel: "保存",
      pageStaus: "add",
      showSearchModule: false,
      enterpriseList: [],
      richEnterprises: [],
      workExpList: [],
    };
  },
  onLoad(options) {
      console.log("options=>", options);

    if (options && options.pageStaus) {
      const { pageStaus } = options;
      const footLabel = pageStaus === "add" ? "保存" : "修改";
      this.pageStaus = pageStaus;
      this.footLabel = footLabel;
    }
    if (options && options.item) {
      const tempItem = JSON.parse(options.item);
      console.log("实习页面tempItem=>", tempItem);
      this.workUnit = tempItem.workUnit;
      this.position = tempItem.position;
      this.startDate = tempItem.startDate;
      this.endDate = tempItem.endDate;
      this.workContent = tempItem.workContent;
      this.updateId = tempItem.id;
    }
    this.fetchEnterprises();
  },
  onShow() {
    let list = uni.getStorageSync("workExpList");
    this.workExpList = list.length > 0 ? list : [];
  },
  computed: {
    richEnterprisesList() {
      if (!this.workUnit) return this.richEnterprises;
      return this.enterpriseList
        .map((item) => {
          if (
            typeof item.name === "string" &&
            item.name.includes(this.workUnit)
          ) {
            // 使用正则表达式替换匹配的文本
            const highlighted = item.name.replace(
              new RegExp(this.workUnit, "gi"),
              (match) => `<span class="highlight">${this.workUnit}</span>`
            );
            return { ...item, html: highlighted };
          }
          return { ...item, html: item.name };
        })
        .filter((item) => {
          // 只保留包含搜索文本的项目
          return this.workUnit ? item.name.includes(this.workUnit) : true;
        });
    },
  },
  methods: {
    changeEnteriseName(item) {
      this.workUnit = item.name;
      this.showSearchModule = false;
    },
    handleSureName() {
      if (this.workUnit && this.workUnit.length < 2) {
        uni.showToast({
          title: "请输入完整的企业名称",
          icon: "none",
        });
        return;
      }
      this.showSearchModule = false;
    },
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
    handleInputWorkName() {
      this.showSearchModule = this.richEnterprisesList.length > 0;
    },
    handleFocusName() {
      this.showSearchModule = true;
    },
    handleEnteriseData(data) {
      const list = data.map((item) => ({ ...item, html: item.name }));
      this.enterpriseList = data;
      this.richEnterprises = list;
    },
    fetchEnterprises() {
      try {
        const enterpriseData = uni.getStorageSync("enterprises");
        console.log("缓存中的学校数据=》", enterpriseData.length);
        if (enterpriseData) {
          this.handleEnteriseData(enterpriseData);
        } else {
          console.log("我走请求缓存数据");
          getEnterprise().then((res) => {
            uni.setStorageSync("enterprises", res.data);
            this.handleEnteriseData(res.data);
          });
        }
      } catch (e) {
        console.error("读取缓存失败", e);
      }
    },
    checkData() {
      const {
        workUnit,
        position,
        startDate,
        endDate,
        workContent,
        pageStaus,
        updateId,
      } = this;
      let workExpList = this.workExpList;
      if (!workUnit) {
        uni.showToast({
          title: "请输入成员的任职单位名称",
          icon: "none",
        });
        return;
      }
      if (!position) {
        uni.showToast({
          title: "请输入成员的担任的职位",
          icon: "none",
        });
        return;
      }
      if (!startDate || !endDate) {
        uni.showToast({
          title: "请输入成员任职时间",
          icon: "none",
        });
        return;
      }

      if (pageStaus === "add") {
        const applyParam = {
          id: new Date().getTime(),
          workUnit,
          position,
          startDate,
          endDate,
          workContent,
        };
        workExpList.push(applyParam);
      } else {
        // 使用findIndex找到对应id的对象的索引
        const index = workExpList.findIndex((item) => item.id === updateId);
        // 如果找到了对应的索引，就修改该对象
        if (index !== -1) {
          workExpList[index].workUnit = workUnit;
          workExpList[index].position = position;
          workExpList[index].startDate = startDate;
          workExpList[index].endDate = endDate;
          workExpList[index].workContent = workContent;
        }
      }
      uni.setStorageSync("workExpList", workExpList);
      uni.navigateBack();
      console.log("hhh=>", this);
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

      .w92 {
        width: 92% !important;
      }
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
    .w80 {
      width: 80% !important;
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
