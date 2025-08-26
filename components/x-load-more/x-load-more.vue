<!-------------------------------
  LoadMore 加载更多
  Author: shenpeng
 -------------------------------->

<template>
	<view
		class="hky-load-more-wrap"
		:style="[float]"
	>
		<uni-load-more
			:style="[height]"
			iconType="circle"
			:status="loadMoreStatus"
			color="#999999"
			:content-text="{
				contentdown: '上拉加载更多',
				contentrefresh: '加载中...',
				contentnomore: '暂无更多数据~',
			}"
		/>
	</view>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
	// 加载状态
	// 1 => 加载前 => more
	// 2 => 加载中 => loading
	// 3 => 加载后 => no-more
	mode: {
		type: [Number, String],
		default: 1,
	},
	float: {
		type: Object,
		default() {
			return {
				float: 'none',
			};
		},
	},
	height: {
		type: Object,
		default() {
			return {
				height: '80rpx',
			};
		},
	},
});

/**
 * 加载方式的 转换
 *
 * 由于 uni-ui 的加载状态 变量 是 英文词，对上游 组件不是很友好
 * 所以这里做了一层转换，上游组件 直接 使用 1、2、3、来代替 加载的 方式
 *
 */
const loadMoreStatus = computed(() => {
	let status: string = '';
	switch (Number(props.mode)) {
		case 1:
			status = 'more';
			break;
		case 2:
			status = 'loading';
			break;
		case 3:
			status = 'no-more';
			break;
	}
	return status;
});
</script>

<style scoped lang="scss">
.hky-load-more-wrap {
	::v-deep .uni-list-item__content-title {
		font-size: 24rpx;
	}
	::v-deep .uni-load-more__text {
		font-size: 24rpx;
	}
}
</style>
