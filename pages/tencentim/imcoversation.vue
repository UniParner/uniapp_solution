<template>
	<view class="">
		<uni-list class="list">
			<text v-if="nomoreData" class="nomore-data">没有更多数据了</text>
			<messagecell v-for="(msg, index) in msgs" :key="index" :message="msg">
			</messagecell>
		</uni-list>
		<messageinput class="messageinput" @onSendMessage="sendMsg"></messageinput>
	</view>
</template>


<script>
	import messageinput from './messageinput.vue'
	import { tim, eventObs } from '../../libs/tim/TIMManager.js'
	import { createGroup } from './imviewmodel.js'
	import TIM from '../../libs/tim/TIMSDK.js'
	import messagecell from './messagecell.vue'
	export default {
		components: { messageinput, messagecell },
		data() {
			return {
				msgs: [],
				nomoreData: false,
				nextReqMessageID: undefined
			}
		},
		pageQuery: {},
		methods: {
			async sendMsg(params) {
				const { to, type } = this.$options.pageQuery
				const isBulletMsg = params[0]
				const text = params[1]
				console.log('发送消息给', to, " ", text)
				try {
					const message = tim.createTextMessage({
						to,
						conversationType: type,
						payload: {text}
					});
					const result = await tim.sendMessage(message)
					this.msgs.push(message)
					console.log('消息发送成功', result)
				} catch (e) {
					console.error('消息发送失败', e)
				}
			},
			async mCreateGroup() {
				try {
					const result = await createGroup('10088')
					console.log('群组创建成功: ', result)
				} catch (e) {
					console.error('群组创建失败：', e)
				}
			},
			async fetchMessageList() {
				try {
					const { conversationID, type, to } = this.$options.pageQuery
					if (!conversationID) { conversationID = `${type}${to}` }
					const params = { conversationID, count: 15, nextReqMessageID: this.nextReqMessageID }
					const response = await tim.getMessageList(params);
					console.log('消息列表response：', response)
					this.nextReqMessageID = response.data.nextReqMessageID
					const messages = response.data.messageList
					this.nomoreData = messages.length < 15
					this.msgs = [...messages, ...this.msgs]
				} catch (e) {
					console.log('获取消息列表失败：', e)
				} finally {
					uni.stopPullDownRefresh()
				}
			},
			enableRefersh() {
				const pages = uni.getCurrentPages()
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.setStyle({
					pullToRefresh: { support: this.hasMoreData }
				});
			}
		},
		onNavigationBarButtonTap(button) {
			console.log('点击了: ', button)
			this.mCreateGroup()
		},
		onLoad(options) {
			console.log(options, this.$options.pageQuery)
			this.$options.pageQuery = options
		},
		onReady() {
			console.log('开始接收消息了： ', eventObs)
			eventObs.subscribe(event => {
				console.log('接收到消息event :', event, TIM.EVENT.MESSAGE_RECEIVED)
				if (event.name == TIM.EVENT.MESSAGE_RECEIVED) {
					const text = event.event.data[0].payload.text
					this.msgs.push(text)
					console.log('所有消息', this.msgs)
				}
				console.log('接收到了即时消息事件', event)
			}, error => {
				console.error('接收消息事件出错了', error)
			})
			const thisVue = this
			uni.startPullDownRefresh()
		},
		onPullDownRefresh() {
			this.fetchMessageList()
		}
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
	}

	.list {
		flex: 1;
		padding-bottom: 50px;
	}

	.messageinput {
		width: 750rpx;
		position: fixed;
		bottom: 0px;
	}

	.nomore-data {
		text-align: center;
		color: #BEBEBE;
		font-size: 12px;
	}
</style>
