import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/index.vue";
// import userCenter from "..views/userCenter/index.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      // 页面标题title
      title: "首页"
    }
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/about/index.vue")
  },
  //登录
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/index.vue"),
    meta: {
      // 页面标题title
      title: "登录"
    }
  },
  // 个人中心
  {
    path: "/userCenter",
    name: "userCenter",
    component: () => import("../views/userCenter/index.vue"),
    meta: {
      title: "个人中心"
    }
  },
  // 管理中心
  {
    path: "/manageCenter",
    name: "manageCenter",
    component: () => import("../views/manageCenter/index.vue"),
    meta: {
      title: "管理中心"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
