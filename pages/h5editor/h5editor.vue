<template>
	<view class="container">
		<web-view src="https://imperavi.com/redactor/"></web-view>
	</view>
</template>


<script>
	import editor from '../../components/robin-editor/editor.vue'
	export default {
		components: {editor},
		data() {
			
		},
		methods: {
		}
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		background-color: #007AFF;
	}
</style>