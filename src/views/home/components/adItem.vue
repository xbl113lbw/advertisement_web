<!--
 * @Author: liyh
 * @Date: 2020-03-31 10:44:38
 * @LastEditors: liyh
 * @LastEditTime: 2020-04-14 10:18:28
 -->
<template>
  <div class="box">
    <div class="title">{{typeData.name}}</div>
    <div class="typeBox">
      <div
        v-for="(item,index) in typeData.children"
        :key="index"
        @click="changeType(index)"
        :class="['typeItem',selectIndex==index?'highLight':'']"
      >
        <span>{{item.name}}</span>
      </div>
    </div>
    <div class="itemArea">
      <div v-for="(item,index) in currentsmallType.child.slice(0,4)" :key="index" class="itemBox">
        <div v-if="currentItemData[item]" @click="toServiceInfo(item)">
          <div class="image" v-if="currentItemData[item].images[0]">
            <img :src="currentItemData[item].images[0]['img']" alt />
          </div>
          <div class="itemTitle">{{currentItemData[item].title}}</div>
          <div class="itemContent">{{common.replaceText(currentItemData[item].content)}}</div>
          <div class="itemImformation">
            <div>{{currentItemData[item].date}}</div>
            <div>{{currentItemData[item].browseCount}}人浏览过</div>
          </div>
        </div>
      </div>
    </div>
    <div class="more" @click="more">
      <span>查看更多</span>
      <img src="@/assets/home/down.png" alt />
    </div>
  </div>
</template>

<script>
import itemData from "@/data/itemData";
import common from "@/utils/common";
export default {
  name: "adItem",
  props: {
    typeData: {
      type: Object
    }
  },
  data() {
    return {
      selectIndex: 0, //当前选择的index，默认第一个,
      currentItemData: itemData,
      common: common
    };
  },
  computed: {
    currentsmallType() {
      return this.typeData["children"][this.selectIndex];
    }
  },
  methods: {
    /**
     * @description:去除<p>、</p>、<br/>标签
     * @param {type} 字符串
     * @return: 去除后的字符串
     */
    // replaceText(text) {
    //   return text.replace(/<[^>]+>/g, "");
    // },

    /**
     * @description: 切换小类类型
     * @param {type} 所在索引
     */
    changeType(index) {
      this.selectIndex = index;
    },
    /**
     * @description: 点击查看更多
     */
    more() {
      //TODO
      this.$router.push({
        path: "/serviceList",
        query: {
          bigType: this.typeData.id,
          smallType: this.typeData["children"][this.selectIndex].id
        }
      });
      window.scrollTo(0, 0);
    },
    /**
     * @description: 点击去详情
     * @params 点击的唯一id
     */
    toServiceInfo(item) {
      this.$router.push({
        path: "/serviceInfo",
        query: {
          bigType: this.typeData.id,
          smallType: this.typeData["children"][this.selectIndex].id,
          id: item
        }
      });
      window.scrollTo(0, 0);
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.box {
  width: 1200px;
  margin: 0 auto;
  margin-top: 80px;
  cursor: pointer;
  font-family: PingFangSC-Regular, PingFang SC;
  .title {
    font-size: 28px;
    font-weight: 600;
    color: rgba(0, 0, 0, 1);
    margin-bottom: 30px;
  }
  .typeBox {
    display: flex;
    justify-content: center;
    font-weight: 400;
    .typeItem {
      width: 120px;
      height: 36px;
      line-height: 36px;
      border-right: 1px solid #cccccc;
      border-top: 1px solid #cccccc;
      border-bottom: 1px solid #cccccc;
      color: #000000;
      font-size: 14px;
      cursor: pointer;
      span {
        opacity: 0.8;
      }
    }
    & .typeItem:first-child {
      border-radius: 2px 0px 0px 2px;
      border-left: 1px solid #cccccc;
    }
    & .typeItem:last-child {
      border-radius: 0px 2px 2px 0px;
    }
    .typeItem:hover span {
      color: #1dbc76;
      opacity: 1;
    }
    .highLight span {
      color: #1dbc76;
      opacity: 1;
      font-weight: 600;
    }
  }
  .itemArea {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    .itemBox {
      width: 280px;
      height: 328px;
      .image {
        width: 280px;
        height: 210px;
        background: chartreuse;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .itemTitle {
        margin-top: 20px;
        padding: 0 20px;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.8);
        text-align: left;
        width: 240px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 600;
      }
      .itemContent {
        width: 240px;
        margin-top: 6px;
        text-align: left;
        font-size: 12px;
        color: #000000;
        padding: 0 20px;
        opacity: 0.6;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .itemImformation {
        margin-top: 20px;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        color: #000000;
        padding: 0 20px;
        opacity: 0.4;
        font-size: 10px;
      }
    }
    .itemBox:hover .image {
      opacity: 0.8;
    }
  }
  .more {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      font-size: 14px;
      font-weight: 400;
      color: #000000;
      opacity: 0.4;
      display: inline-block;
      margin-right: 5px;
    }
    span:hover {
      text-decoration: underline;
    }
    img {
      width: 10px;
      display: block;
    }
  }
}
</style>