<template>
  <div class="chooseType">
    <ul v-for="(item,index) in [1,2,3,4]" :key="index">
      <li>广告传媒</li>
      <li
        @click="chooseType(item_second)"
        v-for="(item_second,index_second) in ['广告位招租','多媒体互动','导视系统设计']"
        :key="index_second"
      >{{item_second}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "chooseType",
  methods: {
    chooseType(type) {
      this.$emit("chooseType", type);
    }
  }
};
</script>

<style lang="scss" scoped>
.chooseType {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 60px;

  ul {
    width: 240px;
    height: 540px;
    border: 1px solid rgba(0, 0, 0, 0.06);
    li {
      margin-bottom: 26px;
      font-size: 18px;
      color: rgba(0, 0, 0, 0.8);
      line-height: 25px;
      text-align: left;
      padding-left: 60px;
      &:not(:first-child):hover {
        color: #1dbc76;
        cursor: pointer;
      }
      &:first-child {
        padding: 13px 0;
        padding-left: 60px;
        margin-bottom: 22px;
        font-size: 20px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
        background: #f9f9f9;
        line-height: 28px;
      }
    }

    .active {
      color: #1dbc76;
    }
  }
}
</style>
