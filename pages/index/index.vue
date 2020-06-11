<template>
  <view class="content" style="flex: 1; background-color: #8a6de9;">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <button type="primary" v-on:click="didClickMe">快点来点我</button>
    <input placeholder="整的" />
    <text class="err">dsahdksah</text>
    <hintinput placeholder="sahsk" errorMsg="找我呢过" />
    <text class="iconfont icon-home" style="font-size: 100rpx;"></text>
    <text class="iconfont icon-me"></text>
    <text class="iconfont icon-contacts-book--line"></text>
    <view style="background-color: #3f536e; height: 300rpx;">
      <view
        :class="{ animate__animated: !isPulse, animate__pulse: !isPulse }"
        style="background-color: #09bb07;"
        @click="anim"
      >
        <text>点我动画</text>
      </view>

      <view
        :class="['animate__animated', { animate__bounce: isPulse }]"
        style="background-color: #09bb07;"
        @click="anim"
      >
        <text>点我动画</text>
      </view>
    </view>
  </view>
</template>

<script>
import hintinput from "../../components/hintinput.vue";

export default {
  data() {
    return {
      title: "Hello Vue",
      isPulse: false
    };
  },
  onLoad() {
    console.log("index.vue onLoad...");
  },

  methods: {
    didClickMe: () => {
      console.log("You clicked me!");
    },
    anim() {
      this.isPulse = !this.isPulse;
      console.log("开始动画……");
    }
  },
  components: { hintinput }
};
</script>

<style>
.content {
  background-color: #c0c0c0;
  display: flex;
  flex-direction: column;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
