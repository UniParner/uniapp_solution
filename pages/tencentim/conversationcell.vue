<template>
	<view class="cell">
		<text>{{conversation.conversationID}}</text>
		<text>{{conversation.lastMessage.messageForShow}}</text>
	</view>
</template>

<script>
	export default {
		props: ['conversation']
	}
</script>

<style>
	.cell {
		display: flex;
		flex-direction: column;
		margin: 0rpx 30rpx;
		padding: 0rpx 10rpx;
		background-color: #09BB07;
		border-radius: 4px;
		margin-top: 16rpx;
	}
</style>
