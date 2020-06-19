import { isAppInstalled } from './authutils.js'
import { notInstalledError, providerNotExists } from './error.js'
import { getShareProviders } from './providerutils.js'

// 分享到第三方平台开发文档：
// plus: https://www.html5plus.org/doc/zh_cn/share.html
// uni: https://uniapp.dcloud.io/api/plugins/share?id=share

// 参数中不需要传入成功和失败回调，在方法内部实现
const share = (params) => {
	const { provider } = params
	if (!isAppInstalled(provider)) {
		return Promise.reject(notInstalledError(provider))
	}
	return getShareProviders().then(providers => {
		if (!providers.contains(provider)) {
			return Promise.reject(providerNotExists(provider))
		}
		return new Promise((resolve, reject) => {
			uni.share({
				...params,
				success() { resolve(true) },
				fail(error) { resolve(error) }
			})
		})
	})
}

// 分享到微信，只需要填写业务参数，已经填写的参数有provider，success，fail
const shareToWechat = (params) => {
	return share({ ...params, provider: 'weixin' })
}

// 分享到微博，只需要填写业务参数
const shareToSina = (params) => {
	return share({ ...params, provider: 'sinaweibo' })
}

module.exports = {
	shareToWechat,
	shareToSina
}
