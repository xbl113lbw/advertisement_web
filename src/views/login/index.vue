<!--
 * @Author: liyh
 * @Date: 2020-03-30 14:02:41
 * @LastEditors: liyh
 * @LastEditTime: 2020-03-30 18:10:39
 -->
<template>
  <div class="Wrapper">
    <div class="bg"></div>
    <div class="box">
      <div class="operationBox">
        <div>返回</div>
        <div @click="changeOperationType">{{operationType==0?'去注册':'返回登录'}}</div>
      </div>
      <!-- 登录部分 -->
      <div v-if="operationType==0">
        <LoginPart></LoginPart>
      </div>
      <!-- 注册部分 -->
      <div v-else>
        <RegisterPart></RegisterPart>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginPart from "./components/login.vue";
import RegisterPart from "./components/register.vue";

export default {
  name: "Login",
  components: {
    LoginPart,
    RegisterPart
  },
  data() {
    return {
      operationType: 0 //0代表登录，1代表注册
    };
  },
  methods: {
    changeUesrType(type) {
      this.userType = type;
    },
    changeOperationType() {
      this.operationType = ~this.operationType + 2; //0变1，1变0
    }
  }
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
}
#app {
  height: 100vh;
}
.Wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  position: relative;
  top: 12%;
  font-weight: 400;
  .bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("./../../assets/login/bg@2x.png") no-repeat;
    background-size: 100% 100%;
    z-index: -1;
  }
  .box {
    width: 460px;
    padding: 56px 60px 64px 60px;
    box-sizing: border-box;
    background: #ffffff;
    position: relative;
    .operationBox {
      padding: 0 2px;
      position: absolute;
      top: -28px;
      left: 0;
      display: flex;
      justify-content: space-between;
      width: 100%;
      color: #ffffff;
      font-size: 14px;
      & div:last-child {
        text-decoration: underline;
      }
    }
    .userTypeBox {
      display: flex;
      width: 100%;
      font-size: 20px;
      font-weight: 400;
      margin-bottom: 20px;
      .userType {
        flex: 1;
        position: relative;
        padding-bottom: 10px;
      }
      .active {
        color: #1dbc76;
      }
      .default {
        color: #000000;
        span {
          opacity: 0.4;
        }
      }
      & .active::after {
        content: "";
        position: absolute;
        bottom: 0;
        width: 170px;
        height: 1px;
        left: 0;
        background: #1dbc76;
      }
      & .default::after {
        content: "";
        position: absolute;
        bottom: 0;
        width: 170px;
        height: 1px;
        left: 0;
        background: #000000;
        opacity: 0.06;
      }
    }
    .inputBox {
      width: 340px;
      height: 50px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      margin-top: 20px;
      display: flex;
      padding: 0px 16px;
      align-items: center;
      .left {
        font-size: 16px;
        font-weight: 400;
        color: #000000;
        margin-right: 20px;
        opacity: 0.8;
      }
      .inputArea {
        flex: 1;
        height: 100%;
        input {
          width: 100%;
          height: 100%;
          font-size: 16px;
          color: #000000;
          font-weight: 400;
        }
      }
      .right {
        width: 90px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: #f0f0f0;
        border-radius: 2px;
        color: #000000;
        font-size: 14px;
        font-weight: 400;
      }
      .qrEnable {
        color: #1dbc76;
      }
      .qrDisAble {
        span {
          opacity: 0.2;
        }
      }
    }
    .errorTips {
      text-align: left;
      margin-top: 8px;
      color: #de4949;
      font-size: 14px;
    }
    .btnBox {
      width: 340px;
      height: 56px;
      background: rgba(29, 188, 118, 1);
      font-size: 22px;
      font-weight: 400;
      margin-top: 50px;
      line-height: 56px;
      &:hover .defaultText {
        opacity: 1;
      }
      .defaultText {
        color: white;
        opacity: 0.4;
      }
    }
  }
}
</style>
