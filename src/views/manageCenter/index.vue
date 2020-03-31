<template>
  <div class="main_page">
    <div class="menu">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#F9F9F9"
        text-color="#636363"
        active-text-color="#1DBC76"
      >
        <div class="menu_title">管理中心</div>
        <el-menu-item index="1" @click="ToAuth('1')">
          <span slot="title">基本信息</span>
        </el-menu-item>
        <el-menu-item index="2" @click="ToAuth('2')">
          <span slot="title">认证管理</span>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">
            <span>服务管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              index="3-1"
              style="padding-left: 70px;"
              @click="ToAuth('3')"
              >审核中(2)</el-menu-item
            >
            <el-menu-item
              index="3-2"
              style="padding-left: 70px;"
              @click="ToAuth('3')"
              >已发布(2)</el-menu-item
            >
            <el-menu-item
              index="3-3"
              style="padding-left: 70px;"
              @click="ToAuth('3')"
              >其他</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="content">
      <baseInfo v-if="active === '1'"></baseInfo>
      <auth v-else-if="active === '2'"></auth>
      <serverManage v-else></serverManage>
    </div>
  </div>
</template>
<script>
import auth from "./components/authenticationManage";
import baseInfo from "./components/baseInfo";
import serverManage from "./components/serverManage";
export default {
  components: {
    auth,
    baseInfo,
    serverManage
  },
  data() {
    return {
      active: "1"
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log("handleOpen", key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log("handleClose", key, keyPath);
    },
    ToAuth(e) {
      console.log("e", e);
      this.active = e;
    }
  }
};
</script>
<style lang="scss" scope>
.main_page {
  max-width: 1200px;
  //   background-color: #f8f4f8;
  margin: 0 auto;
  display: flex;
  margin-top: 60px;
  .menu {
    width: 200px;
    height: 609px;
    margin-bottom: 60px;
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
    // .content_row {
    //   span {
    //     width: 48px;
    //     height: 22px;
    //     font-size: 16px;
    //     font-weight: 600;
    //     color: rgba(0, 0, 0, 1);
    //     line-height: 22px;
    //   }
    //   input {
    //     width: 340px;
    //     height: 50px;
    //     margin-left: 30px;
    //     padding: 0 20px;
    //     border: 1px solid rgba(0, 0, 0, 0.2);
    //     color: rgba(0, 0, 0, 0.8);
    //     font-size: 16px;
    //   }
    //   .noBorder {
    //     border: 0;
    //   }
    // }
    .el-button {
      width: 340px;
      height: 56px;
      background: rgba(29, 188, 118, 1);
      font-size: 22px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin-top: 50px;
    }
  }
}
</style>
