<template>
  <view class="pages">
    
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
