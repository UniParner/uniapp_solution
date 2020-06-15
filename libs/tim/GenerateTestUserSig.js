const TLSSigAPIv2 = require('tls-sig-api-v2');

// 用户签名鉴权
// IM应用的APPId
// IM应用的secret
// 用户id
// 过期时间
const genUserSig = (appid, secret, userid, expire) => {
	var api = new TLSSigAPIv2.Api(userid, secret);
	var sig = api.genSig(userid, expire);
	return sig
}

export default genUserSig