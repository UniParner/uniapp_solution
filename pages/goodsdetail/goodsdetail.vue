<template>
	<view class="content">
		<text v-for="i in 10000" :key="i" class="item">
			第{{i}}行
		</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #3F536E;
	}
	.item {
		font-size: 14;
		color: #1AAD19;
	}
</style>
