<template>
  <div class="serviceInfo">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{bigType[0].name}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{smallType[0].name}}</el-breadcrumb-item>
    </el-breadcrumb>-->
    <!-- 面包屑 -->
    <div class="breadcrumbBox">
      <div class="breadcrumbItem" v-for="(item,index) in breadcrumbData" :key="index">
        <span @click="breadcrumbClick(index)">{{item}}</span>
        <div v-if="index!=breadcrumbData.length-1" class="arrow_right">></div>
      </div>
    </div>
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
            <div class="img">
              <img :src="detailData.images[currentImgIndex].img" alt />
              <div class="total">{{currentImgIndex+1}}/{{detailData.images.length}}</div>
            </div>
            <div class="img_list">
              <swiper
                ref="mySwiper"
                class="swiper"
                :options="swiperOption"
                @click-slide="smallImgClick"
              >
                <swiper-slide v-for="item in detailData.images" :key="item.id">
                  <img :src="item.img" alt />
                </swiper-slide>
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
                      <div class="phone">{{getCommenter()}}********</div>
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
            <li v-for="(item, index) in recommendData" :key="index" @click="toServiceInfo(item)">
              <img v-if="item.images[0]" :src="item.images[0].img" alt />
              <div class="textWrap">
                <span class="omit">{{item.title}}</span>
                <span>{{item.date}} ｜ {{item.browseCount}}人浏览过</span>
                <span>{{item.bigTypeName}} > {{item.smallTypeName}}</span>
                <span>
                  {{item.price}}
                  <span>/{{item.unit}}</span>
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
        },
        on: {
          slideChangeTransitionStart: () => {
            // 通过$refs获取对应的swiper对象
            this.$nextTick(() => {
              let swiper =
                this.$refs.mySwiper && this.$refs.mySwiper.swiperInstance;
              let i = swiper.realIndex;
              console.log("i", i);
              this.currentImgIndex =
                i - 1 < 0 ? this.detailData.images.length - 1 : i - 1;
            });
          }
        }
      },
      breadcrumbData: ["首页"],
      phone: "查看商家电话号码",
      bigType: [],
      smallType: [],
      detailData: {},
      textarea: "",
      activeName: "first",
      recommendData: [],
      currentImgIndex: 0 //默认第一张
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
    this.breadcrumbData.push(this.bigType[0].name, this.smallType[0].name);
    this.getRecommend();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    /**
     * @description:获取相关推荐数据
     */
    getRecommend() {
      let tempArr = [];
      for (const key in itemData) {
        tempArr.push(key);
      }
      let recommendArr = common.getRandomArrayElements(tempArr, 4); //随即取出4个推荐元素
      let recommendData = [];
      for (let index = 0; index < recommendArr.length; index++) {
        const element = recommendArr[index];
        recommendData.push(itemData[element]);
      }
      //根据id找出大类id、name和小类id、name
      let recommendMapData = recommendData.map(item => {
        let outerName = ""; //记录第一层循环的name
        let outerId = 0; //记录第一层循环的id
        let innerName = ""; //记录第二层循环的name
        let innerId = 0; //记录第二层循环的id
        let outerLength = typeData.length;
        /*第一层循环*/
        outer: for (
          let outerIndex = 0;
          outerIndex < outerLength;
          outerIndex++
        ) {
          const outerElement = typeData[outerIndex];
          //记录第一层循环的id和name
          outerId = outerElement.id;
          outerName = outerElement.name;
          let innerLength = outerElement.children.length;
          /*第二层循环*/
          for (let innerIndex = 0; innerIndex < innerLength; innerIndex++) {
            const innerElement = outerElement.children[innerIndex];
            //记录第二层循环的id和name
            innerId = innerElement.id;
            innerName = innerElement.name;
            if (innerElement.child.includes(item.id)) {
              //找到了，直接跳出两层循环
              break outer;
            }
          }
        }
        return {
          ...item,
          bigTypeName: outerName,
          bigTypeId: outerId,
          smallTypeName: innerName,
          smallTypeId: innerId
        };
      });
      this.recommendData = recommendMapData;
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
    getCommenter() {
      let endRandomNum = Math.round(Math.random() * 9); //尾数随机数
      let arr = [3, 5, 6, 8, 9];
      let index = Math.floor(Math.random() * arr.length);
      let centerRandomNum = arr[index]; //中间随机数
      return `1${centerRandomNum}${endRandomNum}`;
    },
    /**
     * @description: 点击面包屑跳转
     */
    breadcrumbClick(index) {
      console.log("index", index);
      if (index == 0) {
        this.$router.push({ path: "/" });
      } else if (index == 1) {
        //向HeaderNav组件派发事件，此操作相当于切换了nav的大类
        this.$root.event.$emit("navChangeEmit", this.$route.query.bigType - 1);
      } else if (index == 2) {
        this.$router.push({
          path: "/serviceList",
          query: {
            bigType: this.$route.query.bigType,
            smallType: this.$route.query.smallType
          }
        });
      }
    },
    /**
     * @description: 点击相关推荐
     */

    toServiceInfo(item) {
      console.log("item", item);
      this.$router.replace({
        path: "/serviceInfo",
        query: {
          bigType: item.bigTypeId,
          smallType: item.smallTypeId,
          id: item.id
        }
      });
      window.scrollTo(0, 0);
      window.location.reload();
    },
    /**
     * @description: 点击小图
     */
    smallImgClick(a, b) {
      console.log("i", a, b);
      this.currentImgIndex = b;
    }
  }
};
</script>

<style lang="scss" scoped>
.swiper-container {
  --swiper-navigation-color: #ffffff; /* 单独设置按钮颜色 */
  --swiper-navigation-size: 18px; /* 设置按钮大小 */
}
.swiper-button-prev {
  width: 30px;
  height: 75px;
  background: rgba(0, 0, 0, 1);
  opacity: 0.6;
  position: absolute;
  left: 0;
  top: 10px;
}
.swiper-button-next {
  width: 30px;
  height: 75px;
  background: rgba(0, 0, 0, 1);
  opacity: 0.6;
  position: absolute;
  right: 0;
  top: 10px;
}

.swiper-slide {
  width: 100px;
  height: 75px;
  background: #f3f3f3;
  img {
    width: 100%;
    height: 100%;
    display: inline-block;
  }
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
  font-family: PingFangSC-Regular, PingFang SC;
  width: 1200px;
  margin: 0 auto;
  padding-top: 80px;
  font-size: 16px;
  font-weight: 400;
  color: #000000;
  cursor: pointer;
  .breadcrumbBox {
    cursor: pointer;
    display: flex;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.4);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    .breadcrumbItem {
      display: flex;
      .arrow_right {
        margin: 0 6px;
      }
    }
    .breadcrumbItem:hover span {
      text-decoration: underline;
    }
  }
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
            position: relative;
            .total {
              position: absolute;
              width: 40px;
              height: 22px;
              background: rgba(0, 0, 0, 1);
              border-radius: 2px;
              opacity: 0.6;
              bottom: 13px;
              right: 18px;
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              text-align: center;
              line-height: 22px;
            }
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
