<!-- /Users/shenpeng/Desktop/project/gxhc-mini/managePages/director/addDirector/index.vue -->
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
                class="radio-txt"
                :class="{ 'active-txt': applyParams.gender == 'male' }"
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
                class="radio-txt"
                :class="{ 'active-txt': applyParams.gender == 'female' }"
                >女</text
              >
            </view>
          </view>
        </view>

        <view class="input-module">
          <view class="same-title">理事类别<text class="must">*</text></view>
          <radio-group class="radio-group" @change="radioTypeChange">
            <label
              class="radio-label"
              v-for="(item, key) in directorTypes"
              :key="key"
            >
              <radio
                :value="item.value"
                color="#2969FF"
                :checked="applyParams.type === item.value"
              />{{ item.name }}
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
          <view class="upload-btn" @click="uploadChooseFile">
            <view class="choost-file" v-if="!photoFilePath">+选择照片</view>
            <view class="file-name" v-else>
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
import { directorMemberAdd } from "@/api/gxhc";
import { HTTP_REQUEST_URL, TOKENNAME } from "@/config/app.js";

export default {
  data: function () {
    return {
      imgUrl: imgUrls,
      applyParams: {
        name: "",
        gender: "",
        directorType: "",
        phone: "",
        city: "",
        address: "",
        title: "",
        introduction: "",
        photo: "",
        remark: "",
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
  methods: {
    handleInputName(e) {
      this.applyParams.name = e.detail.value;
    },

    handleInputTitle(e) {
      this.applyParams.title = e.detail.value;
    },

    handleInputIntroduction(e) {
      this.applyParams.introduction = e.detail.value;
    },

    handleInputMobile(e) {
      this.applyParams.phone = e.detail.value;
    },

    handleInputCity(e) {
      this.applyParams.city = e.detail.value;
    },

    handleInputAddress(e) {
      this.applyParams.address = e.detail.value;
    },

    handleInputRemark(e) {
      this.applyParams.remark = e.detail.value;
    },

    onChangeIsGender(e) {
      const gender = e.currentTarget.dataset.value;
      this.applyParams.gender = gender;
    },

    radioTypeChange(e) {
      this.applyParams.directorType = e.detail.value;
    },

    uploadChooseFile() {
      const that = this;
      uni.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: function (res) {
          const tempFilePaths = res.tempFilePaths;
          const tempFiles = res.tempFiles;

          // 检查文件大小
          if (tempFiles[0].size > 10 * 1024 * 1024) {
            uni.showToast({
              title: "图片大小不能超过10M",
              icon: "none",
            });
            return;
          }

          that.photoFilePath = tempFilePaths[0];
          that.photoFileName = tempFiles[0].name || "形象照.jpg";

          // 上传图片
          that.uploadImage(tempFilePaths[0]);
        },
        fail: function (err) {
          console.log("选择图片失败", err);
        },
      });
    },

    uploadImage(filePath) {
      const that = this;
      uni.showLoading({
        title: "上传中...",
      });

      uni.uploadFile({
        url: HTTP_REQUEST_URL + "/api/upload/image",
        filePath: filePath,
        name: "file",
        formData: {
          filename: "file",
        },
        header: {
          // #ifdef MP
          "Content-Type": "multipart/form-data",
          // #endif
          [TOKENNAME]: "Bearer " + that.$store.state.app.token,
        },
        success: function (uploadFileRes) {
          try {
            const data = JSON.parse(uploadFileRes.data);
            if (data.status === 200) {
              that.applyParams.photo = data.data.url;
              uni.showToast({
                title: "上传成功",
                icon: "success",
              });
            } else {
              uni.showToast({
                title: data.msg || "上传失败",
                icon: "none",
              });
            }
          } catch (e) {
            uni.showToast({
              title: "上传失败",
              icon: "none",
            });
          }
        },
        fail: function (err) {
          console.log("上传失败", err);
          uni.showToast({
            title: "上传失败",
            icon: "none",
          });
        },
        complete: function () {
          uni.hideLoading();
        },
      });
    },

    handleCheckData() {
      // 表单验证
      if (!this.applyParams.name) {
        uni.showToast({
          title: "请输入理事姓名",
          icon: "none",
        });
        return;
      }

      if (!this.applyParams.gender) {
        uni.showToast({
          title: "请选择性别",
          icon: "none",
        });
        return;
      }

      if (!this.applyParams.type) {
        uni.showToast({
          title: "请选择理事类别",
          icon: "none",
        });
        return;
      }

      if (!this.applyParams.title) {
        uni.showToast({
          title: "请输入个人对外标签",
          icon: "none",
        });
        return;
      }

      if (!this.applyParams.introduction) {
        uni.showToast({
          title: "请输入个人简介",
          icon: "none",
        });
        return;
      }

      if (!this.applyParams.photo) {
        uni.showToast({
          title: "请上传个人形象照",
          icon: "none",
        });
        return;
      }

      // 提交数据
      this.submitData();
    },

    async submitData() {
      uni.showLoading({
        title: "提交中...",
      });

      try {
        const res = await directorMemberAdd(this.applyParams);
        uni.hideLoading();

        if (res.status === 200) {
          uni.showModal({
            title: "提示",
            content: "添加成功",
            showCancel: false,
            success: function () {
              uni.navigateBack();
            },
          });
        } else {
          uni.showToast({
            title: res.msg || "提交失败",
            icon: "none",
          });
        }
      } catch (error) {
        uni.hideLoading();
        uni.showToast({
          title: "提交失败",
          icon: "none",
        });
        console.error("提交失败", error);
      }
    },
  },
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
        .subtitle {
          font-size: 24rpx;
          color: rgba(47, 48, 49, 0.5);
          line-height: 36rpx;
          margin-bottom: 16rpx;
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
            font-size: 28rpx;
            color: #2f3031;
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
          font-size: 28rpx;
          color: #2f3031;
        }
      }
    }
    .radio-group {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
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
      radio {
        transform: scale(0.7);
        margin-right: 10rpx;
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
      line-height: 88rpx;
      text-align: center;
    }
  }
}
</style>
