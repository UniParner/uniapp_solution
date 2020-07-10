<template>
  <view>
    <view class="tabbar">
      <text class="tabitem" v-for="(page, index) in pages" :key="index">
        item{{index}}
      </text>
    </view>
    <view class="swiper-container" @click="onclick">
      <view class="">
        <view class="swiper-item">
          <text class="swiper-item">第{{index}}页</text>
        </view>
      </view>
      <swiper :animation="animation" :duration="250"
              @touchstart="onStartTouch($event)"
              @touchmove="onTouchMove($event)"
              @touchcancel="onTouchEnd($event)"
              @touchend="onTouchEnd($event)">
        <swiper-item class="swiper-item" :style="{backgroundColor: page.bg}"
                     v-for="(page, index) in pages" :key="index">
          <view class="swiper-item">
            <text class="swiper-item">第{{index}}页</text>
          </view>
        </swiper-item>
      </swiper>
    </view>

  </view>
</template>

<script>
  export default {
    data() {
      return { pages: [{ bg: '#FF0000' }, { bg: '#00FF00' }], animation: {} }
    },
    mounted() {
      this.anim = uni.createAnimation({ duration: 100 })
    },
    methods: {
      onStartTouch(event) {
        // 不支持多手指滑动
        if (event.touches.length > 1) { return }
        const { pageX, pageY, identifier } = event.changedTouches[0]
        this.startPageX = pageX
        this.startPageY = pageY
        this.identifier = identifier
        this.throttle = 0
        console.log('开始触摸了……', JSON.stringify(event.touches))
      },
      onTouchMove(event) {
        if (event.touches.length > 1) { return }
        const { pageX, pageY, identifier } = event.changedTouches[0]
        if (identifier != this.identifier) {
          console.log('结束滑动……')
          return
        }
        if (++this.throttle % 3 != 0) {
          return
        }
        const deltaX = pageX - this.startPageX
        const deltaY = pageY - this.startPageY
        this.anim.translateX(deltaX).step()
        this.animation = this.anim.export()
        this.throttle = 0
        console.log("移动: ", event.touches[0])
        // this.pageX = pageX
        // this.pageY = pageY
        this.endPageX = pageX
        this.endPageY = pageY
        console.log('移动的间隔为：', deltaX, deltaY)
      },
      onTouchEnd(event) {
        // const { pageX, pageY } = event.touches[0]
        console.log('触摸结束……', this.endPageX, this.endPageY)
      },
      
      onclick() {
        console.log('点击了……')
      }
    }
  }
</script>

<style>
  .tabbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 50px;
  }

  .tabitem {
    flex: 1;
    height: 50px;
    line-height: 50px;
    vertical-align: middle;
    text-align: center;
  }

  swiper {
    display: flex;
    width: 1500rpx;
    background-color: #007AFF;
  }

  .swiper-item {
    height: 100%;
    width: 750rpx;
  }

  .swiper-container {
    width: 100%;
    height: 800px;
    background-color: #F76260;
    padding-bottom: 20px;
  }
</style>
