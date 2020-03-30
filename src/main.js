import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ajax from "./utils/ajax";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);
Vue.config.productionTip = false;
// ajax 请求
Vue.prototype.ajax = ajax;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
