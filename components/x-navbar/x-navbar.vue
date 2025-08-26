<!-------------------------------
  全局顶部导航组件
  Author: shenpeng

  说明：
  大部分页面通用的导航，如果特殊的导航例如首页请单独创建页面
 -------------------------------->

<template>
	<view>
		<view class="navbar" :class="{ 'navbar-fixed': isFixed }" :style="[background,{background:bgColor}]">
			<view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
			<view class="navbar-inner" :style="[navbarInnerStyle]">
				<view class="nav-bar-left" @click="goBack" v-if="letfArrow">
					<text class="iconfont icon-fanhui2" :style="{ color: backIconColor }" />

				</view>
				<view></view>

				<view class="nav-bar-content">
					<view v-if="title" class="title" :style="[titleStyle]">{{ title }}</view>
					<slot name="center"></slot>
				</view>

				<view class="nav-bar-right">
					<slot name="right"></slot>
				</view>

				<view class="nav-bar-bottom" :style="{ top: Number(navbarHeight) + 'px' }">
					<slot name="bottom"></slot>
				</view>
			</view>
		</view>

		<!-- 解决fixed定位后导航栏塌陷的问题 -->
		<view class="navbar-placeholder" v-if="isFixed"
			:style="{ width: '100%', height: Number(navbarHeight) + statusBarHeight + 'px' }" />
	</view>
</template>

<script setup lang="ts">
	import { computed, ref } from 'vue';

	/**
	 * navbar 自定义导航栏
	 * @description 此组件一般用于在特殊情况下，需要自定义导航栏的时候用到，一般建议使用uniapp自带的导航栏。
	 * @property {String} back-icon-color 左边返回图标的颜色（默认#606266）
	 * @property {String} title 导航栏标题
	 * @property {String Number} title-width 导航栏标题的最大宽度，内容超出会以省略号隐藏，单位rpx（默认250）
	 * @property {String} title-color 标题的颜色（默认#606266）
	 * @property {String Number} title-size 导航栏标题字体大小，单位rpx（默认32）
	 * @property {Function} custom-back 自定义返回逻辑方法
	 * @property {Boolean} is-back 是否显示导航栏左边返回图标和辅助文字（默认true）
	 * @property {Object} background 导航栏背景设置，见官网说明（默认{ background: '#ffffff' }）
	 * @property {Boolean} is-fixed 导航栏是否固定在顶部（默认true）
	 * @example <hky-navbar title="剑未配妥，出门已是江湖"></hky-navbar>
	 */
	const props = defineProps({
		// 导航栏标题
		title: {
			type: String,
			default: '',
		},
		// 标题的颜色
		titleColor: {
			type: String,
			default: '#1A1A1A',
		},
		// 标题的宽度，单位rpx
		titleWidth: {
			type: [String, Number],
			default: '300',
		},
		// 标题的文字大小，单位rpx
		titleSize: {
			type: [String, Number],
			default: 32,
		},
		// 返回箭头的颜色
		backIconColor: {
			type: String,
			default: '#333',
		},
		bgColor: {
			type: String,
			default: '#ffffff',
		},
		// 对象形式，因为用户可能定义一个纯色，或者线性渐变的颜色
		background: {
			type: Object,
			default() {
				return {
					background: '#ffffff',
				};
			},
		},
		// 导航栏是否固定在顶部
		isFixed: {
			type: Boolean,
			default: true,
		},
		// 自定义返回逻辑
		customBack: {
			type: Function,
			default: null,
		},
		// 判断是否改变顶部
		navStatus: {
			type: Boolean,
			default: true,
		},
		// 是否显示左侧箭头
		letfArrow: {
			type: Boolean,
			default: true,
		},
	});

	// 获取系统状态栏的高度
	let systemInfo = uni.getSystemInfoSync();
	const statusBarHeight = ref(systemInfo.statusBarHeight);

	/**
	 * 标题的样式
	 */
	const titleStyle = computed(() => {
		return {
			width: uni.upx2px(Number(props.titleWidth)) + 'px',
			color: props.titleColor,
			fontSize: uni.upx2px(Number(props.titleSize)) + 'px',
		};
	});

	/**
	 * 根据设备类型获取tabBar的高度
	 */
	const navbarHeight = computed(() => (systemInfo.platform === 'android' ? 48 : 44));

	/**
	 * 导航栏内部盒子的样式
	 */
	const navbarInnerStyle = computed(() => {
		return {
			height: navbarHeight.value + 'px',
		};
	});

	/**
	 * 返回上一个页面
	 */
	const goBack = () => {
		// 如果自定义了点击返回按钮的函数，则执行，否则执行返回逻辑
		if (typeof props.customBack === 'function') {
			props.customBack();
		} else {
			uni.navigateBack()
		}
	};
</script>

<style scoped lang="scss">
	.navbar {
		background: #ffffff;
		width: 100%;

		&.navbar-fixed {
			position: fixed;
			left: 0;
			right: 0;
			top: 0;
			z-index: 991;
		}

		.status-bar {
			width: 100%;
		}

		.navbar-inner {
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: relative;
			padding: 0 36rpx;
			box-sizing: border-box;
		}

		.nav-bar-left {
			position: absolute;
			left: 36rpx;
			display: flex;
			align-items: center;

			.back-icon {
				color: #fff;
			}
		}

		.nav-bar-content {
			text-align: center;

			.title {
				font-size: 32rpx;
				font-weight: 500;
				color: #1a1a1a;
				margin-left: 24rpx;
			}
		}

		.nav-bar-right {
			.add-more {
				color: #3359e0;
				font-size: 40rpx;
			}

			.right-title {
				font-size: 28rpx;
				font-weight: 400;
				color: #333333;
			}
		}

		.nav-bar-bottom {
			position: absolute;
			width: 100%;
			left: 0;
		}
	}
</style>