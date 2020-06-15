import TIM from 'tim-wx-sdk'
import COS from "cos-wx-sdk-v5";
import * as rxjs from 'rxjs';
import genUserSig from './GenerateTestUserSig.js'

// 初始化TIMSDK
const options = {
	SDKAppID
}

const tim = TIM.create(options)

tim.registerPlugin({
	'cos-wx-sdk': COS
});

// 设置日志级别
// 0 普通级别，日志量较多，接入时建议使用
// 1 release级别，SDK 输出关键信息，生产环境时建议使用
// 2 告警级别，SDK 只输出告警和错误级别的日志
// 3 错误级别，SDK 只输出错误级别的日志
// 4 无日志级别，SDK 将不打印任何日志
const imLoglevel = function(level) {
	tim.setLogLevel(level)
}

// 使用rxjs监听即时消息事件https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/module-EVENT.html
const eventObs = new rxjs.BehaviorSubject({
	eventType: TIM.EVENT.SDK_NOT_READY,
	event: undefined
});

const timEventHandle = (event, ) => {
	
}

// 监听事件，例如：
tim.on(TIM.EVENT.SDK_READY, function(event) {
	eventObs.next({
		eventType: TIM.EVENT.SDK_READY,
		event
	})
});

tim.on(TIM.EVENT.MESSAGE_RECEIVED, function(event) {
	// 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
	// event.name - TIM.EVENT.MESSAGE_RECEIVED
	// event.data - 存储 Message 对象的数组 - [Message]
	eventObs.next({
		eventType: TIM.EVENT.MESSAGE_RECEIVED,
		event
	})
});

tim.on(TIM.EVENT.MESSAGE_REVOKED, function(event) {
	// 收到消息被撤回的通知
	// event.name - TIM.EVENT.MESSAGE_REVOKED
	// event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isRevoked 属性值为 true
	eventObs.next({
		eventType: TIM.EVENT.MESSAGE_REVOKED,
		event
	})
});

tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, function(event) {
	// 收到会话列表更新通知，可通过遍历 event.data 获取会话列表数据并渲染到页面
	// event.name - TIM.EVENT.CONVERSATION_LIST_UPDATED
	// event.data - 存储 Conversation 对象的数组 - [Conversation]
	eventObs.next({
		eventType: TIM.EVENT.CONVERSATION_LIST_UPDATED,
		event
	})
});

tim.on(TIM.EVENT.GROUP_LIST_UPDATED, function(event) {
	// 收到群组列表更新通知，可通过遍历 event.data 获取群组列表数据并渲染到页面
	// event.name - TIM.EVENT.GROUP_LIST_UPDATED
	// event.data - 存储 Group 对象的数组 - [Group]
	eventObs.next({
		eventType: TIM.EVENT.GROUP_LIST_UPDATED,
		event
	})
});

tim.on(TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED, function(event) {
	// 收到新的群系统通知
	// event.name - TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED
	// event.data.type - 群系统通知的类型，详情请参见 GroupSystemNoticePayload 的 operationType 枚举值说明
	// event.data.message - Message 对象，可将 event.data.message.content 渲染到到页面
	eventObs.next({
		eventType: TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED,
		event
	})
});

tim.on(TIM.EVENT.PROFILE_UPDATED, function(event) {
	// 收到自己或好友的资料变更通知
	// event.name - TIM.EVENT.PROFILE_UPDATED
	// event.data - 存储 Profile 对象的数组 - [Profile]
	eventObs.next({
		eventType: TIM.EVENT.PROFILE_UPDATED,
		event
	})
});

tim.on(TIM.EVENT.BLACKLIST_UPDATED, function(event) {
	// 收到黑名单列表更新通知
	// event.name - TIM.EVENT.BLACKLIST_UPDATED
	// event.data - 存储 userID 的数组 - [userID]
	eventObs.next({
		eventType: TIM.EVENT.BLACKLIST_UPDATED,
		event
	})
});

tim.on(TIM.EVENT.ERROR, function(event) {
	// 收到 SDK 发生错误通知，可以获取错误码和错误信息
	// event.name - TIM.EVENT.ERROR
	// event.data.code - 错误码
	// event.data.message - 错误信息
	eventObs.next({
		eventType: TIM.EVENT.ERROR,
		event
	})
});

tim.on(TIM.EVENT.SDK_NOT_READY, function(event) {
	// 收到 SDK 进入 not ready 状态通知，此时 SDK 无法正常工作
	// event.name - TIM.EVENT.SDK_NOT_READY
	eventObs.next({
		eventType: TIM.EVENT.SDK_NOT_READY,
		event
	})
});

tim.on(TIM.EVENT.KICKED_OUT, function(event) {
	// 收到被踢下线通知
	// event.name - TIM.EVENT.KICKED_OUT
	// event.data.type - 被踢下线的原因，例如:
	//    - TIM.TYPES.KICKED_OUT_MULT_ACCOUNT 多实例登录被踢
	//    - TIM.TYPES.KICKED_OUT_MULT_DEVICE 多终端登录被踢
	//    - TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED 签名过期被踢 （v2.4.0起支持）。 
	eventObs.next({
		eventType: TIM.EVENT.KICKED_OUT,
		event
	})
});

tim.on(TIM.EVENT.NET_STATE_CHANGE, function(event) {
	//  网络状态发生改变（v2.5.0 起支持）。 
	// event.name - TIM.EVENT.NET_STATE_CHANGE 
	// event.data.state 当前网络状态，枚举值及说明如下： 
	//     \- TIM.TYPES.NET_STATE_CONNECTED - 已接入网络 
	//     \- TIM.TYPES.NET_STATE_CONNECTING - 连接中。很可能遇到网络抖动，SDK 在重试。接入侧可根据此状态提示“当前网络不稳定”或“连接中” 
	//    \- TIM.TYPES.NET_STATE_DISCONNECTED - 未接入网络。接入侧可根据此状态提示“当前网络不可用”。SDK 仍会继续重试，若用户网络恢复，SDK 会自动同步消息  
	eventObs.next({
		eventType: TIM.EVENT.NET_STATE_CHANGE,
		event
	})
});

const login = function(userID, userSig) {
	return tim.login(userID, userSig)
}



export default TIMManager = {
	tim,
	eventObs,
	imLoglevel,
	login,
	genUserSig
}
