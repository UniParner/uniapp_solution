<template>
  <view class="container">
    <view class="swiper-container"
          @touchstart="onTouchStart($event)"
          @touchmove="onTouchMove($event)"
          @touchend="onTouchEnd($event)"
          @touchcancel="onTouchEnd($event)">
      <view class="swiper">
        <view :animation="animation" class="slide red" :style="{transform: 'translateX(' + swipeDistance + 'px)'}"></view>
        <view :animation="animation" class="slide green" :style="{transform: 'translateX(' + swipeDistance + 'px)'}"></view>
        <view :animation="animation" class="slide blue" :style="{transform: 'translateX(' + swipeDistance + 'px)'}"></view>
      </view>
    </view>

  </view>
</template>

<script>
  import GestureDetector from './GestureDetector'
  export default {
    data() {
      return {
        swipeDistance: 0,
        swiperWidth: 0,
        animation: {},
      }
    },
    onReady() {
      this.anim = uni.createAnimation({ timingFunction: 'ease', duration: 250 })
      const self = this
      uni.createSelectorQuery()
        .in(this)
        .select('.swiper')
        .fields({
          rect: true,
          size: true
        }, function(rect) {
          self.swiperWidth = rect.width
          self.gestureDetector = new GestureDetector(self.onPan, self.onSwipe)
          console.log('Swiper的尺寸：', JSON.stringify(rect))
        })
        .exec()
    },
    methods: {
      onPan(angle, deltaX, moveX) {
        this.swipeDistance += deltaX
        if (this.swipeDistance > 0) { this.swipeDistance = 0 }

        if (-this.swipeDistance > this.swiperWidth * 2 / 3) {
          this.swipeDistance = -this.swiperWidth * 2 / 3
        }
        console.log(`${this.swipeDistance} ${this.swiperWidth}`)
        // console.log(`拖动了:  ${angle} ${deltaX} ${moveX}`)
        // if(angle > 0.)
      },
      onSwipe(direction, distance, velocity) {
        const nextpage = parseInt(Math.round(Math.abs(this.swipeDistance) / (
          this.swiperWidth / 3)))
        this.anim.translateX(-nextpage * this.slideWidth).step()
        this.animation = this.anim.export()
        console.log(`左右扫动了:  ${direction} ${distance} ${velocity}`, nextpage)
      },

      onTouchStart: function(event) {
        if (!this.gestureDetector) { return }
        this.gestureDetector.onTouchStart(event)
      },
      onTouchMove(event) {
        if (!this.gestureDetector) { return }
        this.gestureDetector.onTouchMove(event)
      },
      onTouchEnd(event) {
        if (!this.gestureDetector) { return }
        this.gestureDetector.onTouchEnd(event)
      }
    },
    computed: {
      slideWidth() { return this.swiperWidth / 3 }
    }
  }
</script>

<script module="swiper" lang="renderjs">
  export default {
    mounted() {},
    methods: {
      onClick() {
        console.log('点击了……')
        this.onMouseDown()
      }
    }
  }
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    height: 300px;
    background-color: #F25235;
    padding: 50px;
    overflow: hidden;
  }

  .swiper-container {
    background-color: #440044;
    width: auto;
    height: 100%;
    overflow: hidden;
  }

  .swiper {
    display: flex;
    flex-direction: row;
    width: 300%;
    height: 100%;
    background-color: #0095DD;
  }

  .slide {
    width: 100%;
    height: 100%;
  }

  .red {
    background-color: #F0F000;
  }

  .green {
    background-color: #00FF00;
  }

  .blue {
    background-color: #0000FF;
  }

  .click-me {
    background-color: #0000FF;
  }
</style>
