<template>
	<view class="articlecell">
		<view class="head-container">
			<image v-bind:src="article.img" class="header-image"></image>
			<view style="flex: 1;">
				<text class="nickname">{{article.nickName}}</text>
				<text class="des">{{article.userTitle}}</text>
			</view>
			<view class="hot-degree">
				<image src="../../static/hot_degree@2x.png" class="hot-degree-icon"></image>
				<text class="read-count">{{article.likeCount}}</text>
			</view>
		</view>
		<view class="divider" />
		<text class="content">{{article.foreword}}</text>
	</view>
</template>

<script>
export default {
	props: ["article"]
};
</script>

<style>
.articlecell {
	display: flex;
	flex-direction: column;
	border-radius: 8rpx !important;
	overflow: hidden;
	background-color: #FFFFFF;
	margin-bottom: 30rpx !important;
}
.head-container {
	padding: 30rpx;
	align-items: center;
	display: flex;
	flex-direction: row;
	background-color: #ffffff;
}
.header-image {
	background-color: #2c405a !important;
	width: 88rpx !important;
	height: 88rpx !important;
	border-radius: 44rpx;
	margin-right: 10rpx;
}
.nickname {
	color: #333333;
	font-size: 30rpx;
	font-weight: 600;
}
.des {
	color: #ababad;
	font-size: 24rpx;
}
.hot-degree {
	display: flex;
	flex-direction: row;
	align-items: center;
	background-color: #fef8e5;
	height: 40rpx;
	border-radius: 20rpx;
	padding: 10rpx 30rpx;
}
.hot-degree-icon {
	width: 16rpx;
	height: 22rpx;
}
.read-count {
	color: #f2ba00;
	font-size: 24rpx;
	padding: 0rpx;
	margin: 0rpx;
	margin-left: 6rpx;
}
.divider {
	height: 1rpx;
	background-color: #f2f2f5;
	margin: 0rpx 30rpx;
}
.content {
	color: #606061;
	font-size: 26rpx;
	margin: 26rpx 30rpx 30rpx 30rpx;
}
</style>
