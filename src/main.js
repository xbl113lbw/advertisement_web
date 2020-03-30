import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ajax from "./utils/ajax";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './scss/element-variables';
import common from './utils/commom';


Vue.use(ElementUI);
Vue.config.productionTip = false;
// ajax 请求
Vue.prototype.ajax = ajax;

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    common.setViewTitle(to.meta.title);
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
