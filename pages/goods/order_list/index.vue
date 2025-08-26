<template>
	<view>
		<view class="my-order">
			<view class="header bg-color">
				<view class="picTxt acea-row row-between-wrapper">
					<view class="text">
						<view class="name">游戏信息</view>
						<!-- <view>消费订单：{{ orderData.order_count || 0 }}
							总消费：￥{{ orderData.sum_price || 0 }}
						</view> -->
					</view>
					<view class="pictrue">
						<image src="/static/images/orderTime.png"></image>
					</view>
				</view>
			</view>
			<view class="nav acea-row row-around">
				<view class="item" :class="orderStatus == -1 ? 'on' : ''" @click="statusClick(-1)">
					<view>全部</view>
					<view class="num">{{ orderData.all || 0 }}</view>
				</view>
				<view class="item" :class="orderStatus == 0 ? 'on' : ''" @click="statusClick(0)">
					<view>待审核</view>
					<view class="num">{{ orderData.dsh || 0 }}</view>
				</view>
				<view class="item" :class="orderStatus == 1 ? 'on' : ''" @click="statusClick(1)">
					<view>待开始</view>
					<view class="num">{{ orderData.dks || 0 }}</view>
				</view>
				<view class="item" :class="orderStatus == 2 ? 'on' : ''" @click="statusClick(2)">
					<view>进行中</view>
					<view class="num ">{{ orderData.jxz || 0 }}</view>
				</view>
				<view class="item" :class="orderStatus == 3 ? 'on' : ''" @click="statusClick(3)">
					<view>打款中</view>
					<view class="num">{{ orderData.ddk || 0 }}</view>
				</view>
			</view>
			<view class="list">
				<view class="item" v-for="(item, index) in orderList" :key="index">
					<view @click="goOrderDetails(item.id)">
						<view class="title">
							<view class="acea-row row-between row-item">
								<!-- <text class="sign cart-color acea-row row-center-wrapper">砍价</text> -->
								<view>
									<text class="label">编号：</text>
									<text class="value">{{ item.order_id }}</text>
								</view>
								<view>
									<text class="label">状态：</text>
									<text class="value">
										<text v-if="item.status == 0" class="font-color">待审核</text>
										<text v-else-if="item.status == 2">申请拒绝</text>
										<text v-else-if="item.status == 3">申请取消</text>
										<text v-else-if="item.gameInfo.status == 0" class="font-color">待开始</text>
										<text v-else-if="item.gameInfo.status == 1" class="font-color">进行中</text>
										<text v-else-if="item.gameInfo.status == 2" class="font-color">待打款</text>
										<text v-else-if="item.gameInfo.status == 3" class="font-color">已完成</text>
									</text>
								</view>
							</view>
							<view class="acea-row row-between row-item">
								<view>
									<text class="label">游戏：</text>
									<text class="value">{{ item.gameInfo.app_name }}</text>
								</view>
								<view>
									<text class="label">appId：</text>
									<text class="value">{{ item.gameInfo.appid }}</text>
								</view>
							</view>
							<view class="acea-row row-between row-item" v-if="item.status == 1">
								<view>
									<text class="label">总周期：</text>
									<text class="value">{{ item.gameInfo.total_day }}天</text>
								</view>
								<view>
									<text class="label">预估打款周期：</text>
									<text class="value">{{ item.gameInfo.remit }}天</text>
								</view>
							</view>
							<view class="o-progress" v-if="item.status == 1">
								<view class="cu-progress acea-row row-middle round margin-top">
									<view class="acea-row row-middle bg-red" :style="'width:' + item.gameInfo.progress + '%;'"></view>
								</view>
								<view class="money acea-row row-between-wrapper">
									<view>消耗金额</view>
									<view>{{ item.gameInfo.progress }}%</view>
								</view>
							</view>
						</view>
					</view>
					<view class="bottom acea-row row-between">
						<view class="jd acea-row row-left row-middle">
							<template v-if="item.status == 1">
								<view>游戏进度：</view>
								<view class="jd-t">{{ item.gameInfo.gameProgress }}%</view>
							</template>
						</view>
						<view class="acea-row row-right row-middle">
							<view class="bnt cancelBnt" @click="cancelOrder(index, item.id)" v-if="item.status == 0">取消申请</view>
							<view class="bnt bg-color" @click="goOrderDetails(item.id)">查看详情</view>
						</view>
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
		orderList,
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
				orderStatus: -1, //订单状态
				orderList: [], //订单数组
				orderData: {}, //订单详细统计
			};
		},
		onLoad(options) {
			if (options.status) this.orderStatus = options.status;
			this.getOrderList()
		},
		methods: {
			getOrderList() {
				if (this.loadend) return;
				if (this.loading) return;
				this.loading = true;
				this.loadTitle = `加载更多`;
				orderList({
					status: this.orderStatus,
					page: this.page,
					limit: this.limit
				}).then(res => {
					if (res.status == 200) {
						let list = res.data.list || [];
						let loadend = list.length < this.limit;
						this.orderList = this.$util.SplitArray(list, this.orderList);
						this.orderData = res.data.orderData
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
			/**
			 * 取消订单
			 *
			 */
			cancelOrder: function(index, order_id) {
				let that = this;
				if (!order_id)
					return that.$util.Tips({
						title: `缺少订单号无法取消订单`
					});
				uni.showModal({
					title: `提示`,
					content: `确认取消该订单`,
					success: function(res) {
						if (res.confirm) {
							applyAudit({
									id: order_id,
									cancelStatus: 1
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
			/**
			 * 切换类型
			 */
			statusClick(status) {
				if (status == this.orderStatus) return;
				this.orderStatus = status;
				this.loadend = false;
				this.page = 1;
				this.orderList = [];
				this.getOrderList()
			},
			/**
			 * 去订单详情
			 */
			goOrderDetails(order_id) {
				uni.navigateTo({
					url: '/pages/goods/order_details/index?order_id=' + order_id
				})
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
		padding: 30rpx 30rpx 0 30rpx;
		border-bottom: 1rpx solid #eee;
		font-size: 26rpx;
		color: #282828;
	}

	.my-order .list .item .title .row-item {
		margin-bottom: 30rpx;
	}
	
	.jd {
		font-size: 26rpx;
		.jd-t {
			font-size: 30rpx;
		}
	}

	.o-progress {
		margin-bottom: 30rpx;
	}

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

	.my-order .list .item .title .sign {
		font-size: 24rpx;
		padding: 0 7rpx;
		height: 36rpx;
		margin-right: 15rpx;
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
		width: 156rpx;
		height: 50rpx;
		text-align: center;
		color: #fff;
		border-radius: 50rpx;
		font-size: 25rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.my-order .list .item .bottom .bnt.cancelBnt {
		border: 1px solid #ccc;
		color: #666;
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
</style>