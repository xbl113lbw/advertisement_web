import Vue from "vue";
import Vuex from "vuex";
// vuex 持久化插件（原理：将数据保存在session中一份）
import persistedState from "vuex-persistedstate"
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [persistedState({ storage: window.localStorage })],
  state: {
    navIndex: 0,
    navoffsetTop: {},//每个大类对应的top值
    homeLoadSuccess: false,//首页DOM加载完成
    userInfo: {},//用户信息
  },
  mutations: {
    //设置每个大类对应的top值
    setNavoffsetTop(state, data) {
      state.navoffsetTop = { ...state.navoffsetTop, ...data }
    },
    //判断首页是否加载完成
    setHomeLoadStatus(state, data) {
      state.homeLoadSuccess = data;
    },
    //更改顶部navIndex
    changeNavIndex(state, data) {
      state.navIndex = data;
    },
    //设置用户信息
    setUserInfo(state, data) {
      state.userInfo = data;
    }
  },
  actions: {},
  modules: {}
});
