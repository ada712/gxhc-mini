<template>
  <view class="wripper">
    <view class="content">
      <view class="input-module">
        <view class="same-title"
          >选择发放的积分用户<text class="must">*</text></view
        >
        <view class="input-box">
          <image
            :src="imgPath+'/icons/icon-search-gray.png'"
            class="icon-search"
          />
          <input
            type="text"
            maxlength="30"
            class="same-input w65"
            placeholder="请输入用户的名字"
            placeholder-style="font-size: 24rpx;color: rgba(47,48,49,0.5);line-height: 36rpx;"
            :value="searchText"
            bindinput="handleInputName"
            bindfocus="handleFocusName"
          />
          <view
            class="search-btn"
            v-if="showNameList"
            @click="hanldeHideSearchBox"
            >取消</view
          >
        </view>
        <view class="search-module" v-if="showNameList">
          <scroll-view scroll-x="false" scroll-y="true" class="list">
            <block v-for="(item,key) in richNames" :key="key">
              <rich-text
                class="item"
                :nodes="item.html"
                @click="handleSureName"
                data-item="{{item}}"
              ></rich-text>
            </block>
          </scroll-view>
        </view>
      </view>
      <view class="input-module">
        <view class="same-title"
          >积分类型<text class="note">（单选）</text
          ><text class="must">*</text></view
        >
        <radio-group
          class="radio-group"
          name="activityType"
          bindchange="radioTypeChange"
        >
          <label class="radio-label" v-for="(item,key) in pointTypes" :key="key">
            <radio :value="item.value" color="#2969FF" />{{ item.name }}
          </label>
        </radio-group>
      </view>
      <view class="input-module">
        <view class="same-title mb8"
          >获得的积分值<text class="must">*</text></view
        >
        <view class="note"
          >只有积分兑换，积分核销时是负值，其他均为增加积分。只能输入数字，负号、和至多两位小数</view
        >
        <view class="note" v-if="applyParams.type == '1'"
          >名誉理事长：500；理事长：300；常务理事：250；秘书长：150；理事会秘书：100
        </view>
        <view class="note" v-if="applyParams.type == '2'"
          >参加项目竞赛担任评委：30；参加理事会论坛担任嘉宾：30；参加理事会制度研讨会：10；参加理事会事务工作评审：10；参加理事会品牌宣传活动：20；</view
        >
        <view class="note" v-if="applyParams.type == '3'"
          >成功发起：200；获得理事会投资股比：3%-6% 100；6%-10% 150；>10%
          250；落地理事会合作产业园：50；</view
        >
        <view class="input-box">
          <input
            type="text"
            maxlength="6"
            class="same-input"
            placeholder="请输入积分（支持两位小数和负号）"
            placeholder-style="font-size: 24rpx;color: rgba(47,48,49,0.5);line-height: 36rpx;"
            :value="applyParams.points"
            bindblur="checkPointBlur"
            bindinput="handleInputPoint"
          />
        </view>
      </view>
      <view class="input-module mb32">
        <view class="same-title">积分补充说明<text class="must">*</text></view>
        <view class="textarea-box">
          <textarea
            type="text"
            maxlength="80"
            class="same-textarea"
            placeholder="简述说明申报的积分，例如：推荐了XXX项目在理事会成功发起..."
            placeholder-style="font-size: 26rpx;color: rgba(47,48,49,0.5);"
            :value="applyParams.description"
            bindinput="handleInputDescription"
          >
          </textarea>
          <view class="min100">{{ applyParams.description.length }}/80</view>
        </view>
      </view>
      <view class="submit" @click="chekcData">提交</view>
    </view>
  </view>
</template>

<script>
import { imgUrls } from "@/config/app";
export default {
  data: function () {
    return {
      imgPath: imgUrls,
      pointTypes: [
        { name: "职务积分", value: "1" },
        { name: "活动参与", value: "2" },
        { name: "项目推荐", value: "3" },
        { name: "其他", value: "4" },
        { name: "积分兑换", value: "5" },
        { name: "积分继承", value: "6" },
        { name: "积分核销", value: "7" },
      ],
      applyParams: {
        userId: "",
        userName: "",
        points: "",
        type: "",
        description: "",
      },
      searchText: "",
      userList: [],
      richNames: [],
      showNameList: false,
      searchButtonText: "取消",
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.wripper {
  width: 100%;
  box-sizing: border-box;
  padding: 24rpx;
  .content {
    width: 100%;
    background-color: #ffffff;
    border-radius: 24rpx;
    box-sizing: border-box;
    padding: 24rpx 24rpx 48rpx 24rpx;
    .input-module {
      margin-bottom: 24rpx;
      width: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
      .same-title {
        margin-bottom: 16rpx;
        font-size: 32rpx;
        color: #2f3031;
        line-height: 48rpx;
        font-weight: bold;
      }
      .mb8 {
        margin-bottom: 8rpx !important;
      }

      .must {
        color: red;
      }
      .note {
        font-size: 24rpx;
        color: rgba(47, 48, 49, 0.5);
        line-height: 36rpx;
        margin-bottom: 16rpx;
      }
      .input-box {
        width: 100%;
        height: 72rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        background: #ffffff;
        border-radius: 12rpx;
        border: 1rpx solid #e5e6e6;
        .icon-search {
          width: 28rpx;
          height: 28rpx;
          margin-right: 15rpx;
          margin-left: 27rpx;
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
      }
      .same-input {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding-left: 12rpx;
        font-size: 28rpx;
        color: #2f3031;
        font-weight: bold;
        line-height: 42rpx;
      }
      .w65 {
        width: 70%;
      }
      .radio-group {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }

      /* 修改radio的默认样式 */
      radio .wx-radio-input {
        border-radius: 50%; /* 圆角 */
        width: 20px; /* 宽度 */
        height: 20px; /* 高度 */
      }

      radio .wx-radio-input.wx-radio-input-checked {
        background-color: #2969ff; /* 选中后的背景色 */
        border-color: #2969ff; /* 选中后的边框色 */
      }

      radio .wx-radio-input.wx-radio-input-checked::before {
        width: 18px; /* 选中后对勾的大小 */
        height: 26px; /* 选中后对勾的大小 */
        line-height: 24px; /* 选中后对勾的行高 */
        text-align: center; /* 选中后对勾的对齐方式 */
        font-size: 18px; /* 选中后对勾的字体大小 */
        color: #ffffff; /* 选中后对勾的颜色 */
      }

      /* radio标签样式 */
      .radio-label {
        display: flex;
        width: 50%;
        align-items: center;
        margin-bottom: 16px;
        color: #2f3031;
        font-size: 28rpx;
        line-height: 42rpx;
      }
      .textarea-box {
        width: 100%;
        height: 240rpx;
        border-radius: 12rpx;
        border: 1rpx solid #e5e6e6;
        position: relative;
      }
      .same-textarea {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 16rpx 20rpx 32rpx 20rpx;
        font-size: 28rpx;
        color: #2f3031;
      }
      .min100 {
        position: absolute;
        bottom: 4rpx;
        right: 20rpx;
        font-size: 24rpx;
        color: rgba(47, 48, 49, 0.5);
        line-height: 36rpx;
      }
    }
    .search-module {
      background-color: #ffffff;
      width: 100%;
      position: absolute;
      left: 0;
      top: 142rpx;
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
    .mb32 {
      margin-bottom: 32rpx;
    }
    .submit {
      width: 100%;
      height: 88rpx;
      color: #ffffff;
      background: #2969ff;
      border-radius: 12rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
