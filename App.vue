<script>
	import { basicConfig } from '@/api/public';
	export default {
		onLaunch: function() {
			console.log('App Launch')
			basicConfig().then((res) => {
				uni.setStorageSync('BASIC_CONFIG', res.data);
			});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import 'static/iconfont/iconfont.css';
	@import 'static/scss/app.scss';
	@import 'static/css/base.css';
</style>
