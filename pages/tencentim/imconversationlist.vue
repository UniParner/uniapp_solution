<template>
	<view>
		<!-- #ifdef APP-NVUE -->
		<text>总共有{{conversationList.length}}条数据</text>
		<!-- #endif -->
		<uni-list style="flex: 1; display: flex;">
			<!-- <text>{{isIMSDKReady ? 'Ready': 'Not ready'}}</text> -->
			<!-- #ifdef APP-NVUE -->
			<cell v-for="conversation in conversationList" :key="conversation.conversationID" @click="navToConversation(conversation)">
				<conversationcell :conversation="conversation">
				</conversationcell>
			</cell>
			<!-- #endif -->
			<!-- #ifndef APP-NVUE -->
			<view v-for="conversation in conversationList" :key="conversation.conversationID" @click="navToConversation(conversation)">
				<conversationcell :conversation="conversation">
				</conversationcell>
			</view>
			<!-- #endif -->
		</uni-list>

		<uni-popup ref="popup" type="dialog">
			<!-- <uni-popup-message type="success" message="成功消息" :duration="2000"></uni-popup-message> -->
			<uni-popup-dialog type="input" mode="input" message="成功消息" :duration="2000" :before-close="true" @close="closePopup"
			 @confirm="closePopup" placeholder="请输入userid" title="创建会话">
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import TIM from '../../libs/tim/TIMSDK.js'
	import { tim } from '../../libs/tim/TIMManager.js'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import conversationcell from './conversationcell.vue'

	export default {
		components: { uniPopup, uniPopupMessage, uniPopupDialog, conversationcell },
		data() {
			return { conversationList: [] }
		},

		methods: {
			async fetchConversationList() {
				try {
					const response = await tim.getConversationList();
					console.log('获取到的会话列表：', response)
					this.conversationList = response.data.conversationList
					console.log('获取到的会话列表为：', this.conversationList)
				} catch (e) {
					console.log('会话列表获取失败：', e)
				}
			},
			navToConversation(conversation) {
				console.log('跳转到对话：', conversation)
				const { conversationID, type } = conversation
				let to = ""
				if (type == TIM.TYPES.CONV_GROUP) {
					to = conversation.groupProfile.groupID
				} else if (type == TIM.TYPES.CONV_C2C) {
					to = conversation.userProfile.userID
				}
				console.log(`向${to}发送消息`)
				uni.navigateTo({
					url: './imcoversation?' + `conversationID=${conversationID}&type=${type}&to=${to}`
				})
			},
			openPopup() {
				this.$refs.popup.open()
			},
			async closePopup(_, userID) {
				console.log(`关闭弹窗： ${userID}`)
				this.$refs.popup.close()
				if (userID && userID.trim()) {
					uni.navigateTo({
						url: './imcoversation?' + `type=${TIM.TYPES.CONV_C2C}&to=${userID}`
					})
				}
			},
			onIMConversarionListUpdated(event) {
				console.log('会话列表发生了变化：', event)
				this.conversationList = event.data
			}
		},
		computed: {
			isIMSDKReady() {
				console.log('imsdk的状态发生了变化：', this.$store.state.isIMReady)
				return this.$store.state.isIMReady
			}
		},
		watch: {
			isIMSDKReady(isReady) {
				if (isReady) {
					if (this.conversationList.length > 0) {
						return
					}
					this.fetchConversationList()
				}
			}
		},
		onReady() {
			const thisVue = this
			console.warn('imsdk是否已经可用了：', this.isIMSDKReady)
			if (this.isIMSDKReady) {
				this.fetchConversationList()
			}
			tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, this.onIMConversarionListUpdated)
		},
		onNavigationBarButtonTap() {
			this.openPopup()

		},
		onUnload() {
			tim.off(TIM.EVENT.CONVERSATION_LIST_UPDATED, this.onIMConversarionListUpdated)
		}
	}
</script>

<style>
	.cell {}
</style>
