<template>
	<view class="content">
		<scroll-view scroll-y="true" >
			<view style="display: flex; flex-direction: column;" >
				<text>Home</text>
				<text>Home</text>
				<text>Home</text>
				<text>Home</text>
				<text>Home</text>
				<view style="display: flex; flex-wrap: wrap;">
					<text style="width: 300rpx;">哈哈</text>
					<text style="width: 300rpx;">哈哈</text>
					<text style="width: 300rpx;">哈哈</text>
					<text style="width: 300rpx;">哈哈</text>
					<text style="width: 300rpx;">哈哈</text>
					<text style="width: 300rpx;">哈哈</text>
					<text style="width: 300rpx;">哈哈</text>
					<text style="width: 300rpx;">哈哈</text>
					<text style="width: 300rpx;">哈哈</text>
				</view>
				<uni-grid column="4" style="display: flex; flex: 1 ">
					<uni-grid-item v-for="index in 9" :key="index" style="display: flex;  background-color: #0A98D5; ">
						<view style="display: flex; margin: 10rpx; flex: 1; background-color: #09BB07; align-items: center; justify-content: center;">
							<text>第{{ index }}</text>
						</view>
					</uni-grid-item>
				</uni-grid>
				<text style="width: 300rpx;">哈哈</text>
				<text style="width: 300rpx;">哈哈</text>
				<text style="width: 300rpx;">哈哈</text>
				<text style="width: 300rpx;">哈哈</text>
				<text style="width: 300rpx;">哈哈</text>
				<text style="width: 300rpx;">哈哈</text>
				<text style="width: 300rpx;">哈哈</text>
				<text style="width: 300rpx;">哈哈</text>
				<text style="width: 300rpx;">哈哈</text>
				<text style="width: 300rpx;">哈哈</text>
				<text style="width: 300rpx;">哈哈</text>
				<text style="width: 300rpx;">哈哈</text>
				<text style="width: 300rpx;">哈哈</text>
				<text style="width: 300rpx;">哈哈</text>
			</view>
			
		</scroll-view>
		
		<!-- <text v-for="i in 10" :key="i" class="item">
			第{{i}}行
		</text> -->
	</view>
</template>

<script>
import uniGrid from '../../components/uni-grid/uni-grid.vue';
import uniGridItem from '../../components/uni-grid-item/uni-grid-item.vue';

export default {
	data() {
		return {};
	},
	onLoad() {
		// uni.onWindowResize(function(res) {
		// 	uni.showToast({
		// 		title: '' + res.size.windowWidth
		// 	});
		// });
	},
	methods: {},
	components: { uniGrid, uniGridItem }
};
</script>

<style>
.content {
	background-color: #999999;
	display: flex;
	flex-direction: column;
}
</style>
