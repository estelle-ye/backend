import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

// 组件引入
import CategorySelect from '@/components/CategorySelect'
// 注册全局组件
Vue.component(CategorySelect.name, CategorySelect)

// 引入相关API请求接口
import API from '@/api'
// 组件实例的原型的原型指向的是Vue.prototype
// 任意组件可以使用API相关的接口，用this.$API调用
Vue.prototype.$API = API

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
