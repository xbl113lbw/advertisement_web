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
        <!-- <router-link to="/login">登录/注册</router-link> -->
        <div class="loginer" v-if="Object.keys(userInfo).length>0">
          <div class="avatar">
            <img :src="require(`@/assets/headerNav/avatar${getAvatar(0)}.png`)" alt />
          </div>
          <div class="nickname">大吉大利今晚吃鸡</div>
          <div class="loginHover">
            <div class="item" @click="toUserCenter">个人中心</div>
            <div class="item" @click="logout">退出登录</div>
          </div>
        </div>
        <div class="loginer" v-else>
          <router-link to="/login">登录/注册</router-link>
        </div>
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
      homeLoadSuccess: state => state.homeLoadSuccess,
      userInfo: state => state.userInfo
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
    /**
     * @description: 监听首页DOM加载完毕
     */
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
      changeNavIndex: "changeNavIndex",
      setUserInfo: "setUserInfo"
    }),
    /**
     * @description: 顶部导航发生改变
     */
    navChange(index) {
      this.changeNavIndex(index);
      if (this.$route.path !== "/") {
        this.clickByNav = true;
        this.$router.push({ path: "/" });
        return;
      }
      common.scrollToTargetPageY(this.navoffsetTop[index]); //滚动页面到指定位置
    },
    /**
     * @description: 跳转到服务列表
     */
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
    },
    /**
     * @description: 点击个人中心
     */
    toUserCenter() {
      if (this.$route.path === "/userCenter") {
        return;
      }
      this.$router.push({
        path: "/userCenter"
      });
    },
    /**
     * @description:点击退出登录
     */
    logout() {
      localStorage.removeItem("token");
      this.setUserInfo({});
      window.location.reload();
    },
    /**
     * @description: 根据id，拿到对应生成的头像
     */
    getAvatar(id) {
      return id % 4;
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
      .loginer {
        display: flex;
        width: 114px;
        position: relative;
        height: 100%;
        align-items: center;
        justify-content: flex-end;
        cursor: pointer;
        .avatar {
          width: 22px;
          height: 22px;
          margin-right: 8px;
          position: relative;
          z-index: 1000;
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        .nickname {
          position: relative;
          z-index: 1000;
          width: 84px;
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.8);
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
          white-space: nowrap;
        }
        &:hover .loginHover {
          display: block;
        }
        .loginHover {
          display: none;
          position: absolute;
          top: 0;
          left: -10px;
          right: -10px;
          // width: 134px;
          height: 131px;
          background: #fff;
          border: 1px solid rgba(204, 204, 204, 1);
          padding-top: 55px;
          .avatar_nickname {
            display: flex;
            justify-content: center;
            margin-bottom: 15px;
            position: relative;
            z-index: 100;
          }
          .item {
            width: 100%;
            height: 30px;
            line-height: 30px;
            color: rgba(0, 0, 0, 0.4);
            font-size: 12px;
          }
          & .item:hover {
            color: #1dbc76;
            background: #f0f0f0;
          }
        }
      }
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
