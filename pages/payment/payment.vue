<template>
	<view>
		<button type="default" @click="wechatPay">微信支付</button>
		<button type="default" @click="alipay">支付宝支付</button>
		<button type="default" @click="applePay">Apple支付</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			async wechatPay() {
				console.log('微信支付')
			},
			async alipay() {
				console.log('支付宝支付')
			},
			async applePay() {
				console.log('苹果支付')
			}
		}
	}
	
</script>

<style>

</style>
