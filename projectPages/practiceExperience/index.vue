<template>
  <view class="wripper">
    <view class="content">
      <view class="same-module">
        <view class="input-moudle">
          <view class="label-row">实习单位</view>
          <view class="input-box">
            <input
              type="text"
              class="same-input"
              placeholder="请输入成员实习单位名称"
              v-model="unitName"
              maxlength="40"
              placeholder-style="font-size: 24rpx;color: rgba(47,48,49,0.5);font-weight:normal;"
              bindinput="handleInputUnitName"
            />
          </view>
        </view>

        <view class="input-moudle">
          <view class="label-row">实习岗位</view>
          <view class="input-box">
            <input
              type="text"
              class="same-input"
              placeholder="请输入成员实习岗位名称"
              v-model="position"
              maxlength="30"
              placeholder-style="font-size: 24rpx;color: rgba(47,48,49,0.5);font-weight:normal;"
              bindinput="handleInputPosition"
            />
          </view>
        </view>
        <view class="input-moudle">
          <view class="label-row">实习时间</view>
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
          <view class="label-row">对实习核心工作内容做简要描述</view>
          <view class="textarea-box">
            <textarea
              class="same-textarea"
              placeholder="请输入"
              placeholder-style="font-size: 24rpx;color: rgba(47,48,49,0.5);font-weight:normal;"
              v-model="content"
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
export default {
  data: function () {
    return {
      imgUrl: imgUrls,
      unitName: "", // 实习单位
      position: "", // 实习岗位
      startDate: "",
      endDate: "",
      content: "", // 实习内容
      updateId: "",
      footLabel: "保存",
      pageStaus: "add",
      practiceList: [],
    };
  },
  onLoad(options) {
    if (options && options.pageStaus) {
      const { pageStaus } = options;
      const footLabel = pageStaus === "add" ? "保存" : "修改";
      this.pageStaus = pageStaus;
      this.footLabel = footLabel;
    }
    if (options && options.item) {
      const tempItem = JSON.parse(options.item);
      console.log("实习页面tempItem=>", tempItem);
      this.unitName = tempItem.unitName;
      this.position = tempItem.position;
      this.startDate = tempItem.startDate;
      this.endDate = tempItem.endDate;
      this.content = tempItem.content;
      this.updateId = tempItem.id;
    }
  },
  onShow() {
    let list = uni.getStorageSync("practiceList");
    this.practiceList = list.length > 0 ? list : [];
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
    checkData() {
      let {
        unitName,
        position,
        startDate,
        endDate,
        content,
        updateId,
        practiceList,
      } = this;
      if (!unitName && !position && !startDate && !endDate && !content) {
        uni.navigateBack();
        return;
      }

      if (this.pageStaus === "add") {
        const applyParam = {
          id: new Date().getTime(),
          unitName,
          position,
          startDate,
          endDate,
          content,
        };
        console.log(applyParam);
        this.practiceList.push(applyParam);
      } else {
        // 使用findIndex找到对应id的对象的索引
        const index = practiceList.findIndex((item) => item.id === updateId);
        // 如果找到了对应的索引，就修改该对象
        if (index !== -1) {
          this.practiceList[index].unitName = unitName;
          this.practiceList[index].position = position;
          this.practiceList[index].startDate = startDate;
          this.practiceList[index].endDate = endDate;
          this.practiceList[index].content = content;
        }
        // 打印修改后的数组，查看结果
        console.log(this.practiceList);
      }
      uni.setStorageSync("practiceList", this.practiceList);
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
