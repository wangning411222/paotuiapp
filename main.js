import Vue from 'vue'
import App from './App'
import store from './store'

Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'

// 注册全局组件
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

const app = new Vue({
    store,
	...App
})
app.$mount()
