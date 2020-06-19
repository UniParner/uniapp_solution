<template>
	<view>
		<button type="default" @click="loginWithWechat">微信登录</button>
		<button type="default">苹果登录</button>
		<button type="default" @click="clickShareToWechat('WXSceneSession')">分享到微信</button>
		<button type="default" @click="clickShareToWechat('WXSenceTimeline')">分享到微信朋友圈</button>
		<button type="default" @click="clickShareToWechat('WXSceneFavorite')">分享到微信收藏</button>
		<button type="default">分享到微博</button>
		<button type="default">分享到QQ</button>
	</view>
</template>

<script>
	import { isAppInstalled, fetchServices, wechatLogin, uniLogin, logout } from './authutils.js'
	import { shareToWechat } from './shareutils.js'

	export default {
		data() {
			return {

			}
		},
		methods: {
			didClick() {
				this.loginWithWechat()

			},
			async loginWithWechat() {
				if (!isAppInstalled('weixin')) {
					uni.showToast({ title: '本机未安装微信', icon: 'none' })
					return
				}
				const sysinfo = uni.getSystemInfoSync()
				console.log('获取到了系统信息：', sysinfo, sysinfo.system)
				try {
					const serviceList = await fetchServices()
					const weixinService = serviceList['weixin']
					const res = await logout(weixinService)
					console.log('退出登录结果: ', res)
					// const authResult = await uniLogin('weixin')
					const authResult = await wechatLogin()
					console.log('获取到的授权信息：', authResult)

					plus.nativeUI.alert('授权成功')
				} catch (error) {
					console.error(error)
					plus.nativeUI.alert('微信授权失败')

				}
			},
			loginWithApple() {},
			async clickShareToWechat(scene) {
				if (!isAppInstalled('weixin')) {
					uni.showToast({ title: '本机未安装微信', icon: 'none' })
					return
				}
				try {
					const result = await shareToWechat({ type: 1, scene, summary: '这是一条来自行动派圈子的分享！' })
					console.log('分享结果：', result)
					uni.showToast({ title: '分享成功' })
				} catch (e) {
					console.log('分享失败：', e)
				}
			},
			shareToWeibo() {},
			shareToQQ() {}
		}
	}
</script>


<style>

</style>
