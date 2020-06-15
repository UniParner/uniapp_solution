import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.host = "https://test.xdpaction.com"

App.mpType = 'app'


const app = new Vue({
  ...App,
})
app.$mount()
