<template>
  <div>
    <div class="content_row">
      <span class="left_title">纳税识别号</span>
      <input placeholder="请输入纳税识别号" value="" />
    </div>
    <div class="content_row">
      <span class="left_title" style="letter-spacing:5px;"> 法人代表</span>
      <input placeholder="请输入法人代表的姓名" value="" />
    </div>
    <div class="content_row">
      <span class="left_title"> 法人身份证</span>
      <input placeholder="请输入法人身份证" value="" />
    </div>
    <div class="content_row">
      <span class="left_title" style="letter-spacing:5px;"> 营业执照</span>
      <div class="span_grey">
        <p>
          请上传清晰、真实的营业执照的照片，请不要在照片上添加文字、数字、网址等内容，最多上传4张，每张最大5M
        </p>
        <el-upload action="#" list-type="picture-card" :auto-upload="false" class="uploadImg">
          <div slot="file" slot-scope="{ file }">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
          <i slot="default" class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </div>
    </div>

    <el-button>保存</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>
<style>
.el-upload-list__item-actions {
  position: absolute;
  width: 100%;
  height: 100%;
  right: 0;
  top: 0;
  cursor: default;
  text-align: center;
  color: #fff;
  opacity: 0;
  font-size: 20px;
  vertical-align: middle;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-transition: opacity 0.3s;
  transition: opacity 0.3s;
}
.el-upload-list__item {
    height:58px;
    width:80px;
}
</style>
<style lang="scss" scope>
.content_row {
  margin-top: 30px;
  display: flex;
  //   line-height: 50px;
  .left_title {
    min-width: 110px;
    display: inline-block;
    height: 22px;
    font-size: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 1);
    line-height: 50px;
  }
  .span_grey {
    width: 540px;
    font-size: 16px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
    line-height: 24px;
    margin-left: 25px;
    .uploadImg{
        display:flex;
        flex-direction:row-reverse;
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
.el-button {
  width: 340px;
  height: 56px;
  background: rgba(29, 188, 118, 1);
  font-size: 22px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  margin-top: 50px;
}
</style>
