<template>
	<view class="index-wripper">
		<swiper indicator-dots class="banner-box" interval="3000" duration="2500" autoplay
			indicator-color="rgba(255,255,255,0.4)" layout-type="stackLeft" indicator-active-color="#FFFFFF" circular>
			<swiper-item v-for="(item,key) in bannerList" :key="key" class="banner-item" @click="handleClickBanner(item)">
				<image :src="item.imagePath" class="swiper-item" />
			</swiper-item>
		</swiper>

		<movable-area class="movable-area">
			<view @click="goGxhcIntroduce">
				<image :src="imgUrl+'/banner/gxhcjsbanner1.png'" class="gxhc-banner" />
			</view>

			<view class="content">
				<movable-view class="movable-view" direction="vertical">
					<view class="movale-content" @click="onClickCustomer">
						<image src="/static/images/index/icon_zxkf.png" class="line-kf" />
						<view class="text">客服</view>
					</view>
				</movable-view>

				<view class="same-box director-box">
					<view class="title-row">
						<view class="title">理事成员</view>
						<view class="more" @click="searchDirectors">
							查看更多
							<image :src="imgUrl+'/index/icon_right_gray.png'" class="icon-right" />
						</view>
					</view>
					<view class="director-swiper">
						<view v-for="(item,key) in directorList" :key="key" class="director-item"
							@click="handleClickDirectorItem(item,)">
							<view class="item-left">
								<image :src="item.photo" class="img-head" />
							</view>
							<view class="item-right">
								<view class="item-row">
									<view class="item-name">{{item.name}}</view>
									<view class="item-status">{{item.position }}</view>
								</view>
								<view class="item-info">{{item.introduction}}</view>
							</view>
						</view>
					</view>
				</view>

				<view class="same-box project-box">
					<view class="same-box project-box">
						<view class="title-row" @click="searchHatchList">
							<view class="title">已孵化项目</view>
							<view class="more" @click="searchDirectors">
								<image :src="imgUrl+'/index/icon_right_gray.png'" class="icon-right" />
							</view>
						</view>
						<view class="hatch-swiper">
							<view class="hatch-item" v-for="(item,key) in hatchList" :key="key" @click="handleClickHatchItem(item)">
								<view class="item-row">
									<view class="logo-box">
										<image :src="item.logo" class="img-company-logo" />
									</view>
									<view class="item-right">
										<view class="item-name">{{item.name}}</view>
										<view class="item-info">{{item.brief}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>

				<view class="same-box ecology-module">
					<view class="ecology-row">
						<view class="ecology-title">生态服务</view>
						<view class="ecology-more" @click="searchEcologyList">
							<image :src="imgUrl+'/index/icon_right_gray.png'" class="icon-right" />
						</view>
					</view>

					<view class="ecology-list">
						<view class="ecology-item" @click="searchEcologyList">
							<image :src="imgUrl+'/index/server_dstsl.png'" class="item-icon" />
							<view class="item-title">多生态算力</view>
							<view class="item-subtitle">提供优质且价格优惠的算力资源渠道</view>
						</view>
						<view class="ecology-item" @click="searchEcologyList">
							<image :src="imgUrl+'/index/server_mtfw.png'" class="item-icon" />
							<view class="item-title">媒体服务</view>
							<view class="item-subtitle">访谈，建立PR渠道</view>
						</view>
						<view class="ecology-item" @click="searchEcologyList">
							<image :src="imgUrl+'/index/server_flzxfw.png'" class="item-icon" />
							<view class="item-title">法律咨询服务</view>
							<view class="item-subtitle">初创企业定制化法律咨询</view>
						</view>
						<view class="ecology-item" @click="searchEcologyList">
							<image :src="imgUrl+'/index/server_jghsjj.png'" class="item-icon" />
							<view class="item-title">结构化数据集</view>
							<view class="item-subtitle">数据要素市场优势</view>
						</view>
					</view>

					<view class="campus-module">
						<view class="campus-title">校园合伙人专区</view>
						<view class="menu-row">
							<view class="menu-col mr24">
								<view class="recruit-menu" @click="goApplyCampus">
									<image :src="imgUrl+'/index/img_hhrsqbg.png'" class="dsmenu-bg" />
									<view class="menu-content">
										<view class="menu-title">校园大使申请</view>
										<view class="subtitle">加入我们，成就未来</view>
										<!-- <view class="soon-btn">立即申请</view> -->
									</view>
								</view>
							</view>
							<view class="menu-col">

								<!-- 	<view class="same-menu activity-bg mb24" @click="goCampusActivity">
									<image :src="imgUrl+'/index/img_hddtbg.png'" class="dsmenu-bg" />
									<view class="samll-content">
										<view class="menu-title activity-color">经验值榜</view>
										<view class="subtitle">在点滴中积累</view>
									</view>
								</view> -->

								<view class="same-menu amb-bg" @click="goCampusList">
									<image :src="imgUrl+'/index/img_dsfcbg.png'" class="dsmenu-bg" />
									<view class="samll-content">
										<view class="menu-title amb-color">合伙人风采</view>
										<view class="subtitle">精英汇聚，共筑梦想</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>

			</view>
		</movable-area>

	</view>
</template>

<script>
	const imgUrls = 'https://7072-prod-cloud-env-9gqq29j68db5f470-1326719267.tcb.qcloud.la/miniprogram/images'
	export default {
		data: function() {
			return {
				imgUrl: 'https://7072-prod-cloud-env-9gqq29j68db5f470-1326719267.tcb.qcloud.la/miniprogram/images',
				hatchList: [{
						name: '北京开放传神OpenCSG',
						logo: `${imgUrls}/logo/opencsglogo.jpg`,
						brief: '人工智能算力算法管理，大模型应用普惠化领域创新的领先企业',
						articlesURL: 'https://mp.weixin.qq.com/s/UxUWHOH3aw2OqmHDEfWpmg'
					},
					{
						name: '摩诃脉动',
						logo: `${imgUrls}/logo/mohelogo.jpg`,
						brief: '为企业提供定制化的LLM生成服务',
						articlesURL: 'https://mp.weixin.qq.com/s/QG93ccQeDgLg57Oj7QMEzg'
					}
				],
				bannerList: [{
						isWeb: true,
						linkPath: "https://mp.weixin.qq.com/s/zVu4raklWoYQwRDCw_XOTg",
						"imagePath": "https://7072-prod-cloud-env-9gqq29j68db5f470-1326719267.tcb.qcloud.la/miniprogram/upload/banner/202503200943-indexbanner1742435031514.jpg",
					},
					{
						isWeb: false,
						linkPath: "/explainPages/news/mohe/index",
						"imagePath": "https://7072-prod-cloud-env-9gqq29j68db5f470-1326719267.tcb.qcloud.la/miniprogram/upload/banner/202503200937-indexbanner1742434628572.jpg",
					}
				],
				directorList: [{
						"_id": "2ad666ce66d0365708daae0866df8588",
						"owner": "1803248890808373250",
						"address": "广东省深圳市福田区侨香公馆4栋1003 ",
						"city": "深圳市",
						"photo": "https://7072-prod-cloud-env-9gqq29j68db5f470-1326719267.tcb.qcloud.la/miniprogram/director/photo/202408291649-%E6%9D%9C%E5%B9%B3%E7%9A%84%E7%85%A7%E7%89%87",
						"remark": "",
						"title": "",
						"createdAt": 1724921431699,
						"createBy": "1803248890808373250",
						"major": "",
						"phone": "13910628626",
						"updateBy": "1803248890808373250",
						"_openid": "1803248890808373250",
						"name": "杜平",
						"position": "名誉理事长",
						"introduction": "原国家信息中心党委书记、常务副主任粤港澳大湾区大数据研究院名誉理事长。",
						"updatedAt": 1725505007143,
						"gender": "male",
						"joinDate": 0,
						"openid": "",
						"directorType": "reputation"
					},
					{
						"_id": "33c5161d66d036d508d509cd7f1437be",
						"owner": "1803248890808373250",
						"address": "",
						"city": "上海市",
						"photo": "https://7072-prod-cloud-env-9gqq29j68db5f470-1326719267.tcb.qcloud.la/miniprogram/director/photo/202408291652-%E8%B5%B5%E4%B9%A6%E5%90%9B%E7%9A%84%E7%85%A7%E7%89%87",
						"remark": "",
						"title": "北京国信中数投资管理",
						"createdAt": 1724921557476,
						"createBy": "1803248890808373250",
						"major": "",
						"phone": "13043499486",
						"updateBy": "1803248890808373250",
						"_openid": "1803248890808373250",
						"name": "赵书君",
						"position": "理事长",
						"introduction": "北京国信中数投资管理有限公司高级合伙人，曾主导通聿基金管理人组建，参与盛大游戏私有化、三七互娱定增，发起军工产业投资基金。2019年加入国信中数，发起上市公司威创股份(002308)控制权收购案，投资观安信息、数联铭品、双猴科技、零数科技等项目。参与国家东数西算政策、全国一体化大数据中心相关落地工作。现致力于人工智能产业投资，发起中数百生人工智能投资基金，主导投资大模型方向开放传神(0penCSG)、金声玉亮(金融大模型)等项目，发起国信合创(CHA)人工智能独角兽共创理事会。",
						"updatedAt": 1725505000056,
						"gender": "female",
						"joinDate": 0,
						"openid": "",
						"directorType": "executive"
					},
					{
						"_id": "25e993b766d0380b08d455566cb848e9",
						"owner": "1803248890808373250",
						"address": "广州市海珠区新港中路489号佳信花园C3栋703房",
						"city": "广州市",
						"photo": "https://7072-prod-cloud-env-9gqq29j68db5f470-1326719267.tcb.qcloud.la/miniprogram/director/photo/202408291657-%E5%BC%A0%E5%B4%9F%E7%9A%84%E7%85%A7%E7%89%87",
						"remark": "",
						"title": "广东省人工智能产业协会 常务副会长兼秘书长",
						"createdAt": 1724921867443,
						"createBy": "1803248890808373250",
						"major": "",
						"phone": "18688869982",
						"updateBy": "1803248890808373250",
						"_openid": "1803248890808373250",
						"name": "张崟",
						"position": "常务理事长",
						"introduction": "广东省人工智能产业协会 常务副会长兼秘书长、广东省技术能手、广东省人工智能工程技术人才高级职称评审委员会办公室主任、广东省科学技术厅人工智能项目评审专家、广东省工业和信息化厅 人工智能项目评审专家、中国创新设计产业战略联盟创新设计大数据广州中心负责人、广东省“省长杯”工业设计大赛--新一代电子信息类专项赛负责人、“青创杯”广州青年创新创业大赛--人工智能专项赛负责人、广州天英汇国际创新创业大赛分赛区评委会主席、广州青年创业导师。",
						"updatedAt": 1725505013069,
						"gender": "male",
						"joinDate": 0,
						"openid": "",
						"directorType": "executive"
					}
				]
			};
		},
		methods: {
			openWebUrl(url) {
				uni.navigateTo({
					url: `/pages/web/index?url=${encodeURIComponent(url)}`
				});
			},
			handleClickBanner(item) {
				const {
					linkPath,
					isWeb
				} = item;
				if (isWeb && linkPath) {
					this.openWebUrl(linkPath);
				} else {
					this.navigateToPage(linkPath);
				}
			},
			navigateToPage(url) {
				uni.navigateTo({
					url
				});
			},
			goGxhcIntroduce() {
				const url = 'https://mp.weixin.qq.com/s/kCbiycoxR5xv5EPjwl7zaA'
				this.openWebUrl(url);
			},
			onClickCustomer() {
				this.openWebUrl('https://cha.mahanova.com/')
			},
			searchDirectors() {
				this.navigateToPage('/pages/director/list/index');
			},
			handleClickDirectorItem(item) {
				const {
					_id
				} = item;
				if (_id) {
					this.navigateToPage(`/pages/director/detail/index?id=${_id}`);
				}
			},
			handleClickHatchItem(item) {
				const {
					articlesURL
				} = item;
				if (articlesURL) {
					this.openWebUrl(articlesURL)
				}
			},
			searchHatchList() {
				this.navigateToPage('/projectPages/hatchList/index');
			},
			searchEcologyList() {
				this.navigateToPage('/pages/home/serviceList/index');
			},
			goApplyCampus() {
				this.navigateToPage('/campusPages/parter/apply/index');
			},
			goCampusList() {
				this.navigateToPage('/campusPages/parter/list/index');
			},
		}
	};
</script>

<style lang="scss" scoped>
	.index-wripper {
		width: 100%;
		box-sizing: border-box;
		background-color: #F4F4F4;

		.banner-box {
			width: 100%;
			height: 320rpx;

			.swiper-item {
				width: 100%;
				height: 100%;
			}
		}

		.gxhc-banner {
			width: 100%;
			height: 320rpx;
		}

		.movable-area {
			width: 100%;
			height: 1500rpx;
			position: relative;
		}

		.movable-view {
			position: absolute;
			top: 20%;
			left: 650rpx;
			width: 102rpx;
			height: 100rpx;
			z-index: 999;
		}

		.content {
			width: 100%;
			box-sizing: border-box;
			padding: 24rpx 24rpx 24rpx 24rpx;

			.movale-content {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width: 102rpx;
				height: 100rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 8rpx 16rpx 0rpx rgba(0, 0, 0, 0.1);
				border-radius: 49rpx 0rpx 0rpx 49rpx;

				.line-kf {
					width: 48rpx;
					height: 48rpx;
				}

				.text {
					font-size: 22rpx;
					color: #2F3031;
					line-height: 34rpx;
				}
			}

		}

		.gxhc-box {
			width: 100%;
			background: #FFFFFF;
			border-radius: 24rpx;
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			padding: 80rpx 48rpx 80rpx 50rpx;
			margin-bottom: 24rpx;

			.gxhc-top {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-bottom: 24rpx;
			}

			.img-logo {
				width: 148rpx;
				height: 127rpx;
				margin-right: 32rpx;
			}

			.bigtitle {
				font-size: 40rpx;
				color: #000000;
				line-height: 48rpx;
				font-weight: bold;
			}

			.subtitle {
				font-size: 32rpx;
				color: #333;
				line-height: 48rpx;
				letter-spacing: 2px;
				margin-top: 15rpx;
			}

		}

		.same-box {
			width: 100%;
			box-sizing: border-box;
			padding: 24rpx;
			background: #FFFFFF;
			border-radius: 24rpx;
			margin-bottom: 24rpx;

			.title-row {
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 24rpx;

				.title {
					font-weight: bold;
					font-size: 32rpx;
					color: #2F3031;
					line-height: 48rpx;

				}

				.more {
					display: flex;
					flex-direction: row;
					align-items: center;
					font-size: 24rpx;
					color: rgba(47, 48, 49, 0.75);
					line-height: 36rpx;
				}
			}
		}

		.hatch-swiper {
			width: 100%;

			.hatch-item {
				width: 100%;
				margin-bottom: 24rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				// background: #f5f5f5;
				border-radius: 20rpx;

				.item-row {
					width: 100%;
					height: 240rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
				}

				.logo-box {
					width: 240rpx;
					height: 168rpx;
					border-radius: 10rpx;
					background: #F5F5F5;
					display: flex;
					align-items: center;
					justify-content: center;

					.img-company-logo {
						width: 155rpx;
						height: 55rpx;
					}
				}

				.item-right {
					width: 50%;
					margin-left: 24rpx;
					display: flex;
					flex-direction: column;

					.item-name {
						font-size: 30rpx;
						color: #2F3031;
						line-height: 42rpx;
						font-weight: bold;
						margin-bottom: 4rpx;
					}

					.item-info {
						// overflow: hidden; 
						// white-space: nowrap; 
						// text-overflow: ellipsis;
						font-size: 24rpx;
						color: rgba(47, 48, 49, 0.75);
						line-height: 36rpx;
					}
				}
			}
		}

		.main-menu {
			width: 100%;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;

			.menu-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				box-sizing: border-box;
				// padding-top: 20rpx;
				margin-bottom: 24rpx;
				width: 150rpx;
				margin-right: 20rpx;

				.menu-icon {
					width: 88rpx;
					height: 88rpx;
					border-radius: 28rpx;
					margin-bottom: 16rpx;
				}

				.menu-desc {
					font-size: 24rpx;
					color: #2F3031;
					line-height: 36rpx;
					text-align: center;
				}
			}
		}


		.campus-module {
			width: 100%;
			border-radius: 24rpx;
			background: #FFFFFF;
			box-sizing: border-box;
			padding: 24rpx 0rpx 24rpx 24rpx;

			.campus-title {
				font-weight: bold;
				font-size: 32rpx;
				color: #2F3031;
				line-height: 48rpx;
				margin-bottom: 24rpx;
			}

			.menu-row {
				width: 100%;
				display: flex;
				flex-direction: row;

				.menu-col {
					display: flex;
					flex-direction: column;
				}

				.mr24 {
					margin-right: 24rpx;
				}

				.dsmenu-bg {
					position: absolute;
					top: 0;
					left: 0;
					z-index: 1;
					width: 100%;
					height: 100%;
				}

				.recruit-menu {
					border-radius: 12rpx;
					width: 316rpx;
					height: 160rpx;
					// height: 340rpx;

					position: relative;

					.menu-content {
						position: absolute;
						top: 0;
						left: 0;
						z-index: 23;
						width: 100%;
						box-sizing: border-box;
						padding: 32rpx 0 0 20rpx;
					}

					.menu-title {
						margin-left: 8rpx;
						font-size: 32rpx;
						color: #FFFFFF;
						line-height: 48rpx;
						font-weight: bold;
						letter-spacing: 2rpx;
					}

					.subtitle {
						font-size: 22rpx;
						color: rgba(255, 255, 255, 0.75);
						line-height: 34rpx;
						margin-left: 9rpx;
						margin-bottom: 16rpx;
					}

					.soon-btn {
						width: 140rpx;
						height: 48rpx;
						background: #FFFFFF;
						border-radius: 24rpx;

						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 22rpx;
						color: #457EFD;
						line-height: 30rpx;
					}
				}

				.samll-content {
					box-sizing: border-box;
					padding-top: 24rpx;
					padding-left: 24rpx;
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					z-index: 23;

				}

				.mb24 {
					margin-bottom: 24rpx;
				}

				.same-menu {
					width: 314rpx;
					height: 160rpx;
					border-radius: 24rpx;
					position: relative;

					.menu-title {
						font-weight: bold;
						font-size: 32rpx;
						line-height: 48rpx;
						margin-bottom: 4rpx;
					}

					.subtitle {
						font-size: 22rpx;
						color: rgba(47, 48, 49, 0.5);
						line-height: 34rpx;
					}
				}

				.amb-bg {
					background: linear-gradient(12deg, #FFFAFF 0%, #FFE5FF 100%);
				}

				.amb-color {
					color: #F03ABD;
				}

				.partner-bg {
					background: linear-gradient(12deg, #FFFFFF 0%, #FFDBD8 100%);
				}

				.partner-color {
					color: #FD422E;
				}

				.activity-bg {
					background: linear-gradient(12deg, #E9F6FF 0%, #DCEBFF 100%);
				}

				.activity-color {
					color: #126FD1;
				}

			}
		}

		.director-box {
			position: relative;

			.director-swiper {
				width: 100%;
				box-shadow: 0rpx 4rpx 8rpx -4rpx rgba(0, 0, 0, 0.08);
				border-radius: 24rpx;

				.director-item {
					width: 100%;
					margin-bottom: 24rpx;
					box-sizing: border-box;
					display: flex;
					flex-direction: row;
					align-items: center;
					background: #F4F9FE;
					box-sizing: border-box;
					padding: 24rpx 2rpx 24rpx 24rpx;
					border-radius: 12rpx;

					.item-left {
						width: 36%;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-right: 20rpx;

						.img-head {
							width: 220rpx;
							height: 220rpx;
							border-radius: 20rpx;
						}
					}

					.item-right {
						width: 64%;
						display: flex;
						flex-direction: column;

						.item-row {
							width: 100%;
							display: flex;
							flex-direction: row;
							align-items: center;
						}

						.item-name {
							font-weight: bold;
							font-size: 34rpx;
							color: #2F3031;
							line-height: 52rpx;
							margin-bottom: 12rpx;
						}

						.item-status {
							// width: 140rpx;
							word-wrap: break-word;
							overflow-wrap: break-word;
							box-sizing: border-box;
							padding: 2rpx 12rpx;

							background: #F2E4CD;
							border-radius: 8rpx;
							font-size: 24rpx;
							color: #89633F;
							line-height: 36rpx;
							margin-left: 12rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							margin-bottom: 4rpx;
						}

						.item-title {
							font-size: 24rpx;
							color: #2F3031;
							line-height: 36rpx;
							margin-bottom: 8rpx;
						}

						.item-info {
							width: 96%;
							font-size: 24rpx;
							color: rgba(47, 48, 49, 0.75);
							line-height: 36rpx;
							display: -webkit-box;
							-webkit-line-clamp: 4;
							-webkit-box-orient: vertical;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}
				}
			}
		}

		.icon-right {
			width: 12rpx;
			height: 24rpx;
			margin-left: 8rpx;
			// margin-top: 2rpx;
		}

		.ecology-module {
			padding: 24rpx 24rpx 0rpx 0rpx;

			.ecology-row {
				width: 100%;
				box-sizing: border-box;
				padding: 0rpx 4rpx 24rpx 24rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;

				.ecology-title {
					font-size: 32rpx;
					color: #2F3031;
					line-height: 48rpx;
					font-weight: bold;
				}

				.ecology-more {
					display: flex;
					flex-direction: row;
					align-items: center;

				}
			}

			.ecology-list {
				width: 100%;

				display: flex;
				flex-direction: row;
				flex-wrap: wrap;

				.ecology-item {
					width: 315rpx;
					height: 300rpx;
					display: flex;
					flex-direction: column;
					align-items: center;

					background: #F4F9FE;
					border-radius: 12rpx;
					margin-bottom: 25rpx;
					margin-left: 24rpx;
					box-sizing: border-box;
					padding-top: 24rpx;

					.item-icon {
						width: 100rpx;
						height: 100rpx;
						margin-bottom: 12rpx;
					}

					.item-title {
						font-size: 28rpx;
						color: #126FD1;
						line-height: 42rpx;
						font-weight: bold;
						margin-bottom: 10rpx;
					}

					.item-subtitle {
						font-size: 24rpx;
						color: rgba(47, 48, 49, 0.75);
						line-height: 36rpx;
						width: 251rpx;
						text-align: center;
					}
				}
			}
		}
	}
</style>