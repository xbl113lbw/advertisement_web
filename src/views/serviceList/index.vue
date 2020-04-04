<!--
 * @Author: liyh
 * @Date: 2020-03-31 13:55:18
 * @LastEditors: liyh
 * @LastEditTime: 2020-04-04 22:04:56
 -->
<template>
  <div class="Wrapper">
    <Search></Search>
    <div v-if="searchWord&&!(serviceList.length>0)" class="noResultBox">
      <div class="image">
        <img src="@/assets/serviceList/caution.png" alt />
      </div>
      <div class="tipsBox">
        <div>
          很抱歉，在“深圳”没有找到与“
          <span>XXX</span>”
          相关的信息
        </div>
        <div>建议您：去掉不必要的字句，扩大搜索范围，如“的”、“什么”等。</div>
        <div class="hotBox">
          <span>热搜词:</span>
          <span>LED显示屏</span>
          <span>LED显示屏</span>
          <span>LED显示屏</span>
          <span>LED显示屏</span>
          <span>LED显示屏</span>
        </div>
      </div>
    </div>
    <div v-if="serviceList&&serviceList.length>0">
      <!-- 搜索进来的不会出现面包屑 -->
      <div class="breadcrumbBox" v-if="!searchWord">
        <div class="breadcrumbItem" v-for="(item,index) in breadcrumbData" :key="index">
          <span>{{item}}</span>
          <div v-if="index!=breadcrumbData.length-1" class="arrow_right">></div>
        </div>
        <!-- <div class="searchResult">
          <div class="search_arrow">></div>
          <div>
            找到
            <span class="highLight">“{{searchWord}}”</span>
            相关信息共
            <span class="highLight">{{searchResultLen}}</span>条
          </div>
        </div>-->
      </div>
      <div>
        <div v-for="(item,index) in serviceList" :key="index" class="itemBox">
          <div @click="toServiceInfo(itemData[item])">
            <ListItem :itemData="itemData[item]"></ListItem>
          </div>
        </div>
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
  </div>
</template>

<script>
import Search from "@/components/Search";
import ListItem from "./components/listItem";
import itemData from "@/data/itemData";
import typeData from "@/data/typeData";

export default {
  name: "ServiceList",
  data() {
    return {
      searchWord: "", //搜索的关键字
      searchResultLen: 12, //搜索结果的总数
      breadcrumbData: ["首页"],
      bigType: [],
      smallType: [],
      serviceList: [],
      itemData: {}
    };
  },
  created() {
    this.bigType = typeData.filter(
      item => item.id == this.$route.query.bigType
    ); //根据id大类
    this.smallType = this.bigType[0].children.filter(
      item => item.id == this.$route.query.smallType
    ); //根据id小类
    if (this.$route.query.searchWord) {
      //如果有搜索条件
      this.searchWord = this.$route.query.searchWord;
      this.serviceList = []; //匹配小类目下面的全部类目
    } else {
      this.serviceList = this.smallType[0].child; //匹配小类目下面的全部类目
    }
    this.itemData = itemData;
    this.breadcrumbData.push(this.bigType[0].name, this.smallType[0].name);
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
      this.$router.push({
        path: "/serviceInfo",
        query: {
          bigType: this.$route.query.bigType,
          smallType: this.$route.query.smallType,
          id: item.id
        }
      });
    },
    /**
     * @description: 页数发生改变
     */
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
      }
    }
  }
}
</style>
