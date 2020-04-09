<!--
 * @Author: liyh
 * @Date: 2020-04-09 16:59:55
 * @LastEditors: liyh
 * @LastEditTime: 2020-04-09 16:59:55
 -->
<template>
  <div class="loading"></div>
</template>
<script>
export default {
  name: "loading"
};
</script>
<style lang="scss" scoped>
.loading {
  overflow: hidden;
  position: fixed;
  left: 0;
  top: 0;
  background: url("https://goplastic.oss-cn-beijing.aliyuncs.com/goplasticCommon/loading.gif")
    center center no-repeat rgba($color: #000000, $alpha: 0.5);
  background-size: 3%;
  width: 100%;
  height: 100%;
  z-index: 1000;
}
</style>