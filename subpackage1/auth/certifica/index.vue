<template>
  <view class="pages">
    <text class="title">{{
      auth == "finance" ? "上传名片" : "快速连接资源，从一张名片开始"
    }}</text>
    <text class="title-d">{{
      auth == "finance"
        ? "立即上传名片，完成身份认证"
        : "立即上传名片，精准匹配资源与机遇！"
    }}</text>
    <view class="con" v-if="auth == 'finance'">
      <view class="ivt">
        <text class="label">机构名称</text>
        <input
          v-model="ivt"
          class="value"
          placeholder="请输入所属机构名称"
          placeholder-class="placeholder-class"
        />
      </view>
      <view class="ivt">
        <text class="label">机构所属类型</text>
        <picker mode="selector" :range="options" bindchange="updateGender">
          <view class="selector" v-if="ivt === ''">
            <text class="placeholder-class"> 请选择所属机构所属类型 </text>
            <image
              class="right-icon"
              :src="imgUrl + '/index/icon_right_lan.png'"
          /></view>
          <view class="birthday" v-if="ivt">
            {{ ivt }}
          </view>
        </picker>
      </view>
    </view>
    <view class="con" v-else>
      <view class="ivt">
        <text class="label">机构名称</text>
        <input
          v-model="ivt"
          class="value"
          placeholder="请输入所属机构名称"
          placeholder-class="placeholder-class"
        />
      </view>
      <view class="ivt">
        <text class="label">职位</text>
        <input
          v-model="ivt"
          class="value"
          placeholder="请输入职位"
          placeholder-class="placeholder-class"
        />
      </view>
      <view class="ivt">
        <text class="label">投资领域</text>
        <picker mode="selector" :range="options" bindchange="updateGender">
          <view class="selector" v-if="ivt === ''">
            <text class="placeholder-class"> 请选择投资领域 </text>
            <image
              class="right-icon"
              :src="imgUrl + '/index/icon_right_lan.png'"
          /></view>
          <view class="birthday" v-if="ivt">
            {{ ivt }}
          </view>
        </picker>
      </view>
    </view>
    <view class="upload" @click="goPage">
      <image
        class="upload-img"
        :src="imgUrl + '/subpackage1/upload-icon2.png'"
      ></image>
      <text class="tips">支持拍照上传和图片上传</text>
    </view>
    <view class="btn" @click="onNext" :class="{ active: auth != '' }">
      <text class="btn-t">提交认证</text>
    </view>
  </view>
</template>

<script>
import { imgUrls } from "@/config/app";
export default {
  data: function () {
    return {
      imgUrl: imgUrls,
      options: [
        "早期基金/创业投资 (VC)",
        "私募股权投资 (PE)",
        "产业基金",
        "政府引导基金",
        "上市公司/CVC (企业风险投资)",
        "证券公司",
        "投资银行",
        "财务顾问 (FA)",
        "资管公司",
        "商业银行",
        "保险公司",
        "信托公司",
        "家族办公室",
        "国有企业/国资平台",
        "律所/会计师事务所",
        "其他",
      ],
      ivt: "",
      auth: "",
    };
  },
  onLoad(option) {
    this.auth = option.auth;
    const title = option.auth == "finance" ? "金融从业者认证" : "创业者认证";
    uni.setNavigationBarTitle({ title });
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    onNext() {
      if (!this.auth) {
        uni.showToast({
          title: "请选择身份～",
          icon: "none",
        });
      }
      uni.navigateTo({
        url: `/subpackage1/auth/${this.auth}/index`,
      });
    },
    onSelect(auth) {
      this.auth = auth;
    },
  },
};
</script>

<style>
page {
  background: #fff;
}
</style>
<style lang="scss" scoped>
.placeholder-class {
  color: #999999;
  font-size: 24rpx;
  font-weight: 400;
}
.pages {
  padding-bottom: 80rpx;
  margin: 0 32rpx;
  .title {
    display: block;
    color: #17233c;
    font-size: 48rpx;
    font-weight: 600;
    margin-top: 88rpx;
  }
  .title-d {
    color: #8c929e;
    text-align: left;
    font-size: 28rpx;
    font-weight: 400;
    display: block;
    margin-top: 20rpx;
  }
  .con {
    margin-top: 58rpx;
  }
  .ivt {
    margin-top: 28rpx;
    padding-bottom: 28rpx;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .selector {
      display: flex;
      align-items: center;
      .right-icon {
        width: 48rpx;
        height: 48rpx;
      }
    }
    .label {
      color: #404040;
      font-size: 24rpx;
      font-weight: 400;
    }
    .value {
      text-align: right;
      color: #182855;
      font-size: 24rpx;
      font-weight: 400;
    }
  }
  .upload {
    margin-top: 50rpx;
    border-radius: 28rpx;
    background: #ffffff;
    box-sizing: border-box;
    .upload-img {
      width: 100%;
      height: 200rpx;
      border-radius: 8rpx;
    }
    .tips {
      color: #ff2a23;
      font-size: 24rpx;
      font-weight: 400;
    }
  }
  .btn {
    margin: 60rpx 44rpx;
    border-radius: 300rpx;
    background: #a2a2a2;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24rpx 0;
    &.active {
      background: #2969ff;
    }
    .btn-t {
      color: #ffffff;
      text-align: center;
      font-size: 28rpx;
      font-weight: 400;
    }
  }
}
</style>
