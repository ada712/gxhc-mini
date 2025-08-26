<template>
	<view>
		<view class="my-order">
			<view class="header bg-color">
				<view class="picTxt acea-row row-between-wrapper">
					<view class="text">
						<view class="name">游戏申请</view>
						<!-- <view>消费订单：{{ orderData.order_count || 0 }}
							总消费：￥{{ orderData.sum_price || 0 }}
						</view> -->
					</view>
					<view class="pictrue">
						<image src="/static/images/orderTime.png"></image>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="item" v-for="(item, index) in orderList" :key="index">
					<view>
						<view class="title acea-row row-between-wrapper">
							<view class="acea-row row-middle">
								<!-- <text class="sign cart-color acea-row row-center-wrapper">砍价</text> -->
								<view>{{ item._add_time }}</view>
							</view>
							<view v-if="item.status == 0" class="font-color">待审核</view>
							<view v-else-if="item.status == 2">申请拒绝</view>
							<view v-else-if="item.status == 3">申请取消</view>
							<view v-else-if="item.gameInfo.status == 0" class="font-color">待开始</view>
							<view v-else-if="item.gameInfo.status == 1" class="font-color">进行中</view>
							<view v-else-if="item.gameInfo.status == 2" class="font-color">待打款</view>
							<view v-else-if="item.gameInfo.status == 3" class="font-color">已完成</view>
						</view>
						<view class="item-info acea-row row-between row-top">
							<view>
								<text class="label">游戏：</text>
								<text class="value">{{ item.gameInfo.app_name }}</text>
							</view>
							<view>
								<text class="label">appId：</text>
								<text class="value">{{ item.gameInfo.appid }}</text>
							</view>
						</view>
						<view class="item-info acea-row row-between row-top">
							<view>
								<text class="label">申请人：</text>
								<text class="value">{{ item.userInfo.nickname }}</text>
							</view>
							<view>
								<text class="label">userId：</text>
								<text class="value">{{ item.userInfo.uid }}</text>
							</view>
						</view>
					</view>
					<view class="bottom acea-row row-right row-middle">
						<view class="bnt cancelBnt" @click="auditOrder(index,item.id,2)">拒绝</view>
						<view class="bnt bg-color" @click="auditOrder(index,item.id,1)">通过</view>
					</view>
				</view>
			</view>
			<view class="loadingicon acea-row row-center-wrapper" v-if="orderList.length > 0">
				<text class="loading iconfont icon-jiazai" v-show="loading"></text>
				{{ loadTitle }}
			</view>
			<view v-if="orderList.length == 0">
				<x-empty-page v-if="!loading" :title="`暂无游戏`"></x-empty-page>
				<view class="loadingicon acea-row row-center-wrapper">
					<text class="loading iconfont icon-jiazai" v-show="loading"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		orderApplyList,
		applyAudit
	} from '@/api/game.js';
	export default {
		data() {
			return {
				page: 1,
				limit: 10,
				loading: false, //是否加载中
				loadend: false, //是否加载完毕
				loadTitle: `加载更多`, //提示语
				orderList: [], //订单数组
				orderData: {}, //订单详细统计
			};
		},
		onLoad(options) {
			this.getOrderList()
		},
		methods: {
			getOrderList() {
				if (this.loadend) return;
				if (this.loading) return;
				this.loading = true;
				this.loadTitle = `加载更多`;
				orderApplyList({
					page: this.page,
					limit: this.limit
				}).then(res => {
					if (res.status == 200) {
						let list = res.data.list || [];
						let loadend = list.length < this.limit;
						this.orderList = this.$util.SplitArray(list, this.orderList);
						this.loadend = loadend;
						this.loading = false;
						this.loadTitle = loadend ? `没有更多内容啦~` : `加载更多`;
						this.page = this.page + 1;
					}
				}).catch((err) => {
					this.loading = false;
					this.loadTitle = `加载更多`;
				});
			},
			auditOrder: function(index, order_id, status) {
				let that = this;
				if (!order_id)
					return that.$util.Tips({
						title: `缺少订单号无法审核订单`
					});
				uni.showModal({
					title: `提示`,
					content: `确认审核该订单`,
					success: function(res) {
						if (res.confirm) {
							applyAudit({
									id: order_id,
									auditStatus: status
								})
								.then((res) => {
									return that.$util.Tips({
											title: res.msg,
											icon: 'success'
										},
										function() {
											that.orderList.splice(index, 1);
											that.$set(that, 'orderList', that.orderList);
											that.getOrderList();
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
		},
		onReachBottom: function() {
			this.getOrderList();
		},
	}
</script>

<style scoped lang="scss">
	.my-order .header {
		height: 260rpx;
		padding: 0 30rpx;
	}

	.my-order .header .picTxt {
		height: 190rpx;
	}

	.my-order .header .picTxt .text {
		color: rgba(255, 255, 255, 0.8);
		font-size: 26rpx;
		font-family: 'Guildford Pro';
	}

	.my-order .header .picTxt .text .name {
		font-size: 34rpx;
		font-weight: bold;
		color: #fff;
		margin-bottom: 20rpx;
	}

	.my-order .header .picTxt .pictrue {
		width: 122rpx;
		height: 109rpx;
	}

	.my-order .header .picTxt .pictrue image {
		width: 100%;
		height: 100%;
	}

	.my-order .nav {
		background-color: #fff;
		width: 690rpx;
		height: 140rpx;
		border-radius: 6rpx;
		margin: -73rpx auto 0 auto;
	}

	.my-order .nav .item {
		text-align: center;
		font-size: 26rpx;
		color: #282828;
		width: 3rem;
		padding: 27rpx 0;
		border-bottom: 5rpx solid transparent;
	}

	.my-order .nav .item.on {
		/* #ifdef H5 || MP */
		font-weight: bold;
		/* #endif */
		/* #ifdef APP-PLUS */
		color: #000;
		/* #endif */
		border-color: $zt;
	}

	.my-order .nav .item .num {
		margin-top: 18rpx;
	}

	.my-order .list {
		width: 690rpx;
		margin: 14rpx auto 0 auto;
	}

	.my-order .list .item {
		background-color: #fff;
		border-radius: 6rpx;
		margin-bottom: 14rpx;
	}

	.my-order .list .item .title {
		height: 84rpx;
		padding: 0 30rpx;
		border-bottom: 1rpx solid #eee;
		font-size: 28rpx;
		color: #282828;
	}

	.my-order .list .item .title .sign {
		font-size: 24rpx;
		padding: 0 7rpx;
		height: 36rpx;
		margin-right: 15rpx;
	}

	.my-order .list .item .item-info {
		padding: 0 30rpx;
		margin-top: 22rpx;
	}

	.my-order .list .item .item-info .pictrue {
		width: 120rpx;
		height: 120rpx;

		::v-deep(image, .easy-loadimage, uni-image) {
			width: 120rpx;
			height: 120rpx;
			border-radius: 6rpx;
		}
	}

	.my-order .list .item .item-info .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 6rpx;
	}

	.my-order .list .item .item-info .text {
		width: 486rpx;
		font-size: 28rpx;
		color: #999;
		margin-top: 6rpx;
		display: flex;
		line-height: 39rpx;
	}

	.my-order .list .item .item-info .text .name {
		width: 306rpx;
		color: #282828;
		height: 78rpx;
	}

	.my-order .list .item .item-info .text .money {
		text-align: right;
		flex: 1;
	}

	.my-order .list .item .totalPrice {
		font-size: 26rpx;
		color: #282828;
		text-align: right;
		margin: 27rpx 0 0 30rpx;
		padding: 0 30rpx 30rpx 0;
		border-bottom: 1rpx solid #eee;
	}

	.my-order .list .item .totalPrice .money {
		font-size: 28rpx;
		font-weight: bold;
		color: var(--view-priceColor);
	}

	.my-order .list .item .bottom {
		height: 107rpx;
		padding: 0 30rpx;
	}

	.my-order .list .item .bottom .bnt {
		width: 176rpx;
		height: 60rpx;
		text-align: center;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		border-radius: 50rpx;
		font-size: 27rpx;
	}

	.my-order .list .item .bottom .bnt.cancelBnt {
		color: #666;
		border: 1px solid #ccc;
	}

	.my-order .list .item .bottom .bnt~.bnt {
		margin-left: 17rpx;
	}

	.noCart {
		margin-top: 171rpx;
		padding-top: 0.1rpx;
	}

	.noCart .pictrue {
		width: 414rpx;
		height: 336rpx;
		margin: 78rpx auto 56rpx auto;
	}

	.noCart .pictrue image {
		width: 100%;
		height: 100%;
	}

	.my-order .list .item .item-info .text .money .return {
		// color: var(--view-priceColor);
		margin-top: 10rpx;
		font-size: 24rpx;
	}
</style>