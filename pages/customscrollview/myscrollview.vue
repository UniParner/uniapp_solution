<template>
  <view class="container">
    <button type="default" @click="showInfo">点我看日志</button>
    <view class="scroll" ref="scroll">
      <view class="content-container">
        <view class="item1"></view>
        <view class="item2"></view>
        <view class="item3"></view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return { }
    },
    methods: {
      onTap() {
        alert('haha')
      },
      showInfo() {
        const hjs =
          `
              alert(typeof Hammer)
              var scrollview = document.querySelector('.scroll')
              var hammer = new Hammer(scrollview, {})
              hammer.on('tap', function() { alert('tap了')})
         `
         console.log('需要执行的js为：', hjs)
         const currentWebview = this.$scope.$getAppWebview();
         currentWebview.evalJS(hjs)
      }
    },
    onLoad() {
      const currentWebview = this.$scope.$getAppWebview();
      // currentWebview.appendJsFile('./hammer.js')
      console.log('onLoad: ', currentWebview)
    },
    onReady() {
      // #ifdef APP-PLUS
      const currentWebview = this.$scope.$getAppWebview();
      const hjs =
        `
            var scrEle = document.createElement('script');
            scrEle.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.js');
            document.head.append(scrEle);
       `
       currentWebview.evalJS(hjs)
      // #endif
    }
  }
</script>

<style>
  body {
    overflow: hidden;
    overscroll-behavior: none;
  }

  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #0095DD;
    overflow: hidden;
    overscroll-behavior: none;
  }

  .scroll {
    /* overflow: scroll; */
    display: flex;
    overscroll-behavior: none;
  }

  .content-container {
    display: flex;
    flex-direction: row;
  }

  .item1 {
    width: 750rpx;
    height: 300rpx;
    background-color: #FF0000;
  }

  .item2 {
    width: 750rpx;
    height: 300rpx;
    background-color: #FFFF00;
  }

  .item3 {
    display: none;
    width: 750rpx;
    height: 300rpx;
    background-color: #FF00FF;
  }
</style>
