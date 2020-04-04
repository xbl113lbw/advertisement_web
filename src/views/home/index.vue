<!--
 * @Author: liyh
 * @Date: 2020-03-30 11:04:57
 * @LastEditors: liyh
 * @LastEditTime: 2020-04-04 18:11:05
 -->
<template>
  <div class="home">
    <Search></Search>
    <div v-for="(item,index) in typeData" :key="index" class="homenavItemBox">
      <AdItem :typeData="item"></AdItem>
    </div>
    <div class="loading" v-show="loading" v-loading="loading"></div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import Search from "@/components/Search";
import AdItem from "./components/adItem";
import typeData from "@/data/typeData";
export default {
  name: "Home",
  data() {
    return {
      loading: true,
      typeData: []
    };
  },
  components: { Search, AdItem },
  computed: {
    ...mapState({
      navoffsetTop: state => state.navoffsetTop //获取navIndex
    })
  },
  mounted() {
    this.typeData = typeData;
    this.$nextTick(() => {
      let el = [].slice.call(document.getElementsByClassName("homenavItemBox"));
      let obj = {};
      for (let index = 0; index < el.length; index++) {
        obj[index] = el[index].getBoundingClientRect().top;
      }
      this.setNavoffsetTop(obj); //拿到值之后存到vuex
      this.setHomeLoadStatus(true); //首页DOM加载完成标志，存到vuex
      this.loading = false;
    });
  },
  destroyed() {
    this.setHomeLoadStatus(false);
  },
  methods: {
    ...mapMutations({
      setNavoffsetTop: "setNavoffsetTop", // 将 `this.setNavoffsetTop()` 映射为 `this.$store.commit('setNavoffsetTop')`
      setHomeLoadStatus: "setHomeLoadStatus"
    })
  }
};
</script>

<style lang="scss" scoped>
.home {
  padding-bottom: 177px;
  .loading {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
