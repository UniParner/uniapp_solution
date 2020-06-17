const kCurrentUser = 'current-user'
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