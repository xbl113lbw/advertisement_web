<template>
  <div class="main_page">
    <div class="menu">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#F9F9F9"
        text-color="#636363"
        active-text-color="#1DBC76"
      >
        <div class="menu_title">个人中心</div>
        <el-menu-item index="2">
          <span slot="title">基本信息</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="content">
      <div class="content_row">
        <span>用户名</span>
        <input placeholder="请输入5～20位的用户名" v-model="nick" />
      </div>
      <div class="content_row">
        <span>手机号</span>
        <div class="noBorder">{{mobile}}</div>
      </div>
      <el-button @click="saveChange">保存</el-button>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { getPersonalInfo, editPersonalInfo } from "@/service/userApi";
export default {
  data() {
    return {
      nick: "",
      personId: "",
      mobile: ""
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    })
  },
  mounted() {
    this.getPersonalInfo();
  },
  methods: {
    ...mapActions({
      setUserInfoAction: "setUserInfoAction"
    }),
    async getPersonalInfo() {
      let personInfoRes = await getPersonalInfo();
      let { status, msg, data } = personInfoRes;
      if (status) {
        this.nick = data.nick;
        this.personId = data.id;
        this.mobile = data.mobile;
      } else {
        this.$message.error(msg);
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    /**
     * @description: 点击保存
     */
    async saveChange() {
      let editResult = await editPersonalInfo({
        id: this.personId,
        nick: this.nick
      });
      let { status, msg } = editResult;
      if (status) {
        //修改昵称成功之后:1.更新用户个人信息;2.更新全局用户基础信息
        this.getPersonalInfo();
        this.setUserInfoAction();
      } else {
        this.$message.error(msg);
      }
    }
  }
};
</script>
<style lang="scss" scope>
.el-menu {
  border: none;
}
.el-menu-item,
.el-submenu__title {
  padding-left: 40px !important;
  text-align: left;
  color: #636363;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
}
.el-submenu__icon-arrow {
  right: 65px;
}
.el-menu-item-group .el-menu-item {
  font-size: 16px;
  padding-left: 52px !important;
  font-family: PingFangSC-Regular, PingFang SC;
}
.main_page {
  max-width: 1200px;
  font-family: PingFangSC-Regular, PingFang SC;
  //   background-color: #f8f4f8;
  margin: 0 auto;
  display: flex;
  margin-top: 60px;
  .menu {
    width: 200px;
    height: 609px;
    .el-menu-vertical-demo {
      height: 100%;
      padding-top: 32px;
      .menu_title {
        font-size: 20px;
        font-weight: 600;
        color: rgba(0, 0, 0, 1);
        line-height: 28px;
        margin: 0 40px;
        padding-bottom: 20px;
        padding-right: 39px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      }
    }
  }
  .content {
    // background-color: #f8f8f8;
    padding: 40px 0 0 100px;
    .content_row {
      display: flex;
      align-items: center;
      margin-bottom: 40px;
      span {
        width: 48px;
        height: 22px;
        font-size: 16px;
        font-weight: 600;
        color: rgba(0, 0, 0, 1);
        line-height: 22px;
      }
      input {
        width: 340px;
        height: 50px;
        margin-left: 30px;
        padding: 0 20px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        color: rgba(0, 0, 0, 0.8);
        font-size: 16px;
      }
      .noBorder {
        margin-left: 30px;
      }
    }
    .el-button {
      width: 340px;
      height: 56px;
      background: rgba(29, 188, 118, 1);
      font-size: 22px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin-top: 10px;
    }
  }
}
</style>
