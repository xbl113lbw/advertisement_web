<template>
  <div class="serviceInfo">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>展会服务</el-breadcrumb-item>
      <el-breadcrumb-item>展会布置/搭建</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 内容详情 -->
    <div class="content">
      <div class="content-left">
        <div class="title omit">
          标题标题标题标题标题标题标题标题标题标标题标题标题标题标题标题
        </div>
        <div class="content_title">
          <p>发布时间：2020.03.19</p>
          <p>浏览人数：28人</p>
        </div>
        <div class="goods_detail">
          <div class="detail_left">
            <div class="img"></div>
            <div class="img_list">
              <swiper class="swiper" :options="swiperOption">
                <swiper-slide> 1</swiper-slide>
                <swiper-slide> 2</swiper-slide>
                <swiper-slide> 3</swiper-slide>
                <swiper-slide> 4</swiper-slide>
                <swiper-slide> 5</swiper-slide>
                <swiper-slide> 6</swiper-slide>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
              </swiper>
            </div>
          </div>
          <div class="detail_right">
            <div class="detail_row">
              <span class="left_title">联系人:</span>
              <p class="P">喵喵喵</p>
            </div>
            <div class="detail_row">
              <span class="left_title">公司名称:</span>
              <p class="P">喵喵喵的公司</p>
            </div>
            <div class="detail_row">
              <span class="left_title">公司地址:</span>
              <p class="P">
                深圳市南山区南头街道大汪山社区桃园路8号田厦金牛广场A座2601室
              </p>
            </div>
            <div class="detail_row">
              <span class="left_title">价格:</span>
              <img src="../../assets/serviceInfo/20.png" />
            </div>
            <div class="button">
              <button @click="look">
                <img src="../../assets/serviceInfo/tel.png" />
                <p>查看商家电话号码</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: "serviceInfo",
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 10,
        centeredSlides: true,
        loop: true,
        initialSlide: 1,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
        // pagination: {
        //   el: ".swiper-pagination",
        //   clickable: true
        // }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.swiper-container {
  --swiper-navigation-color: #000000; /* 单独设置按钮颜色 */
  --swiper-navigation-size: 18px; /* 设置按钮大小 */
}
.swiper-slide {
  width: 100px;
  height: 75px;
  background: #f3f3f3;
}
.swiper-slide:nth-child(2n) {
  width: 40%;
}
.swiper-slide:nth-child(3n) {
  width: 20%;
}
.serviceInfo {
  width: 1200px;
  margin: 0 auto;
  padding-top: 80px;
  font-size: 16px;
  font-weight: 400;
  color: #000000;
  .content {
    // display: flex;
    // align-items: center;
    // justify-content: space-between;
    margin-top: 40px;
    margin-bottom: 100px;
    .title {
      width: 712px;
      margin-bottom: 12px;
      font-size: 28px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      line-height: 40px;
    }
    .content-left {
      width: 900px;
      .title {
        width: 712px;
        margin-bottom: 12px;
        font-size: 28px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
        line-height: 40px;
      }
      .content_title {
        text-align: left;
        p {
          color: rgba(0, 0, 0, 0.4);
          display: inline-block;
          margin: 12px 40px 30px 0;
        }
      }
      .goods_detail {
        display: flex;
        .detail_left {
          .img {
            height: 300px;
            width: 400px;
            background: #f4f4f4;
            margin-bottom: 10px;
          }
          .img_list {
            width: 400px;
            height: 75px;
            overflow: hidden;
            display: flex;
            .img_s {
              width: 100px;
              height: 75px;
              margin: 0 5px;
              background: #f4f4f4;
            }
          }
        }
        .detail_right {
          padding: 10px 0 40px 30px;
          .detail_row {
            display: flex;
            align-items: center;
            margin-bottom: 30px;
            .left_title {
              min-width: 81px;
              display: inline-block;
              color: rgba(0, 0, 0, 0.4);
              text-align: justify;
            }
            .P {
              margin-left: 10px;
              color: rgba(0, 0, 0, 0.8);
              text-align: left;
            }
            img {
              width: 124px;
              height: 35px;
            }
          }
          .button {
            text-align: left;
            button {
              display: flex;
              justify-content: center;
              width: 310px;
              height: 72px;
              background: rgba(29, 188, 118, 1);
              font-size: 22px;
              color: rgba(255, 255, 255, 1);
              margin-top: 50px;
              p {
                display: inline-block;
                line-height: 36px;
                padding-left: 24px;
              }
              img {
                display: inline-block;
                height: 36px;
                width: 46px;
                padding-right: 10px;
                border-right: 1px solid rgba(255, 255, 255, 0.4);
              }
            }
          }
        }
      }
    }
  }
}
</style>
