<template>
  <view class="wripper">
    <view class="tips">成功发起后2个月第一次提报，后续如无更新不用提交</view>
    <view class="upload-box" @click="uploadChooseFile">
      <view class="row" v-if="bpFileName">{{ bpFileName }}</view>
      <view class="row" v-else>
        <image
          :src="imgUrl + '/icons/icon-cloud-upload.png'"
          class="icon-upload"
        />
        <view class="label">上传商业计划书（pdf格式）</view>
      </view>
    </view>
    <view class="row btn-row">
      <view class="submit" @click="submitBP">提交</view>
    </view>
  </view>
</template>

<script>
import { imgUrls, HTTP_REQUEST_URL, TOKENNAME } from "@/config/app";
import { investProjectsUpdateBP } from "@/api/gxhc";
import store from "@/store";
export default {
  data: function () {
    return {
      imgUrl: imgUrls,
      bpFilePath: "",
      bpFileName: "",
      uploadBPPath: "",
      projectId: "",
      projectName: "",
    };
  },
  onLoad(options) {
    const { id, companyName } = options;
    if (id && companyName) {
      this.projectId = id;
      this.projectName = companyName;
    }
  },
  methods: {
    submitBP() {
      if (!this.uploadBPPath) {
        uni.showToast({
          title: "请上传您要更新的BP",
          icon: "none",
        });
        return;
      }
      const param = {
        id: this.projectId,
        uploadBPPath: this.uploadBPPath,
      };
      uni.showLoading();
      this.fetchUpdateBP(param);
    },
    fetchUpdateBP(param) {
      investProjectsUpdateBP(param)
        .then((res) => {
          uni.hideLoading();
          console.log("res==>", res);
          if (res.status == 200) {
            uni.showToast({
              title: "提交成功",
              icon: "none",
            });
            setTimeout(function () {
              uni.switchTab({
                url: "/pages/domain/index/index",
              });
            }, 2200);
          } else {
            uni.showToast({
              title: "提交失败",
              icon: "none",
            });
          }
        })
        .catch((error) => {
          uni.hideLoading();
          console.log(error);
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
              this.uploadBPPath = data.data.url;
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
  },
};
</script>

<style lang="scss" scoped>
.wripper {
  width: 100%;
  box-sizing: border-box;
  padding: 24rpx;
  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .tips {
    margin-bottom: 24rpx;
    width: 100%;
    box-sizing: border-box;
    padding: 16rpx 24rpx;
    font-size: 24rpx;
    line-height: 36rpx;
    background: #ebf5ff;
    color: #225aee;
    border-radius: 32rpx;
  }
  .upload-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 150rpx;
    background-color: #ffffff;
    border-radius: 24rpx;
    box-sizing: border-box;
    padding: 32rpx;

    .icon-upload {
      width: 42rpx;
      height: 42rpx;
      margin-right: 24rpx;
    }
    .label {
      color: #2f3031;
      font-size: 28rpx;
      line-height: 42rpx;
    }
  }
  .btn-row {
    width: 100%;
    justify-content: center;
    margin-top: 52rpx;
  }
  .submit {
    width: 180rpx;
    height: 68rpx;
    background: #2969ff;
    border-radius: 12rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 28rpx;
    line-height: 42rpx;
  }
}
</style>
