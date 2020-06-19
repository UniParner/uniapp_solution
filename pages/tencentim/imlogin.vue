<template>
	<view>
		<input type="text" value="" placeholder="请输入userid" v-model="userid" class="input" />
		<button class="loiginBtn" @click="onClickLogin">登录IM</button>
		<!-- <button class="loiginBtn" @click="logout">退出登录</button>
		<button class="loiginBtn" @click="getmyProfile">获取登录信息</button> -->
	</view>
</template>

<script>
	import { urlUserSig } from '../../config/urls.js'
	const { tim, genUserSig } = require('../../libs/tim/TIMManager.js')
	import TIM from '../../libs/tim/TIMSDK.js'
	import isValidateUserId from '../../libs/tim/timvalidator.js'
	import storageutils from '../../storage/storageutils.js'

	export default {
		data() { return { userid: "", } },

		methods: {
			async onClickLogin() {
				uni.showLoading({ title: '登录中...' })
				try {
					console.log('userid： ', this.userid, tim)
					if (!isValidateUserId(this.userid)) {
						uni.showToast({ title: '用户id不合法' })
						return
					}

					try {
						const userSig = await this.vuerequest({ url: urlUserSig, data: { userId: this.userid } })
						// const userSig = genUserSig(this.userid)
						const imReponse = await tim.login({ userID: this.userid, userSig })
						storageutils.saveCurrentUser({ userID: this.userid, userSig })
						console.log("腾讯IM登录成功: ", imReponse)
						uni.navigateTo({ url: './imconversationlist' })
						// console.log('获取到数据为：', response)
					} catch (e) {
						uni.showToast({ title: 'IM登录失败', icon: 'none' })
						console.error('usersig获取失败：', e)
						return
					}
				} catch (e) {
					console.error("腾讯IM登录失败: ", e)
				} finally {
					uni.hideLoading()
				}
			},
			async logout() {
				try {
					const result = await tim.logout()
					console.log('退出登录成功：', result)
				} catch (e) {
					console.log('退出登录出错：', e)
				}
			},
			async getmyProfile() {
				try {
					const response = await tim.getMyProfile();
					console.log('个人资料获取成功：', response)
				} catch (e) {
					console.error('我的资料获取失败：', e)
				}
			}
		},
		onReady() {
			const currentuser = storageutils.getCurrentUser()
			if (currentuser && currentuser.userID) {
				console.log('自动登录')
				this.userid = currentuser.userID
				this.onClickLogin()
			} else {
				console.log('不能自动登录')
			}
		}
	}
</script>

<style>
	.input {
		height: 44px;
		border-width: 1px;
		border-color: #B2B2B2;
		border-style: solid;
		margin: 30rpx;
	}

	.loiginBtn {
		margin-left: 20rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
	}
</style>
