<template>
  <div>
    <div class="content_row">
      <span class="left_title">纳税识别号</span>
      <input placeholder="请输入纳税识别号" v-model="assestInfo.taxcode" />
    </div>
    <div class="content_row">
      <span class="left_title" style="letter-spacing:4px;">法人代表</span>
      <input placeholder="请输入法人代表的姓名" v-model="assestInfo.owner" />
    </div>
    <div class="content_row">
      <span class="left_title">法人身份证</span>
      <input placeholder="请输入法人身份证" v-model="assestInfo.ownerid" />
    </div>
    <div class="content_row">
      <span class="left_title" style="letter-spacing:5px;">营业执照</span>
      <div class="span_grey">
        <p>请上传清晰、真实的营业执照的照片，请不要在照片上添加文字、数字、网址等内容，最多上传4张，每张最大5M</p>
        <!-- <el-upload
          action="#"
          multiple
          :limit="4"
          list-type="picture-card"
          :auto-upload="false"
          class="uploadImg"
        >
          <div slot="file" slot-scope="{ file }">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
          <i slot="default" class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>-->
        <UploadPicture
          v-if="showUploadPictiue"
          @setImgLists="setImgLists"
          :max="4"
          :echoImg="echoImg"
        ></UploadPicture>
      </div>
    </div>
    <div class="button">
      <el-button @click="save">保存</el-button>
    </div>
  </div>
</template>
<script>
import UploadPicture from "@/components/UploadPicture";
import { getAttestInfo, editAttestInfo } from "@/service/userApi";
import { mapState } from "vuex";

export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      assestInfo: {
        taxcode: "",
        owner: "",
        ownerid: ""
      },
      echoImg: [],
      imgLists: [],
      showUploadPictiue: false
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    })
  },
  components: {
    UploadPicture
  },
  mounted() {
    this.getAttestInfo();
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    async getAttestInfo() {
      const loading = this.$loading();
      let assestInfoRes = await getAttestInfo({ id: this.userInfo.id });
      let { status, msg, data } = assestInfoRes;
      if (status) {
        this.assestInfo = data;
        this.echoImg = data.img;
        this.showUploadPictiue = true;
      } else {
        this.$message.error(msg);
      }
      loading.close();
    },

    setImgLists(imgLists) {
      console.log("data", imgLists);
      this.imgLists = imgLists;
    },

    /**
     * @description: 点击保存
     */
    async save() {
      let tips = {
        taxcode: "纳税识别号",
        owner: "法人代表",
        ownerid: "法人身份证"
      };
      let verfiFlag = true;
      for (const key in this.assestInfo) {
        if (!this.assestInfo[key]) {
          this.$message.error(`${tips[key]}不能为空`);
          verfiFlag = false;
          break;
        }
      }
      if (!verfiFlag) return;
      const loading = this.$loading();
      let formData = new FormData();
      formData.append("url", window.location.href);
      formData.append("id", this.userInfo.id);
      formData.append("taxcode", this.assestInfo["taxcode"]);
      formData.append("owner", this.assestInfo["owner"]);
      formData.append("ownerid", this.assestInfo["ownerid"]);
      for (var i = 0; i < this.imgLists.length; i++) {
        formData.append("name[]", this.imgLists[i]);
      }
      let editAssestInfoRes = await editAttestInfo(formData);
      let { status, msg, data } = editAssestInfoRes;
      if (status) {
        this.$message({
          message: "保存成功",
          type: "success"
        });
        this.getAttestInfo();
      } else {
        this.$message.error(msg);
      }
      loading.close();
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
  height: 58px !important;
  width: 80px !important;
  bottom: 0 !important;
}
</style>

<style lang="scss" scoped>
.content_row {
  margin-top: 30px;
  display: flex;
  align-items: baseline;
  .left_title {
    min-width: 110px;
    display: inline-block;
    font-size: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 1);
  }
  .span_grey {
    // width: 540px;
    font-size: 16px;
    font-weight: 400;
    text-align: left;
    color: rgba(0, 0, 0, 0.6);
    line-height: 24px;
    margin-left: 25px;
    .uploadImg {
      display: flex;
      flex-direction: row-reverse;
      justify-content: flex-end;
      align-items: flex-end;
      /deep/ .el-upload-list {
        height: 58px !important;
      }
      /deep/.el-upload-list__item {
        margin: 0 0 8px 10px;
      }
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
