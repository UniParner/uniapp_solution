<template>
	<view>
		<button type="default" @click="loginWithWechat">微信登录</button>
		<button type="default">苹果登录</button>
		<button type="default">分享到微信</button>
		<button type="default">分享到微博</button>
		<button type="default">分享到QQ</button>
	</view>
</template>

<script>
	
	import {isAppInstalled, fetchServices, wechatLogin, uniLogin, logout} from './authutils.js'
		
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
			shareToWechat() {},
			shareToWeibo() {},
			shareToQQ() {}
		}
	}
</script>


<style>

</style>
