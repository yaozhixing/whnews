
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from './store'
import {router,RouterMount} from './router.js'  //路径换成自己的
Vue.use(router)

Vue.config.productionTip = false
Vue.prototype.store = store

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
// app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
	RouterMount(app,router,'#app')
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif