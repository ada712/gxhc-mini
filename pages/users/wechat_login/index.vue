<template>
	<view class="wrapper">
		<x-navbar bgColor="transparent" title="登录"></x-navbar>
		<view class="bag">
			<image src="../static/login-bg_1.jpg" mode="widthFix" />
		</view>
		<view class="merchant-msg">
			<image :src="configData.wap_login_logo" mode="widthFix" />
			<view class="name">
				{{configData.site_name}}
			</view>
		</view>
		<view class="wechat_login">
			<view class="btn-wrapper">
				<!-- #ifdef H5 -->
				<button hover-class="none" @click="wechatLogin" class="bg-theme btn1">微信登录</button>
				<!-- #endif -->
				<!-- #ifdef MP -->
				<template v-if="configData.wechat_auth_switch">
					<button class="bg-theme btn1" v-if="bindPhone" open-type="getPhoneNumber"
						@getphonenumber="getphonenumber">授权登录</button>
					<button class="bg-theme btn1" v-else-if="!bindPhone" @click="getAuthLogin">
						授权登录
					</button>
					<view class="cancel-login" @click="onReject">取消登录</view>
				</template>
				<button v-if="configData.phone_auth_switch && false" hover-class="none" @click="phoneLogin" class="btn2">手机号登录</button>
				<!-- #endif -->
			</view>
		</view>
		<view class="protocols" v-if="!canGetPrivacySetting">
			<checkbox-group @click.stop='ChangeIsDefault'>
				<checkbox :class="inAnimation?'trembling':''" @animationend='inAnimation=false'
					:checked="protocol ? true : false" /> <text>已阅读并同意</text>
				<text class="main-color" @click.stop="privacy(4)">《用户协议》</text>
				与<text class="main-color" @click.stop="privacy(3)">《隐私协议》</text>
			</checkbox-group>
		</view>
		
		<block>
			<editUserModal :isShow="isShow" @closeEdit="closeEdit" @editSuccess="isShow = false">
			</editUserModal>
		</block>
	</view>
</template>

<script>
	const app = getApp();
	import editUserModal from '@/components/eidtUserModal/index.vue'
	import Routine from '@/libs/routine';
	import Cache from '@/utils/cache';
	import {
		authType,
		authLogin
	} from '@/api/public';
	import {
		getUserInfo
	} from '@/api/user.js';
	export default {
		components: {
			editUserModal,
		},
		data() {
			return {
				isShow: false,
				bindPhone: false,
				configData: Cache.get('BASIC_CONFIG'),
				isUp: false,
				isPhoneBox: false,
				protocol: false,
				canGetPrivacySetting: false,
				authKey: ''
			}
		},
		onLoad(options) {
			let that = this;
			// #ifdef MP
			this.userLogin()
			// #endif
			let pages = getCurrentPages();
			let prePage = pages[pages.length - 2];
			if (prePage && prePage.route == 'pages/order_addcart/order_addcart') {
				this.isHome = true;
			} else {
				this.isHome = false;
			}
		},
		methods: {
			ChangeIsDefault(e) {
				this.$set(this, 'protocol', !this.protocol);
			},
			privacy(type) {
				uni.navigateTo({
					url: "/pages/users/privacy/index?type=" + type
				})
			},
			// 小程序 22.11.8日删除getUserProfile 接口获取用户昵称头像
			userLogin() {
				Routine.getCode()
					.then(code => {
						authType({
								code,
								spread_spid: app.globalData.spid,
								spread_code: app.globalData.code
							}).then(res => {
								uni.hideLoading();
								this.authKey = res.data.key;
								this.bindPhone = res.data.bindPhone
							})
							.catch(err => {
								uni.hideLoading();
								uni.showToast({
									title: err,
									icon: 'none',
									duration: 2000
								});
							});
					})
					.catch(err => {
						console.log(err)
					});
			},
			getAuthLogin() {
				console.log(this.authKey)
				if (!this.authKey) return
				if (!this.protocol) {
					uni.showToast({
						title: '请先阅读并同意协议',
						icon: 'none',
						duration: 2000
					});
					return
				}
				uni.showLoading({
					title: `正在登录中`
				});
				authLogin({
					key: this.authKey
				}).then(res => {
					console.log(this.$Cache)
					let time = res.data.expires_time - this.$Cache.time();
					this.$store.commit('LOGIN', {
						token: res.data.token,
						time: time
					});
					this.getUserInfo(res.data.bindName)
				}).catch(err => {
					uni.hideLoading();
					console.log(err)
					uni.showToast({
						title: JSON.stringify(err),
						icon: 'none',
						duration: 2000
					});
				})
			},
			phoneLogin() {
				uni.navigateTo({
					url: `/pages/users/binding_phone/index?authKey=${this.authKey}&pageType=0`
				})
			},
			/**
			 * 获取个人用户信息
			 */
			getUserInfo(new_user, back_url) {
				let that = this;
				getUserInfo().then(res => {
					uni.hideLoading();
					that.userInfo = res.data;
					that.$store.commit('SETUID', res.data.uid);
					that.$store.commit('UPDATE_USERINFO', res.data);
					if (new_user) {
						this.isShow = true
					} else {
						// #ifdef MP
						that.$util.Tips({
							title: `登录成功`,
							icon: 'success'
						}, {
							tab: 3
						});
						// #endif
						// #ifndef MP
						that.$util.Tips({
							title: `登录成功`,
							icon: 'success'
						}, {
							tab: 4,
							url: back_url || '/pages/user/index'
						});
						// #endif
					}
				}).catch(err => {
					uni.hideLoading();
					uni.showToast({
						title: err.msg,
						icon: 'none',
						duration: 2000
					});
				});
			},
			onReject() {
				uni.navigateBack();
			},
		
		}
	}
</script>

<style lang="scss">
	.bg-theme {
		background-color: var(--view-theme);
	}

	page {
		background: #fff;
	}

	.wrapper {
		position: relative;
		height: 100vh;

		.bag {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			opacity: .8;
			z-index: -1;
			/* #ifdef H5 */
			z-index: 0;

			/* #endif */
			image {
				width: 100%;
				height: 838rpx;
			}
		}

		.merchant-msg {
			padding-top: 252rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			z-index: 2;
			/* #ifdef H5 */
			position: relative;

			/* #endif */
			image {
				width: 152rpx;
				height: 152rpx;
				border-radius: 50%;
			}

			.name {
				font-size: 40rpx;
				font-weight: 500;
				color: #333333;
				line-height: 56rpx;
				margin-top: 32rpx;
			}
		}
	}

	.wechat_login {
		margin-top: 96rpx;

		.img image {
			width: 100%;
		}

		.btn-wrapper {
			padding: 0 66rpx;

			button {
				width: 100%;
				height: 86rpx;
				line-height: 86rpx;
				margin-bottom: 40rpx;
				border-radius: 120rpx;
				font-size: 30rpx;

				&.btn1 {
					color: #fff;
				}

				&.btn2 {
					color: #666666;
					border: 1px solid #E4E4E4;
				}
			}
			.cancel-login{
				color: #999;
				font-size: 28rpx;
				text-align: center;
			}
		}
	}

	.title-bar {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 34rpx;
		font-weight: 500;
		color: #333333;
		line-height: 48rpx;
	}

	.icon {
		position: absolute;
		left: 30rpx;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 80rpx;
		height: 80rpx;

		image {
			width: 50rpx;
			height: 50rpx;
		}
	}

	.protocols {
		position: fixed;
		bottom: 52rpx;
		left: 0;
		width: 100%;
		margin: 0 auto;
		color: #999999;
		font-size: 24rpx;
		line-height: 22rpx;
		text-align: center;
		// bottom: calc(52rpx+ constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		// bottom: calc(52rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/

		.main-color {
			color: var(--view-theme);
		}

		.trembling {
			animation: shake 0.6s;
		}
	}
</style>