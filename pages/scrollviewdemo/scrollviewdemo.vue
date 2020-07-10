<template>
  <view class="">
    <view class="navbar">
      <text>我是导航栏</text>
    </view>
    <scroll-view scroll-y="true">
      <view class="header" v-for="index in 5" :key="index" :id="`header${index}`" :ref="`header${index}`">
        <text>第{{index}}个header</text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
    
    },
    mounted() {
      console.log(this.$refs.header1)
    }
  }
</script>

<style>
   body {
     overscroll-behavior: none;
   }
   html {
     overscroll-behavior: none;
   }
   page {
     overscroll-behavior: none;
   }
  .navbar {
    height: 100rpx;
    background-color: #007AFF;
    margin-bottom: 10rpx;
  }
  .header {
    height: 100rpx;
    margin-bottom: 10rpx;
    background-color: #006400;
  }
  
  scroll-view {
    height: 100vh;
  }
</style>
