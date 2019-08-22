import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import router from './permission'
import ElementUI from 'element-ui' // 引入element组件
import Component from './components'
// import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less'
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
import axios from './utils/axios.config' // 引文重置的基础样式
// Vue.use(axios)
Vue.use(ElementUI) // 注册element组件
Vue.use(Component) // 注册全局的自定义组件
Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
