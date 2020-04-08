<template>
  <div class="serviceInfo">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{bigType[0].name}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{smallType[0].name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 内容详情 -->
    <div class="content">
      <div class="content-left">
        <div class="title omit">{{detailData.title}}</div>
        <div class="content_title">
          <p>发布时间：{{detailData.date}}</p>
          <p>浏览人数：{{detailData.browseCount}}人</p>
        </div>
        <div class="goods_detail">
          <div class="detail_left">
            <div class="img"></div>
            <div class="img_list">
              <swiper class="swiper" :options="swiperOption">
                <swiper-slide>1</swiper-slide>
                <swiper-slide>2</swiper-slide>
                <swiper-slide>3</swiper-slide>
                <swiper-slide>4</swiper-slide>
                <swiper-slide>5</swiper-slide>
                <swiper-slide>6</swiper-slide>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
              </swiper>
            </div>
          </div>
          <div class="detail_right">
            <div class="detail_row">
              <span class="left_title">联系人</span>：
              <p class="P">{{detailData.contacts}}</p>
            </div>
            <div class="detail_row">
              <span class="left_title">公司名称</span>：
              <p class="P">{{detailData.companyName}}</p>
            </div>
            <div class="detail_row">
              <span class="left_title">公司地址</span>：
              <p class="P">{{detailData.companyAddress}}</p>
            </div>
            <div class="detail_row">
              <span class="left_title">价格</span>：
              <div class="price">
                <span>{{detailData.price}}</span>
                <span>/{{detailData.unit}}</span>
              </div>
            </div>
            <div class="button" @click="showPhone(detailData.phone)">
              <button>
                <img src="../../assets/serviceInfo/tel.png" />
                <p>{{phone}}</p>
              </button>
            </div>
          </div>
        </div>
        <div class="content_left_bottom">
          <el-tabs v-model="activeName" @tab-click="handleClick" id="elTabs">
            <el-tab-pane label="服务描述" name="first">
              <div class="server_dec" v-html="detailData.content"></div>
            </el-tab-pane>
            <el-tab-pane label="用户评论" name="second">
              <div class="user_discuss">
                <div class="input_div">
                  <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="对服务进行一下评价吧～"
                    v-model="textarea"
                    maxlength="100"
                    show-word-limit
                  ></el-input>
                  <el-button @click="comment">评论</el-button>
                </div>
                <div class="discuss_list">
                  <div class="discuss" v-for="item in detailData.comment" :key="item.id">
                    <div class="avter">
                      <img :src="require(`@/assets/headerNav/avatar${item.id % 4}.png`)" alt />
                    </div>
                    <div class="discuss_right">
                      <div class="phone">{{getCommenter(item.id,detailData.id)}}********</div>
                      <div class="discuss_content">{{item.text}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="content-right">
        <div class="top">
          <span class="top-title">温馨提示</span>
          <ul>
            <li>
              <img src="../../assets/serviceInfo/right-icon1.png" alt class="imgWrap" />
              <div class="textWrap">
                <span>线上沟通</span>
                <span>要与商家要先在线上进行沟通</span>
              </div>
            </li>
            <li>
              <img src="../../assets/serviceInfo/right-icon1.png" alt class="imgWrap" />
              <div class="textWrap">
                <span>线下敲定</span>
                <span>具体的细节要在线下进行敲定</span>
              </div>
            </li>
            <li>
              <img src="../../assets/serviceInfo/right-icon1.png" alt class="imgWrap" />
              <div class="textWrap">
                <span>谨慎汇款</span>
                <span>请勿在线上给服务提供者汇款</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="bottom">
          <span class="bottom-title">相关推荐</span>
          <ul>
            <li v-for="(item, index) in [1, 2, 3, 4]" :key="index">
              <img src="../../assets/logo.png" alt />
              <div class="textWrap">
                <span class="omit">标题标题标题标题…</span>
                <span>2020.03.19 ｜ 28人浏览过</span>
                <span>展会服务 > 展会布置/搭建</span>
                <span>
                  20元
                  <span>/m²</span>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import itemData from "@/data/itemData";
import typeData from "@/data/typeData";
import common from "@/utils/common";
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
      },
      phone: "查看商家电话号码",
      bigType: [],
      smallType: [],
      detailData: {},
      textarea: "",
      activeName: "first"
    };
  },
  created() {
    this.bigType = typeData.filter(
      item => item.id == this.$route.query.bigType
    ); //根据id大类
    this.smallType = this.bigType[0].children.filter(
      item => item.id == this.$route.query.smallType
    ); //根据id小类
    this.detailData = itemData[this.$route.query.id]; //根据id匹配详情数据
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    /**
     * @description: 点击查看商家号码
     */
    showPhone(phone) {
      if (common.isLogin()) {
        this.phone = phone.replace(/^(.{3})(.*)(.{4})$/, "$1 $2 $3");
      } else {
        this.$router.push({
          path: "/login"
        });
      }
    },
    /**
     * @description: 点击评论
     */
    comment() {
      if (!this.textarea) {
        this.$message.error({
          message: "请输入评论内容",
          duration: 1000
        });
        return;
      }
      this.textarea = "";
      this.$message({
        message: "评论成功",
        type: "success"
      });
    },

    /**
     * @description: 随机获取用户名
     * @param {type} id
     * @return:
     */
    getCommenter(id, parentId) {
      let result = parentId + id;
      if (result > 999) {
        result = result % 1000;
      }
      return result;
    }
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
/deep/.el-breadcrumb__item:hover {
  text-decoration: underline;
}

/deep/#tab-first:hover {
  color: #000000;
  opacity: 0.8;
}
/deep/#tab-second:hover {
  color: #000000;
  opacity: 0.8;
}

.serviceInfo {
  width: 1200px;
  margin: 0 auto;
  padding-top: 80px;
  font-size: 16px;
  font-weight: 400;
  color: #000000;
  cursor: pointer;
  .content {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    margin-bottom: 100px;

    .title {
      width: 712px;
      font-size: 28px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      line-height: 40px;
      text-align: left;
    }

    .content-left {
      width: 840px;

      .title {
        width: 712px;
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
          padding: 10px 160px 40px 30px;

          .detail_row {
            display: flex;
            align-items: center;
            color: rgba(0, 0, 0, 0.4);
            // justify-content: space-between;
            margin-top: 30px;
            .price {
              margin-left: 10px;
              color: #f96d3f;
              font-family: PingFangSC-Semibold, PingFang SC;
              & span:first-child {
                font-size: 30px;
              }
              & span:last-child {
                font-size: 20px;
              }
            }
            &:nth-child(4n + 4) {
              margin-top: 20px;
            }
            .content-left {
              width: 740px;
              background: #1dbc76;

              .title {
                width: 712px;
                margin-bottom: 12px;
                font-size: 28px;
                font-weight: 600;
                color: rgba(0, 0, 0, 0.8);
                line-height: 40px;
              }
            }

            .left_title {
              min-width: 81px;
              display: inline-block;
              color: rgba(0, 0, 0, 0.4);
              text-align-last: justify;
            }

            .P {
              margin-left: 10px;
              color: rgba(0, 0, 0, 0.8);
              text-align: left;
            }
            img {
              margin-left: 10px;
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
              margin-top: 40px;
              cursor: pointer;

              p {
                display: inline-block;
                line-height: 36px;
                padding-left: 24px;
                width: 205px;
                font-size: 22px;
                text-align: center;
              }
              img {
                display: inline-block;
                height: 36px;
                width: 46px;
                padding-right: 10px;
                border-right: 1px solid rgba(255, 255, 255, 0.4);
              }
            }
            button:hover {
              background: #1aa869;
            }
          }
        }
      }
      .content_left_bottom {
        padding-top: 40px;
        margin-right: 100px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        /deep/.el-tabs__item.is-active {
          color: rgba(0, 0, 0, 0.8);
          border: none;
        }
        /deep/.el-tabs__item {
          font-weight: 600;
          font-size: 20px;
          color: rgba(0, 0, 0, 0.2);
        }
        /deep/.el-tabs__nav-wrap::after {
          background: #ffffff;
        }
        /deep/.el-tabs__active-bar {
          background: #fff;
        }
        .server_dec {
          font-size: 16px;
          color: rgba(0, 0, 0, 0.6);
          margin-top: 14px;
          text-align: left;
          /deep/p {
            margin-top: 16px;
          }
          & /deep/p:first-child {
            margin-top: 0;
          }
        }
        .user_discuss {
          padding: 30px 0 100px 0;
          .input_div {
            text-align: right;
            .el-textarea {
              height: 100px;
              /deep/.el-textarea__inner {
                height: 100px;
              }
            }
            .el-button {
              margin-top: 20px;
              width: 120px;
              height: 40px;
              background: rgba(29, 188, 118, 1);
              color: rgba(255, 255, 255, 1);
            }
          }
          .discuss_list {
            padding: 10px 0 0 0;
            display: flex;
            flex-direction: column;
            .discuss {
              display: flex;
              width: 740px;
              padding: 30px 0;
              border-bottom: 1px solid rgba(0, 0, 0, 0.1);
              .avter {
                height: 44px;
                width: 44px;
                border-radius: 50%;
                background: #567867;
                img {
                  width: 100%;
                  height: 100%;
                  display: block;
                }
              }
              .discuss_right {
                margin: 6px 0 0 16px;
                flex: 1;
                .phone {
                  text-align: left;
                  font-size: 14px;
                  color: rgba(0, 0, 0, 0.6);
                }
                .discuss_content {
                  color: rgba(0, 0, 0, 0.8);
                  margin-top: 7px;
                  text-align: left;
                }
              }
            }
            .discuss:last-child {
              border-bottom: 0;
            }
          }
        }
      }
    }

    .content-right {
      .top {
        margin-bottom: 65px;
        margin-left: 60px;
        padding: 24px 30px 60px;
        border: 1px solid #e5e5e5;
        text-align: left;

        .top-title {
          display: inline-block;
          margin-bottom: 18px;
          font-size: 20px;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.8);
          line-height: 28px;
        }

        ul {
          padding-top: 30px;
          border-top: 1px solid rgba(0, 0, 0, 0.1);

          li {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 42px;
            padding-right: 4px;

            &:last-child {
              margin-bottom: 0;
            }

            .imgWrap {
              width: 34px;
              height: 34px;
              margin-right: 20px;
            }

            .textWrap {
              display: flex;
              flex-direction: column;
              align-items: flex-start;

              span {
                &:first-child {
                  margin-bottom: 2px;
                  font-size: 18px;
                  color: rgba(0, 0, 0, 0.6);
                  line-height: 25px;
                }

                &:last-child {
                  font-size: 14px;
                  color: rgba(0, 0, 0, 0.3);
                  line-height: 20px;
                }
              }
            }
          }
        }
      }

      .bottom {
        padding-top: 40px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        text-align: left;

        .bottom-title {
          display: inline-block;
          margin-bottom: 30px;
          font-size: 20px;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.8);
          line-height: 28px;
        }

        ul {
          li {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 30px;

            img {
              width: 160px;
              height: 120px;
              margin-right: 20px;
              background: #1dbc76;
            }

            .textWrap {
              display: flex;
              flex-direction: column;
              align-items: flex-start;

              span {
                max-width: 180px;
                margin-bottom: 4px;
                font-size: 14px;
                color: rgba(0, 0, 0, 0.4);
                line-height: 20px;

                &:first-child {
                  margin-bottom: 8px;
                  font-size: 20px;
                  color: rgba(0, 0, 0, 0.8);
                  line-height: 28px;
                }

                &:last-child {
                  margin-top: 10px;
                  font-size: 20px;
                  font-weight: 600;
                  color: #f96d3f;
                  line-height: 28px;

                  span {
                    font-size: 14px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
