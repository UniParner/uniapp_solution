import TIM from '../../libs/tim/TIMSDK.js'
import { tim } from '../../libs/tim/TIMManager.js'

const sendTextMsg = (touserid, type, text) => {
	const conversationType = type
	console.log('发送消息：向 '+ touserid + ' 发送了 ' + text)
	let message = tim.createTextMessage({
		to: touserid,
		conversationType,
		payload: {text}
	});
	// 2. 发送消息
	return tim.sendMessage(message);	
}

const createGroup = (groupID) => {
	return tim.createGroup({
		name: "我是大老爷",
		type: TIM.TYPES.GRP_PUBLIC,
		groupID: groupID
	})
}

module.exports = {
	sendTextMsg: sendTextMsg,
	createGroup: createGroup
}