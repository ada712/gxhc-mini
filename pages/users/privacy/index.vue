<template>
	<view class="content">
		<mp-html :content="content" ref="article" :tag-style="tagStyle" />
	</view>
</template>

<script>
	import mpHtml from "@/components/mp-html/mp-html";
	import {
		getUserAgreement,
	} from '@/api/user.js';
	export default {
		components: {
			mpHtml
		},
		data() {
			return {
				tagStyle: {
					img: 'width:100%;display:block;',
					table: 'width:100%',
					video: 'width:100%'
				},
				content: ``
			}
		},
		onLoad(options) {
			getUserAgreement(options.type).then(res => {
				this.content = res.data.content
				uni.setNavigationBarTitle({
					title: res.data.title
				});
			}).catch(err => {
				that.$util.Tips({
					title: err
				});
			})
		}
		
	}
</script>

<style scoped>
	page {
		background-color: #fff;
	}

	.content {
		padding: 40rpx 30rpx;
		line-height: 2;
	}
</style>
