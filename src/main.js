import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ajax from "./utils/ajax";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./scss/element-variables.scss";

Vue.use(ElementUI);
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    if (to.matched.some(res => res.meta.isLogin)) {//判断是否需要登录
        if (localStorage['token']) {
            next();
        } else {
            next({
                path: "/login",
            });
        }
    } else {
        next()
    }
});
// ajax 请求
Vue.prototype.ajax = ajax;
new Vue({
    router,
    store,
    data: {
        event: new Vue()
    },
    render: h => h(App)
}).$mount("#app");
