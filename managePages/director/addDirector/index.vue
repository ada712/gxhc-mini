<template>
  <view class="apply-box">
    <view class="wirpper">
      <view class="content">
        <view class="input-module">
          <view class="same-title"
            >理事成员姓名<text class="must">*</text></view
          >
          <view class="input-box">
            <input
              type="text"
              maxlength="40"
              class="same-input"
              placeholder="请输入理事姓名"
              :value="applyParams.name"
              @input="handleInputName"
            />
          </view>
        </view>

        <view class="input-module">
          <view class="same-title"
            >理事成员性别<text class="must">*</text></view
          >
          <view class="sex-row">
            <view
              class="radio-item mr120 sex-radio-item"
              data-value="male"
              @click="onChangeIsGender"
            >
              <image
                :src="
                  applyParams.gender == 'male'
                    ? imgUrl + '/icons/icon-checkout-blue.png'
                    : imgUrl + '/icons/icon-checkout-gray.png'
                "
                class="icon-checkbox"
              />
              <text
                class="radio-txt {{applyParams.gender =='male'?'active-txt':''}}"
                >男</text
              >
            </view>
            <view
              class="radio-item"
              data-value="female"
              @click="onChangeIsGender"
            >
              <image
                :src="
                  applyParams.gender == 'female'
                    ? imgUrl + '/icons/icon-checkout-blue.png'
                    : imgUrl + '/icons/icon-checkout-gray.png'
                "
                class="icon-checkbox"
              />
              <text
                class="radio-txt {{applyParams.gender =='female'?'active-txt':''}}"
                >女</text
              >
            </view>
          </view>
        </view>

        <view class="input-module">
          <view class="same-title">理事类别<text class="must">*</text></view>

          <radio-group
            class="radio-group"
            name="activityType"
            bindchange="radioTypeChange"
          >
            <label
              class="radio-label"
              v-for="(item, key) in directorTypes"
              :key="key"
            >
              <radio :value="item.value" color="#2969FF" />{{ item.name }}
            </label>
          </radio-group>
        </view>
        <view class="input-module">
          <view class="same-title"
            >个人对外标签<text class="must">*</text></view
          >
          <view class="subtitle">例如：xxx创始人</view>
          <view class="input-box">
            <input
              type="text"
              maxlength="80"
              class="same-input"
              placeholder="请输入理事的最闪亮的title"
              :value="applyParams.title"
              @input="handleInputTitle"
            />
          </view>
        </view>
        <!-- <view class="input-module">
      <view class="same-title">专业领域</view>
      <view class="subtitle">例如：天使投资人，人工智能行业领域专家，数据专家等</view>
      <view class="input-box">
        <input type="text" maxlength="80" class="same-input" placeholder="请输入理事擅长的领域" value="{{applyParams.major}}" @input="handleInputMajor" />
      </view>
    </view> -->

        <view class="input-module">
          <view class="same-title mb4"
            >个人简介<text class="must">*</text></view
          >
          <view class="subtitle">字数最多在200字左右</view>
          <textarea
            maxlength="800"
            class="same-textarea"
            placeholder="请输入"
            :value="applyParams.introduction"
            @input="handleInputIntroduction"
            placeholder-style="font-size:28rpx"
          ></textarea>
        </view>

        <view class="input-module">
          <view class="same-title mb4"
            >个人形象照<text class="must">*</text></view
          >
          <view class="subtitle"
            >上传的照片不得大于10M，上传的照片尺寸240*222</view
          >
          <view class="upload-btn" bindtap="uploadChooseFile">
            <view class="choost-file" v-if="photoFilePath == ''"
              >+选择照片</view
            >
            <view class="file-name" v-if="photoFilePath">
              {{ photoFileName }}
            </view>
          </view>
        </view>
        <view class="input-module">
          <view class="same-title">理事成员手机号</view>
          <view class="input-box">
            <input
              type="number"
              maxlength="11"
              class="same-input"
              placeholder="请输入11位手机号"
              :value="applyParams.phone"
              @input="handleInputMobile"
            />
          </view>
        </view>

        <view class="input-module">
          <view class="same-title">常驻城市</view>
          <view class="input-box">
            <input
              type="text"
              maxlength="40"
              class="same-input"
              placeholder="请输入常驻城市"
              :value="applyParams.city"
              @input="handleInputCity"
            />
          </view>
        </view>

        <view class="input-module">
          <view class="same-title">详细地址</view>
          <view class="subtitle">邮寄东西时使用</view>
          <view class="input-box">
            <input
              type="text"
              maxlength="100"
              class="same-input"
              placeholder="请输入理事的地址"
              :value="applyParams.address"
              @input="handleInputAddress"
            />
          </view>
        </view>

        <view class="input-module">
          <view class="same-title">备注</view>
          <textarea
            maxlength="500"
            class="same-textarea"
            placeholder="请输入补充内容"
            :value="applyParams.remark"
            @input="handleInputRemark"
            placeholder-style="font-size:28rpx"
          ></textarea>
        </view>
      </view>
    </view>

    <view class="empty-box"></view>
    <view class="foot-box">
      <view class="submit-btn" @click="handleCheckData">提交</view>
    </view>
  </view>
</template>

<script>
import { imgUrls } from "@/config/app";
export default {
  data: function () {
    return {
      imgUrl: imgUrls,
      applyParams: {
        name: "",
        gender: "",
        phone: "",
        city: "",
        address: "",
        position: "",
        title: "",
        major: "",
        photo: "",
        introduction: "",
        status: "normal",
        remark: "",
        joinDate: "",
        userId: "",
        openid: "",
      },
      directorTypes: [
        { name: "名誉理事长", value: "reputation" },
        { name: "常务理事长", value: "executive" },
        { name: "理事会顾问", value: "consultant" },
        { name: "理事成员", value: "member" },
      ],
      photoFilePath: "",
      photoFileName: "",
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
page {
  background: #f4f4f4;
}
.apply-box {
  width: 100%;
  position: relative;
  .wirpper {
    width: 100%;
    box-sizing: border-box;
    padding: 24rpx;
    .content {
      width: 100%;
      border-radius: 24rpx;
      background: #ffffff;
      box-sizing: border-box;
      padding: 32rpx 24rpx;
      .input-module {
        display: flex;
        flex-direction: column;
        margin-bottom: 24rpx;
        .same-title {
          font-size: 32rpx;
          color: #2f3031;
          line-height: 48rpx;
          font-weight: bold;
          margin-bottom: 16rpx;
        }
        .must {
          font-size: 32rpx;
          color: #ff0000;
          line-height: 48rpx;
          font-weight: bold;
          margin-left: 8rpx;
        }
        .input-box {
          width: 100%;
          height: 72rpx;
          background: #ffffff;
          border-radius: 12rpx;
          border: 1rpx solid #e5e6e6;
          position: relative;
          .same-input {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding-left: 16rpx;
            color: #2f3031;
            display: flex;
            flex-direction: row;
            align-items: center;
            font-size: 28rpx;
          }
        }

        .sex-row {
          display: flex;
          flex-direction: row;
          align-items: center;
          .radio-item {
            display: flex;
            flex-direction: row;
            align-items: center;
            box-sizing: border-box;
            padding: 1rpx 30rpx 1rpx 2rpx;
          }
          .icon-checkbox {
            width: 24rpx;
            height: 24rpx;
            margin-right: 12rpx;
          }
          .mr120 {
            margin-right: 100rpx;
          }
          .radio-txt {
            font-size: 28rpx;
            color: rgba(47, 48, 49, 0.75);
            line-height: 42rpx;
          }
          .active-txt {
            color: #2f3031;
          }
        }
        .birthday {
          width: 100%;
          height: 72rpx;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          box-sizing: border-box;
          padding-left: 14rpx;
          font-size: 28rpx;
          color: #2f3031;
        }
        .subtitle {
          font-size: 24rpx;
          color: rgba(47, 48, 49, 0.5);
          line-height: 36rpx;
          margin-bottom: 16rpx;
        }
        .default-data {
          font-size: 28rpx;
          color: rgba(47, 48, 49, 0.5);
          line-height: 36rpx;
          width: 100%;
          height: 72rpx;
          display: flex;
          flex-direction: row;
          align-items: center;
          box-sizing: border-box;
          padding-left: 16rpx;
        }
        .upload-btn {
          width: 100%;
          height: 160rpx;
          background: #efefef;
          border-radius: 24rpx;
          border: 1rpx solid #d6d8e2;
          display: flex;
          align-items: center;
          justify-content: center;
          .choost-file {
            width: 207rpx;
            height: 56rpx;
            background: #ffffff;
            border-radius: 44rpx;
            border: 1rpx solid #e5e6e6;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24rpx;
            color: rgba(47, 48, 49, 0.75);
            line-height: 36rpx;
          }
          .file-name {
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            padding: 24rpx;
          }
        }
        .mb4 {
          margin-bottom: 4rpx !important;
        }
        .same-textarea {
          width: 100%;
          height: 240rpx;
          box-sizing: border-box;
          padding: 12rpx;
          background: #ffffff;
          border-radius: 12rpx;
          border: 1rpx solid #e5e6e6;
        }
      }
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
  }
  .empty-box {
    width: 100%;
    height: 170rpx;
  }
  .foot-box {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    padding: 32rpx 32rpx 52rpx 32rpx;
    background: #ffffff;
    z-index: 88;
    .submit-btn {
      width: 100%;
      height: 88rpx;
      background: #2969ff;
      border-radius: 12rpx;
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
