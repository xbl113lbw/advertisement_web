<!--
 * @Author: liyh
 * @Date: 2020-03-31 14:04:16
 * @LastEditors: liyh
 * @LastEditTime: 2020-04-04 22:12:32
 -->
<template>
  <div class="listItemBox">
    <div class="leftBox"></div>
    <div class="centerBox">
      <div :class="visited(itemData.id)">{{itemData.title}}</div>
      <div>中国最大的以信息和知识为核心的互联网综中国最大的以信息和知识为核心的互联网综核心的互联网综萨达所大萨达所大</div>
      <div class="price">
        <span>{{itemData.price}}</span>
        <span>/m²</span>
      </div>
    </div>
    <div class="rightBox">
      <div class="btnBox">
        <div></div>
        <div></div>
        <div>查看电话号码</div>
      </div>
      <div class="textBox">
        <div>{{itemData.date}}</div>
        <div>|</div>
        <div>{{itemData.browseCount}}人浏览过</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListItem",
  props: {
    itemData: {
      type: Object
    }
  },
  methods: {
    visited(id) {
      //判断是否被点击过
      let visitedObj = JSON.parse(sessionStorage.getItem("visitedObj"));
      if (visitedObj && visitedObj[id]) {
        return "visited";
      }
    }
  },
  data() {
    return {};
  },
  components: {}
};
</script>

<style lang="scss">
.listItemBox {
  box-sizing: content-box;
  padding: 40px 0;
  height: 180px;
  display: flex;
  cursor: pointer;
  .leftBox {
    width: 240px;
    height: 180px;
    border: 1px solid red;
  }
  .centerBox {
    margin-left: 30px;
    width: 510px;
    height: 180px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & div:nth-child(1) {
      font-family: PingFangSC-Semibold, PingFang SC;
      width: 488px;
      height: 42px;
      font-size: 30px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .visited {
      color: rgba(0, 0, 0, 0.4) !important;
    }
    & div:nth-child(2) {
      font-family: PingFangSC-Regular, PingFang SC;
      width: 510px;
      font-size: 22px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.4);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .price {
      color: #f96d3f;
      font-family: PingFangSC-Semibold, PingFang SC;
      & span:first-child {
        font-size: 30px;
      }
      & span:last-child {
        font-size: 20px;
      }
    }
  }
  .rightBox {
    font-family: PingFangSC-Regular, PingFang SC;
    margin-left: 120px;
    display: flex;
    align-items: center;
    width: 200px;
    height: 180px;
    flex-direction: column;
    justify-content: center;
    .btnBox {
      width: 200px;
      height: 54px;
      background: #1dbc76;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      color: #ffffff;
      font-weight: 400;
      & div:nth-child(1) {
        width: 24px;
        height: 24px;
        background: url("./../../../assets/serviceList/phone.png") no-repeat;
        background-size: 100% 100%;
      }
      & div:nth-child(2) {
        width: 1px;
        height: 30px;
        background: rgba(255, 255, 255, 1);
        opacity: 0.4;
        margin: 0 20px 0 10px;
      }
    }
    .textBox {
      color: #000000;
      opacity: 0.4;
      display: flex;
      font-size: 14px;
      margin-top: 8px;
      & div:nth-child(2) {
        width: 1px;
        background: rgba(255, 255, 255, 1);
        margin: 0 10px 0 10px;
      }
    }
  }
}
</style>
