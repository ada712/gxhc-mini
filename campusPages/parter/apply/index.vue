<template>
  <view class="apply-box">
    <view class="wirpper">
      <view class="content">
        <view class="input-module">
          <view class="same-title"
            >您的真实姓名<text class="must">*</text></view
          >
          <view class="input-box">
            <input
              type="text"
              maxlength="40"
              class="same-input"
              placeholder="请输入您的真实姓名"
              :value="applyParams.reallyName"
              bind:input="handleInputReallyName"
            />
          </view>
        </view>
        <view class="input-module">
          <view class="same-title">您的性别<text class="must">*</text></view>
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
              <text class="radio-txt active-txt">男</text>
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
              <text class="radio-txt">女</text>
            </view>
          </view>
        </view>

        <view class="input-module">
          <view class="same-title"
            >您的出生日期<text class="must">*</text></view
          >
          <picker
            mode="date"
            value="{{applyParams.birthday}}"
            start="1990-01-01"
            end="2045-09-01"
            fields="day"
            bindchange="bindBirthdayChange"
            class="input-box"
          >
            <view class="default-data" v-if="applyParams.birthday === ''"
              >请选择您的出生日期</view
            >
            <view class="birthday" v-if="applyParams.birthday">
              {{ applyParams.birthday }}
            </view>
          </picker>
        </view>

        <view class="input-module">
          <view class="same-title">您的手机号<text class="must">*</text></view>
          <view class="input-box">
            <input
              type="number"
              maxlength="11"
              class="same-input"
              placeholder="请输入您的手机号"
              :value="applyParams.mobile"
              bind:input="handleInputMobile"
            />
          </view>
        </view>

        <view class="input-module">
          <view class="same-title">您的微信号<text class="must">*</text></view>
          <view class="input-box">
            <input
              type="text"
              maxlength="40"
              class="same-input"
              placeholder="请输入您的微信号"
              :value="applyParams.wechatNum"
              bind:input="handleInputWechatId"
            />
          </view>
        </view>
        <view class="input-module">
          <view class="same-title"
            >您的微信昵称<text class="must">*</text></view
          >
          <view class="input-box">
            <input
              type="text"
              maxlength="40"
              class="same-input"
              placeholder="请输入您的微信昵称"
              :value="applyParams.wechatName"
              bind:input="handleInputWechatNick"
            />
          </view>
        </view>
        <view class="input-module">
          <view class="same-title"
            >您的电子邮箱<text class="must">*</text></view
          >
          <view class="input-box">
            <input
              type="text"
              maxlength="40"
              class="same-input"
              placeholder="请输入您的电子邮箱"
              :value="applyParams.email"
              bind:input="handleInputEmail"
            />
          </view>
        </view>
        <view class="input-module">
          <view class="same-title"
            >您的最高学历<text class="must">*</text></view
          >
          <view class="subtitle">学历：大专，本科，硕士，博士及以上</view>
          <view class="input-box">
            <input
              type="text"
              maxlength="10"
              class="same-input"
              placeholder="请输入您的最高学历"
              :value="applyParams.highestEdu"
              bind:input="handleInputHightEdu"
            />
          </view>
        </view>
        <view class="input-module">
          <view class="same-title"
            >您当前所在的学校名称或者毕业院校名称（毕业两年以内）<text
              class="must"
              >*</text
            ></view
          >
          <view class="input-box">
            <input
              type="text"
              maxlength="60"
              class="same-input"
              placeholder="请输入您的学校名称"
              :value="applyParams.schoolName"
              bind:input="handleInputSchoolName"
            />
          </view>
        </view>

        <view class="input-module">
          <view class="same-title"
            >您的专业名称<text class="must">*</text></view
          >
          <view class="input-box">
            <input
              type="text"
              maxlength="40"
              class="same-input"
              placeholder="请输入您的专业"
              :value="applyParams.major"
              bind:input="handleInputMajor"
            />
          </view>
        </view>
        <view class="input-module">
          <view class="same-title"
            >您的毕业时间<text class="must">*</text></view
          >
          <picker
            mode="date"
            :value="date"
            start="2021-09-01"
            end="2029-09-01"
            bindchange="bindGradYearChange"
            fields="year"
            class="input-box"
          >
            <view class="default-data" v-if="applyParams.gradYear === ''"
              >请选择您的毕业时间</view
            >
            <view class="birthday" v-if="applyParams.gradYear">
              {{ applyParams.gradYear }}
            </view>
          </picker>
        </view>

        <view class="input-module">
          <view class="same-title mb4"
            >简单介绍一下您自己<text class="must">*</text></view
          >
          <view class="subtitle"
            >简短介绍个人背景和兴趣，或创业过程，参与的项目经历、技术技能、期望收获等等，方便我们了解独特而有趣的您</view
          >
          <textarea
            maxlength="800"
            class="same-textarea"
            placeholder="请输入"
            :value="applyParams.introMyself"
            bind:input="handleInputSelf"
            placeholder-style="font-size:28rpx"
          ></textarea>
        </view>

        <view class="input-module">
          <view class="same-title"
            >为什么想要成为我们的一员呢？<text class="must">*</text></view
          >
          <textarea
            maxlength="800"
            class="same-textarea"
            placeholder="请输入"
            :value="applyParams.joinReason"
            bind:input="handleInputJoin"
            placeholder-style="font-size:28rpx"
          ></textarea>
        </view>
        <view class="input-module">
          <view class="same-title"
            >是否有推荐人<text class="must">*</text></view
          >
          <view class="sex-row">
            <view
              class="radio-item mr120 sex-radio-item"
              data-value="Y"
              @click="onChangeReferrer"
            >
              <image
                :src="
                  applyParams.hasReferrer == 'Y'
                    ? imgUrl + '/icons/icon-checkout-blue.png'
                    : imgUrl + '/icons/icon-checkout-gray.png'
                "
                class="icon-checkbox"
              />
              <text class="radio-txt active-txt">是</text>
            </view>
            <view class="radio-item" data-value="N" @click="onChangeReferrer">
              <image
                :src="
                  applyParams.hasReferrer == 'N'
                    ? imgUrl + '/icons/icon-checkout-blue.png'
                    : imgUrl + '/icons/icon-checkout-gray.png'
                "
                class="icon-checkbox"
              />
              <text class="radio-txt">否</text>
            </view>
          </view>
        </view>
        <block v-if="applyParams.hasReferrer == 'Y'">
          <view class="input-module">
            <view class="same-title"
              >推荐人姓名<text class="must">*</text></view
            >
            <view class="input-box">
              <input
                type="text"
                maxlength="40"
                class="same-input"
                placeholder="请输入推荐人姓名"
                :value="applyParams.referrerName"
                bind:input="handleInputReferrerName"
              />
            </view>
          </view>
          <view class="input-module">
            <view class="same-title mb4"
              >推荐人联系方式<text class="must">*</text></view
            >
            <view class="subtitle">推荐人的手机号或者微信号</view>
            <view class="input-box">
              <input
                type="text"
                maxlength="40"
                class="same-input"
                placeholder="请输入推荐人联系方式"
                :value="applyParams.referrerContact"
                bind:input="handleInputRecontact"
              />
            </view>
          </view>
        </block>
        <view class="input-module">
          <view class="same-title"
            >您通过什么方式了解到我们的<text class="must">*</text></view
          >
          <textarea
            maxlength="500"
            class="same-textarea"
            placeholder="请输入"
            :value="applyParams.howToKnow"
            bind:input="handleInputHowknow"
            placeholder-style="font-size:28rpx"
          ></textarea>
        </view>
        <view class="input-module">
          <view class="same-title">您想和我们说的悄悄话</view>
          <textarea
            maxlength="500"
            class="same-textarea"
            placeholder="请输入"
            :value="applyParams.whisper"
            bind:input="handleInputWhisper"
            placeholder-style="font-size:28rpx"
          ></textarea>
        </view>
        <view class="input-module">
          <view class="same-title mb4">上传简历</view>
          <view class="subtitle"
            >上传的格式支持：pdf，word，doc，docx。内容大小小于10M</view
          >
          <view class="upload-btn" @click="uploadChooseFile">
            <view class="choost-file" v-if="resumeFilePath == ''"
              >+选择文件</view
            >
            <view v-if="resumeFilePath">
              {{ resumeFileName }}
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="empty-box"></view>
    <view class="foot-box">
      <view class="submit-btn" @click="submitApplyData">提交</view>
    </view>
  </view>
</template>

<script>
import { imgUrls } from "@/config/app";
import { PARTNER_BASE_DATA } from "../../const/campus";
export default {
  data: function () {
    return {
      imgUrl: imgUrls,
      applyParams: PARTNER_BASE_DATA,
      resumeFilePath: "",
      resumeFileName: "",
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
