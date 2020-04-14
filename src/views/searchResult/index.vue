<!--
 * @Author: liyh
 * @Date: 2020-03-31 13:55:18
 * @LastEditors: liyh
 * @LastEditTime: 2020-04-14 14:09:16
 -->
<template>
  <div class="Wrapper">
    <Search></Search>
    <div v-if="!(serviceList.length>0)" class="noResultBox">
      <div class="image">
        <img src="@/assets/serviceList/caution.png" alt />
      </div>
      <div class="tipsBox">
        <div>
          很抱歉，在“深圳”没有找到与
          <span>“{{this.searchWord}}”</span>
          相关的信息
        </div>
        <div>建议您：去掉不必要的字句，扩大搜索范围，如“的”、“什么”等。</div>
        <div class="hotBox">
          <span>热搜词:</span>
          <span @click="toSearchResult('LED显示屏')">LED显示屏</span>
          <span @click="toSearchResult('灯箱/招牌')">灯箱/招牌</span>
          <span @click="toSearchResult('户外广告')">户外广告</span>
          <span @click="toSearchResult('背景/形象墙')">背景/形象墙</span>
          <span @click="toSearchResult('多媒体互动')">多媒体互动</span>
        </div>
      </div>
    </div>
    <div v-if="serviceList.length>0">
      <!-- 搜索进来的不会出现面包屑 -->
      <div class="breadcrumbBox">
        <div class="searchResult">
          <!-- <div class="search_arrow">></div> -->
          <div>
            找到
            <span class="highLight">“{{this.searchWord}}”</span>
            相关信息共
            <span class="highLight">{{serviceList.length}}</span>
            条
          </div>
        </div>
      </div>
      <div>
        <div v-for="(item,index) in pageList" :key="index" class="itemBox">
          <div @click="toServiceInfo(item)">
            <ListItem :itemData="item"></ListItem>
          </div>
        </div>
      </div>
      <div id="pagination">
        <el-pagination
          background
          @current-change="handlePageChange"
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="this.serviceList.length"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "@/components/Search";
import ListItem from "./components/listItem";
import itemData from "@/data/itemData";
import typeData from "@/data/typeData";

export default {
  name: "SearchResult",
  inject: ["reload"],
  data() {
    return {
      searchWord: "", //搜索的关键字
      serviceList: [], //搜索的总数据
      pageList: [], //每页的总数据
      pageSize: 8, //每页渲染多少条数据
      currentPage: 0, //当前页数
      itemData: {}
    };
  },
  created() {
    this.searchWord = decodeURIComponent(this.$route.query.searchWord);
    for (const key in itemData) {
      const element = itemData[key];
      if (element.title.indexOf(this.searchWord) > -1) {
        this.serviceList.push(element);
      }
    }
    console.log("this.serviceList", this.serviceList);

    if (this.serviceList.length > 0) {
      this.pageList = this.serviceList.slice(
        this.currentPage * this.pageSize,
        this.currentPage * this.pageSize + this.pageSize
      );
    }
  },
  methods: {
    /**
     * @description: 点击跳去详情页
     */
    toServiceInfo(item) {
      //将点击记录存进session
      let temp = {};
      let visitedObj = JSON.parse(sessionStorage.getItem("visitedObj"));
      temp = visitedObj
        ? { ...visitedObj, [item.id]: item.id }
        : { [item.id]: item.id };
      sessionStorage.setItem("visitedObj", JSON.stringify(temp));
      //根据当前元素id，寻找上一层id以及上上一层id
      let outerId = 0; //记录第一层循环的id
      let innerId = 0; //记录第二层循环的id
      let outerLength = typeData.length;
      /*第一层循环*/
      outer: for (let outerIndex = 0; outerIndex < outerLength; outerIndex++) {
        const outerElement = typeData[outerIndex];
        //记录第一层循环的id
        outerId = outerElement.id;
        let innerLength = outerElement.children.length;
        /*第二层循环*/
        for (let innerIndex = 0; innerIndex < innerLength; innerIndex++) {
          const innerElement = outerElement.children[innerIndex];
          //记录第二层循环的id
          innerId = innerElement.id;
          if (innerElement.child.includes(item.id)) {
            //找到了，直接跳出两层循环
            break outer;
          }
        }
      }
      this.$router.push({
        path: "/serviceInfo",
        query: {
          bigType: outerId,
          smallType: innerId,
          id: item.id
        }
      });
    },
    /**
     * @description: 页数发生改变
     */
    handlePageChange(page) {
      this.currentPage = page - 1;
      this.pageList = this.serviceList.slice(
        this.currentPage * this.pageSize,
        this.currentPage * this.pageSize + 1
      );
    },
    toSearchResult(item) {
      if (item === decodeURIComponent(this.$route.query.searchWord)) return; //如果重复搜索(即搜索关键字跟当前关键字一样，则url不做任务操作)
      this.$router.replace({
        path: "/searchResult",
        query: {
          searchWord: encodeURIComponent(item)
        }
      });
      this.reload();
    }
  },
  components: { Search, ListItem }
};
</script>

<style lang="scss">
#pagination {
  margin-top: 95px;
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
  padding-bottom: 177px;
  .breadcrumbBox {
    display: flex;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.4);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    margin-top: 80px;
    .breadcrumbItem {
      display: flex;
      .arrow_right {
        margin: 0 6px;
      }
    }
    .breadcrumbItem:hover span {
      text-decoration: underline;
    }
  }
  .searchResult {
    display: flex;
    .search_arrow {
      margin: 0 6px;
    }
    .highLight {
      color: #f66f42;
    }
  }
  .itemBox {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .itemBox:last-child {
    border-bottom: none;
  }
  .noResultBox {
    display: flex;
    align-items: center;
    padding-left: 80px;
    padding-top: 100px;
    padding-bottom: 100px;
    .image {
      width: 90px;
      height: 90px;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
  .tipsBox {
    margin-left: 60px;
    text-align: left;
    font-size: 16px;

    & div:nth-child(1) {
      color: rgba(0, 0, 0, 0.8);
      span {
        color: rgba(29, 188, 118, 1);
      }
    }
    & div:nth-child(2) {
      color: rgba(0, 0, 0, 0.8);
      margin-top: 10px;
    }
    .hotBox {
      margin-top: 18px;
      width: 424px;
      height: 36px;
      border: 1px solid rgba(229, 229, 229, 1);
      color: #000000;
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 12px;
      span:not(:first-child) {
        opacity: 0.4;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}
</style>
