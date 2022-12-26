// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
Vue.config.productionTip = false
Vue.prototype.$devhttp = "http://localhost:5000/";
Vue.prototype.$prodhttp = "http://124.221.31.26:5000/";
Vue.prototype.$srchttp1 = "http://103.229.126.165:3000/"
Vue.prototype.$srchttp2 = "http://124.221.31.26:5000/static/img/"
Vue.prototype.$srchttp3 = "http://localhost:5000/"
Vue.prototype.$thumbhttp = Vue.prototype.$prodhttp
Vue.prototype.$srchttp = Vue.prototype.$srchttp2
// 修改这里来改变prod环境
Vue.prototype.$baseurl = Vue.prototype.$devhttp
axios.defaults.baseURL = Vue.prototype.$baseurl
Vue.prototype.$http = axios;
Vue.use(ElementUI);
axios.defaults.withCredentials = true
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
