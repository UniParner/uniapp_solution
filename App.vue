<script>
	import { tim } from './libs/tim/TIMManager.js'
	import TIM from './libs/tim/TIMSDK.js'
	import host from './config/host.js'
	export default {
		globalData: {
			host
		},
		methods: {
			onIMReady(event) {
				console.log('App.vue：', 'IM ready')
				this.$store.commit('updateIMReadyState', true)
			},
			onIMNotReady() {
				console.log('App.vue：', 'IM not ready')
				this.$store.commit('updateIMReadyState', false)
			}
		},
		onLaunch: function() {
			let params = 'Haha'
			console.log('App Launch ', params)
			tim.on(TIM.EVENT.SDK_READY, this.onIMReady)
			tim.on(TIM.EVENT.SDK_NOT_READY, this.onIMNotReady)
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onUnload() {
			tim.off(TIM.Event.SDK_READY, this.onIMReady)
			tim.off(TIM.EVENT.SDK_NOT_READY, this.onIMNotReady)
		},
		onError: function(error) {
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
