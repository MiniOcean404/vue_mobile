import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 插件
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

// 插件安装
Vue.use(toast)

FastClick.attach(document.body)

Vue.use(VueLazyload, {
  preLoad: 0.8,
  attempt: 1
})

// 创建全局事件总线
Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
