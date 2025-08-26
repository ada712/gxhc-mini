import App from './App'
import store from './store'
import Vuex from "vuex";
import Cache from './utils/cache'
import util from './utils/util'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
Vue.prototype.$Cache = Cache;
App.mpType = 'app'
console.log(Cache)
const app = new Vue({
  ...App,
	store,
	Cache,
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
	app.use(store)
	app.config.globalProperties.$Cache = Cache;
	app.config.globalProperties.$util = util;
  return {
    app
  }
}
// #endif