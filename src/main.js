
import Vue from 'vue'
import {Button} from 'mint-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import './mock/mockServer'
import split from './components/Split/split.vue'
Vue.component(Button.name, Button)
// 注册为全局组件标签
Vue.component('Split', split)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render:h=>h(App),
  router,
  store
})

