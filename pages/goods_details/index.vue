<template>
	<view class="pages">
		<x-navbar>
			<template #center>
				<image class="head-icon" :src="logo" mode="widthFix"></image>
			</template>
		</x-navbar>
		<view class="content">
			<view class="icon">
				<image class="head-icon" :src="src"></image>
				<view class="icon-info">
					<text class="icon-info-title">王者荣耀</text>
					<text class="icon-info-desc">S40赛季 命若星火</text>
					<view class="icon-in" v-if="isLogin">
						<text class="icon-info-desc2">1% ~ 1.3%</text>
						<text class="icon-info-desc3" v-if="!gameInfo.isApply" @click="apply">申请</text>
						<text class="icon-info-desc4" v-else>已申请</text>
					</view>
				</view>
			</view>
			<view class="game-info">
				<view class="game-left">
					<view class="game-info-item">
						<text class="game-t">分类</text>
						<text class="game-d">动作/策略</text>
					</view>
					<view class="game-info-item">
						<text class="game-t">价格</text>
						<text class="game-d">免费</text>
					</view>
					<view class="game-info-item">
						<text class="game-t">内购</text>
						<text class="game-d">10项内购</text>
					</view>
				</view>
				<view class="game-right">
					<view class="game-info-item">
						<text class="game-t">App ID</text>
						<text class="game-d">989673964</text>
					</view>
					<view class="game-info-item">
						<text class="game-t">开发者</text>
						<text class="game-d">Shenzhen Tencent Tianyou Technology Ltd</text>
					</view>
					<view class="game-info-item">
						<text class="game-t">最新更新</text>
						<text class="game-d">2025-07-02</text>
					</view>
				</view>
			</view>
			<view class="con-item">
				<text class="title">应用截图</text>
				<view class="tag-con">
					<view class="tag active">iPhone</view>
					<view class="tag">iPad</view>
				</view>
				<view class="screenshot-list">
					<view class="screenshot-box" v-for="(item,key) in screenshot" :key="key">
						<image class="screenshot-img" mode="widthFix" v-for="(child,index) in item.value" :src="child"></image>
					</view>
				</view>
			</view>
			<view class="con-item">
				<text class="title">应用视频</text>
				<view class="tag-con">
					<view class="tag active">iPhone</view>
					<view class="tag">iPad</view>
				</view>
				<view class="video-list">
					<view class="video-box" v-for="(item,key) in videos" :key="key">
						<video class="video-img" controls v-for="(child,index) in item.list" :poster="child.image"
							:src="child.video">
						</video>
					</view>
				</view>
			</view>
			<view class="con-item">
				<text class="title">应用描述</text>
				<view class="con-desc">
					<view class="con-desc-con" v-html="description"></view>
					<text class="all">全部</text>
				</view>
			</view>
			<view class="con-item">
				<text class="title">宣传文本</text>
				<view class="con-desc">
					<view class="con-desc-con" v-html="promotionalText"></view>
				</view>
			</view>
			<view class="con-item">
				<text class="title">基本信息</text>
				<view class="app-info">
					<view class="app-item" v-for="(item,key) in appInfo" :key="key">
						<view class="item border-1px">
							<text class="type">{{item.name}}</text>
							<view class="i-info" v-if="typeof item.value == 'string'">
								<text class="info">{{item.value}}</text>
							</view>
							<view class="i-info2" v-else>
								<view class="info bot-purchase open">
									<view class="box-wrap">
										<view class="box-wrap-p" v-for="(child,childKey) in item.value" :key="childKey">
											<text class="left-info">{{child[1]}}</text>
											<text class="right-mo">{{child[0]}}</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	import {
		gameDetails,
		gameApply
	} from '@/api/game.js';
	import logo from '@/static/images/logo.png'
	export default {
		data() {
			return {
				gid: '',
				gameInfo: {},
				src: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/4a/67/86/4a67863c-5006-4b2e-792f-293c793173b0/AppIcon-1x_U007emarketing-0-8-0-85-220-0.png/180x180bb.png',
				logo: logo,
				promotionalText: '王者荣耀S40新赛季【命若星火】现已上线！<br />\n新英雄【孙权】登场，弓旗转换，局势尽在掌握！',
				description: "王者荣耀：5v5团队公平竞技游戏<br />\n【游戏介绍】<br />\n《王者荣耀》是腾讯第一5V5团队公平竞技手游，国民MOBA手游大作！5V5王者峡谷、公平对战，还原MOBA经典体验；契约之战、五军对决、边境突围、王者模拟战等，带来花式作战乐趣！10秒实时跨区匹配，与好友开黑上分，向最强王者进击！多款英雄任凭选择，一血、五杀、超神，实力碾压，收割全场！敌军即将到达战场，王者召唤师快来集结好友，准备团战，就在《王者荣耀》！<br />\n【游戏特色】<br />\n1、5V5越塔强杀！开团<br />\n5V5经典地图，三路推塔，呈现最原汁原味的对战体验。英雄策略搭配，组建最强阵容，默契配合极限666！<br />\n<br />\n2、随时开团！10分钟爽一把！<br />\n适合手机的MOBA游戏，10分钟享受极致竞技体验。迂回作战，手脑配合，一战到底！人多，速来！<br />\n<br />\n3、团队公平竞技！好玩不坑拼实力！<br />\n凭实力carry全场，与团队共赴荣耀。不做英雄养成，不设体力，还你最初的游戏乐趣！<br />\n<br />\n4、指尖五杀！风骚走位秀操作！<br />\n微操改变战局！手速流？意识流？看我风骚走位，力压群雄，打出高端操作！收割，连杀超神！<br />\n<br />\n【特别说明】<br />\n在游戏《王者荣耀》中，用户登录时可以选择“与QQ好友玩/与微信好友玩/游客登录”，三种登录方式在iOS设备上的游戏数据不互通（包括等级、钻石、金币等）。用户在游戏中购买的游戏代币“点券”仅限在本应用中使用。腾讯的虚拟货币，比如Q币、Q点无法在本应用中使用。<br />\n【联系我们】<br />\n如果您喜欢我们的游戏，欢迎随时给我们评价、留言。<br />\n官方网站：http://pvp.qq.com<br />\n官方微信：heromoba",
				appInfo: [{
						"name": "开发者",
						"value": "Shenzhen Tencent Tianyou Technology Ltd",
						"id": "1586101358"
					},
					{
						"name": "供应商",
						"value": "Shenzhen Tencent Tianyou Technology Ltd"
					},
					{
						"name": "发布日期",
						"value": "2015-10-28"
					},
					{
						"name": "更新日期",
						"value": "2025-07-02"
					},
					{
						"name": "Bundle ID",
						"value": "com.tencent.smoba"
					},
					{
						"name": "版本",
						"value": "10.4.1.6"
					},
					{
						"name": "大小",
						"value": "2363.44M"
					},
					{
						"name": "是否支持 Watch",
						"value": "不支持"
					},
					{
						"name": "支持Vision Pro",
						"value": "不支持"
					},
					{
						"name": "家人共享",
						"value": "可使用"
					},
					{
						"name": "价格",
						"value": "免费"
					},
					{
						"name": "分类",
						"value": "游戏"
					},
					{
						"name": "隐私政策",
						"value": "http://game.qq.com/privacy_en.shtml"
					},
					{
						"name": "支持网站",
						"value": "http://pvp.qq.com"
					},
					{
						"name": "兼容性",
						"value": "系统要求：iOS 11.0 或更高版本。兼容设备：iPhone、iPad、iPod touch。"
					},
					{
						"name": "支持语言",
						"value": "简体中文"
					},
					{
						"name": "发行国家/地区",
						"value": " 中国"
					},
					{
						"name": "内容评级",
						"value": "12+"
					},
					{
						"name": "版权信息",
						"value": "Copyright ©  2025 Tencent. All Rights Reserved"
					},
					{
						"name": "App内购买",
						"value": [
							[
								"¥6.00",
								"60点券"
							],
							[
								"¥1.00",
								"10点券"
							],
							[
								"¥45.00",
								"450点券"
							],
							[
								"¥68.00",
								"680点券"
							],
							[
								"¥118.00",
								"1180点券"
							],
							[
								"¥198.00",
								"1980点券"
							],
							[
								"¥1.00",
								"1元礼包"
							],
							[
								"¥348.00",
								"3480点券"
							],
							[
								"¥648.00",
								"6480点券"
							],
							[
								"¥1.00",
								"一元通行证"
							]
						]
					}
				],
				screenshot: [{
						"name": "iPhone",
						"value": [
							"https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/4e/2b/81/4e2b817b-bcc6-26f9-5381-945b411f9475/20250626221936-3c47d737-9be5-4369-9c25-55f2bb6183f9-0790bbd5be7f2ce449685284f9cbd3492af7e965-1.jpg/883x497bb.jpg",
							"https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/a7/97/f9/a797f9aa-a8bd-865f-1dab-9c15ed83317b/20250626221944-3c47d737-9be5-4369-9c25-55f2bb6183f9-e16dd674526fa0f1d4792b7a9d2319035575e0dd-1.jpg/883x497bb.jpg",
							"https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/ae/b5/b8/aeb5b873-79bc-e30e-8f84-91af684f56fd/20250626221951-3c47d737-9be5-4369-9c25-55f2bb6183f9-cb556ca3b0013da4dfdae0573d3d35fc72716639-1.jpg/883x497bb.jpg",
							"https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/35/2d/a0/352da057-b8c5-f2fa-cdc5-f6427972b42b/20250626221957-3c47d737-9be5-4369-9c25-55f2bb6183f9-e681f97b2c0c3ea976bfcc055aa55a134ad1e54e-1.jpg/883x497bb.jpg",
							"https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/91/f7/a9/91f7a99e-06f6-fa41-f6c1-ccb64f33b46f/20250626222004-3c47d737-9be5-4369-9c25-55f2bb6183f9-e16b7a897debc7ef0e29123a64ac4b3f1320379b-1.jpg/883x497bb.jpg"
						]
					},
					{
						"name": "iPad",
						"value": [
							"https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/b8/9d/48/b89d4840-b048-1c26-875a-6dc355c208ed/20250626221936-3ef97d5d-4b1e-4fa4-a275-a23cd3e0c647-d6b09d20c6316bf212b625b46a7e90095ce00c55-1.jpg/883x497bb.jpg",
							"https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/4f/61/21/4f61218d-082f-ec42-c4bc-181aa4aea9b5/20250626221943-3ef97d5d-4b1e-4fa4-a275-a23cd3e0c647-946ecc57598ddcd7c508d3d892b9410eed409a50-1.jpg/883x497bb.jpg",
							"https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/a4/c6/21/a4c6218b-0f9e-dabc-a024-72f40f8a7725/20250626221950-3ef97d5d-4b1e-4fa4-a275-a23cd3e0c647-02761ade1b65f2c8e5f15406c81c1757e55609bb-1.jpg/883x497bb.jpg",
							"https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/15/61/67/156167c5-297f-697e-0e73-dafeef4c30c6/20250626221957-3ef97d5d-4b1e-4fa4-a275-a23cd3e0c647-4b5332027dc23478d1a9b15d59948c78c9215a6d-1.jpg/883x497bb.jpg",
							"https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/ac/37/47/ac37472d-0ee9-6860-15bb-ff54276e7b6c/20250626222004-3ef97d5d-4b1e-4fa4-a275-a23cd3e0c647-8408494f6b10b98592acbcc8426f0750e972fde4-1.jpg/883x497bb.jpg"
						]
					}
				],
				videos: [{
					"name": "iPhone",
					"list": [{
						"image": "https://is1-ssl.mzstatic.com/image/thumb/PurpleVideo211/v4/4f/55/c4/4f55c4c1-1c92-c8d1-4c95-2614226eb68b/Job98fa3e65-50bb-4012-885d-d3fadfe5d323-195848076-PreviewImage_Preview_Image_Intermediate_nonvideo_383631293_2225021310-Time1750952103071.png/170x300bb.png",
						"video": "https://picservice.qimai.cn/get/https://apptrailers.itunes.apple.com/itunes-assets/PurpleVideo211/v4/ec/1d/3a/ec1d3a77-dc38-dc78-4025-a7c87ae40c78/P1145294310_default.m3u8"
					}]
				}],
			}
		},
		computed: {
			...mapGetters({
				isLogin: 'isLogin'
			})
		},
		onLoad(options) {
			this.gid = options.gid || ''
			if (this.gid) {
				this.getGameDetails()
			}
		},
		methods: {
			apply() {
				let that = this
				uni.showModal({
					title: `提示`,
					content: `确认申请吗？`,
					success: (res) => {
						if (res.confirm) {
							gameApply({
								gid: this.gid
							}).then(res => {
								if (res.status == 200) {
									this.getGameDetails()
								}
								that.$util.Tips({
									title: res.msg,
									icon: 'success'
								});
							}).catch(msg => {
								return that.$util.Tips({
									title: msg || `保存失败`
								});
							});
						}
					}
				});
			},
			getGameDetails() {
				gameDetails({
					gid: this.gid
				}).then(res => {
					if (res.status == 200) {
						this.gameInfo = res.data
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pages {
		background-color: #fff;

		.head-icon {
			height: 44rpx;
			width: 184rpx;
		}

		.content {
			.title {
				color: #222;
				font-size: 32rpx;
				font-weight: 500;
			}

			.con-item {
				padding: 40rpx 30rpx;
				border-bottom: 1px solid #e5e5e5;

				.all {
					color: #00b38a;
					font-size: 28rpx;
					margin-top: 10rpx;
					display: flex;
					justify-content: flex-end;
				}

				.tag-con {
					margin-top: 30rpx;

					.tag {
						background: #f8f8f8;
						border-radius: 8rpx;
						color: #555;
						display: inline-block;
						font-size: 26rpx;
						font-weight: 400;
						height: 62rpx;
						line-height: 62rpx;
						margin-right: 30rpx;
						padding: 0 24rpx;

						&.active {
							background: #d9f4ee;
							color: #00b38a;
						}
					}
				}

				.video-list {
					zoom: 1;
					height: 358rpx;
					margin-top: 40rpx;
					overflow-x: scroll;
					overflow-y: hidden;
					width: 100%;

					.video-box {
						zoom: 1;
						display: flex;
						width: 100%;

						.video-img {
							width: 100%;
							display: block;
							height: 356rpx;
							margin-right: 20rpx;
							margin-top: -6rpx;
							position: relative;
							z-index: 1;
						}
					}
				}

				.screenshot-list {
					zoom: 1;
					height: 356rpx;
					margin-top: 40rpx;
					overflow-x: scroll;
					overflow-y: hidden;
					position: relative;
					width: 100%;

					.screenshot-box {
						zoom: 1;
						display: -webkit-box;
						display: -ms-flexbox;
						display: flex;
					}

					.screenshot-img {
						border: 1px solid #eee;
						flex-shrink: 0;
						height: 356rpx;
						margin-right: 20rpx;
						min-width: 200rpx;
					}
				}

				.app-info {
					margin-top: 10rpx;
				}

				.app-item {
					.item {
						color: #555;
						display: flex;
						font-size: 28rpx;
						padding-bottom: 30rpx;
						padding-top: 30rpx;
						border-bottom: 1px solid #e5e5e5;

						.type {
							font-weight: 400;
							width: 220rpx;
						}

						.i-info {
							flex: 1;
							text-align: right;
						}

						.info {
							font-weight: 400;
							box-orient: vertical;
							width: 470rpx;
							line-clamp: 6;
							overflow: hidden;
							overflow-x: inherit;
							overflow-y: hidden;
							text-align: right;
							word-break: break-all;
						}

						.i-info2 {
							.box-wrap-p {
								display: inline-flex;
								justify-content: space-between;
								margin-bottom: 5px;
								width: 380rpx;

								.left-info {
									display: inline-block;
									overflow: hidden;
									text-align: left;
									text-overflow: ellipsis;
									white-space: nowrap;
									width: 240rpx;
								}

								.right-mo {
									vertical-align: middle;
								}
							}
						}
					}
				}
			}

			.con-desc-con {
				color: #555;
				font-size: 27rpx;
				font-weight: 400;
				line-height: 36rpx;
				margin-top: 30rpx;
				// max-height: 208rpx;
				overflow: hidden;
				font-family: Avenir, Helvetica, Arial, sans-serif;
			}

			.icon {
				padding: 40rpx 30rpx 0 30rpx;
				display: flex;

				.head-icon {
					width: 144rpx;
					height: 144rpx;
					border: 1px solid #e5e5e5;
					border-radius: 24%;
				}

				.icon-in {
					display: flex;
					justify-content: space-between;
					flex: 1;

					.icon-info-desc2 {
						color: #ff3232;
						font-size: 24rpx;
						margin-top: 6rpx;
					}

					.icon-info-desc3 {
						display: inline-block;
						font-size: 28rpx;
						height: 64rpx;
						line-height: 64rpx;
						padding: 0;
						width: 120rpx;
						text-align: center;
						background: #00b38a;
						font-weight: 400;
						border-radius: 8rpx;
						border: 1px solid #07c160;
						color: #fff;
						border-color: #00b38a;
					}

					.icon-info-desc4 {
						display: inline-block;
						font-size: 26rpx;
						height: 64rpx;
						line-height: 64rpx;
						padding: 0;
						width: 120rpx;
						text-align: center;
						background: #f5f5f5;
						border: none;
						color: #555;
						font-weight: 400;
						border-radius: 8rpx;
					}
				}

				.icon-info {
					display: flex;
					flex-direction: column;
					margin-left: 30rpx;
					flex: 1;

					&-title {
						color: #222;
						font-size: 36rpx;
						font-weight: 500;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						width: 440rpx;
					}

					&-desc {
						color: #888;
						font-size: 26rpx;
						font-weight: 400;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						width: 380rpx;
					}
				}
			}

			.game-info {
				margin: 40rpx 30rpx 0 30rpx;
				display: flex;
				padding-bottom: 10rpx;
				border-bottom: 1px solid #e5e5e5;


				.game-left {
					width: 330rpx;
				}

				.game-right {
					flex: 1;
				}

				.game-info-item {
					margin-bottom: 30rpx;

					.game-t {
						color: #555;
						margin: 0 20rpx 0 0;
						font-size: 28rpx;
						font-weight: 400;
					}

					.game-d {
						font-size: 28rpx;
						font-weight: 400;
						color: #222;
					}
				}
			}
		}
	}
</style>