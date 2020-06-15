<template>
	<view>
		<input type="text" value="" placeholder="请输入用户名"  class="input" />
		<input type="text" value="" placeholder="请输入密码" password="true" class="input" />
		<!-- <button @click="onClickLogin">登录IM</button> -->
	</view>
</template>

<script>
	import {tim, genUserSig, login} from '../../libs/tim/TIMManager.js'
	
	export default {
		data() {
			return {
				userid: "",
				password: ""
			}
		},
		methods: {
			async onClickLogin() {
				try{
					
					const imReponse = await login(this.userid, this.password)	
					console.log("腾讯IM登录成功: ", imReponse)
				}catch(e){
					console.error("腾讯IM登录失败: ", e)
				}
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
	}
</style>
