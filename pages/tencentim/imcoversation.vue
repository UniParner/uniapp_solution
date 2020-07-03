<template>
	<view class="container">
		<uni-list class="list">
			<text v-if="nomoreData" class="nomore-data">没有更多数据了</text>
			<messagecell v-for="(msg, index) in msgs" :key="msg.ID" :message="msg" ref="msgCells">
				<view style="height: 2rpx; background-color: #FFFF00;"></view>
			</messagecell>
			<view class="lastele" ref="lastEle"></view>
		</uni-list>
		<messageinput class="messageinput" @onSendMessage="sendMsg"></messageinput>
	</view>
</template>

<script>
	import messageinput from './messageinput.vue'
	import { tim } from '../../libs/tim/TIMManager.js'
	import { createGroup } from './imviewmodel.js'
	import TIM from '../../libs/tim/TIMSDK.js'
	import messagecell from './messagecell.vue'
	import underscore from 'underscore';
	export default {
		components: { messageinput, messagecell },
		data() {
			return {
				msgs: [],
				nomoreData: false,
				nextReqMessageID: undefined,
				needScrollToBottom: true,
				// 上一个最顶部的消息
				lastTopMsg: undefined
			}
		},
		pageQuery: {},
		methods: {
			/**
			 * 获取组件的信息
			 */
			getElementInfo(selecor) {
				const thisVue = this
				return new Promise((resolve, reject) => {
					uni.createSelectorQuery().in(thisVue).select(selecor)
						.fields({ rect: true }, res => { resolve(res) })
						.exec()
				})
			},
			/**
			 * 计算需要滚动的距离
			 */
			scrollToBottomValue() {
				return Promise.all([this.getElementInfo('.list'), this.getElementInfo(
						'.lastele')])
					.then(values => {
						console.log('获取到的数据jisusan ：', values)
						const scrollY = values[1].top - values[0].top
						console.log('需要滚动的距离为：', scrollY)
						return scrollY
					})
			},
			async sendMsg(params) {
				const { to, type } = this.$options.pageQuery
				const isBulletMsg = params[0]
				const text = params[1]
				console.log('发送消息给', to, " text: ", text)
				try {
					const message = tim.createTextMessage({
						to,
						conversationType: type,
						payload: { text }
					});
					const result = await tim.sendMessage(message)
					this.msgs.push(message)
					this.needScrollToBottom = true
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
					this.lastTopMsg = underscore.last(this.msgs)
					const messages = response.data.messageList
					this.nomoreData = messages.length < 15
					this.msgs.splice(0, 0, ...messages)
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
			},
			onIMReceiveMessage(event) {
				console.log('接收到消息event :', event, TIM.EVENT.MESSAGE_RECEIVED)
				console.log('解析消息数据', event.data[0])
				this.needScrollToBottom = true
				const message = event.data[0]
				this.msgs.push(message)
			},
			async scrollToBottom() {
				if (!this.needScrollToBottom) { return }
				const bottom = await this.scrollToBottomValue()
				uni.pageScrollTo({ scrollTop: bottom, duration: 200 })
				this.needScrollToBottom = false
			},
		},
		onNavigationBarButtonTap(button) {
			console.log('点击了: ', button)
			// this.mCreateGroup()
		},
		onLoad(options) {
			console.log(options, this.$options.pageQuery)
			this.$options.pageQuery = options
		},
		onReady() {
			tim.on(TIM.EVENT.MESSAGE_RECEIVED, this.onIMReceiveMessage)
			const thisVue = this
			uni.startPullDownRefresh()
		},
		onPullDownRefresh() {
			this.fetchMessageList()
		},
		updated() {
			this.scrollToBottom()
			// if (this.needScrollToBottom) {
			// 	// #ifndef APP-PLUS
			// 	uni.pageScrollTo({ scrollTop: 10000000, duration: 200 })
			// 	this.needScrollToBottom = false
			// 	return
			// 	// #endif
			// 	// TODO: 计算总是出错？？？
			// 	const lastCell = underscore.last(this.$refs.msgCells)
			// 	console.log("页面刷新完毕：", lastCell)
			// 	if (lastCell) {
			// 		const thisVue = this
			// 		uni.createSelectorQuery().in(this).fields({ height: true, bottom: true }, res => {
			// 			console.log('获取到的list信息为：', JSON.stringify(res))
			// 			const { bottom, height } = res
			// 			uni.pageScrollTo({ scrollTop: bottom, duration: 200 })
			// 			thisVue.needScrollToBottom = false
			// 		}).select('.list').exec()
			// 		uni.createSelectorQuery().in(this).fields({ height: true, bottom: true }, res => {
			// 			console.log('获取到的lastcell信息为：', JSON.stringify(res))
			// 			const { bottom, height } = res
			// 			uni.pageScrollTo({ scrollTop: bottom, duration: 200 })
			// 			thisVue.needScrollToBottom = false
			// 		}).select('.lastele').exec()
			// 	}
			// }
		},

		onResize(size) {
			console.log('大小发生了变化: ', size)
		},
		onUnload() {
			console.log('移除IM收发消息事件')
			tim.off(TIM.EVENT.MESSAGE_RECEIVED, this.onIMReceiveMessage)
		}
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		background-color: #0095DD;
	}

	.list {
		display: flex;
		flex: 1;
		padding-bottom: 60px;
		background-color: #FF0000;
	}

	.lastele {
		height: 1px;
	}

	.messageinput {
		display: flex;
		width: 100%;
		position: fixed;
		bottom: 0px;
	}

	.nomore-data {
		text-align: center;
		color: #BEBEBE;
		font-size: 12px;
	}
</style>
