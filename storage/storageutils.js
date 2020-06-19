const kCurrentUser = 'current-user'
/**
 * 保存当前的用户
 * @param {\{userId: String, userSig: String\}} user - 类型
 */
const saveCurrentUser = (user) => {
	uni.setStorageSync(kCurrentUser, user)
}

const getCurrentUser = () => {
	return uni.getStorageSync(kCurrentUser)
}

const removeCurrentUser = () => {
	uni.removeStorageSync(kCurrentUser)
}

module.exports = {
	saveCurrentUser,
	getCurrentUser,
	removeCurrentUser
}