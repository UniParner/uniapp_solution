import {SDKAppID, SECRET} from './SensitiveTestData.js'
const TLSSigAPIv2 = require('tls-sig-api-v2');

// 用户签名鉴权
// IM应用的APPId
// IM应用的secret
// 用户id
// 过期时间
const genUserSig = (userid) => {
	var api = new TLSSigAPIv2.Api(SDKAppID, SECRET);
	var sig = api.genSig(userid, 86400 * 30);
	return sig
}

const genUserSig2 = (appid, secret, expire, userid) => {
	var api = new TLSSigAPIv2.Api(appid, secret);
	var sig = api.genSig(userid, expire);
	return sig
}

module.exports = {genUserSig, genUserSig2}
