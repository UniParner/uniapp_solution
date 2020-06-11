<template>
	<view class="container">
		<view class="makeCorner">
			<image src="../../static/logo.png" mode='aspectFill'>
			</image>
		</view>
		<view class="grid">
			<view v-for="item in 9" :key="item"><view class="gridItem"></view></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style>
.grid {
	padding-left: 30rpx;
	padding-right: 30rpx;
	justify-content: space-between;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
,
.gridItem {
	width: 216.66rpx;
	height: 100rpx;
	margin-top: 20rpx;
	background-color: #0a98d5;
}
.makeCorner {
	overflow: hidden;
	width: 100rpx;
	height: 100rpx;
	border-radius: 20rpx;
	border-style: solid;
	background-color: #09bb07;
}
</style>
