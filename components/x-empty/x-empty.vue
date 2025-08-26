<!-------------------------------
  空组件
  Author: shenpeng
 -------------------------------->

<template>
	<view
		class="hky-empty-wrap"
		:class="{ 'hky-empty-fixed': isFixed }"
		:style="{ marginTop: marginTop + 'rpx', paddingTop: paddingTop + 'rpx' }"
	>
		<!-- 空图片 -->
		<image
			:src="imgUrl"
			:style="{ width: width + 'rpx', height: height + 'rpx' }"
			mode="widthFix"
			v-if="imgUrl"
		/>
		<!-- 描述 -->
		<text
			class="hky-empty-title"
			:class="{ 'hky-empty-title-color': !color }"
			:style="{ color: color, fontSize: size + 'rpx' }"
			v-if="text"
		>
			{{ text }}
		</text>

		<slot></slot>
	</view>
</template>

<script setup lang="ts">
import { computed } from 'vue';

/**
 * empty 内容为空
 * @description 该组件用于需要加载内容，但是加载的第一页数据就为空，提示一个"没有内容"的场景
 * @property {String} src 自定义图标路径，如定义，mode参数会失效
 * @property {String Number} mode 图标类型 本地空图片拼接而成具体图片请查看 static 文件夹 "empty-icon1.png"
 * @property {String Number} width 图标的宽度，单位rpx（默认320）
 * @property {String Number} height 图标的高度，单位rpx（默认320）
 * @property {String} text 文字提示（默认“无内容”）
 * @property {String} color 文字颜色（默认#999999）
 * @property {String Number} size 提示文字的大小，单位rpx（默认28）
 * @property {String Number} marginTop 组件距离上一个元素之间的距离（默认0）
 * @property {Boolean} isFixed 是否显示组件（默认true）
 * @example <hky-empty text="所谓伊人，在水一方" mode="1"></hky-empty>
 */
const props = defineProps({
	// 图标
	src: {
		type: String,
		default: '',
	},
	// 图标类型 本地空图片拼接而成具体图片请查看 static 文件夹 "empty-icon1.png"
	mode: {
		type: [Number, String],
		default: 1,
	},
	// 图片宽度，单位rpx
	width: {
		type: [Number, String],
		default: 320,
	},
	// 图片高度，单位rpx
	height: {
		type: [Number, String],
		default: 320,
	},
	// 描述
	text: {
		type: String,
		default: '暂无记录~',
	},
	// 提示信息标题字体大小，单位rpx
	size: {
		type: [Number, String],
		default: 28,
	},
	// 提示信息标题字体颜色
	color: {
		type: String,
		default: '#999999',
	},
	// 缺省页内容是否固定在页面中间位置
	isFixed: {
		type: Boolean,
		default: false,
	},
	// 缺省页内容margin-top值
	marginTop: {
		type: [Number, String],
		default: 0,
	},
	// 缺省页内容margin-top值
	paddingTop: {
		type: [Number, String],
		default: 0,
	},
});

/**
 * 计算当前图片路径
 * 如果传入了src就优先使用src
 * 如果传入了type就采用自定义拼接值
 */
const imgUrl = computed(() => {
	let url = props.src;
	if (props.mode && url === '') {
		url = '/static/empty-icon' + props.mode + '.png';
	}
	return url;
});
</script>

<style scoped lang="scss">
.hky-empty-wrap {
	flex: 1;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	&.hky-empty-fixed {
		position: fixed;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		z-index: 99;
	}

	.hky-empty-title {
		text-align: center;
		font-weight: 400;
		padding-top: 12rpx;
	}
}
</style>
