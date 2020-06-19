<template>
	<view style="display: flex; flex-direction: column;">
		<text>当前计数{{currentNum}}</text>
		<button @click="increment">增加计数</button>
		<button @click="decrement">减少计数</button>
		<button @click="incrementBy2">依次加2</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			increment() {
				this.$store.commit('increment')
			},
			decrement() {
				this.$store.commit('decrement')
			},
			incrementBy2() {
				this.$store.commit('incrementByNum', 2)
			}
		},
		computed: {
			currentNum() {
				console.log('获取最新数据：', this.$store.state)
				return this.$store.state.count
			}
		}
	}
</script>

<style>

</style>
