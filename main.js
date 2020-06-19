import Vue from 'vue'
import 'es6-promise/auto'
import Vuex from 'vuex'
import vuerequest from './storage/request.js'

import App from './App'
import appstore from './storage/appstore.js'

Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store(appstore)

App.mpType = 'app'

Vue.mixin({ methods: { vuerequest } })

const app = new Vue({
	...App,
	store
})

app.$mount()
