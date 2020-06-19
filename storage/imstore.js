const imstore = {
	state: { isIMReady: false, currentUser: {} },
	mutations: {
		updateIMReadyState(state, ready) {
			console.log('更新IM状态: ', ready)
			state.isIMReady = ready
		},
		updateCurrentUser(state, currentUser) {
			state.currentUser = { ...currentUser }
		}
	}
}

module.exports = imstore
