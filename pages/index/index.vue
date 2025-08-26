<template>
	<view class="pages">
		<x-navbar :letfArrow="false">
			<template #center>
					<image class="head-icon" :src="logo" mode="widthFix"></image>
			</template>
		</x-navbar>
		<view class="list">
			<view class="item" v-for="(item,key) in gameList" :key="key" @click="goDetails(item.gid)">
				<text class="index" :class="{bang:key<3}">{{key+1}}</text>
				<image class="icon" :src="src"></image>
				<view class="info">
					<text class="name">王者荣耀 {{key+1}}</text>
					<text class="company">厦门麟贝互娱科技有限公司</text>
				</view>
				<text class="float" v-if="isLogin">1.1% ~ 1.3%</text>
			</view>
		</view>
		<view class="loadingicon acea-row row-center-wrapper" v-if="gameList.length > 0">
			<text class="loading iconfont icon-jiazai" v-show="loading"></text>
			{{ loadTitle }}
		</view>
		<view v-else-if="gameList.length == 0">
			<x-empty-page v-if="!loading" :title="`暂无游戏`"></x-empty-page>
			<view class="loadingicon acea-row row-center-wrapper">
				<text class="loading iconfont icon-jiazai" v-show="loading"></text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		gameList
	} from '@/api/game.js';
	import {
		mapGetters
	} from 'vuex';
	import Cache from '@/utils/cache';
	import logo from '@/static/images/logo.png'
	export default {
		data() {
			return {
				src: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/4a/67/86/4a67863c-5006-4b2e-792f-293c793173b0/AppIcon-1x_U007emarketing-0-8-0-85-220-0.png/180x180bb.png',
				logo: logo,
				page: 1,
				limit: 10,
				loading: false, //是否加载中
				loadend: false, //是否加载完毕
				loadTitle: `加载更多`, //提示语
				gameList: []
			}
		},
		computed: {
			...mapGetters({
				isLogin: 'isLogin'
			})
		},
		onLoad(options) {
			this.getGameList()
		},
		methods: {
			getGameList() {
				gameList({
					page: this.page,
					limit: this.limit
				}).then(res => {
					if (res.status == 200) {
						let list = res.data.list || [];
						let loadend = list.length < this.limit;
						this.gameList = this.$util.SplitArray(list, this.gameList);
						this.loadend = loadend;
						this.loading = false;
						this.loadTitle = loadend ? `没有更多内容啦~` : `加载更多`;
						this.page = this.page + 1;
					}
				})
			},
			goDetails(gid) {
				uni.navigateTo({
					url: '/pages/goods_details/index?gid='+gid
				})
			}
		},
		onReachBottom: function () {
			this.getGameList();
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}
	.pages {
		padding-bottom: 100rpx;

		.head-icon {
			height: 44rpx;
			width: 184rpx;
		}

		.list {
			padding-top: 30rpx;

			.item {
				margin: 0 30rpx;
				display: flex;
				align-items: center;
				border-bottom: 1px solid #e5e5e5;
				padding-bottom: 26rpx;
				margin-bottom: 26rpx;

				.index {
					font-size: 24rpx;
					width: 44rpx;
					text-align: center;

					&.bang {
						background: #ffae01;
						border-radius: 8rpx;
						color: #fff;
						width: 44rpx;
						height: 44rpx;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}

				.icon {
					width: 104rpx;
					height: 104rpx;
					border: 1px solid #eee;
					border-radius: 24%;
					margin-left: 30rpx;
				}

				.info {
					margin-left: 30rpx;

					.name {
						display: block;
						color: #222;
						font-size: 30rpx;
						font-weight: 500;
					}

					.company {
						display: block;
						color: #888;
						font-size: 26rpx;
						margin-top: 8rpx;
					}
				}

				.float {
					margin-left: auto;
					color: #ff3232;
					font-size: 24rpx;
				}
			}
		}

	}
</style>