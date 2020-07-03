<template>
  <view class="">
    <scroll-view scroll-y="true">
      <view class="header" v-for="index in 30" :key="index" :id="`header${index}`" :ref="`header${index}`">
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
  .header {
    height: 300rpx;
    margin-bottom: 10rpx;
    background-color: #006400;
  }
</style>
