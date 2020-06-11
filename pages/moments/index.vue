<template>
	<view class="content">
		<text @click="nav">Moments</text>
		<text>Moments</text>
		<text>Moments</text>
		<text>Moments</text>
		<text>Moments</text>
		<text>Moments</text>
		<text>Moments</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			nav() {
				uni.navigateTo({
					url:'../goodsdetail/goodsdetail'
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
	}
</style>
