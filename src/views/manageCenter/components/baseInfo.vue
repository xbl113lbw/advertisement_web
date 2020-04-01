<template>
  <div>
    <div class="content_row">
      <span class="left_title">企业名称</span>
      <p class="P">深圳市大吉大利公司</p>
    </div>
    <div class="content_row">
      <span class="left_title">企业邮箱</span>
      <p class="P">434353874@dajidali.com</p>
    </div>
    <div class="content_row">
      <span class="left_title">具体地址</span>
      <input placeholder="请输入企业地址" v-model="address" />
    </div>
    <div class="content_row">
      <span class="left_title" style="letter-spacing:5px;">联系人</span>
      <input placeholder="请输入联系人姓名" v-model="name" />
    </div>
    <div class="content_row">
      <span class="left_title">联系电话</span>
      <input placeholder="请输入联系人电话" v-model="phone" />
    </div>
    <div class="button">
      <el-button @click="save">保存</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      address: "",
      name: "",
      phone: ""
    };
  },
  methods: {
    save() {
      if (this.phone) {
        console.log(this.phone);
      } else {
        this.$message.error("联系电话错误，请重新输入");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.content_row {
  margin-top: 30px;
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 1);
  .left_title {
    min-width: 69px;
    display: inline-block;
    font-size: 16px;
    font-weight: 600;
  }
  .P {
    font-size: 16px;
    font-weight: 400;
    margin-left: 30px;
  }
  .span_grey {
    width: 540px;
    font-size: 16px;
    font-weight: 400;
    text-align: left;
    color: rgba(0, 0, 0, 0.6);
    line-height: 24px;
    margin-left: 25px;
    .uploadImg {
      display: flex;
      flex-direction: row-reverse;
    }
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
    border: 0;
  }
}
.button {
  text-align: left;
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
</style>
