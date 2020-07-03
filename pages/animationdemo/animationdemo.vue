<template>
  <view>
    <text :animation="animation">滚动</text>
    <scroll-view @scroll="onScroll" style="height: 100px;">
      <view v-for="index in 100" :key="index">
        <text>第{{index}}行</text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        animation: {}
      }
    },
    methods: {
      onScroll() {
        console.log('开始滚动……')
        const offset = Math.random() * 1000
        this.anim.translateX(offset).step()
        this.animation = this.anim.export()
      }
    },
    mounted() {
      this.anim = uni.createAnimation({
        duration: 200
      })
    }
  }
</script>

<style>

</style>
