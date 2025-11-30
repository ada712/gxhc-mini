<template>
  <view class="pages">
    <div class="more">
      <text class="more-t" @click="goMore">查看历史记录</text>
      <image
        class="right-icon"
        src="/cloud/miniprogram/images/icons/icon-black-right.png"
      ></image>
    </div>
    <view class="upload" @click="choosePDF">
      <image
        class="upload-img"
        src="/cloud/miniprogram/images/subpackage1/upload-icon.png"
      ></image>
    </view>
    <div class="tips">
      <view class="line">
        <text class="d-p">注意事项</text>
        <text class="d-p">报告获取时间十分钟，完成后会通过短信通知</text>
      </view>
      <text class="d-p">免责申明</text>
      <text class="d-p"
        >1.本工具生成内容完全由AI自动生成，信息内容来源于用户上传文件和全网信息，模型经过调优依然可能存在幻觉现象，不保证内容真实性，仅供参考</text
      >
      <text class="d-p"
        >2.用户上传文件仅用于模型分析，未经授权不会用于商业目的</text
      >
    </div>
  </view>
</template>

<script>
import { runBp } from "@/api/gxhc.js";
import { HTTP_REQUEST_URL, TOKENNAME } from "@/config/app";
import { imgUrls } from "@/config/app";
export default {
  data: function () {
    return {
      uploading: false,
    };
  },
  onLoad() {
    // this.postBP();
  },
  methods: {
    goMore() {
      uni.navigateTo({
        url: "/subpackage1/bp/list/index",
      });
    },
    goPage() {
      uni.navigateTo({
        url: "/subpackage1/bp/result/base/index",
      });
    },
    choosePDF() {
      if (this.uploading) {
        return;
      }

      // #ifdef MP-WEIXIN
      uni.chooseMessageFile({
        count: 1,
        type: "file",
        extension: ["pdf"],
        success: (res) => {
          const tempFiles = res.tempFiles;
          if (tempFiles && tempFiles.length > 0) {
            const file = tempFiles[0];
            if (file.size > 10 * 1024 * 1024) {
              uni.showToast({
                title: "文件大小不能超过10MB",
                icon: "none",
              });
              return;
            }
            this.uploadPDF(file);
          }
        },
        fail: (err) => {
          console.error("选择文件失败", err);
        },
      });
      // #endif

      // #ifdef H5
      uni.chooseFile({
        count: 1,
        type: "file",
        extension: ["pdf"],
        success: (res) => {
          const tempFiles = res.tempFiles;
          if (tempFiles && tempFiles.length > 0) {
            const file = tempFiles[0];
            if (file.size > 10 * 1024 * 1024) {
              uni.showToast({
                title: "文件大小不能超过10MB",
                icon: "none",
              });
              return;
            }
            this.uploadPDF(file);
          }
        },
        fail: (err) => {
          console.error("选择文件失败", err);
        },
      });
      // #endif
    },
    uploadPDF(file) {
      this.uploading = true;
      // 显示上传提示
      uni.showLoading({
        title: "上传中...",
      });
      uni.uploadFile({
        url: HTTP_REQUEST_URL + "/api/runBp", // 替换为实际的API地址
        // url: HTTP_REQUEST_URL+'/bp/api/runs', // 替换为实际的API地址
        // url: 'https://gxhc-agent.mahanova.com/api/runs', // 替换为实际的API地址
        filePath: file.path || file,
        name: "files",
        header: {
          // #ifdef MP
          "Content-Type": "multipart/form-data",
          // "Content-Type": "application/json",
          // #endif
          // 'Authorization': "Bearer sk-SDQ2J97ezAs1iILJzn00LQ"
          [TOKENNAME]: "Bearer " + this.$store.state.app.token,
        },
        formData: {
          // 其他需要提交的表单数据
          pipeline: "bp_diagnosis",
          target: "export_preliminary",
          filename: file.name || "unknown.pdf", // 添加原文件名
        },
        success: (uploadFileRes) => {
          uni.hideLoading();
          this.uploading = false;

          // 解析返回结果
          let data;
          try {
            data = JSON.parse(uploadFileRes.data);
          } catch (e) {
            console.error("解析响应失败", e);
            uni.showToast({
              title: "上传失败",
              icon: "none",
            });
            return;
          }
          console.log(data);
          // 判断上传是否成功
          if (data.status == 200) {
            uni.showToast({
              title: "上传成功",
              icon: "none",
            });
            // 可以跳转到结果页面
            uni.navigateTo({
              url: "/subpackage1/bp/result/base/index?runId=" + data.data.run_id
            });
          } else {
            uni.showToast({
              title: data.msg || "上传失败",
              icon: "none",
            });
          }
        },
        fail: (err) => {
          uni.hideLoading();
          this.uploading = false;
          console.error("上传失败", err);
          uni.showToast({
            title: "上传失败",
            icon: "none",
          });
        },
      });

      // 模拟上传过程（演示用，实际应删除）
      // setTimeout(() => {
      //   uni.hideLoading();
      //   this.uploading = false;
      //   uni.showToast({
      //     title: '上传成功',
      //     icon: 'success'
      //   });
      //   // 模拟上传成功后跳转到结果页
      //   setTimeout(() => {
      //     this.goPage();
      //   }, 1000);
      // }, 2000);
    },
    postBP() {
      runBp({}).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style>
page {
  background: #f5f8ff;
}
</style>
<style lang="scss" scoped>
.pages {
  .more {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 24rpx 32rpx;
    .more-t {
      color: #182855;
      font-size: 28rpx;
      font-weight: 400;
      margin-right: 20rpx;
    }
    .right-icon {
      width: 14.2rpx;
      height: 24.8rpx;
    }
  }

  .upload {
    margin: 0 32rpx;
    border-radius: 28rpx;
    opacity: 1;
    background: #ffffff;
    padding: 26rpx 24rpx 20rpx 24rpx;
    box-sizing: border-box;
    .upload-img {
      width: 100%;
      height: 200rpx;
      border-radius: 8rpx;
    }
  }

  .tips {
    margin: 34rpx 48rpx;
    .line {
      margin-bottom: 30rpx;
    }
    .d-p {
      display: block;
      color: #60738e;
      font-size: 22rpx;
      font-weight: 400;
      line-height: 36.82rpx;
    }
  }
}
</style>
