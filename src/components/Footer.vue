<template>
  <div id="Footer" v-show="showFooter">
    <div class="top">
      <img src="../assets/bottomLogo.png" alt />
      <ul>
        <li>联系我们</li>
        <li>公司电话：2299220</li>
        <li>商务合作：余先生 (微信号 www111)</li>
        <li>公司地址：深圳市南山区桃园路79号田厦金牛大厦A座2601</li>
      </ul>
      <ul>
        <li>帮助中心</li>
        <li @click="toPrivacyPolicy">隐私政策</li>
      </ul>
    </div>
    <div class="bottom">
      <div>
        <span>版权所有</span>
        <span>｜</span>
        <span>粤公网备案信息10001310</span>
        <span>｜</span>
        <span>经营许可证</span>
      </div>
      <div>
        <span>豪斯莱科技 版权所有 豪斯莱科技 版权所有 豪斯莱科技 版权所有 豪斯莱科技 版权所有</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      showFooter: true
    };
  },
  mounted() {
    let excludeUrl = ["/login", "/userAgreement", "/privacyPolicy", "/publish"]; //这几个路由不需要底部
    if (excludeUrl.includes(this.$route.path)) {
      this.showFooter = false;
      return;
    }
  },
  methods: {
    /**
     * @description: 点击隐私政策
     */
    toPrivacyPolicy() {
      window.open(window.location.origin + "/#/privacyPolicy", "_blank");
    }
  },
  watch: {
    $route(to) {
      let excludeUrl = [
        "/login",
        "/userAgreement",
        "/privacyPolicy",
        "/publish"
      ]; //这几个路由不需要底部
      if (excludeUrl.includes(to.path)) {
        this.showFooter = false;
        return;
      }
      this.showFooter = true;
    }
  }
};
</script>

<style lang="scss" scoped>
#Footer {
  width: 100vw;
  min-width: 1200px;
  background: #f9f9f9;

  .top {
    display: flex;
    justify-content: space-between;
    width: 1200px;
    margin: 0 auto;
    padding: 50px 123px 40px 80px;

    img {
      margin-top: 25px;
      margin-right: 238px;
      width: 222px;
      height: 60px;
    }

    ul {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      li {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.4);
        line-height: 17px;
        margin-bottom: 10px;

        &:first-child {
          margin-bottom: 16px;
          font-size: 16px;
          color: rgba(0, 0, 0, 0.8);
          line-height: 22px;
        }

        &:last-child {
          margin-bottom: 0;
          cursor: pointer;
        }
        &:last-child:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 20px 0 30px;
    border-top: 1px solid #ededed;

    div {
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        font-size: 10px;
        color: rgba(0, 0, 0, 0.4);
        line-height: 14px;
      }
    }
  }
}
</style>
