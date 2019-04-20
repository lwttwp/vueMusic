import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import router from './router/index.js'
import store from './store'
import 'popper.js/dist/popper'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import VueLazyLoad from 'vue-lazyload'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

fastclick.attach(document.body) // 解决移动端点击300ms延迟问题
Vue.config.productionTip = false // 阻止启动生产消息
Vue.use(VueLazyLoad, {
  loading: require('./common/image/logo.png')
})
Vue.use(MintUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
