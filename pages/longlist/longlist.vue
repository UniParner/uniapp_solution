<template>
	
		<list>
			<!-- #ifdef APP-NVUE -->
			<cell>
				<view v-for="index in 200" :key="index">
					<text>第{{index}}行</text>
				</view>
			</cell>
			<!-- #endif -->
			<!-- #ifndef APP-NVUE -->
			<view v-for="index in 200" :key="index">
				<text>第{{index}}行</text>
			</view>
			<!-- #endif -->
		</list>
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

</style>
