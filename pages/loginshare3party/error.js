
const notInstalledError = (platform) => {
	return { code: -1002, msg: `该设备未安装${platform}` }
}

const providerNotExists = (platform) => {
	return { code: -10000, msg: `未找到${platform}服务供应商` }
}

module.exports = {
	notInstalledError,
	providerNotExists
}