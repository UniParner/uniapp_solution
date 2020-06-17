<template>
	<view class="cell">
		<image src="../../static/logo.png" class="avatar"></image>
		<text class="text">{{message.payload.text}}</text>
	</view>
</template>

<script>
	export default {
		props: ['message']
	}
</script>

<style>
	.cell {
		flex-direction: row;
		display: flex;
		margin-left: 30rpx;
		margin-top: 30rpx;
		margin-right: 100rpx;
		align-content: flex-start;
	}
	
	.avatar {
		width: 44rpx;
		height: 44rpx;
		margin-top: 10rpx;
	}

	.text {
		flex: 1;
		padding: 10rpx;
		background-color: #8A6DE9;
		line-height: 44rpx;
		border-radius: 8px;
		margin-left: 8rpx;
		font-size: 15px;
		color: #333333;
	}
</style>
