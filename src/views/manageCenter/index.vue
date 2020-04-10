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
              @click="ToAuth('3',1)"
            >审核中{{getLength(serviceManegeReviewData)}}</el-menu-item>
            <el-menu-item
              index="3-2"
              style="padding-left: 70px;"
              @click="ToAuth('3',2)"
            >已发布{{getLength(serviceManegeAcceptData)}}</el-menu-item>
            <el-menu-item
              index="3-3"
              style="padding-left: 70px;"
              @click="ToAuth('3',3)"
            >其他{{getLength(serviceManegeOtherData)}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="content">
      <baseInfo v-if="active === '1'"></baseInfo>
      <auth v-else-if="active === '2'"></auth>
      <serverManage
        v-else
        :currentServerManageData="currentServerManageData"
        :currentServerManagePageinfo="currentServerManagePageinfo"
      ></serverManage>
    </div>
  </div>
</template>
<script>
import auth from "./components/authenticationManage";
import baseInfo from "./components/baseInfo";
import serverManage from "./components/serverManage";
import { mapState } from "vuex";
import { getEnterpriseStatus } from "@/service/commonApi";
import {
  serviceManegeAccept,
  serviceManegeReview,
  serviceManegeOther
} from "@/service/userApi";
export default {
  components: {
    auth,
    baseInfo,
    serverManage
  },
  data() {
    return {
      active: "1",
      currentServerManageData: [], //当前选择的服务管理数据
      currentServerManagePageinfo: [], //当前选择的服务管理分页信息
      serviceManegeReviewPageinfo: {}, //服务管理-审核中分页信息
      serviceManegeReviewData: [], //服务管理-审核中数据
      serviceManegeAcceptPageinfo: {}, //服务管理-已发布分页信息
      serviceManegeAcceptData: [], //服务管理-已发布数据
      serviceManegeOtherPageinfo: {}, //服务管理-其他分页信息
      serviceManegeOtherData: [] //服务管理-其他数据
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    })
  },
  async mounted() {
    //先判断当前企业审核是否通过
    let result = await getEnterpriseStatus();
    console.log("result", result);
    if (result == "accept") {
      Promise.all([
        this.getServiceManegeReviewData(),
        this.getServiceManegeAcceptData(),
        this.getServiceManegeOtherData()
      ]);
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log("handleOpen", key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log("handleClose", key, keyPath);
    },
    /**
     * @description: 点击左侧区域
     */
    ToAuth(e, currentServiceStatus) {
      this.active = e;
      let temp = {
        1: [this.serviceManegeReviewData, this.serviceManegeReviewPageinfo],
        2: [this.serviceManegeAcceptData, this.serviceManegeAcceptPageinfo],
        3: [this.serviceManegeOtherData, this.serviceManegeOtherPageinfo]
      };
      if (e == 3) {
        this.currentServerManageData = temp[currentServiceStatus][0];
        this.currentServerManagePageinfo = temp[currentServiceStatus][1];
      }
    },

    /**
     * @description: 获取长度，如果是0则不显示
     */
    getLength(data) {
      return `（${data.length}）`;
    },

    /**
     * @description: 获取已发布数据
     */
    async getServiceManegeAcceptData() {
      let result = await serviceManegeAccept({ id: this.userInfo.id, page: 1 });
      console.log("result", result);
      let { status, data, pageinfo } = result;
      if (status) {
        this.serviceManegeAcceptData = data;
        this.serviceManegeAcceptPageinfo = pageinfo;
      }
    },

    /**
     * @description: 获取审核中数据
     */
    async getServiceManegeReviewData() {
      let result = await serviceManegeReview({ id: this.userInfo.id, page: 1 });
      console.log("result", result);
      let { status, data, pageinfo } = result;
      if (status) {
        this.serviceManegeReviewData = data;
        this.serviceManegeReviewPageinfo = pageinfo;
      }
    },

    /**
     * @description: 获取其他数据
     */
    async getServiceManegeOtherData() {
      let result = await serviceManegeOther({ id: this.userInfo.id, page: 1 });
      console.log("result", result);
      let { status, data, pageinfo } = result;
      if (status) {
        this.serviceManegeOtherData = data;
        this.serviceManegeOtherPageinfo = pageinfo;
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
    padding: 40px 0 0 100px;
    flex: 1;
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
