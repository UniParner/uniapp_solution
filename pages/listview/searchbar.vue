<template>
	<view class="container">
		<image src="../../static/home_search@2x.png" class="search-icon" ></image>
		<input placeholder="大家都在搜……" class="input" />
	</view>
</template>

<script>
</script>

<style scoped>
	.container {
		display: flex;
		flex-direction: row !important;
		align-items: center;
		height: 72rpx;
		border-radius: 36rpx;
		border-style: solid;
		border-width: 2rpx ;
		border-color: #00FF00;
		background-color: #FFFFFF !important;
		overflow: hidden;
		padding: 0rpx 30rpx;
	}
	.input {
		flex: 1;
		font-size: 28rpx;
		margin-left: 8rpx;
	}
	.search-icon {
		width: 32rpx;
		height: 32rpx;
	}
	.search-button {
		
	}
</style>
