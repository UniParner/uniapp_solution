<template>
	<view class="container">
		<editor placeholder="请输入" class="editor"></editor>
		<!-- <view class="barrr">
			<view @touchmove.stop.prevent="doNothing">项目一</view>
			<button>项目二</button>
			<button>项目三</button>
		</view> -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				marginBottom: 0,
				isIOS: false
			}
		},
		methods: {
			didClick() {

			},
			fetchHeight() {
				uni.createSelectorQuery().in(this).select('container')
					.fields({ rect: true }, res => {
						console.log('实际上就是 ', JSON.stringify(res), res)
					})
					.exec()
			}
		},
		onLoad() {},
		onReady() {

			const thisVue = this
			const { platform } = uni.getSystemInfoSync()
			console.log('平台时', platform)
			this.isIOS = platform == 'ios'
			const richtextmenu = uni.getSubNVueById("richtextmenu")
			richtextmenu.show()
			uni.onKeyboardHeightChange(function(res) {
				console.log('键盘高度变化：', JSON.stringify(res))
				if (thisVue.isIOS) {
					richtextmenu.hide()
					richtextmenu.setStyle({ bottom: `${res.height}px` })
					setTimeout(() => { richtextmenu.show() }, 250)
				}
			})
			uni.$on("richtext", index => {
				console.log('点击了: ', index)
			})
		},
		updated() {
			this.fetchHeight()
		}
	}
</script>

<style>
	.container {
		height: 100vh;
		background-color: #fafafa;
		display: flex;
		flex-direction: column;
	}

	.editor {
		flex: 1;
	}

	.barrr {
		display: flex;
		height: 50px;
		flex-direction: row;
	}
</style>
