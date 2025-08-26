<!-------------------------------
  全局加载动画
  Author: shenpeng
 -------------------------------->

<template>
	<view
		class="page-loading"
		:class="{ 'page-loading-background': loadingType == 1, 'page-loading-2': loadingType == 2 }"
		:style="{ position: loadingType == 1 ? 'fixed' : 'static' }"
	>
		<hky-load-icon
        :text="loadingType == 1 ? 'HKY' : ''"
        :circle-color="loadingType == 1 ? '#909399' : '#2B7EFF'"
    />
	</view>
</template>

<script setup lang="ts">
const props = defineProps({
	// 加载类型：1 全局加载 2 局部加载
	loadingType: {
		type: Number,
		default: 1,
	},
});
</script>

<style scoped lang="scss">
.page-loading-background {
	background-color: $cr-FFFFFF;
}

.page-loading {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	z-index: 99999999;
	&.page-loading-2 {
		height: auto;
	}
}
</style>
