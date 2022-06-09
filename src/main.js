import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/golable.css'
import 'whatwg-fetch';
import 'es6-promise';
import request from "@/utils/request";

Vue.config.productionTip = false
Vue.use(ElementUI ,{size:"mini"});
Vue.prototype.request=request
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
