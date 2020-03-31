<!--
 * @Author: liyh
 * @Date: 2020-03-31 10:39:35
 * @LastEditors: liyh
 * @LastEditTime: 2020-03-31 10:43:03
 -->
<!--
 * @Author: liyh
 * @Date: 2020-03-31 10:08:12
 * @LastEditors: liyh
 * @LastEditTime: 2020-03-31 10:38:24
 -->
<!--
 * @Author: liyh
 * @Date: 2020-03-30 11:04:57
 * @LastEditors: liyh
 * @LastEditTime: 2020-03-31 10:32:02
 -->
<template>
  <div class="searchBox">
    <div class="logo">
      <img src="@/assets/home/logo.png" alt />
    </div>
    <div class="searchArea">
      <div class="searchBox">
        <div class="searchLogo"></div>
        <div class="inputArea">
          <input type="text" placeholder="宣传资料印刷" />
        </div>
        <div class="searchBtn">搜索</div>
        <div class="recommendBox">
          <span>LED显示屏</span>
          <span>灯箱/招牌</span>
          <span>户外广告</span>
          <span>背景/形象墙</span>
          <span>多媒体互动</span>
        </div>
      </div>
    </div>
    <div class="publishBox">免费发布信息</div>
  </div>
</template>

<script>
export default {
  name: "Search"
};
</script>

<style lang="scss" scoped>
.searchBox {
  width: 1200px;
  height: 120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  .logo {
    width: 156px;
    height: 42px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .searchArea {
    margin-left: 168px;
    margin-right: 50px;
    position: relative;

    .searchBox {
      width: 540px;
      height: 40px;
      border: 2px solid #1dbc76;
      padding-left: 14px;
      display: flex;
      .searchLogo {
        width: 14px;
        height: 15px;
        background: url("./../assets/home/search.png") no-repeat;
        background-size: 100% 100%;
        margin-right: 10px;
      }
      .inputArea {
        flex: 1;
        input {
          width: 100%;
          height: 100%;
        }
      }
      .searchBtn {
        width: 96px;
        height: 40px;
        background: #1dbc76;
        line-height: 40px;
        color: #ffffff;
        font-size: 16px;
      }
      .searchBtn:hover {
        background: #1aa869;
      }
    }
    .recommendBox {
      position: absolute;
      bottom: -32px;
      span {
        margin-right: 16px;
        font-size: 12px;
        color: #000000;
      }
      & span:nth-child(1) {
        opacity: 0.2;
      }
      & span:nth-child(2) {
        opacity: 0.8;
      }
      & span:nth-child(3) {
        opacity: 0.2;
      }
      & span:nth-child(4) {
        color: #f96d3f;
      }
      & span:nth-child(5) {
        opacity: 0.2;
      }
    }
  }

  .publishBox {
    width: 146px;
    height: 40px;
    background: #f66f42;
    line-height: 40px;
    color: #ffffff;
    font-size: 16px;
  }
  .publishBox:hover {
    background: #dc633b;
  }
}
</style>
