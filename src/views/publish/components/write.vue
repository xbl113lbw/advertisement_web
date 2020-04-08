<template>
  <div class="write">
    <div class="formItem">
      <div class="formItem-title">基础信息</div>
      <div class="formItem-line">
        <span>所属分类</span>
        <span>展会服务</span>
      </div>
      <div class="formItem-line">
        <span>公司名称</span>
        <span>深圳市大吉大利有限公司</span>
      </div>
      <div class="formItem-line">
        <span>所属地区</span>
        <span>广东省 - 深圳市</span>
      </div>
      <div class="formItem-line">
        <span>具体地址</span>
        <input type="text" placeholder="请输入公司详细地址" v-model="address" />
      </div>
    </div>
    <div class="formItem">
      <div class="formItem-title">详细介绍</div>
      <div class="formItem-line">
        <span>信息标题</span>
        <input type="text" placeholder="请输入信息标题" v-model="title" />
      </div>
      <div class="formItem-line">
        <span>价格</span>
        <div>
          <input type="number" placeholder="请输入数值" style="width: 160px;" v-model.number="num" />
          <span>/</span>
          <input type="text" placeholder="请输入单位" style="width: 160px;" v-model="unit" />
        </div>
      </div>
      <div class="formItem-line" style="display:flex;align-items: flex-start">
        <span>图片添加</span>
        <div>
          <p>请上传清晰、实拍的图片，请不要在图片上添加文字、数字、网址等内容，请勿上传名片、二维码、自拍照等无关图片，最少上传3张，最多上传6张，每张最大5M</p>
          <!-- <div class="uploadWrap">
            <div class="upload">
              <img src="../../../assets/publish/uploadImg.png" alt />
              <span>+ 上传图片</span>
              <input type="file" @change="uploadImg" multiple :disabled="imgLists.length >=6" />
            </div>
            <ul>
              <li v-for="(item,index) in showImgList" :key="index">
                <img :src="item" alt />
              </li>
            </ul>
          </div>-->
          <UploadPicture></UploadPicture>
        </div>
      </div>
      <div class="formItem-line" style="display:flex;align-items: flex-start">
        <span>信息标题</span>
        <div>
          <textarea placeholder="可以介绍一下工作流程、团队优势、过往大型案例等，详细的描述会大大提升客户的兴趣与信任度！" v-model="msg"></textarea>
        </div>
      </div>
    </div>
    <div class="formItem" style="margin-bottom: 50px;">
      <div class="formItem-title">联系方式</div>
      <div class="formItem-line">
        <span>联系人</span>
        <input type="text" placeholder="请输入联系人姓名" v-model="name" />
      </div>
      <div class="formItem-line">
        <span>联系电话</span>
        <input type="text" placeholder="请输入联系电话" v-model="phone" />
      </div>
    </div>
    <button class="submit" @click="submit">发布信息</button>
  </div>
</template>

<script>
// import { uploadPicture } from "@/service/commonApi";
import UploadPicture from "@/components/UploadPicture";
// import axios from "axios";
export default {
  name: "write",
  data() {
    return {
      address: "",
      title: "",
      num: null,
      unit: "",
      msg: "",
      name: "",
      phone: null,
      imgLists: [],
      showImgList: []
    };
  },
  components: { UploadPicture },
  methods: {
    // 上传图片
    // async uploadImg(e) {
    //   let files = e.target.files;
    //   console.log("files", files);

    //   let formData = new FormData();
    //   //   formData.append("name[]", files[0], files[0].name);
    //   for (var i = 0; i < files.length; i++) {
    //     formData.append("name[]", files[i]);
    //   }
    //   let result = await uploadPicture(formData);
    //   console.log("result", result);

    //   e.target.value = "";
    //   return;
    //   if (files.length > 6) {
    //     this.$message.error("最多上传6张图片");
    //     return;
    //   }
    //   if (this.imgLists.length + files.length > 6) {
    //     this.$message.error("最多上传6张图片");
    //     return;
    //   }
    //   for (let item of files) {
    //     const isImg = item.type === "image/png" || item.type === "image/jpeg";
    //     if (!isImg) {
    //       this.$message.error("请上传图片");
    //       return;
    //     }
    //     let size = item.size;
    //     if (size / (1024 * 1024) < 5) {
    //       this.imgLists.push(item);
    //       let reader = new FileReader();
    //       reader.readAsDataURL(item);
    //       reader.onload = e => {
    //         let result = e.target.result;
    //         this.showImgList.push(result);
    //       };
    //     } else {
    //       this.$message.error("请上传5M以内大小的图片");
    //     }
    //   }
    // },
    // 提交按钮
    submit() {
      console.log("this.showImgList", this.showImgList);
      return;
      if (!this.address) {
        this.$message.error("请输入公司详细地址");
        return;
      }
      if (!this.title) {
        this.$message.error("请输入信息标题");
        return;
      }
      if (!this.num) {
        this.$message.error("请输入数值");
        return;
      }
      if (!this.unit) {
        this.$message.error("请输入单位");
        return;
      }
      if (this.imgLists.length > 6 || this.imgLists.length < 3) {
        this.$message.error("请根据提示上传图片");
        return;
      }
      if (!this.msg) {
        this.$message.error("请输入信息标题");
        return;
      }
      if (!this.name) {
        this.$message.error("请输入联系人姓名");
        return;
      }
      if (!this.phone) {
        this.$message.error("请输入联系电话");
        return;
      }
      const telephoneReg = /^1[3456789]\d{9}$/;
      if (!telephoneReg.test(this.phone)) {
        this.$message.error("联系电话错误，请重新输入");
        return;
      }
      console.log(1);
    }
  }
};
</script>

<style lang="scss" scoped>
.write {
  margin-top: 80px;
  text-align: left;

  .formItem {
    margin-bottom: 60px;

    &:last-child {
      margin-bottom: 50px;
    }

    .formItem-title {
      margin-bottom: 40px;
      font-size: 24px;
      font-weight: 600;
      color: rgba(0, 0, 0, 1);
      line-height: 33px;
    }

    .formItem-line {
      display: flex;
      align-items: center;
      margin-bottom: 40px;

      &:last-child {
        margin-bottom: 0;
      }

      span {
        font-size: 16px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.8);
        line-height: 22px;

        &:first-child {
          min-width: 65px;
          height: 50px;
          line-height: 50px;
          margin-right: 30px;
          font-weight: 600;
          text-align-last: justify;
        }
      }

      p {
        width: 600px;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.6);
        line-height: 24px;
      }

      input {
        width: 340px;
        height: 50px;
        padding-left: 20px;
        color: rgba(0, 0, 0, 0.8);
        border: 1px solid rgba(0, 0, 0, 0.2);
      }

      .uploadWrap {
        display: flex;
        align-items: flex-end;

        .upload {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 160px;
          height: 120px;
          margin-top: 20px;
          margin-right: 20px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          cursor: pointer;

          img {
            width: 55px;
            height: 40px;
            margin-bottom: 16px;
          }

          span {
            font-size: 14px;
            font-weight: 600;
            line-height: 20px;
            color: rgba(0, 0, 0, 0.8);
          }

          input {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
          }
        }

        ul {
          display: flex;
          align-items: center;

          li {
            width: 80px;
            height: 60px;
            margin-right: 10px;

            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }

      textarea {
        width: 600px;
        height: 160px;
        padding: 13px 20px;
        font-size: 16px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        text-align: justify;
        resize: none;
      }
    }
  }

  .submit {
    width: 340px;
    height: 56px;
    font-size: 22px;
    color: rgba(255, 255, 255, 0.4);
    background: rgba(29, 188, 118, 1);
    cursor: pointer;

    &:hover {
      color: #fff;
    }
  }
}
</style>
