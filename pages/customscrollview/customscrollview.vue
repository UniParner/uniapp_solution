<template>
  <view class="container">
    <!-- <testscrollview></testscrollview> -->
    <uni-copy-scroll-view :getIntoViewRect="_intoViewBoundingClientRect"
                          :scroll-into-view="toViewId"
                          scroll-top="100"
                          scroll-y
                          class="scroll-view">
      <view class="header" ref="header1" id="header1">
        <text style="font-size: 20px;">1</text>
      </view>
      <view class="header" ref="header2" id="header2">
        <text style="font-size: 20px;">2</text>
      </view>
      <view class="header" id="header3">
        <text style="font-size: 20px;">3</text>
      </view>
      <view class="header" id="header4">
        <text style="font-size: 20px;">4</text>
      </view>
      <button @click="changeIntoView" style="position: fixed; top: 0; width: 44px; height: 44px;">点我</button>
    </uni-copy-scroll-view>
  </view>
</template>

<script>
  import scrollview from '../../components/copy-scroll-view/scroll-view/index.vue'
  import testscrollview from '../../components/copy-scroll-view/scroll-view/testscrollview.vue'
  // console.log('获取到的组件', scrollview)
  export default {
    components: { 'uni-copy-scroll-view': scrollview, testscrollview },
    data() {
      return { idIndex: 0 }
    },
    computed: {
      toViewId() {
        return 'header' + this.idIndex
      }
    },
    methods: {
      _intoViewBoundingClientRect: function(val) {
        const self = this
        return new Promise((resolve, reject) => {
          console.log('请求scrollIntoView rect')
          uni.createSelectorQuery().in(self).select('#' + val).boundingClientRect(
            data => {
              console.log('获取到的请求结果为：', JSON.stringify(data))
              resolve(data)
            }
          ).exec()
        })
      },
      changeIntoView() {
        console.log("headerRef: ", this.$refs.header1)
        this.idIndex = (++this.idIndex) % 5
        console.log('获取的id', this.idIndex)
        // uni.createSelectorQuery().in(this).select('#' + this.toViewId).boundingClientRect(
        //   data => {
        //     console.log('获取布局信息：', data)
        //   }).exec()
      }
    },
    onReady() {}
  }
</script>

<style>
  
  body, html {
    overscroll-behavior: none;
  }
  
  .container {
    display: flex;
    flex-direction: column;
    background-color: #000066;
    overscroll-behavior: none;
  }

  .header {
    display: flex;
    background-color: #440044;
    height: 300px;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }

  .scroll-view {
    display: flex;
    width: 750rpx;
    height: 500px;
    background-color: #000066;
  }

  text {
    font-size: 80px;
    margin: 20px 20px 0px 20px;
    font-weight: bold;
    color: #000000;
  }
</style>
