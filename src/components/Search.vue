<!--
 * @Author: liyh
 * @Date: 2020-03-31 10:39:35
 * @LastEditors: liyh
 * @LastEditTime: 2020-04-10 11:04:08
 -->
<template>
  <div class="searchBox">
    <div class="logo" @click="toIndex">
      <img src="@/assets/home/logo.png" alt />
    </div>
    <div class="searchArea">
      <div class="searchBox">
        <div class="searchLogo"></div>
        <div class="inputArea">
          <input type="text" v-model="searchWord" placeholder="宣传资料印刷" />
        </div>
        <div @click="toSearchResult(searchWord)" class="searchBtn">搜索</div>
        <div class="recommendBox">
          <span @click="clickHotTips($event)">LED显示屏</span>
          <span @click="clickHotTips($event)">灯箱/招牌</span>
          <span @click="clickHotTips($event)">户外广告</span>
          <span @click="clickHotTips($event)">背景/形象墙</span>
          <span @click="clickHotTips($event)">多媒体互动</span>
        </div>
      </div>
    </div>
    <div v-if="userInfo&&userInfo.type=='enterprise'" @click="toPublish" class="publishBox">免费发布信息</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getEnterpriseStatus } from "@/service/commonApi";
export default {
  name: "Search",
  inject: ["reload"],
  data() {
    return {
      searchWord: ""
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    })
  },
  methods: {
    /**
     * @description: 点击发布信息
     */
    async toPublish() {
      //先判断当前企业审核是否通过
      let result = await getEnterpriseStatus();
      console.log("result", result);
      if (result == "accept") {
        this.$router.push({ path: "/publish" });
      } else {
        this.$message.error("企业审核未通过");
      }
    },
    /**
     * @description: 点击去首页
     */
    toIndex() {
      if (this.$route.path === "/") {
        //如果当前是首页，则刷新一下
        window.location.reload();
      } else {
        this.$router.push({ path: "/" });
      }
    },
    /**
     * @description: 点击搜索
     */
    toSearchResult(searchWord) {
      if (!searchWord) {
        this.$message.error("请输入搜索关键字");
        return;
      }
      if (this.$route.path === "/searchResult") {
        if (searchWord === decodeURIComponent(this.$route.query.searchWord))
          return; //如果重复搜索(即搜索关键字跟当前关键字一样，则url不做任务操作)
        this.$router.replace({
          path: "/searchResult",
          query: {
            searchWord: encodeURIComponent(searchWord)
          }
        });
        this.reload();
      } else {
        this.$router.push({
          path: "/searchResult",
          query: {
            searchWord: encodeURIComponent(searchWord)
          }
        });
      }
    },
    /**
     * @description: 点击热搜词
     * @param {type} event:当前点击元素
     */
    clickHotTips(event) {
      console.log("event", event.target.innerText);
      this.toSearchResult(event.target.innerText);
    }
  }
};
</script>

<style lang="scss" scoped>
.searchBox {
  width: 1200px;
  height: 120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  .logo {
    width: 156px;
    height: 42px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .searchArea {
    margin-left: 168px;
    margin-right: 50px;
    position: relative;

    .searchBox {
      width: 540px;
      height: 40px;
      border: 2px solid #1dbc76;
      padding-left: 14px;
      display: flex;
      .searchLogo {
        width: 14px;
        height: 15px;
        background: url("./../assets/home/search.png") no-repeat;
        background-size: 100% 100%;
        margin-right: 10px;
      }
      .inputArea {
        flex: 1;
        input {
          width: 100%;
          height: 100%;
        }
      }
      .searchBtn {
        cursor: pointer;
        width: 96px;
        height: 40px;
        background: #1dbc76;
        line-height: 40px;
        color: #ffffff;
        font-size: 16px;
      }
      .searchBtn:hover {
        background: #1aa869;
      }
    }
    .recommendBox {
      position: absolute;
      bottom: -32px;
      cursor: pointer;
      span {
        margin-right: 16px;
        font-size: 12px;
        color: #000000;
      }
      & span:nth-child(1) {
        opacity: 0.2;
      }
      & span:nth-child(2) {
        opacity: 0.8;
      }
      & span:nth-child(3) {
        opacity: 0.2;
      }
      & span:nth-child(4) {
        color: #f96d3f;
      }
      & span:nth-child(5) {
        opacity: 0.2;
      }
    }
  }

  .publishBox {
    cursor: pointer;
    width: 146px;
    height: 40px;
    background: #f66f42;
    line-height: 40px;
    color: #ffffff;
    font-size: 16px;
  }
  .publishBox:hover {
    background: #dc633b;
  }
}
</style>
