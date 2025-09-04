<template>
  <view class="pages">
    <text class="title">请选择您的身份</text>
    <text class="title-d">从下方选择您的身份类型，使用专属功能</text>
  </view>
</template>

<script>
import { imgUrls } from "@/config/app";
export default {
  data: function () {
    return {
      imgUrl: imgUrls,
    };
  },
  methods: {
    goPage() {
      uni.navigateTo({
        url: "/subpackage1/energy/list/index",
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
  padding-bottom: 80rpx;
 
}
</style>
