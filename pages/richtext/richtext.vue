<template>
	<view>
		 <rich-text :nodes="html"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				html: '<p style="display: table-cell; overflow:hidden; font-size: 20px; line-height:150%;vertical-align:middle; word-break:break-all;"><span style="background-color: yellow;padding: 4px; border-radius:15px 5px;">热门</span><img style="width: 20px; height: 20px; vertical-align: middle;" src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png"/>就是看间大姐手机看的看手机第三空间就是垃圾倒垃圾多少dsadsaddasdasdsaddsadadsadsadsadsadsad多少开始的哈克活动卡上课撒活动卡仕达ssdsdsdsdajsdjsdsasdadaaljdlsajdaljadjlsdkadksajdlsadalkjsa<img style="width: 20px; height: 20px; vertical-align: middle;" src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png"/></p>'	
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
