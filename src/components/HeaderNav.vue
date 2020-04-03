<template>
  <div id="header" v-show="showHeader">
    <div class="nav">
      <!--左侧地址-->
      <div class="left">
        <div>
          <img src="../assets/headerNav/location.png" alt />
          <span>深圳</span>
        </div>
        <div>
          <img src="../assets/headerNav/homeIcon.png" alt />
          <router-link to="/">网站首页</router-link>
        </div>
      </div>
      <!-- 右侧导航及登录 -->
      <ul class="right">
        <li
          v-for="(item,bigType_index) in bigType"
          :key="bigType_index"
          :class="navIndex == bigType_index ? 'active' : ''"
          @click="navChange(bigType_index)"
        >
          {{item.name}}
          <div class="right-lists">
            <span
              v-for="(item_s,smallType_index) in item.children"
              :key="smallType_index"
              @click.stop="toServiceList(bigType_index,smallType_index)"
            >{{item_s.name}}</span>
          </div>
        </li>
        <router-link to="/login">登录/注册</router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import common from "./../utils/common";
import typeData from "@/data/typeData";
export default {
  name: "HeaderNav",
  inject: ["reload"],
  data() {
    return {
      showHeader: true,
      clickByNav: false,
      bigType: []
    };
  },
  computed: {
    ...mapState({
      navIndex: state => state.navIndex,
      navoffsetTop: state => state.navoffsetTop,
      homeLoadSuccess: state => state.homeLoadSuccess
    })
  },
  created() {
    this.bigType = typeData;
  },
  mounted() {
    let excludeUrl = ["/login", "/userAgreement", "/privacyPolicy"]; //这几个路由不需要顶部导航栏
    if (excludeUrl.includes(this.$route.path)) {
      this.showHeader = false;
      return;
    }
  },
  watch: {
    $route(to) {
      let excludeUrl = ["/login", "/userAgreement", "/privacyPolicy"]; //这几个路由不需要顶部导航栏
      if (excludeUrl.includes(to.path)) {
        this.showHeader = false;
        return;
      }
      this.showHeader = true;
    },
    homeLoadSuccess: {
      handler(newStatus) {
        if (newStatus && this.clickByNav) {
          this.clickByNav = false;
          common.scrollToTargetPageY(this.navoffsetTop[this.navIndex]); //滚动页面到指定位置
        }
      }
    }
  },
  methods: {
    ...mapMutations({
      setHomeLoadStatus: "setHomeLoadStatus",
      changeNavIndex: "changeNavIndex"
    }),
    navChange(index) {
      this.changeNavIndex(index);
      if (this.$route.path !== "/") {
        this.clickByNav = true;
        this.$router.push({ path: "/" });
        return;
      }
      common.scrollToTargetPageY(this.navoffsetTop[index]); //滚动页面到指定位置
    },
    toServiceList(bigType_index, smallType_index) {
      this.changeNavIndex(bigType_index);
      if (this.$route.path === "/serviceList") {
        this.$router.replace({
          path: "/serviceList",
          query: {
            bigType: bigType_index,
            smallType: smallType_index
          }
        });
        this.reload();
      } else {
        this.$router.push({
          path: "/serviceList",
          query: {
            bigType: bigType_index,
            smallType: smallType_index
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#header {
  min-width: 1200px;
  background: #f9f9f9;
  border-bottom: 1px solid #ededed;

  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1200px;
    height: 72px;
    margin: 0 auto;

    .left {
      display: flex;
      align-items: center;

      div {
        display: flex;
        align-items: center;
        margin-right: 28px;

        &:last-child {
          margin-right: 0;

          a {
            color: rgba(0, 0, 0, 0.8);

            &:hover {
              text-decoration: underline;
            }
          }
        }

        img {
          width: 16px;
          height: 16px;
          margin-right: 2px;
        }

        span,
        a {
          font-size: 14px;
          color: #1dbc76;
          line-height: 20px;
        }
      }
    }

    .right {
      display: flex;
      align-items: center;
      height: 100%;

      li {
        position: relative;
        display: flex;
        align-items: center;
        height: 100%;
        margin-right: 86px;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.4);
        line-height: 22px;
        cursor: pointer;
        z-index: 100;
        &:hover {
          color: #1dbc76;
        }
        &:hover .right-lists {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        &:nth-child(4) {
          margin-right: 167px;
        }

        .right-lists {
          display: none;
          position: absolute;
          left: -25%;
          top: 0;
          padding-top: 63px;
          z-index: 1;
          background: transparent;
          border: 1px solid #cccccc;

          span {
            display: inline-block;
            width: 100px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            color: rgba(0, 0, 0, 0.4);
            background: #fff;
            font-size: 12px;
            &:hover {
              color: #1dbc76;
              background: #f0f0f0;
            }
          }
        }
      }

      a {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.8);
        line-height: 20px;

        &:hover {
          text-decoration: underline;
        }
      }

      .active {
        color: #1dbc76;
      }
    }
  }
}
</style>
