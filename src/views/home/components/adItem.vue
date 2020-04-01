<!--
 * @Author: liyh
 * @Date: 2020-03-31 10:44:38
 * @LastEditors: liyh
 * @LastEditTime: 2020-03-31 13:48:37
 -->
<template>
  <div class="box">
    <div class="title">广告传媒</div>
    <div class="typeBox">
      <div
        v-for="(iten,index) in [1,2,3,4]"
        :key="index"
        @click="changeType(index)"
        :class="['typeItem',selectIndex==index?'highLight':'']"
      >
        <span>导视系统设计</span>
      </div>
    </div>
    <div class="itemArea">
      <div v-for="(iten,index) in [1,2,3,4]" :key="index" class="itemBox">
        <div class="image"></div>
        <div class="itemTitle">标题标题标题标题标题标题…</div>
        <div class="itemContent">中国最大的以信息和知识为核心的互联…</div>
        <div class="itemImformation">
          <div>2020.03.18</div>
          <div>28人浏览过</div>
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
export default {
  name: "adItem",
  data() {
    return {
      selectIndex: 0 //当前选择的index，默认第一个
    };
  },
  methods: {
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
        color: #000000;
        opacity: 0.8;
        text-align: left;
      }
      .itemContent {
        margin-top: 6px;
        text-align: left;
        font-size: 12px;
        color: #000000;
        padding: 0 20px;
        opacity: 0.6;
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