const getProviders = (service) => {
	return new Promise((resolve, reject) => {
		uni.getProvider({
			service,
			success(res) {
				console.log('获取到的分享服务列表：', res)
				resolve(res.provider)
			},
			fail(error) {
				console.log('分享服务获取失败：', error)
				reject(error)
			}
		})
	})
}

const getAuthProvices = () => {
	return getProviders('oauth')
}

const getShareProviders = () => {
	return getProviders('share')
}

const getPayProviders = () => {
	return getProviders('payment')
}

const getPushProviders = () => {
	return getProviders('push')
}

module.exports = {
	getAuthProvices,
	getShareProviders,
	getPayProviders,
	getPushProviders
}
