import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import FormInline from '@/components/FormInline'
import '@/styles/index.scss' // global css
import HintButton from '@/components/HintButton'
import App from './App'
import store from './store'
import router from './router'


import '@/icons' // icon
import '@/permission' // permission control
// 引入api
import * as API from '@/api'

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
// 注册全局组件
Vue.component("FormInline",FormInline)
Vue.component("HintButton",HintButton)
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

// 把API挂在Vue的原型上
Vue.prototype.$api=API


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
