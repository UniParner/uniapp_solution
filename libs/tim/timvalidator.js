// 以下规则是从TRTC中TRTCParams参数里摘取出来的规则:http://doc.qcloudtrtc.com/group__TRTCCloudDef__android.html#a7ff9e03272f5c8e7b585e8c4eea784e1
// 限制长度为32字节，只允许包含大小写英文字母（a-zA-Z）、数字（0-9）及下划线和连词符。

const isValidateUserId = (userid) => {
	return /^[a-zA-Z0-9_\-]{4,32}$/.test(userid)
}


export default isValidateUserId
