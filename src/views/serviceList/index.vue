<!--
 * @Author: liyh
 * @Date: 2020-03-31 13:55:18
 * @LastEditors: liyh
 * @LastEditTime: 2020-03-31 16:16:19
 -->
<template>
  <div class="Wrapper">
    <Search></Search>
    <div v-for="(item,index) in [1,2,3,4]" :key="index" class="itemBox">
      <ListItem></ListItem>
    </div>
    <div id="pagination">
      <el-pagination
        background
        @current-change="handlePageChange"
        layout="prev, pager, next"
        :total="100"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import Search from "@/components/Search";
import ListItem from "./components/listItem";

export default {
  name: "ServiceList",
  data() {
    return {};
  },
  methods: {
    handlePageChange(page) {
      console.log("page", page);
    }
  },
  components: { Search, ListItem }
};
</script>

<style lang="scss">
#pagination {
  margin-top: 95px;
  padding-bottom: 177px;
  .number {
    width: 40px;
    height: 40px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    line-height: 40px;
    font-family: PingFangSC-Regular, PingFang SC;
    background: #ffffff;
  }
  .active {
    background-color: #1dbc76;
    color: #ffffff;
  }
  .btn-quickprev,
  .btn-quicknext,
  .btn-next,
  .btn-prev {
    background: white;
    width: 40px;
    height: 40px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    line-height: 40px;
    font-family: PingFangSC-Regular, PingFang SC;
  }

  .btn-next:hover:not(:disabled),
  .btn-prev:hover:not(:disabled) {
    color: #1dbc76;
  }
  .btn-next:active:not(:disabled),
  .btn-prev:active:not(:disabled) {
    background: #1dbc76;
    color: white;
  }
}
.Wrapper {
  width: 1200px;
  margin: 0 auto;
  .itemBox {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .itemBox:last-child {
    border-bottom: none;
  }
}
</style>
