<script>
	export default {
		onLaunch: function() {
			let params = 'Haha'
			console.log('App Launch ', params)
		},
		onShow: function() {
			console.log('App Show')
			getApp().globalData.host = "https://test.xdpaction.com"
		},
		onHide: function() {
			console.log('App Hide')
		},
		onError:function(error){
			console.log('App Error:', error)
		},
		
	}
</script>

<style>
	/*每个页面公共css */
	@import "./common/uni.css";
	@import "./common/iconfont.css";
	@import "./common/animate.css";
	.container {
		display: flex;
		flex-direction: column;
	}
</style>
