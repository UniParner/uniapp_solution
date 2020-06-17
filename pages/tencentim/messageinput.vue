<template>
	<view class="container">
		<view class="inputcontainer">
			<switch @change="onSwitch" :checked="sendBulletMsg"></switch>
			<input class="textinput" placeholder="你想说啥？" v-model="text" />
			<button type="primary" @click="onSend">发送</button>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			
		},
		data() {
			return {
				 text: '',
				 sendBulletMsg: true
			}
		},
		
		methods:{
			onSwitch(event) {
				this.sendBulletMsg = event.detail.value
				console.log('开关状态变化: ', event.detail.value)
			},
			onInput(text) {
				console.log('输入了: ', text)
			},
			onSend(btn) {
				console.log('发送: ', btn)
				this.$emit('onSendMessage', [this.sendBulletMsg, this.text])
			}
		}
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		height: 44px;
	}
	.inputcontainer {
		padding-left: 8px;
		padding-right: 8px;
		align-items: center;
		display: flex;
		flex-direction: row;
		height: 44px;
		background-color: #F2F2F2;
	}
	.textinput {
		flex: 1;
		border: #999999;
		border-style: solid;
		border-width: 1px;
		height: 38px;
		margin: 0px 16px;
	}
</style>
