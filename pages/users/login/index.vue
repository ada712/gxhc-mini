<template>
	<view class="login-wrapper">
		<view class="shading">
			<image :src="logoUrl" />
		</view>
		<view class="whiteBg" v-if="formItem === 1">
			<view class="list" v-if="current !== 1">
				<form @submit.prevent="submit">
					<view class="item">
						<view class="acea-row row-middle">
							<image src="../static/phone_1.png" style="width: 24rpx; height: 34rpx"></image>
							<input type="text" :placeholder="`输入手机号码`" v-model="account" maxlength="11" required />
						</view>
					</view>
					<view class="item">
						<view class="acea-row row-middle">
							<image src="../static/code_1.png" style="width: 28rpx; height: 32rpx"></image>
							<input type="password" :placeholder="`填写登录密码`" v-model="password" required />
						</view>
					</view>
				</form>
				<!-- <navigator class="forgetPwd" hover-class="none" url="/pages/users/retrievePassword/index">
					<span class="iconfont icon-wenti"></span>忘记密码
				</navigator> -->
			</view>
			<view class="list" v-if="current !== 0 || appLoginStatus || appleLoginStatus">
				<view class="item">
					<view class="acea-row row-middle">
						<image src="../static/phone_1.png" style="width: 24rpx; height: 34rpx"></image>
						<input type="text" :placeholder="`输入手机号码`" v-model="account" :maxlength="11" />
					</view>
				</view>
				<view class="item">
					<view class="acea-row row-middle">
						<image src="../static/code_2.png" style="width: 28rpx; height: 32rpx"></image>
						<input type="text" :placeholder="`填写验证码`" :maxlength="6" class="codeIput" v-model="captcha" />
						<button class="code" :disabled="disabled" :class="disabled === true ? 'on' : ''" @click="code">
							{{ text }}
						</button>
					</view>
				</view>
				<!-- 	<view class="item" v-if="isShowCode">
					<view class="acea-row row-middle">
						<image src="../static/code_2.png" style="width: 28rpx; height: 32rpx;"></image>
						<input type="text" :placeholder="$t(`填写验证码`)" class="codeIput" v-model="codeVal" />
						<view class="code" @click="again"><img :src="codeUrl" /></view>
					</view>
				</view> -->
			</view>
			<view class="logon" @click="loginMobile" v-if="current !== 0">登录</view>
			<view class="logon" @click="submit" v-if="current === 0">登录</view>
			<!-- #ifndef APP-PLUS -->
			<view class="tips">
				<view v-if="current == 0" @click="current = 1">快速登录</view>
				<view v-if="current == 1" @click="current = 0">账号登录</view>
			</view>
			<!-- #endif -->
			<!-- #ifdef APP-PLUS -->
			<view class="appLogin" v-if="!appLoginStatus && !appleLoginStatus">
				<view class="hds">
					<span class="line"></span>
					<p>其他方式登录</p>
					<span class="line"></span>
				</view>
				<view class="btn-wrapper">
					<view class="btn wx" @click="wxLogin">
						<span class="iconfont icon-s-weixindenglu1"></span>
					</view>
					<view class="btn mima" v-if="current == 1" @click="current = 0">
						<span class="iconfont icon-s-mimadenglu1"></span>
					</view>
					<view class="btn yanzheng" v-if="current == 0" @click="current = 1">
						<span class="iconfont icon-s-yanzhengmadenglu1"></span>
					</view>
					<view class="apple-btn" @click="appleLogin" v-if="appleShow">
						<view class="iconfont icon-s-pingguo"></view>
					</view>
				</view>
			</view>
			<!-- #endif -->
			<view class="protocol">
				<checkbox-group @change="ChangeIsDefault">
					<checkbox :class="inAnimation ? 'trembling' : ''" @animationend="inAnimation = false"
						:checked="protocol ? true : false" />
					已阅读并同意
					<text class="main-color" @click="privacy(4)">《用户协议》</text>
				与
					<text class="main-color" @click="privacy(3)">《隐私协议》</text>
				</checkbox-group>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data: function() {
			return {
				copyRight: '',
				inAnimation: false,
				protocol: false,
				navList: [`快速登录`, `账号登录`],
				current: 1,
				account: '',
				password: '',
				captcha: '',
				formItem: 1,
				type: 'login',
				logoUrl: 'https://v5.crmeb.net/statics/system_images/login_logo.jpeg',
				keyCode: '',
				codeUrl: '',
				codeVal: '',
				isShowCode: false,
				appLoginStatus: false, // 微信登录强制绑定手机号码状态
				appUserInfo: null, // 微信登录保存的用户信息
				appleLoginStatus: false, // 苹果登录强制绑定手机号码状态
				appleUserInfo: null,
				appleShow: false, // 苹果登录版本必须要求ios13以上的
				keyLock: true
			};
		},
	};
</script>

<style lang="scss" scoped>
	page {
		background: #fff;
	}

	.appLogin {
		margin-top: 60rpx;

		.hds {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 24rpx;
			color: #b4b4b4;

			.line {
				width: 68rpx;
				height: 1rpx;
				background: #cccccc;
			}

			p {
				margin: 0 20rpx;
			}
		}

		.btn-wrapper {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 30rpx;

			.btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 68rpx;
				height: 68rpx;
				border-radius: 50%;
			}

			.apple-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 68rpx;
				height: 68rpx;
				border-radius: 50%;
				background: #000;

				.icon-s-pingguo {
					color: #fff;
					font-size: 44rpx;
				}
			}

			.iconfont {
				font-size: 40rpx;
				color: #fff;
			}

			.wx {
				margin-right: 30rpx;
				background-color: #61c64f;
			}

			.mima {
				margin-right: 30rpx;
				background-color: #28b3e9;
			}

			.yanzheng {
				margin-right: 30rpx;
				background-color: #f89c23;
			}
		}
	}

	.code img {
		width: 100%;
		height: 100%;
	}

	.acea-row.row-middle {
		input {
			margin-left: 20rpx;
			display: block;
		}
	}

	.login-wrapper {
		padding: 30rpx;

		.shading {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;

			/* #ifdef APP-VUE */
			margin-top: 50rpx;
			/* #endif */
			/* #ifndef APP-VUE */

			margin-top: 200rpx;
			/* #endif */

			image {
				width: 240rpx;
				height: 240rpx;
			}
		}

		.whiteBg {
			margin-top: 100rpx;

			.list {
				border-radius: 16rpx;
				overflow: hidden;

				.item {
					border-bottom: 1px solid #f0f0f0;
					background: #fff;

					.row-middle {
						position: relative;
						padding: 16rpx 45rpx;

						input {
							flex: 1;
							font-size: 28rpx;
							height: 80rpx;
						}

						.code {
							position: absolute;
							right: 30rpx;
							top: 50%;
							color: var(--view-theme);
							font-size: 26rpx;
							transform: translateY(-50%);
						}
					}
				}
			}

			.logon {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 86rpx;
				margin-top: 80rpx;
				background-color: var(--view-theme);
				border-radius: 120rpx;
				color: #ffffff;
				font-size: 30rpx;
			}

			.tips {
				margin: 30rpx;
				text-align: center;
				color: #999;
			}
		}
	}

	.protocol {
		margin-top: 40rpx;
		color: #999999;
		font-size: 24rpx;
		text-align: center;
		bottom: 20rpx;
	}

	/* #ifdef H5 */
	@media (min-aspect-ratio: 13/20) {
		.bottom {
			display: none !important;
		}
	}

	/* #endif */
	.bottom {
		position: fixed;
		bottom: 30rpx;
		left: 0;
		display: flex;
		width: 100%;
		justify-content: center;
		color: #999999;

		.ver {
			font-size: 20rpx;
		}

		.ver-msg {
			margin-left: 10rpx;
		}

		a {
			color: #999999;
			margin-left: 10rpx;
			text-decoration: none;
		}
	}

	.trembling {
		animation: shake 0.6s;
	}

	.main-color {
		color: var(--view-theme);
	}
</style>