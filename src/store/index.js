import Vue from "vue";
import Vuex from "vuex";
// vuex 持久化插件（原理：将数据保存在session中一份）
import persistedState from "vuex-persistedstate"
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [persistedState({ storage: window.sessionStorage })],
  state: {
    navoffsetTop: {},//每个大类对应的top值
    homeLoadSuccess: false,//首页DOM加载完成
  },
  mutations: {
    setNavoffsetTop(state, data) {
      state.navoffsetTop = { ...state.navoffsetTop, ...data }
    },
    setHomeLoadStatus(state, data) {
      console.log('data', data);
      state.homeLoadSuccess = data;
    }
  },
  actions: {},
  modules: {}
});
