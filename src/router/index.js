import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/index.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            // 页面标题title
            title: '首页'
        }
    },
    {
        path: "/about",
        name: "About",
        component: () => import("../views/about/index.vue")
    },
    //登录
    {
        path: "/login",
        name: "Login",
        component: () => import("../views/login/index.vue"),
        meta: {
            // 页面标题title
            title: '登录'
        }
    },
    // 发布信息
    {
        path: "/publish",
        name: "publish",
        component: () => import("../views/publish/publish.vue")
    },
    // 服务详情
    {
        path: "/serviceInfo",
        name: "serviceInfo",
        component: () => import("../views/serviceInfo/serviceInfo.vue")
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
