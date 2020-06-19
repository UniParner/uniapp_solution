import host from '../config/host.js'

const reponseResolver = (response, resolve, reject) => {
	if (response.data && response.data.code == 0) {
		console.log('处理成功结果')
		resolve(response.data.data)
	} else {
		console.log('处理失败结果')
		reject(response.data)
	}
}

/**
 * 网络请求，默认为POST请求
 * @see {@link file://./storageutils.js}
 * @param {Object} config -  参考[uni.request的参数]{@link https://uniapp.dcloud.io/api/request/request?id=request}里面的url属性从
 * @param {String|undefined} otherhost -  默认使用的
 */
const request = (config, otherhost = undefined, reponsePlugin = reponseResolver) => {
	return new Promise((resolve, reject) => {
		const method = config.method ? config.method : 'POST'
		const finalHost = otherhost ? otherhost : host
		const { url } = config
		const requestParams = { ...config, url: `${finalHost}${url}`, method }
		const success = (response) => {
			console.log(`请求参数`, requestParams, '请求结果：', response)
			if (reponsePlugin) {
				reponsePlugin(response, resolve, reject)
				return
			}
			resolve(response)
		}
		const fail = (error) => {
			console.log(`请求参数`, ...requestParams, '请求失败：', error)
			reject(error)
		}
		const finalConfig = { ...requestParams, success, fail }
		uni.request(finalConfig)
	})
}

module.exports = request
