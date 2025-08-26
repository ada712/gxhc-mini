<template>
	<web-view :src="webUrl"></web-view>
</template>

<script>
	export default {
		data: function() {
			return {
				webUrl: '',
			};
		},
		onLoad(options) {
			if (options.url != null) {
				this.webUrl = decodeURIComponent(options.url)
				if (options.title != null) {
					uni.setNavigationBarTitle({
						title: options.title,
					});
				}
			} else {
				uni.navigateBack({
					delta: 1,
				});
			}
		},
	};
</script>

<style>
</style>