<!--
 * @Author: liyh
 * @Date: 2020-03-30 11:04:57
 * @LastEditors: liyh
 * @LastEditTime: 2020-04-02 10:55:19
 -->
<template>
  <div class="home">
    <Search></Search>
    <div v-for="(item,index) in [1,2,3,4]" :key="index" :id="index" class="navItemBox">
      <AdItem :idx="index"></AdItem>
    </div>
    <div class="loading" v-show="loading" v-loading="loading"></div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import Search from "@/components/Search";
import AdItem from "./components/adItem";
export default {
  name: "Home",
  data() {
    return {
      loading: true
    };
  },
  components: { Search, AdItem },
  computed: {
    ...mapState({
      navoffsetTop: state => state.navoffsetTop //获取navIndex
    })
  },
  mounted() {
    let el = [].slice.call(document.getElementsByClassName("navItemBox"));
    let obj = {};
    for (let index = 0; index < el.length; index++) {
      obj[index] = el[index].getBoundingClientRect().top;
    }
    console.log("obj", obj);
    this.setNavoffsetTop(obj);
    this.setHomeLoadStatus(true);
    this.loading = false;
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
