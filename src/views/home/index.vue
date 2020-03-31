<!--
 * @Author: liyh
 * @Date: 2020-03-30 11:04:57
 * @LastEditors: liyh
 * @LastEditTime: 2020-03-31 11:41:17
 -->
<template>
  <div class="home">
    <Search></Search>
    <AdItem></AdItem>
    <AdItem></AdItem>
    <AdItem></AdItem>
    <AdItem></AdItem>
    <AdItem></AdItem>
  </div>
</template>

<script>
import Search from "@/components/Search";
import AdItem from "./components/adItem";
export default {
  name: "Home",
  components: { Search, AdItem }
};
</script>

<style lang="scss" scoped>
</style>
