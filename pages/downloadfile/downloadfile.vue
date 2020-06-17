<template>
	<view>
		<button type="default" @click="download">下载文件</button>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			download() {
				console.log(plus.io.PRIVATE_DOC)
				plus.io.requestFileSystem(plus.io.PRIVATE_DOC, fs => {
					console.log('请求文件系统成功: ', fs)
					console.debug('完整路径：', fs.root.fullPath)
				}, error => {
					console.log('请求文件系统失败: ', error)
				} )
				// const url = 'https://static.xdpaction.com/img/circle/topic/file/534808667716907008_1592218787193.pdf'
				// const task = plus.downloader.createDownload(url, {}, (download, status) => {
				// 	console.debug(download, status)
				// })
				// task.start()
				
				// uni.downloadFile({
				//     url: 'https://static.xdpaction.com/img/circle/topic/file/534808667716907008_1592218787193.pdf', 
				//     success: (res) => {
				//         console.log('下载结果：', res)
						
				//     }
				// });
			}
		}
	}
</script>

<style>

</style>
