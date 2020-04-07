<!--
 * @Author: liyh
 * @Date: 2020-03-30 16:03:08
 * @LastEditors: liyh
 * @LastEditTime: 2020-04-07 17:33:36
 -->
<template>
  <!-- 登录部分 -->
  <div>
    <div class="userTypeBox">
      <div
        :class="['userType',userType==='personal'? 'active':'default']"
        @click="changeUesrType('personal')"
      >
        <span>个人用户</span>
      </div>
      <div
        :class="['userType',userType==='company'? 'active':'default']"
        @click="changeUesrType('company')"
      >
        <span>企业用户</span>
      </div>
    </div>

    <div>
      <div v-if="userType==='personal'">
        <div class="inputBox">
          <div class="left">手机号</div>
          <div class="inputArea">
            <input
              v-model="telephone"
              @focus="resetErrortext('telephone')"
              type="text"
              maxlength="11"
              placeholder="请输入手机号"
            />
          </div>
        </div>
        <div class="inputBox">
          <div class="left">验证码</div>
          <div class="inputArea">
            <input
              @focus="resetErrortext('qrcode')"
              v-model="qrcode"
              maxlength="6"
              type="text"
              placeholder="请输入验证码"
            />
          </div>
          <div :class="[enAbleStatus?'qrEnable':'qrDisAble','right']" @click="getQrcode">
            <span>{{qrText}}</span>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="inputBox">
          <div class="left">企业邮箱</div>
          <div class="inputArea">
            <input
              @focus="resetErrortext('companyEmail')"
              v-model="companyEmail"
              type="text"
              placeholder="请输入企业邮箱"
            />
          </div>
        </div>
        <div class="inputBox">
          <div class="left">密码</div>
          <div class="inputArea">
            <input
              @focus="resetErrortext('companyPassword')"
              v-model="companyPassword"
              type="text"
              placeholder="请输入密码"
            />
          </div>
        </div>
      </div>

      <div class="errorTips">{{errorMassage}}</div>
    </div>
    <div @click="toLogin" class="btnBox">
      <span class="defaultText">登录</span>
    </div>
  </div>
</template>

<script>
const telephoneReg = /^1[3456789]\d{9}$/;
import { mapMutations } from "vuex";
import { getSms } from "@/service/commonApi";
import { personalLogin, enterpriseLogin, getUserInfo } from "@/service/userApi";
export default {
  name: "Login",
  data() {
    return {
      userType: "personal",
      errorType: "",
      errorMassage: "",
      qrText: "获取验证码",
      enAbleStatus: true,
      qrTimer: null,
      telephone: "", //用户手机号
      qrcode: "", //验证码
      companyEmail: "", //企业邮箱
      companyPassword: "" //企业密码
    };
  },
  methods: {
    ...mapMutations({
      setUserInfo: "setUserInfo"
    }),
    /**
     * @description: 切换用户类型。个人用户/企业用户
     */
    changeUesrType(type) {
      this.userType = type;
      this.errorMassage = "";
    },

    /**
     * @description: 重置错误提示
     */
    resetErrortext(type) {
      if (this.errorType == type) {
        this.errorMassage = "";
      }
    },

    /**
     * @description: 校验字段是否合法
     */
    verify(type) {
      const { telephone, qrcode, companyEmail, companyPassword } = this;
      switch (type) {
        case "personal":
          if (!telephone) {
            this.errorType = "telephone";
            this.errorMassage = "请输入手机号";
            return false;
          } else if (!telephoneReg.test(telephone)) {
            this.errorType = "telephone";
            this.errorMassage = "手机号错误，请重新输入";
            return false;
          } else if (!qrcode) {
            this.errorType = "qrcode";
            this.errorMassage = "请输入验证码";
            return false;
          }
          // else if (qrcode.length != 5) {
          //   this.errorType = "qrcode";
          //   this.errorMassage = "验证码错误，请重新输入";
          //   return false;
          // }
          return true;
          break;
        case "company":
          if (!companyEmail) {
            this.errorType = "companyEmail";
            this.errorMassage = "请输入企业邮箱";
            return false;
          } else if (!companyPassword) {
            this.errorType = "companyPassword";
            this.errorMassage = "请输入密码";
            return false;
          }
          return true;
          break;
        default:
          break;
      }
    },

    /**
     * @description: 点击获取验证码按钮
     */
    async getQrcode() {
      const { telephone } = this;
      if (!telephone) {
        this.errorMassage = "请输入手机号";
        return;
      } else if (!telephoneReg.test(telephone)) {
        this.errorMassage = "手机号错误，请重新输入";
        return;
      }
      let second = 20;
      if (this.qrTimer) return false;
      let smsRes = await getSms({ mobile: telephone }); //调接口
      let { status, msg } = smsRes;
      if (status) {
        this.$message({
          message: "发送成功",
          type: "success"
        });
        this.qrTimer = setInterval(() => {
          second -= 1;
          if (this.enAbleStatus) {
            this.enAbleStatus = false;
          }
          if (second >= 0) {
            this.qrText = `已发送(${second}s)`;
          } else {
            this.enAbleStatus = true;
            clearInterval(this.qrTimer);
            this.qrTimer = null;
            this.qrText = "重新获取";
          }
        }, 1000);
      } else {
        this.$message.error(msg);
      }
    },

    /**
     * @description: 点击登录按钮
     */
    async toLogin() {
      let flag = this.verify(this.userType); //先校检
      if (!flag) return;
      let params = {};
      let loginRes = null;
      //判断用户是个人用户还是企业用户
      if (this.userType == "personal") {
        params = {
          mobile: this.telephone,
          nick: this.userName,
          captcha: this.qrcode,
          url: window.location.href
        };
        loginRes = await personalLogin(params);
      } else {
        params = {
          email: this.companyEmail,
          password: this.companyPassword,
          url: window.location.href
        };
        loginRes = await enterpriseLogin(params);
      }
      let { status, msg, data } = loginRes;
      if (status) {
        //登录成功将token存在localStorage之后再去调用getUserInfo接口
        localStorage.setItem("token", data.token);
        this.setUserInfo({
          id: 22,
          nick: "张三"
        });
        this.$router.go(-1);
        console.log("getUserInfo", getUserInfo);

        // let getUserInfoRes = await getUserInfo();
        // let {
        //   status: userInfoStatus,
        //   msg: userInfoMsg,
        //   data: userInfoData
        // } = getUserInfoRes;
        // if (userInfoStatus) {
        //   //将用户信息存进vuex，方便其他组件调用
        //   this.setUserInfo(userInfoData);
        //   this.$router.go(-1);
        // } else {
        //   this.$message.error(userInfoMsg);
        // }
      } else {
        this.$message.error(msg);
      }
    }
  }
};
</script>

<style lang="scss">
</style>
