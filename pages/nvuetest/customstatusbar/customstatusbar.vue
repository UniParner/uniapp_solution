<template>
	<view class="page" style="padding-top: statusBarHeight + 'px';">
		<view class="acontainer" v-for="index in dataLenght" :key="index">
			<view class="item" style="background-color: #007AFF;">
				<text>sjss{{index}}</text>
			</view>
			<view class="item" style="background-color: #00ff00;"></view>
		</view>
		<view style="display: flex; flex-direction: column; height: 300rpx; background-color: #0A98D5;">
			<!-- <view style="background-color: #FF0000; display: flex; flex: 1;  "></view> -->
			<view style="background-color: #FFFF00; position: absolute; left: 0rpx; right: 0rpx; bottom: 0rpx; top: 0rpx;"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return { statusBarHeight: 0, dataLenght: 0 };
		},
		methods: {},
		onLoad() {
			console.log("加载subNViews")
			const statusbar = uni.getSubNVueById("statusbar")
			// statusbar.hide()
			const thisVue = this
			uni.getSystemInfo({
				success(info) {
					thisVue.statusBarHeight = info.statusBarHeight
					console.log('获取到了状态栏高度:', info.statusBarHeight)
					statusbar.setStyle({ height: '200px' })
					statusbar.show()
				}
			})
			setTimeout(function() {
				thisVue.dataLenght = 10
			}, 100)
		}
	};
</script>

<style>
	.page {
		background-color: "#990000";
	}

	.acontainer {
		margin-top: 40rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		background-color: #8a6de9;
	}

	.item {
		align-items: center;
		justify-content: center;
		flex: 1;
		height: 100rpx;
	}
</style>
