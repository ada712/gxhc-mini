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
		<view class="loading-container">
			<view class="circular-loader" :class="{ 'large': loadingType == 1 }">
				<svg class="circular" :class="{ 'large': loadingType == 1 }" viewBox="25 25 50 50">
					<circle class="path" cx="50" cy="50" r="20" fill="none" 
						:class="{ 'large': loadingType == 1 }"></circle>
				</svg>
			</view>
			<text v-if="loadingType == 1" class="loading-text">加载中...</text>
		</view>
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
	background-color: #fff;
}

.page-loading {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 99999999;
	
	&.page-loading-2 {
		height: auto;
		position: static !important;
	}
	
	.loading-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.loading-text {
			margin-top: 20rpx;
			color: #909399;
			font-size: 28rpx;
		}
	}
	
	.circular-loader {
		width: 60rpx;
		height: 60rpx;
		animation: rotate 2s linear infinite;
		transform-origin: center center;
		margin-top: 40rpx;
		
		&.large {
			width: 80rpx;
			height: 80rpx;
		}
		
		.circular {
			width: 100%;
			height: 100%;
			
			&.large .path {
				stroke-width: 8rpx;
			}
			
			.path {
				stroke-dasharray: 1, 200;
				stroke-dashoffset: 0;
				stroke-linecap: round;
				stroke: #2B7EFF;
				stroke-width: 6rpx;
				animation: dash 1.5s ease-in-out infinite;
			}
		}
	}
	
	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}
	
	@keyframes dash {
		0% {
			stroke-dasharray: 1, 200;
			stroke-dashoffset: 0;
		}
		50% {
			stroke-dasharray: 90, 200;
			stroke-dashoffset: -35rpx;
		}
		100% {
			stroke-dasharray: 90, 200;
			stroke-dashoffset: -125rpx;
		}
	}
}
</style>