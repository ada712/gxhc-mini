<template>
	<view class="new-users copy-data">
		<scroll-view scroll-y="true" style="height: 100%;">
			<view class="head">
				<view class="user-card" :style="{paddingTop: statusBarHeight + 40+'px',height: 190+statusBarHeight+'px'}">
					<view class="bg"></view>
					<view class="user-info">
						<view>
							<!-- #ifndef APP-PLUS -->
							<view class="avatar-box" :class="{on:userInfo.is_money_level}">
								<image class="avatar" :src='userInfo.avatar' v-if="userInfo.avatar" @click="goEdit()">
								</image>
								<image v-else class="avatar" src="/static/images/f.png" @click="goEdit()">
								</image>
							</view>
							<!-- #endif -->
						</view>
						<view class="info">
							<!-- #ifdef MP || APP-PLUS -->
							<view class="name" v-if="!isLogin" @click="openAuto"
								style="height: 100%; display: flex; align-items: center;">
								请点击授权
							</view>
							<!-- #endif -->
							<!-- #ifdef H5 -->
							<view class="name" v-if="!isLogin" @click="openAuto"
								style="height: 100%; display: flex; align-items: center;">
								请点击登录
							</view>
							<!-- #endif -->
							<view class="name" v-if="isLogin">
								<text class="line1 nickname">{{userInfo.nickname}}</text>
							</view>
							<view class="num" v-if="isLogin && userInfo.phone" @click="goEdit()">
								<view class="num-txt">{{maskMiddleFour(userInfo.phone)}}</view>
							</view>
							<!-- #ifdef MP -->
							<button class="phone" v-if="!userInfo.phone && isLogin" open-type="getPhoneNumber"
								@getphonenumber="getphonenumber">绑定手机号</button>
							<!-- #endif -->
						</view>
						<view class="message">
							<navigator v-if="isLogin" url="/pages/users/user_info/index" hover-class="none">
								<view class="iconfont icon-shezhi"></view>
							</navigator>
						</view>
					</view>
				</view>
				<view class="order-wrapper" :class="'height'">
					<view class="order-hd flex">
						<view class="left">游戏中心</view>
						<navigator class="right flex" hover-class="none" url="/pages/goods/order_list/index" open-type="navigate">
							查看全部
							<text class="iconfont icon-xiangyou"></text>
						</navigator>
					</view>
					<view class="order-bd">
						<block v-for="(item,index) in orderMenu" :key="index">
							<navigator class="order-item" hover-class="none" :url="item.url">
								<view class="pic">
									<!-- <image :src="item.img" mode=""></image> -->
									<text class="iconfont" :class="item.img"></text>
									<text class="order-status-num" v-if="item.num > 0">{{ item.num }}</text>
								</view>
								<view class="txt">{{item.title}}</view>
							</navigator>
						</block>
					</view>
				</view>
			</view>
			<!-- 会员菜单 -->
			<view class="user-menus" style="margin-top: 20rpx;" v-if="userInfo.spread_open">
				<view class="menu-title">我的服务</view>
				<view class="list-box">
					<!-- #ifdef APP-PLUS || H5 -->
					<block v-for="(item,index) in MyMenus" :key="index">
						<view class="item" v-if="item.url!='#' && item.url!='/pages/service/index'"
							@click="goMenuPage(item.url, item.name)">
							<image :src="item.pic"></image>
							<text>{{item.name}}</text>
						</view>
					</block>
					<!-- #endif -->
					<!-- #ifdef MP -->
					<block v-for="(item,index) in MyMenus" :key="index">
						<view class="item" v-if="item.url!='#' 
						&& item.url!='/pages/service/index' 
						&& item.url!='/pages/extension/customer_list/chat' 
						|| (item.url=='/pages/extension/customer_list/chat')" @click="goMenuPage(item.url, item.name)">
							<image :src="item.pic"></image>
							<text>{{item.name}}</text>
						</view>
					</block>
					<!-- #endif -->
				</view>
			</view>
			<view class="user-menus" style="margin-top: 20rpx;" v-if="storeMenu.length">
				<view class="menu-title">系统管理</view>
				<view class="list-box">
					<block v-for="(item,index) in storeMenu" :key="index">
						<view class="item" :url="item.url" hover-class="none"
							v-if="item.url!='#' && item.url!='/pages/service/index'" @click="goMenuPage(item.url, item.name)">
							<image :src="item.pic"></image>
							<text>{{item.name}}</text>
						</view>
					</block>
				</view>
			</view>
			<view style="width:100%;height:60rpx;"></view>
		</scroll-view>
	</view>
</template>

<script>
	const app = getApp();
	import {
		mapState,
		mapGetters
	} from 'vuex';
	import {
		toLogin
	} from '@/libs/login.js';
	import {
		getUserInfo,
		mpBindingPhone
	} from '@/api/user.js';
	import Routine from '@/libs/routine';
	import {
		orderMenu,
		storeMenu,
		MyMenus
	} from './menu.js'
	export default {
		data() {
			return {
				orderMenu,
				storeMenu,
				MyMenus,
				member_style: 3,
				userInfo: {}
			}
		},
		onLaunch() {

		},
		onShow() {
			if (this.isLogin) {
				this.getUserInfo();
			}
		},
		methods: {
			maskMiddleFour(str, start = 3, count = 4) {
				if (str.length < start + count) return str;
				return (
					str.slice(0, start) +
					'*'.repeat(count) +
					str.slice(start + count)
				);
			},
			// goMenuPage
			goMenuPage(url, name) {
				if (this.isLogin) {
					if (url.indexOf('http') === -1) {
						// #ifdef H5 || APP-PLUS
						if (name && name === '客服接待') {
							// return window.location.href = `${location.origin}${url}`
							return uni.navigateTo({
								url: `/pages/annex/web_view/index?url=${location.origin}${url}`
							});
						} else if (name && name === '联系客服') {
							return getCustomer(url);
						}
						// #endif

						// #ifdef MP
						if (name && name === '联系客服') {
							return getCustomer(url);
						}
						if (url != '#' && url == '/pages/users/user_info/index') {
							uni.openSetting({
								success: function(res) {}
							});
						}
						// #endif
						uni.navigateTo({
							url: url,
							fail(err) {
								uni.switchTab({
									url: url
								});
							}
						});
					} else {
						uni.navigateTo({
							url: `/pages/annex/web_view/index?url=${url}`
						});
					}
				} else {
					// #ifdef MP
					this.openAuto();
					// #endif
					// #ifndef MP
					toLogin();
					// #endif
				}
			},
			// 打开授权
			openAuto() {
				toLogin();
			},
			getphonenumber(e) {
				if (e.detail.errMsg == 'getPhoneNumber:ok') {
					Routine.getCode()
						.then((code) => {
							let data = {
								code,
								iv: e.detail.iv,
								encryptedData: e.detail.encryptedData
							};
							mpBindingPhone(data)
								.then((res) => {
									this.getUserInfo();
									this.$util.Tips({
										title: res.msg,
										icon: 'success'
									});
								})
								.catch((err) => {
									return this.$util.Tips({
										title: err
									});
								});
						})
						.catch((error) => {
							uni.hideLoading();
						});
				}
			},
			/**
			 * 获取个人用户信息
			 */
			getUserInfo: function() {
				let that = this;
				getUserInfo().then((res) => {
					that.userInfo = res.data;
					console.log('getUserInfo',res.data)
					that.$store.commit('SETUID', res.data.uid);
					uni.stopPullDownRefresh();
				});
			},
			goEdit() {
				if (this.isLogin == false) {
					toLogin();
				} else {
					// #ifdef MP
					if (this.userInfo.is_default_avatar) {
						this.editModal = true
						return
					}
					// #endif
					uni.navigateTo({
						url: '/pages/users/user_info/index'
					})
				}
			},
		},
		computed: {
			statusBarHeight() {
				let systemInfo = uni.getSystemInfoSync();
				return systemInfo.statusBarHeight
			},
			...mapGetters({
				isLogin: 'isLogin'
			})
		}
	}
</script>

<style lang="scss">
	page,
	body {
		height: 100%;
	}

	.height {
		/* #ifndef MP */
		margin-top: -1570rpx !important;
		/* #endif */
		/* #ifdef MP */
		margin-top: -130rpx !important;
		/* #endif */
	}

	.new-users {
		display: flex;
		flex-direction: column;
		height: 100%;

		.head {
			.user-card {
				position: relative;
				width: 100%;
				height: 380rpx;
				margin: 0 auto;
				padding: 50rpx 28rpx 35rpx 28rpx;
				background-image: url("~@/static/images/user01.png");
				background-size: 100% auto;
				background-color: $zt;
				box-sizing: border-box;

				.user-info {
					z-index: 20;
					position: relative;
					display: flex;

					.headwear {
						position: absolute;
						right: -4rpx;
						top: -14rpx;
						width: 44rpx;
						height: 44rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.live {
						width: 28rpx;
						height: 28rpx;
						margin-left: 20rpx;
					}

					.bntImg {
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;
						text-align: center;
						line-height: 120rpx;
						background-color: unset;
						position: relative;

						.avatarName {
							font-size: 16rpx;
							color: #fff;
							text-align: center;
							background-color: rgba(0, 0, 0, 0.6);
							height: 37rpx;
							line-height: 37rpx;
							position: absolute;
							bottom: 0;
							left: 0;
							width: 100%;
						}
					}

					.avatar-box {
						position: relative;
						display: flex;
						align-items: center;
						justify-content: center;
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;

						&.on {
							.avatar {
								border: 2px solid #FFAC65;
								border-radius: 50%;
								box-sizing: border-box;
							}
						}
					}

					.avatar {
						position: relative;
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;

					}

					.info {
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						margin-left: 20rpx;
						padding: 20rpx 0;

						.name {
							display: flex;
							align-items: center;
							color: #fff;
							font-size: 31rpx;

							.nickname {
								max-width: 8em;
							}

							.vip {
								margin-left: 10rpx;

								image {
									width: 78rpx;
									height: 30rpx;
									display: block;
								}
							}
						}

						.num {
							display: flex;
							align-items: center;
							font-size: 26rpx;
							color: rgba(255, 255, 255, 0.6);

							image {
								width: 22rpx;
								height: 23rpx;
								margin-left: 20rpx;
							}
						}
					}
				}

				.message {
					align-self: flex-start;
					position: relative;
					margin-top: 15rpx;
					margin-right: 20rpx;

					.iconfont {
						font-size: 40rpx;
						color: #fff;
					}
				}

				.num-wrapper {
					z-index: 30;
					position: relative;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 22rpx;
					// padding: 0 47rpx;
					color: #fff;

					.num-item {
						width: 33.33%;
						text-align: center;

						&~.num-item {
							position: relative;

							&:before {
								content: '';
								position: absolute;
								width: 1rpx;
								height: 28rpx;
								top: 50%;
								margin-top: -14rpx;
								background-color: rgba(255, 255, 255, 0.4);
								left: 0;
							}
						}

						.num {
							font-size: 42rpx;
							font-weight: bold;
						}

						.txt {
							margin-top: 8rpx;
							font-size: 26rpx;
							color: rgba(255, 255, 255, 0.6);
						}
					}
				}

				.sign {
					z-index: 200;
					position: absolute;
					right: -12rpx;
					top: 80rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 120rpx;
					height: 60rpx;
					background: linear-gradient(90deg, rgba(255, 225, 87, 1) 0%, rgba(238, 193, 15, 1) 100%);
					border-radius: 29rpx 4rpx 4rpx 29rpx;
					color: #282828;
					font-size: 28rpx;
					font-weight: bold;
				}
			}

			.order-wrapper {
				background: #fff;
				margin: 0 30rpx;
				border-radius: 16rpx;
				position: relative;
				margin-top: -10rpx;
				box-sizing: border-box;

				.order-hd {
					display: flex;
					justify-content: space-between;
					padding: 30rpx 20rpx 10rpx 30rpx;
					margin-top: 25rpx;
					font-size: 30rpx;
					color: #282828;

					.left {
						font-weight: bold;
					}

					.right {
						display: flex;
						align-items: center;
						color: #666666;
						font-size: 26rpx;

						.icon-xiangyou {
							margin-left: 5rpx;
							font-size: 26rpx;
						}
					}
				}

				.order-bd {
					display: flex;
					padding: 0 0;

					.order-item {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						width: 20%;
						height: 140rpx;

						.pic {
							position: relative;
							text-align: center;

							.iconfont {
								font-size: 48rpx;
								color: $zt;
							}

							image {
								width: 58rpx;
								height: 48rpx;
							}
						}

						.txt {
							margin-top: 6rpx;
							font-size: 26rpx;
							color: #333;
						}
					}
				}
			}
		}

		.slider-wrapper {
			margin: 20rpx 30rpx;
			height: 130rpx;

			swiper,
			swiper-item {
				height: 100%;
			}

			image {
				width: 100%;
				height: 130rpx;
				border-radius: 16rpx;
			}
		}

		.user-menus {
			background-color: #fff;
			margin: 0 30rpx;
			border-radius: 16rpx;

			.menu-title {
				padding: 30rpx 30rpx 40rpx;
				font-size: 30rpx;
				color: #282828;
				font-weight: bold;
			}

			.list-box {
				display: flex;
				flex-wrap: wrap;
				padding: 0;
			}

			.item {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-direction: column;
				width: 25%;
				margin-bottom: 47rpx;
				font-size: 26rpx;
				color: #333333;

				image {
					width: 52rpx;
					height: 52rpx;
					margin-bottom: 18rpx;
				}


				&:last-child::before {
					display: none;
				}
			}

			button {
				font-size: 28rpx;
			}
		}

		.phone {
			color: #fff;
			background-color: #ffffff80;
			border-radius: 15px;
			width: max-content;
			font-size: 24rpx;
			padding: 2px 10px;
			margin-top: 8rpx;
		}

		.order-status-num {
			min-width: 12rpx;
			background-color: #fff;
			color: var(--view-theme);
			border-radius: 15px;
			position: absolute;
			right: -14rpx;
			top: -15rpx;
			font-size: 20rpx;
			padding: 0 8rpx;
			border: 1px solid var(--view-theme);
		}

		.support {
			width: 219rpx;
			height: 74rpx;
			margin: 54rpx auto;
			display: block;
		}
	}

	.setting {
		margin-top: 15rpx;
		margin-left: 15rpx;
		color: #fff;

		.iconfont {
			font-size: 40rpx;
		}
	}

	.new-users {
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>