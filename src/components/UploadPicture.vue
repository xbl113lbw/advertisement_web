<!--
 * @Author: liyh
 * @Date: 2020-04-08 16:39:32
 * @LastEditors: liyh
 * @LastEditTime: 2020-04-08 17:47:45
 -->
<!--
 * @Author: liyh
 * @Date: 2020-03-31 10:39:35
 * @LastEditors: liyh
 * @LastEditTime: 2020-04-07 16:32:54
 -->
<template>
  <div class="uploadWrap">
    <div class="upload">
      <img src="@/assets/publish/uploadImg.png" alt />
      <span>+ 上传图片</span>
      <input type="file" @change="uploadImg" multiple :disabled="imgLists.length >=6" />
    </div>
    <ul>
      <li v-for="(item,index) in showImgList" :key="index">
        <img @click="deleteImg(index)" class="delete" src="@/assets/delete.png" alt />
        <img :src="item" alt />
      </li>
    </ul>
  </div>
</template>

<script>
import { uploadPicture } from "@/service/commonApi";

export default {
  name: "UploadPicture",
  data() {
    return {
      imgLists: [],
      showImgList: []
    };
  },
  methods: {
    /**
     * @description: 删除图片
     * @param {type} 当前index
     */

    deleteImg(index) {
      console.log("index", index);
      this.imgLists.splice(index, 1);
      this.showImgList.splice(index, 1);
      //   console.log("this.imgLists", this.imgLists, this.showImgList);
    },
    // 上传图片
    async uploadImg(e) {
      let files = e.target.files;
      console.log("files", files);
      if (!files.length) return;
      if (files.length > 6) {
        this.$message.error("最多上传6张图片");
        return;
      }
      if (this.imgLists.length + files.length > 6) {
        this.$message.error("最多上传6张图片");
        return;
      }
      let formData = new FormData();
      for (var i = 0; i < files.length; i++) {
        formData.append("name[]", files[i]);
      }
      let result = await uploadPicture(formData);
      console.log("result", result);
      for (let item of files) {
        const isImg = item.type === "image/png" || item.type === "image/jpeg";
        if (!isImg) {
          this.$message.error("请上传图片");
          return;
        }
        let size = item.size;
        if (size / (1024 * 1024) < 5) {
          this.imgLists.push(item);
          let reader = new FileReader();
          reader.readAsDataURL(item);
          reader.onload = e => {
            let result = e.target.result;
            this.showImgList.push(result);
          };
        } else {
          this.$message.error("请上传5M以内大小的图片");
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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
      position: relative;
      cursor: pointer;
      &:hover .delete {
        display: block;
      }
      .delete {
        display: none;
        width: 20px;
        height: 20px;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1000;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
