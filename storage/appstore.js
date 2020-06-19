import imstore from './imstore.js'
import counterstore from './counterstore.js'

const store = {
	state: { ...imstore.state, ...counterstore.state },
	mutations: {
		...imstore.mutations,
		...counterstore.mutations
	}
}
module.exports = store
