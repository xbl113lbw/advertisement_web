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
      title: '首页'
    }
  },
  //登录
  {
    path: "/login",
    name: "Login",
    component: () =>
      import("../views/login/index.vue"),
    meta: {
      isLogin: false
    }
  },
  //隐私政策
  {
    path: "/privacyPolicy",
    name: "privacyPolicy",
    component: () =>
      import("../views/privacyPolicy/index.vue"),
    meta: {
      isLogin: false
    }
  },
  //用户协议
  {
    path: "/userAgreement",
    name: "userAgreement",
    component: () =>
      import("../views/userAgreement/index.vue"),
    meta: {
      isLogin: false
    }
  },
  //服务列表
  {
    path: "/serviceList",
    name: "serviceList",
    component: () =>
      import("../views/serviceList/index.vue"),
    meta: {
      isLogin: false
    }
  },
  // 发布信息
  {
    path: "/publish",
    name: "publish",
    component: () => import("../views/publish/publish.vue"),
    meta: {
      isLogin: true
    }
  },
  // 服务详情
  {
    path: "/serviceInfo",
    name: "serviceInfo",
    component: () => import("../views/serviceInfo/serviceInfo.vue"),
    meta: {
      isLogin: false
    }
  },
  // 个人中心
  {
    path: "/userCenter",
    name: "userCenter",
    component: () => import("../views/userCenter/index.vue"),
    meta: {
      isLogin: true
    }
  },
  // 管理中心
  {
    path: "/manageCenter",
    name: "manageCenter",
    component: () => import("../views/manageCenter/index.vue"),
    meta: {
      isLogin: true
    }
  },
  // 搜索结果
  {
    path: "/searchResult",
    name: "searchResult",
    component: () => import("../views/searchResult/index.vue"),
    meta: {
      isLogin: false
    }
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

export default router;