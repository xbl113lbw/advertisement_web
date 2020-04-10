<template>
  <div>
    <div v-if="currentServerManageData&&currentServerManageData.length>0">
      <div class="card" v-for="(item,index) in currentServerManageData" :key="index">
        <div class="card_no">编号：202020202020202</div>
        <div class="card_content">
          <div class="img">
            <img :src="getImg(item.main_img)" alt />
          </div>
          <div class="card_detail">
            <div class="title">{{item.title}}</div>
            <div class="date_guide">{{item.time}}</div>
            <div
              class="date_guide"
            >{{getType(item.classify,'big')}} > {{getType(item.classify,'small')}}</div>
          </div>
          <div class="check_state">
            <div class="row1">
              发布完成后
              <span>7个工作日内</span> 进行审核
            </div>
            <div class="row2">
              （审核通过后展示在“
              <span>已发布</span> ”中，审核不通过后展示在“
              <span>未发布</span>
              ” 中）
            </div>
          </div>
        </div>
      </div>
      <div id="pagination">
        <el-pagination
          background
          @current-change="handlePageChange"
          layout="prev, pager, next"
          :page-size="currentServerManagePageinfo.stride"
          :total="currentServerManagePageinfo.count"
        ></el-pagination>
      </div>
    </div>
    <div v-else>
      <div class="noBox">
        <div class="img">
          <img src="@/assets/serviceList/caution.png" alt />
        </div>
        <div class="text">
          <span>您还没有发布信息。</span>
          <span @click="toPublish">去发一条</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getEnterpriseStatus } from "@/service/commonApi";

export default {
  props: {
    currentServerManageData: {
      type: Array
    },
    currentServerManagePageinfo: {
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {
    /**
     * @description: 点击去发布
     */
    async toPublish() {
      //先判断当前企业审核是否通过
      let result = await getEnterpriseStatus();
      console.log("result", result);
      if (result == "accept") {
        this.$router.push({ path: "/publish" });
      } else {
        this.$message.error("企业审核未通过");
      }
    },
    /**
     * @description:获取大类，小类
     * @param {type}classify:‘大类,小类’
     * @param {type}type: big or small
     * @return:返回大类或小类
     */
    getType(classify, type) {
      let temp = classify.split(",");
      switch (type) {
        case "big":
          return temp[0];
          break;
        case "small":
          return temp[1];
          break;
        default:
          break;
      }
    },
    /**
     * @description: 获取图片
     * @param {type}'xxx.a.png;xxx.b.png;xxx.c.png'
     * @return:xxx.a.png
     */
    getImg(imgs) {
      let temp = imgs.split(";");
      return temp[0];
    },

    /**
     * @description: 页数发生改变
     */
    handlePageChange(page) {
      console.log("page", page);
    }
  }
};
</script>
<style lang="scss" scope>
#pagination {
  margin-top: 65px;
  margin-bottom: 30px;
  .number {
    width: 40px;
    height: 40px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    line-height: 40px;
    font-family: PingFangSC-Regular, PingFang SC;
    background: #ffffff;
  }
  .active {
    background-color: #1dbc76;
    color: #ffffff;
  }
  .btn-quickprev,
  .btn-quicknext,
  .btn-next,
  .btn-prev {
    background: white;
    width: 40px;
    height: 40px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    line-height: 40px;
    font-family: PingFangSC-Regular, PingFang SC;
  }

  .btn-next:hover:not(:disabled),
  .btn-prev:hover:not(:disabled) {
    color: #1dbc76;
  }
  .btn-next:active:not(:disabled),
  .btn-prev:active:not(:disabled) {
    background: #1dbc76;
    color: white;
  }
}
.noBox {
  margin-left: 40px;
  display: flex;
  align-items: center;
  .img {
    width: 90px;
    height: 90px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .text {
    font-size: 16px;
    font-weight: 400;
    margin-left: 60px;
    & span:first-child {
      color: rgba(0, 0, 0, 0.8);
    }
    & span:last-child {
      color: #1dbc76;
      cursor: pointer;
    }
  }
}
.card {
  color: rgba(0, 0, 0, 0.8);
  font-weight: 400;
  font-size: 16px;
  border: 1px solid rgba(229, 229, 229, 1);
  margin-bottom: 30px;
  &:hover {
    border: 1px solid rgba(29, 188, 118, 1);
  }
  .card_no {
    background: rgba(249, 249, 249, 1);
    font-weight: 600;
    padding: 12px 30px;
    text-align: left;
  }
  .card_content {
    padding: 26px 30px 30px 30px;
    display: flex;
    text-align: left;
    .img {
      height: 90px;
      width: 120px;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .card_detail {
      margin: 0 20px;
      border-right: 0.5px solid rgba(0, 0, 0, 0.1);
      padding-right: 20px;
      .title {
        font-size: 20px;
        margin-bottom: 8px;
      }
      .date_guide {
        color: rgba(0, 0, 0, 0.4);
        margin-bottom: 6px;
      }
    }
    .check_state {
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .row1 {
        span {
          color: rgba(29, 188, 118, 1);
        }
        margin-bottom: 8px;
      }
      .row2 {
        color: rgba(0, 0, 0, 0.4);
        font-size: 14px;
        span {
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
}
</style>
