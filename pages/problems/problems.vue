<template>
	<scroll-view class="acontainer">
		<uni-list>
			<uni-list-item
				v-for="problem in problems"
				:key="problem.title"
				:title="problem.title"
				@click="navToProblem(problem)"
			></uni-list-item>
		</uni-list>
		<cover-view class="status">
		</cover-view>
	</scroll-view>
</template>

<script>
export default {
	data() {
		return {
			problems: [
				{ title: '长列表', path: '../longlist/longlist' },
				{ title: '渐变', path: '../lineargradient/lineargradient' },
				{ title: '文章', path: '../listview/listview' },
				{ title: '自定以状态栏', path: '../nvuetest/customstatusbar/customstatusbar' },
				{ title: 'H5编辑器', path: '../h5editor/h5editor' },
				{title: '富文本', path: '../richtext/richtext'},
				{title: '腾讯云IM', path: '../tencentim/imlogin'},
				{title: '下载文件', path: '../downloadfile/downloadfile'},
				{title: '第三方登录、分享', path: '../loginshare3party/loginshare3party'},
				{title: 'UniApp支付', path: '../payment/payment'},
				{title: 'Vuex示例，Counter', path: '../vuexdemo/vuexdemo'}
			]
		};
	},
	methods: {
		navToProblem: function(problem) {
			uni.navigateTo({
				url: problem.path + '?title=' + problem.title
			});
		}
	},
	onReady() {
		
	}
};
</script>

<style scoped>
	.acontainer {
		padding-top: var(--status-bar-height);
		background-color: #FF0000!important;
	}
	.cover {
		position: absolute;
		top: 0rpx;
		width: 750rpx;
		height: var(--status-bar-height);
		background-color: #f0f000;
	}
	.status {
		 height: var(--status-bar-height);
		 background-color: #f0f000;
		 position: fixed;  
		 top: 0rpx;
		 width: 750rpx;
		 z-index: 1000;
	}
</style>
