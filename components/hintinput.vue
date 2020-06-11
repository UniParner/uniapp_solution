<template>
	<view class="hicontent">
		<input class="input" :placeholder="placeholder" @input="onInput" />
		<text class="err">{{ errorMsg }}</text>
	</view>
</template>

<script>
export default {
	data() {
		return {
			text: ''
		};
	},
	props: { placeholder: String, errorMsg: String },
	methods: {
		onInput(element) {
			console.log('输入了', tex);
		}
	}
};
</script>

<style>
.hicontent {
	flex-direction: column;
	width: 100%;
	height: 200rpx;
	align-items: flex-start;
	background-color: #f00;
}

.input {
	width: 100%;
	border-color: #ff0000;
	border-width: 1;
	border-radius: 15;
	background-color: #007aff;
	overflow: hidden;
}

.err {
	align-self: flex-start;
	background-color: #2c40ff;
	color: #ff0000;
	font-size: 24rpx;
}
</style>
