<template>
	<view class="wrapper" :style="colorStyle">
		<view class="bag"></view>
		<view class="system-height" :style="{ height: statusBarHeight }"></view>
		<!-- #ifdef MP -->
		<view class="title-bar" style="height: 43px;">
			<view class="icon" @click="back" v-if="!isHome">
				<image src="../static/left.png"></image>
			</view>
			<view class="icon" @click="home" v-else>
				<image src="../static/home.png"></image>
			</view>
			{{pageTitle}}
		</view>
		<!-- #endif -->
		<view class="page-msg">
			<view class="title">
				{{pageType == 1?'绑定手机号':'手机号登录'}}
			</view>
			<view class="tip">
				{{pageType == 1?'登录注册需绑定手机号':'首次登录会自动注册'}}
			</view>
		</view>
		<view class="page-form">
			<view class="item">
				<input type='number' :placeholder='`填写手机号码`' placeholder-class='placeholder' v-model="phone"
					:maxlength="11"></input>
			</view>
			<view class="item acea-row row-between-wrapper">
				<input type='number' :placeholder='`填写验证码`' placeholder-class='placeholder' :maxlength="6"
					class="codeIput" v-model="captcha"></input>
				<view class="line">

				</view>
				<button class="code font-num" :class="disabled === true ? 'on' : ''" :disabled='disabled' @click="code">
					{{ text }}
				</button>
			</view>
			<view class="btn" @click="submitData">
				{{$t(`${pageType == 1 ? '绑定手机号' : '立即登录'}`)}}
			</view>
		</view>
		<view class="protocol" v-if="pageType == 0 && !canGetPrivacySetting">
			<checkbox-group @click.stop='ChangeIsDefault'>
				<checkbox :class="inAnimation?'trembling':''" @animationend='inAnimation=false'
					:checked="protocol ? true : false" /> <text @click.stop='ChangeIsDefault'>{{`已阅读并同意`}}</text>
				<text class="main-color" @click.stop="privacy(4)">{{`《用户协议》`}}</text>
				{{`与`}}<text class="main-color" @click.stop="privacy(3)">{{`《隐私协议》`}}</text>
			</checkbox-group>
		</view>
		<Verify @success="success" :captchaType="'clickWord'" :imgSize="{ width: '330px', height: '155px' }"
			ref="verify"></Verify>
		<editUserModal :isShow="isShow" @closeEdit="closeEdit" @editSuccess="editSuccess">
		</editUserModal>
		<!-- #ifdef MP -->
		<privacyAgreementPopup v-if="canGetPrivacySetting" @onReject="onReject" @onAgree="onAgree">
		</privacyAgreementPopup>
		<!-- #endif -->

	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				statusBarHeight: statusBarHeight,
				pageType: 1, // 0 登录 1 绑定手机
				phone: '',
				captcha: '',
				text: '获取验证码',
				isShow: false,
				protocol: false,
				inAnimation: false,
				authKey: "",
				backUrl: "",
				pageTitle: '绑定手机号',
				configData: Cache.get('BASIC_CONFIG'),
				canGetPrivacySetting: false,
			}
		},
		onLoad(options) {
			
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		background-color: #fff;
		min-height: 100vh;
		position: relative;

		.bag {
			position: absolute;
			top: 0;
			left: 0;
			width: 750rpx;
			height: 460rpx;
			background: var(--view-linear);
		}

		.page-msg {
			padding-top: 160rpx;
			margin-left: 72rpx;

			.title {
				font-size: 48rpx;
				font-weight: 500;
				color: #333333;
				line-height: 68rpx;
			}

			.tip {
				font-size: 28rpx;
				font-weight: 400;
				color: #333333;
				line-height: 40rpx;
			}
		}

		.page-form {
			width: 606rpx;
			margin: 100rpx auto 0 auto;

			.item {
				width: 100%;
				height: 88rpx;
				background: #F5F5F5;
				border-radius: 45rpx;
				padding: 24rpx 48rpx;
				margin-bottom: 32rpx;

				input {
					width: 100%;
					height: 100%;
					font-size: 32rpx;
				}

				.placeholder {
					color: #BBBBBB;
					font-size: 28rpx;
				}

				input.codeIput {
					width: 300rpx;
				}

				.line {
					width: 2rpx;
					height: 28rpx;
					background: #CCCCCC;
				}

				.code {
					font-size: 28rpx;
					color: var(--view-theme);
					background-color: rgba(255, 255, 255, 0);
				}

				.code.on {
					color: #BBBBBB !important;
				}
			}

			.btn {
				width: 606rpx;
				height: 88rpx;
				background: var(--view-theme);
				border-radius: 200rpx 200rpx 200rpx 200rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 32rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 44rpx;
				margin-top: 48rpx;
				letter-spacing: 1px;
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
			width: 35rpx;
			height: 35rpx;
		}
	}

	.protocol {
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
