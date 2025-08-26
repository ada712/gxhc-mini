<template>
	<view>
		<view class="order-details">
			<view class="header bg-color acea-row row-middle" :class="[3,2].includes(orderInfo.status) ? 'on' : ''">
				<view class="pictrue">
					<image :src="pic"></image>
				</view>
				<view class="data" :class="[3,2].includes(orderInfo.status) ? 'on' : ''">
					<view class="state acea-row row-between">
						<text v-if="orderInfo.status == 0">待审核</text>
						<text v-else-if="orderInfo.status == 2">申请拒绝</text>
						<text v-else-if="orderInfo.status == 3">申请取消</text>
						<text v-else-if="orderInfo.gameInfo.status == 0">待开始</text>
						<text v-else-if="orderInfo.gameInfo.status == 1">进行中</text>
						<text v-else-if="orderInfo.gameInfo.status == 2">待打款</text>
						<text v-else-if="orderInfo.gameInfo.status == 3">已完成</text>
						<view class="jd-t" v-if="orderInfo.status == 1">{{ orderInfo.gameInfo.gameProgress }}%</view>
					</view>
					<view>
						<text class="time">{{ orderInfo._add_time }}</text>
					</view>
				</view>
			</view>
			<view class="wrapper" v-if="orderInfo.status == 1">
				<view class="cu-progress acea-row row-middle round margin-top">
					<view class="acea-row row-middle bg-red" :style="'width:' + orderInfo.gameInfo.progress + '%;'"></view>
				</view>
				<view class="money acea-row row-between-wrapper">
					<view>消耗金额</view>
					<view>{{ orderInfo.gameInfo.progress }}%</view>
				</view>
			</view>
			<view class="wrapper">
				<view class="item acea-row row-between">
					<view>游戏名称：</view>
					<view class="conter">{{ orderInfo.gameInfo.app_name || '' }}</view>
				</view>
				<view class="item acea-row row-between">
					<view>appId：</view>
					<view class="conter">{{ orderInfo.gameInfo.appid || '' }}</view>
				</view>
				<template v-if="orderInfo.status == 1">
					<view class="item acea-row row-between">
						<view>总周期：</view>
						<view class="conter">{{ orderInfo.gameInfo.total_day || '' }}</view>
					</view>
					<view class="item acea-row row-between">
						<view>预估打款周期：</view>
						<view class="conter">{{ orderInfo.gameInfo.remit || '' }}</view>
					</view>
					<view class="item acea-row row-between">
						<view>预估打款开始时间：</view>
						<view class="conter">{{ orderInfo.gameInfo.dk_start_day || '' }}</view>
					</view>
					<view class="item acea-row row-between">
						<view>活动开始时间：</view>
						<view class="conter">{{ orderInfo.gameInfo.start_time || '' }}</view>
					</view>
					<view class="item acea-row row-between">
						<view>活动结束时间：</view>
						<view class="conter">{{ orderInfo.gameInfo.end_time || '' }}</view>
					</view>
				</template>
			</view>
			<view class="wrapper">
				<view class="item acea-row row-between">
					<view>申请编号：</view>
					<view class="conter acea-row row-middle row-right">
						<text>{{ orderInfo.order_id }}</text>
						<!-- #ifndef H5 -->
						<text class="copy" @tap="copy(orderInfo.order_id)">复制</text>
						<!-- #endif -->
						<!-- #ifdef H5 -->
						<text class="copy copy-data" :data-clipboard-text="orderInfo.order_id">复制</text>
						<!-- #endif -->
					</view>
				</view>
				<view class="item acea-row row-between">
					<view>申请时间：</view>
					<view class="conter">{{ orderInfo._add_time || '' }}</view>
				</view>
				<view class="item acea-row row-between">
					<view>申请状态：</view>
					<view class="conter" v-if="orderInfo.status == 1">已通过</view>
					<view class="conter" v-else-if="orderInfo.status == 0">待审核</view>
					<view class="conter" v-else-if="orderInfo.status == 2">申请拒绝</view>
					<view class="conter" v-else-if="orderInfo.status == 3">申请取消</view>
				</view>
			</view>
			<view style="height: 120rpx"></view>
			<view class="footer acea-row row-right row-middle" @click="cancelOrder" v-if="orderInfo.status == 0">
				<view class="right-btn">
					<view class="qs-btn">
						取消申请
					</view>
					<!-- <view class="bnt bg-color">立即付款</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		orderDetails,
		applyAudit
	} from '@/api/game.js';
	import {HTTP_REQUEST_URL} from '@/config/app.js'
	export default {
		data() {
			return {
				pic: HTTP_REQUEST_URL+'/statics/system_images/order_complete.gif',
				order_id: '',
				status: {}, //订单底部按钮状态
				orderInfo: {
					gameInfo: {}
				},
				userInfo: {},
			};
		},
		onLoad(options) {
			if (options.order_id) this.order_id = options.order_id;
			this.getOrderDetails()
		},
		methods: {
			getOrderDetails() {
				orderDetails({
					id: this.order_id,
				}).then(res => {
					if (res.status == 200) {
						this.orderInfo = res.data;
					}
				}).catch((err) => {

				});
			},
			/**
			 * 取消订单
			 *
			 */
			cancelOrder: function() {
				let that = this;
				if (!this.order_id)
					return that.$util.Tips({
						title: `缺少订单号无法取消订单`
					});
				uni.showModal({
					title: `提示`,
					content: `确认取消该订单`,
					success: function(res) {
						if (res.confirm) {
							applyAudit({
									id: that.order_id,
									cancelStatus: 1
								})
								.then((res) => {
									return that.$util.Tips({
											title: res.msg,
											icon: 'success'
										},
										function() {
											that.getOrderDetails();
										}
									);
								})
								.catch((err) => {
									return that.$util.Tips({
										title: err
									});
								});
						} else if (res.cancel) {}
					}
				});
			},

		}
	}
</script>

<style scoped lang="scss">
	.cu-progress {
		overflow: hidden;
		height: 12rpx;
		background-color: #eee;
		width: 100%;
		margin-bottom: 10rpx;
		border-radius: 20rpx;
	}

	.cu-progress .bg-red {
		width: 0;
		height: 100%;
		transition: width 0.6s ease;
		border-radius: 20rpx;
		background-image: linear-gradient(to right, var(--view-minorColor) 0%, var(--view-theme) 100%);
	}

	.refund-tip {
		font-size: 24rpx;
		margin-top: 10rpx;
		color: var(--view-theme);

		.iconfont {
			font-size: 24rpx;
			margin-right: 6rpx;
		}
	}

	.refund-tip1 {
		font-size: 24rpx;
		color: var(--view-theme);

		.iconfont {
			font-size: 24rpx;
			margin-right: 6rpx;
		}
	}

	.qs-btn {
		width: auto;
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		border-radius: 50rpx;
		font-size: 27rpx;
		white-space: nowrap;
		padding: 0 26rpx;
		color: #666;
		border: 1px solid #ccc;
	}

	.refund-input {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		border-radius: 16rpx 16rpx 0 0;
		background-color: #fff;
		z-index: 99;
		padding: 40rpx 0 70rpx 0;
		transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
		transform: translate3d(0, 100%, 0);

		.refund-input-title {
			font-size: 32rpx;
			margin-bottom: 60rpx;
			color: #282828;
		}

		.refund-input-sty {
			border: 1px solid #ddd;
			padding: 20rpx 20rpx;
			border-radius: 40rpx;
			width: 100%;
			margin: 20rpx 65rpx;
		}

		.input-msg {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: relative;
			margin: 0 65rpx;

			.iconfont {
				position: absolute;
				font-size: 32rpx;
				color: #282828;
				top: 8rpx;
				right: -30rpx;
			}
		}

		.refund-bth {
			display: flex;
			margin: 0 65rpx;
			margin-top: 20rpx;
			justify-content: space-around;
			width: 100%;

			.close-refund {
				padding: 24rpx 80rpx;
				border-radius: 80rpx;
				color: #fff;
				background-color: #ccc;
			}

			.submit-refund {
				width: 100%;
				padding: 24rpx 0rpx;
				text-align: center;
				border-radius: 80rpx;
				color: #fff;
				background-color: var(--view-theme);
			}
		}
	}

	.jd-t {
		font-size: 33rpx;
	}

	.refund-input.on {
		transform: translate3d(0, 0, 0);
	}

	.goodCall {
		color: var(--view-theme);
		text-align: center;
		width: 100%;
		height: 86rpx;
		padding: 0 30rpx;
		border-top: 1rpx solid #eee;
		font-size: 30rpx;
		line-height: 86rpx;
		background: #fff;

		.icon-kefu {
			font-size: 36rpx;
			margin-right: 15rpx;
		}

		/* #ifdef MP */
		button {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 86rpx;
			font-size: 30rpx;
			color: var(--view-theme);
		}

		/* #endif */
	}

	.order-details {
		padding-bottom: calc(15rpx + constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		padding-bottom: calc(15rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
	}

	.order-details .header {
		padding: 0 30rpx;
		height: 150rpx;
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
	}

	.order-details .header.on {
		background-color: #666 !important;
	}

	.order-details .header .pictrue {
		width: 110rpx;
		height: 110rpx;
	}

	.order-details .header .pictrue image {
		width: 100%;
		height: 100%;
	}

	.order-details .header .data {
		color: rgba(255, 255, 255, 0.8);
		font-size: 24rpx;
		margin-left: 27rpx;
		flex: 1;
	}

	.order-details .header .data.on {
		margin-left: 0;
	}

	.order-details .header .data .state {
		font-size: 30rpx;
		font-weight: bold;
		color: #fff;
		margin-bottom: 7rpx;
	}

	.order-details .nav {
		background-color: #fff;
		font-size: 26rpx;
		color: #282828;
		padding: 25rpx 0;
	}

	.order-details .nav .navCon {
		padding: 0 40rpx;
	}

	.order-details .nav .on {
		color: var(--view-theme);
	}

	.order-details .nav .progress {
		padding: 0 65rpx;
		margin-top: 10rpx;
	}

	.order-details .nav .progress .line {
		width: 100rpx;
		height: 2rpx;
		background-color: #939390;
	}

	.order-details .nav .progress .iconfont {
		font-size: 25rpx;
		color: #939390;
		margin-top: -2rpx;
	}

	.order-details .address {
		font-size: 26rpx;
		color: #868686;
		background-color: #fff;
		padding: 35rpx 30rpx;
		margin-bottom: 12rpx;

		.icon {
			.iconfont {
				width: 44rpx;
				height: 44rpx;
				background: var(--view-minorColorT);
				font-size: 20rpx;
				border-radius: 50%;
				text-align: center;
				line-height: 44rpx;
				color: var(--view-theme);
				margin-left: 26rpx;
			}
		}
	}

	.order-details .address .name {
		font-size: 30rpx;
		color: #282828;
		margin-bottom: 15rpx;
	}

	.order-details .address .name .phone {
		margin-left: 40rpx;
	}

	.order-details .line {
		width: 100%;
		height: 3rpx;
	}

	.order-details .line image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.order-details .wrapper {
		background-color: #fff;
		margin-top: 12rpx;
		padding: 30rpx;
	}

	.order-details .wrapper .acea-row {
		display: flex;
		flex-wrap: nowrap;
	}

	.order-details .wrapper .item {
		font-size: 28rpx;
		color: #282828;
	}

	.order-details .wrapper .item~.item {
		margin-top: 20rpx;
		white-space: normal;
		word-break: break-all;
		word-wrap: break-word;
	}

	.order-details .wrapper .item .conter {
		color: #868686;
		width: 480srpx;
		display: flex;
		flex-wrap: nowrap;
		justify-content: flex-end;
	}

	.order-details .wrapper .item .conter .copy {
		font-size: 20rpx;
		color: #333;
		border-radius: 3rpx;
		border: 1rpx solid #666;
		padding: 3rpx 15rpx;
		margin-left: 24rpx;
		white-space: nowrap;
	}

	.order-details .wrapper .actualPay {
		border-top: 1rpx solid #eee;
		margin-top: 30rpx;
		padding-top: 30rpx;
		display: flex;
		align-items: center;

		.pay-people {
			display: flex;
			align-items: center;

			image {
				width: 40rpx;
				height: 40rpx;
				border-radius: 50%;
			}

			.pay-nickname {
				margin-right: 20rpx;
				padding: 0 10rpx;
			}
		}
	}

	.order-details .wrapper .actualPay .money {
		font-weight: bold;
		font-size: 30rpx;
	}

	.order-details .footer {
		width: 100%;
		position: fixed;
		display: flex;
		bottom: 0;
		left: 0;
		background-color: #fff;
		padding: 20rpx 30rpx;
		// padding-bottom: calc(20rpx + constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		// padding-bottom: calc(20rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
		box-sizing: border-box;

		.more {
			// position: absolute;
			left: 30rpx;
			font-size: 26rpx;
			color: #333;

			.icon-xiangshang {
				margin-left: 6rpx;
				font-size: 22rpx;
			}
		}

		.right-btn {
			display: flex;
		}

		.more-box {
			color: #333;
			position: absolute;
			left: 30rpx;
			background-color: #fff;
			padding: 18rpx 24rpx;
			border-radius: 4rpx;
			font-size: 28rpx;
			-webkit-box-shadow: 0px 0px 3px 0px rgba(200, 200, 200, 0.75);
			-moz-box-shadow: 0px 0px 3px 0px rgba(200, 200, 200, 0.75);
			box-shadow: 0px 0px 3px 0px rgba(200, 200, 200, 0.75);
			bottom: 110rpx;
			/* #ifdef APP-PLUS */
			bottom: calc(110rpx + constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
			bottom: calc(110rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/

			/* #endif */
			.more-btn {
				color: #333;
				padding: 4rpx;
				z-index: 9999;
			}
		}

		.more-box:before {
			content: '';
			width: 0rpx;
			height: 0rpx;
			border-top: 20rpx solid rgba(200, 200, 200, 0.4);
			border-bottom: 0rpx solid transparent;
			border-top: 20rpx solid rgba(200, 200, 200, 0.4);
			border-left: 20rpx solid rgba(0, 0, 0, 0);
			border-right: 20rpx solid rgba(0, 0, 0, 0);
			position: absolute;
			bottom: -20rpx;
			left: 20rpx;
		}

		.more-box::after {
			content: '';
			width: 0rpx;
			height: 0rpx;
			border-top: 20rpx solid #fff;
			border-bottom: 0rpx solid rgba(0, 0, 0, 0);
			border-left: 20rpx solid rgba(0, 0, 0, 0);
			border-right: 20rpx solid rgba(0, 0, 0, 0);
			position: absolute;
			bottom: -18rpx;
			left: 20rpx;
			z-index: 9;
		}
	}

	.order-details .footer .bnt {
		width: 200rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		border-radius: 50rpx;
		color: #fff;
		font-size: 27rpx;
	}

	.order-details .footer .bnt.refundBnt {
		width: 210rpx;
	}

	.order-details .footer .bnt.cancel {
		color: #666;
		border: 1rpx solid #ccc;
	}

	.order-details .footer .bnt~.bnt {
		margin-left: 18rpx;
	}

	.order-details .writeOff {
		background-color: #fff;
		margin-top: 13rpx;
		padding-bottom: 30rpx;
	}

	.order-details .writeOff .title {
		font-size: 30rpx;
		color: #282828;
		height: 87rpx;
		border-bottom: 1px solid #f0f0f0;
		padding: 0 30rpx;
		line-height: 87rpx;
	}

	.order-details .writeOff .grayBg {
		background-color: #f2f5f7;
		width: 590rpx;
		height: 384rpx;
		border-radius: 20rpx 20rpx 0 0;
		margin: 50rpx auto 0 auto;
		padding-top: 55rpx;
		position: relative;
	}

	.order-details .writeOff .grayBg .written {
		position: absolute;
		top: 0;
		right: 0;
		width: 60rpx;
		height: 60rpx;
	}

	.order-details .writeOff .grayBg .written image {
		width: 100%;
		height: 100%;
	}

	.order-details .writeOff .grayBg .pictrue {
		width: 290rpx;
		height: 290rpx;
		margin: 0 auto;
	}

	.order-details .writeOff .grayBg .pictrue image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.order-details .writeOff .gear {
		width: 590rpx;
		height: 30rpx;
		margin: 0 auto;
	}

	.order-details .writeOff .gear image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.order-details .writeOff .num {
		background-color: #f0c34c;
		width: 590rpx;
		height: 84rpx;
		color: #282828;
		font-size: 48rpx;
		margin: 0 auto;
		border-radius: 0 0 20rpx 20rpx;
		text-align: center;
		padding-top: 4rpx;
	}

	.order-details .writeOff .rules {
		margin: 46rpx 30rpx 0 30rpx;
		border-top: 1px solid #f0f0f0;
		padding-top: 10rpx;
	}

	.order-details .writeOff .rules .item {
		margin-top: 20rpx;
	}

	.order-details .writeOff .rules .item .rulesTitle {
		font-size: 28rpx;
		color: #282828;
	}

	.order-details .writeOff .rules .item .rulesTitle .iconfont {
		font-size: 30rpx;
		color: #333;
		margin-right: 8rpx;
		margin-top: 5rpx;
	}

	.order-details .writeOff .rules .item .info {
		font-size: 28rpx;
		color: #999;
		margin-top: 7rpx;
	}

	.order-details .writeOff .rules .item .info .time {
		margin-left: 20rpx;
	}

	.order-details .map {
		height: 86rpx;
		font-size: 30rpx;
		color: #282828;
		line-height: 86rpx;
		border-bottom: 1px solid #f0f0f0;
		margin-top: 13rpx;
		background-color: #fff;
		padding: 0 30rpx;
	}

	.order-details .map .place {
		font-size: 26rpx;
		// width: 176rpx;
		height: 50rpx;
		border-radius: 25rpx;
		line-height: 50rpx;
		text-align: center;
		padding: 0 10rpx;
	}

	.order-details .map .place .iconfont {
		font-size: 27rpx;
		height: 27rpx;
		line-height: 27rpx;
		margin: 2rpx 3rpx 0 0;
	}

	.order-details .address .name .iconfont {
		font-size: 34rpx;
		margin-left: 10rpx;
	}

	.refund {
		padding: 0 30rpx 30rpx;
		margin: 12rpx 0;
		background-color: #fff;

		.title {
			display: flex;
			align-items: center;
			font-size: 30rpx;
			color: #333;
			height: 86rpx;
			border-bottom: 1px solid #f5f5f5;

			image {
				width: 32rpx;
				height: 32rpx;
				margin-right: 10rpx;
			}
		}

		.con {
			padding-top: 25rpx;
			font-size: 28rpx;
			color: #868686;
		}
	}
</style>

<style scoped lang="scss">
	.invoice-mask {
		background-color: #999999;
		opacity: 1;
	}

	.more-mask {
		background-color: #fff;
		opacity: 0;
		left: 300rpx;
	}

	.goodCall {
		color: var(--view-theme);
		text-align: center;
		width: 100%;
		height: 86rpx;
		padding: 0 30rpx;
		border-bottom: 1rpx solid #eee;
		font-size: 30rpx;
		line-height: 86rpx;
		background: #fff;

		.icon-kefu {
			font-size: 36rpx;
			margin-right: 15rpx;
		}

		/* #ifdef MP */
		button {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 86rpx;
			font-size: 30rpx;
			color: var(--view-theme);
		}

		/* #endif */
	}

	.order-details .header {
		padding: 0 30rpx;
		height: 150rpx;
	}

	.order-details .header.on {
		background-color: #666 !important;
	}

	.order-details .header .pictrue {
		width: 110rpx;
		height: 110rpx;
	}

	.order-details .header .pictrue image {
		width: 100%;
		height: 100%;
	}

	.order-details .header .data {
		color: rgba(255, 255, 255, 0.8);
		font-size: 24rpx;
		margin-left: 27rpx;
	}

	.order-details .header .data.on {
		margin-left: 0;
	}

	.order-details .header .data .state {
		font-size: 30rpx;
		font-weight: bold;
		color: #fff;
		margin-bottom: 7rpx;
	}

	.order-details .nav {
		background-color: #fff;
		font-size: 26rpx;
		color: #282828;
		padding: 25rpx 0;
	}

	.order-details .nav .navCon {
		padding: 0 40rpx;
	}

	.order-details .nav .on {
		color: var(--view-theme);
	}

	.order-details .nav .progress {
		padding: 0 65rpx;
		margin-top: 10rpx;
	}

	.order-details .nav .progress .line {
		width: 100rpx;
		height: 2rpx;
		background-color: #939390;
	}

	.order-details .nav .progress .iconfont {
		font-size: 25rpx;
		color: #939390;
		margin-top: -2rpx;
	}

	.order-details .address {
		font-size: 26rpx;
		color: #868686;
		background-color: #fff;
		padding: 35rpx 30rpx;
	}

	.order-details .address .name {
		font-size: 30rpx;
		color: #282828;
		margin-bottom: 15rpx;
	}

	.order-details .address .name .phone {
		margin-left: 40rpx;
	}

	.order-details .line {
		width: 100%;
		height: 3rpx;
	}

	.order-details .line image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.order-details .wrapper {
		background-color: #fff;
		margin-top: 12rpx;
		padding: 30rpx;
	}

	.order-details .wrapper .item {
		font-size: 28rpx;
		color: #282828;
	}

	.order-details .wrapper .item~.item {
		margin-top: 20rpx;
	}

	.order-details .wrapper .item .conter {
		color: #868686;
		// width: 380rpx;
		text-align: justify;
		flex: 1;
		word-break: break-all;
	}

	.order-details .wrapper .item .conter .upload {
		padding-bottom: 36rpx;
	}

	.order-details .wrapper .diy-from-title {
		white-space: nowrap;
		width: 5em;
	}

	.order-details .wrapper .item .conter .upload .pictrue {
		margin: 22rpx 23rpx 0 0;
		width: 156rpx;
		height: 156rpx;
		position: relative;
		font-size: 24rpx;
		color: #bbb;
	}

	.order-details .wrapper .item .conter .copy {
		font-size: 20rpx;
		color: #333;
		height: max-content;
		border-radius: 3rpx;
		border: 1rpx solid #666;
		padding: 3rpx 15rpx;
		margin-left: 24rpx;
	}

	.order-details .wrapper .actualPay {
		border-top: 1rpx solid #eee;
		margin-top: 30rpx;
		padding-top: 30rpx;
	}

	.order-details .wrapper .actualPay .money {
		font-weight: bold;
		font-size: 30rpx;
	}

	.order-details .footer .bnt {
		width: 160rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		border-radius: 50rpx;
		color: #fff;
		font-size: 27rpx;
	}

	.order-details .footer .bnt~.bnt {
		margin-left: 18rpx;
	}

	.order-details .writeOff {
		background-color: #fff;
		margin-top: 13rpx;
		padding-bottom: 30rpx;
	}

	.order-details .writeOff .title {
		font-size: 30rpx;
		color: #282828;
		height: 87rpx;
		border-bottom: 1px solid #f0f0f0;
		padding: 0 30rpx;
		line-height: 87rpx;
	}

	.order-details .writeOff .grayBg {
		background-color: #f2f5f7;
		width: 590rpx;
		height: 384rpx;
		border-radius: 20rpx 20rpx 0 0;
		margin: 50rpx auto 0 auto;
		padding-top: 55rpx;
		position: relative;
	}

	.order-details .writeOff .grayBg .written {
		position: absolute;
		top: 0;
		right: 0;
		width: 60rpx;
		height: 60rpx;
	}

	.order-details .writeOff .grayBg .written image {
		width: 100%;
		height: 100%;
	}

	.order-details .writeOff .grayBg .pictrue {
		width: 290rpx;
		height: 290rpx;
		margin: 0 auto;
	}

	.order-details .writeOff .grayBg .pictrue image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.order-details .writeOff .gear {
		width: 590rpx;
		height: 30rpx;
		margin: 0 auto;
	}

	.order-details .writeOff .gear image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.order-details .writeOff .num {
		background-color: #f0c34c;
		width: 590rpx;
		height: 84rpx;
		color: #282828;
		font-size: 48rpx;
		margin: 0 auto;
		border-radius: 0 0 20rpx 20rpx;
		text-align: center;
		padding-top: 4rpx;
	}

	.order-details .writeOff .rules {
		margin: 46rpx 30rpx 0 30rpx;
		border-top: 1px solid #f0f0f0;
		padding-top: 10rpx;
	}

	.order-details .writeOff .rules .item {
		margin-top: 20rpx;
	}

	.order-details .writeOff .rules .item .rulesTitle {
		font-size: 28rpx;
		color: #282828;
	}

	.order-details .writeOff .rules .item .rulesTitle .iconfont {
		font-size: 30rpx;
		color: #333;
		margin-right: 8rpx;
		margin-top: 5rpx;
	}

	.order-details .writeOff .rules .item .info {
		font-size: 28rpx;
		color: #999;
		margin-top: 7rpx;
	}

	.order-details .writeOff .rules .item .info .time {
		margin-left: 20rpx;
	}

	.order-details .map {
		height: 86rpx;
		font-size: 30rpx;
		color: #282828;
		line-height: 86rpx;
		border-bottom: 1px solid #f0f0f0;
		margin-top: 13rpx;
		background-color: #fff;
		padding: 0 30rpx;
	}

	.order-details .map .place {
		font-size: 26rpx;
		// width: 176rpx;
		height: 50rpx;
		border-radius: 25rpx;
		line-height: 50rpx;
		text-align: center;
	}

	.order-details .map .place .iconfont {
		font-size: 27rpx;
		height: 27rpx;
		line-height: 27rpx;
		margin: 2rpx 3rpx 0 0;
	}

	.order-details .address .name .iconfont {
		font-size: 34rpx;
		margin-left: 10rpx;
	}

	.refund {
		padding: 0 30rpx 30rpx;
		margin: 12rpx 0;
		background-color: #fff;

		.title {
			display: flex;
			align-items: center;
			font-size: 30rpx;
			color: #333;
			height: 86rpx;
			border-bottom: 1px solid #f5f5f5;

			image {
				width: 32rpx;
				height: 32rpx;
				margin-right: 10rpx;
			}
		}

		.con {
			padding-top: 25rpx;
			font-size: 28rpx;
			color: #868686;
		}
	}

	.refund-msg {
		background-color: #fff;
		padding: 20rpx 40rpx;
		font-size: 28rpx;

		.refund-msg-user {
			font-weight: bold;
			margin-bottom: 10rpx;

			.copy-refund-msg {
				font-size: 10px;
				border-radius: 1px;
				border: 0.5px solid #666;
				padding: 1px 7px;
				margin-left: 12px;
			}

			.name {
				margin-right: 20rpx;
			}
		}

		.refund-address {
			color: #868686;
		}
	}

	.copy-text {
		width: max-content;
		font-size: 10px;
		border-radius: 1px;
		border: 0.5px solid #666;
		padding: 1px 7px;
		margin-left: auto;
	}

	.upload .pictrue {
		display: inline-block;
		margin: 22rpx 17rpx 20rpx 0;
		width: 156rpx;
		height: 156rpx;
		color: #bbb;
	}

	.upload .pictrue image {
		width: 100%;
		height: 100%;
	}
</style>