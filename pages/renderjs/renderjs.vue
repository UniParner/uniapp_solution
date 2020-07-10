<template>
  <view :class="{container: true}">
    <text>我去你大爷的</text>
    <view :class="['swiper-container']">
      <view class="swiper-wrapper">
        <view :class="['swiper-slide', 'red-bg']">Slide 1</view>
        <view :class="['swiper-slide', 'yellow-bg']">Slide 2</view>
        <view :class="['swiper-slide', 'blue-bg']">Slide 3</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    onReady() {
      console.log('onReady...')
    },
    methods: {

    }
  }
</script>

<script module="renderjsmodule" lang="renderjs">
  import Hammer from 'hammerjs'
  import Swiper from 'swiper'
  export default {
    mounted() {
      console.log('Hammer类型： ', typeof Hammer)
      const containerEle = document.querySelector('.container')
      const hammer = new Hammer(containerEle, {})
      hammer.on('tap', function(e) {
        console.log('点击了……', e || null)
        const pEle = document.createElement('p')
        pEle.append('我是新添加的')
        containerEle.append(pEle)
      })
      hammer.on('pan', function(e) {
        console.log('滑动了……', e)
      })
      console.log('hammer: ', hammer)

      const swiper = new Swiper('.swiper-container', {
        loop: false,
        resistance : true,
        resistanceRatio : 0
      })
      console.log('swiper: ', swiper)
    },
    methods: {
      showToast() {
        uni.showToast({
          title: '哈哈哈'
        })
      }
    }
  }
</script>

<style>
  .container {
    background-color: #007AFF;
    display: flex;
    flex: 1;
    width: 100%;
    flex-direction: column;
    height: 100vh;
  }

  .swiper-container {
    width: 100%;
    height: 100rpx;
    display: flex;
    background-color: #006600;
  }

  .swiper-wrapper {
    display: flex;
    flex-direction: row;
  }

  .swiper-slide {
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100rpx;
    text-align: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .red-bg {
    background-color: red;
  }

  .yellow-bg {
    background-color: yellow;
  }

  .blue-bg {
    background-color: blue;
  }
</style>
