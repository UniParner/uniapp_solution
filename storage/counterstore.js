const counterstore = {
	state: { count: 0 },
	mutations: {
		increment(state) {
			state.count++
			console.log('增加……')
		},
		decrement(state) {
			state.count--
		},
		incrementByNum(state, num) {
			state.count += num
		}
	}
}

module.exports = counterstore
