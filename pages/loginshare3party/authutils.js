// 文档参考地址：
// 微信登录开发文档：https://developers.weixin.qq.com/doc/oplatform/Mobile_App/WeChat_Login/Development_Guide.html
// HTML5+ 授权操作：https://www.html5plus.org/doc/zh_cn/oauth.html#plus.oauth.AuthService.authorize
// 第三方App信息：https://blog.csdn.net/xiaocaoyu111/article/details/103036666
const otherAppInfos = {
	"weixin": {
		pname: "com.tencent.mm",
		action: "weixin://"
	},
	"qq": {
		pname: "com.tencent.mobileqq",
		action: "mqq://"
	},
	"sinaweibo": {
		pname: "com.sina.weibo",
		action: "sinaweibo://"
	},
	"alipay": {
		pname: "com.eg.android.AlipayGphone",
		action: "alipay://"
	}
}
const isAppInstalled = function(appname) {
	const appInfo = otherAppInfos[appname]
	return plus.runtime.isApplicationExist(appInfo)
}

const fetchServices = function() {
	return new Promise((resolve, reject) => {
		plus.oauth.getServices(services => {
			const authServices = {}
			for (let service of services) {
				authServices[service.id] = service
			}
			resolve(authServices)
		}, error => {
			reject(error)
		})
	})
}

const authorize = function(service, options) {
	return new Promise((resolve, reject) => {
		service.authorize(event => {
			console.log('授权信息: ', event)
			resolve(event)
		}, error => {
			console.error('授权失败：', error)
			reject(error)
		}, options)
	})
}

const login = function(service) {
	if (service.authResult) {
		return Promise.resolve(service.authResult)
	}
	return new Promise((resolve, reject) => {
		service.login(result => {
			resolve(result)
		}, error => {
			reject(error)
		})
	})
}

const logout = function(service) {
	return new Promise((resolve, reject) => {
		service.logout(event => {
			resolve(event)
		}, error => {
			resolve(error)
		})
	})
}

// const options = {scope:'snsapi_userinfo',state:'authorize test',appid}
/// 微信登录操作,这里只是做了授权操作,登录需要获取AppSecrect有安全风险,所以需要后台登录;
// 手机未安装
const wechatLogin = (options) => {
	if (!isAppInstalled('weixin')) {
		return Promise.reject({ code: -1002, msg: '该设备未安装微信'})
	}
	return fetchServices().then(authServices => {
		const wechatService = authServices['weixin']
		if (!wechatService) {
			throw { code: -1002, msg: '该设备未安装微信' }
		}
		return wechatService
	}).then(wechatService => {
		return authorize(wechatService, options)
	})
}

const isAppleLoginAvaliable = () => {
	const { platform, system } = uni.getSystemInfoSync()
	if (platform != uni.OS.ios) {
		return false
	}
	return system >= '13'
}

const uniLogin = (provider) => {
	return new Promise((resolve, reject) => {
		uni.login({
			provider: provider,
			success: loginReult => {
				resolve(loginReult)
			},
			fail: error => {
				reject(error)
			},
			complete: () => {}
		})
	})
}

const AuthTools = {
	isAppInstalled,
	fetchServices,
	authorize,
	login,
	logout,
	wechatLogin,
	uniLogin
}

module.exports = AuthTools
