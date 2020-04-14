<!--
 * @Author: liyh
 * @Date: 2020-03-30 16:13:50
 * @LastEditors: liyh
 * @LastEditTime: 2020-04-14 14:31:38
 -->
<template>
  <!-- 注册部分 -->
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
          <div class="left">用户名</div>
          <div class="inputArea">
            <input type="text" v-model="userName" maxlength="11" placeholder="请输入5~20位的用户名" />
          </div>
        </div>
        <div class="inputBox">
          <div class="left">手机号</div>
          <div class="inputArea">
            <input
              @focus="resetErrortext('telephone')"
              v-model="telephone"
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
              v-model="qrcode"
              @focus="resetErrortext('qrcode')"
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
          <div class="left">企业名称</div>
          <div class="inputArea">
            <input
              v-model="companyName"
              @focus="resetErrortext('companyName')"
              type="text"
              placeholder="请输入企业名称"
            />
          </div>
        </div>
        <div class="inputBox">
          <div class="left">企业邮箱</div>
          <div class="inputArea">
            <input
              v-model="companyEmail"
              @focus="resetErrortext('companyEmail')"
              type="text"
              placeholder="请输入企业邮箱"
            />
          </div>
        </div>
        <div class="inputBox">
          <div class="left">设置密码</div>
          <div class="inputArea">
            <input
              v-model="setPassword"
              @focus="resetErrortext('setPassword')"
              type="password"
              maxlength="10"
              placeholder="请设置6-10位的密码"
            />
          </div>
        </div>
        <div class="inputBox">
          <div class="left">确认密码</div>
          <div class="inputArea">
            <input
              v-model="confirmPassword"
              @focus="resetErrortext('confirmPassword')"
              type="password"
              maxlength="10"
              placeholder="请再次输入密码"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="errorTips">{{errorMassage}}</div>
    <div @click="toRegister" class="btnBox">
      <span class="defaultText">注册</span>
    </div>
    <div class="agreeMentBox">
      <span>注册即表示同意</span>
      <span @click="toUserAgree">《用户协议》</span>
      <span>和</span>
      <span @click="toPrivacyPolicy">《隐私政策》</span>
    </div>
  </div>
</template>

<script>
const telephoneReg = /^1[3456789]\d{9}$/;
import { getSms } from "@/service/commonApi";
import { enterpriseRegister, personalRegister } from "@/service/userApi";
export default {
  name: "Login",
  data() {
    return {
      userType: "personal", //用户类型:personal=>个人用户;company=>企业用户
      errorType: "",
      errorMassage: "",
      qrText: "获取验证码",
      enAbleStatus: true,
      qrTimer: null,
      userName: "", //用户名
      telephone: "", //用户手机号
      qrcode: "", //验证码
      companyName: "", //企业名称
      companyEmail: "", //企业邮箱
      setPassword: "", //设置密码
      confirmPassword: "" //确认密码
    };
  },
  methods: {
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
     * @description: 点击用户协议
     */
    toUserAgree() {
      window.open(window.location.origin + "/#/userAgreement", "_blank");
    },

    /**
     * @description: 点击隐私政策
     */
    toPrivacyPolicy() {
      window.open(window.location.origin + "/#/privacyPolicy", "_blank");
    },

    /**
     * @description: 校验字段是否合法
     */
    verify(type) {
      const {
        userName,
        telephone,
        qrcode,
        companyName,
        companyEmail,
        setPassword,
        confirmPassword
      } = this;
      switch (type) {
        case "personal":
          if (!userName) {
            this.errorType = "userName";
            this.errorMassage = "请输入用户名";
            return false;
          } else if (!(userName.length >= 5 && userName.length <= 20)) {
            this.errorType = "userName";
            this.errorMassage = "用户名错误，请重新输入";
            return false;
          } else if (!telephone) {
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
          // else if (qrcode.length != 6) {
          //   this.errorType = "qrcode";
          //   this.errorMassage = "验证码错误，请重新输入";
          //   return false;
          // }
          return true;
          break;
        case "company":
          if (!companyName) {
            this.errorType = "companyName";
            this.errorMassage = "请输入企业名称";
            return false;
          } else if (!companyEmail) {
            this.errorType = "companyEmail";
            this.errorMassage = "请输入企业邮箱";
            return false;
          } else if (!setPassword) {
            this.errorType = "setPassword";
            this.errorMassage = "请输入设置密码";
            return false;
          } else if (!(setPassword.length >= 6 && setPassword.length <= 10)) {
            this.errorType = "confirmPassword";
            this.errorMassage = "请设置6-10位的密码";
            return false;
          } else if (!confirmPassword) {
            this.errorType = "confirmPassword";
            this.errorMassage = "请再次输入密码";
            return false;
          } else if (confirmPassword != setPassword) {
            this.errorType = "confirmPassword";
            this.errorMassage = "两次输入的密码不一致，请重新输入";
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
      const { userName, telephone } = this;
      if (!userName) {
        this.errorType = "userName";
        this.errorMassage = "请输入用户名";
        return false;
      } else if (!(userName.length >= 4 && userName.length <= 20)) {
        this.errorType = "userName";
        this.errorMassage = "用户名错误，请重新输入";
        return false;
      } else if (!telephone) {
        this.errorType = "telephone";
        this.errorMassage = "请输入手机号";
        return false;
      } else if (!telephoneReg.test(telephone)) {
        this.errorType = "telephone";
        this.errorMassage = "手机号错误，请重新输入";
        return false;
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
     * @description: 点击注册按钮
     */
    async toRegister() {
      let flag = this.verify(this.userType); //先校检
      if (!flag) return;
      let params = {};
      let registerRes = null;
      if (this.userType == "personal") {
        params = {
          nick: this.userName,
          mobile: this.telephone,
          captcha: this.qrcode
        };
        registerRes = await personalRegister(params);
      } else {
        params = {
          name: this.companyName,
          email: this.companyEmail,
          password: this.setPassword,
          re_password: this.confirmPassword
        };
        registerRes = await enterpriseRegister(params);
      }
      let { status, msg } = registerRes;
      if (status) {
        //TODO
        this.$message({
          message: "注册成功",
          type: "success"
        });
        this.$emit("registerSuccess");
      } else {
        this.$message.error(msg);
      }
    }
  }
};
</script>

<style lang="scss">
.agreeMentBox {
  margin-top: 8px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.4);
  & span:nth-child(2) {
    color: #f96d3f;
  }
  & span:nth-child(4) {
    color: #f96d3f;
  }
}
</style>
