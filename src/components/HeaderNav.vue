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
        <li :class="navIndex === 0 ? 'active' : ''" @click="navChange(0)">
          广告传媒
          <div class="right-lists">
            <span>LED显示屏</span>
            <span>灯箱/招牌</span>
            <span>户外广告</span>
            <span>背景/形象墙</span>
          </div>
        </li>
        <li :class="navIndex === 1 ? 'active' : ''" @click="navChange(1)">
          喷绘招牌
          <div class="right-lists">
            <span>hahahaha</span>
            <span>灯箱/招牌</span>
            <span>户外广告</span>
            <span>背景/形象墙</span>
          </div>
        </li>
        <li :class="navIndex === 2 ? 'active' : ''" @click="navChange(2)">
          印刷包装
          <div class="right-lists">
            <span>lalalala</span>
            <span>灯箱/招牌</span>
            <span>户外广告</span>
            <span>背景/形象墙</span>
          </div>
        </li>
        <li :class="navIndex === 3 ? 'active' : ''" @click="navChange(3)">
          展会服务
          <div class="right-lists">
            <span>lalalala</span>
            <span>kakakaka</span>
            <span>灯箱/招牌</span>
            <span>户外广告</span>
            <span>背景/形象墙</span>
          </div>
        </li>
        <router-link to="/login">登录/注册</router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderNav",
  data() {
    return {
      navIndex: 0,
      showHeader: true
    };
  },
  watch: {
    $route(to) {
      let excludeUrl = ["/login", "/userAgreement", "/privacyPolicy"]; //这几个路由不需要顶部导航栏
      if (excludeUrl.includes(to.path)) {
        this.showHeader = false;
        return;
      }
      this.showHeader = true;
    }
  },
  methods: {
    navChange(index) {
      this.navIndex = index;
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
