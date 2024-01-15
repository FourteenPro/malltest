import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()   // 创建事件总线， 管理公共的事件

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
