<template>
	<view class="cell" >
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
		margin-left: 15px !important;
		margin-top: 15px !important;
		margin-right: 80px !important;
		align-content: flex-start;
	}
	
	.avatar {
		width: 40px;
		height: 40px;
	}

	.text {
		flex: 1;
		padding: 10px;
		background-color: #8A6DE9;
		line-height: 22px;
		border-radius: 8px;
		margin-left: 8px;
		font-size: 15px;
		color: #333333;
	}
</style>
