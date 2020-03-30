<!--
 * @Author: liyh
 * @Date: 2020-03-30 14:02:41
 * @LastEditors: liyh
 * @LastEditTime: 2020-03-30 14:10:41
 -->
<template>
  <div class="Wrapper">
    <div class="bg"></div>
    <div>登录</div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Login",
  components: {
    // HelloWorld
  }
};
</script>

<style lang="scss" scoped>
.Wrapper {
  .bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("./../../assets/login/bg@2x.png") no-repeat;
    background-size: 100% 100%;
  }
}
</style>
