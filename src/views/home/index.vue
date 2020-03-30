<!--
 * @Author: liyh
 * @Date: 2020-03-30 11:04:57
 * @LastEditors: liyh
 * @LastEditTime: 2020-03-30 11:06:30
 -->
<template>
  <div class="home">
    <img alt="Vue logo" src="./../../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>
