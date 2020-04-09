<template>
  <div class="chooseType">
    <ul v-for="(item,index) in typeData" :key="index">
      <li>{{item.name}}</li>
      <li
        @click="chooseType(item.name,item.id,item_second.name,item_second.id)"
        v-for="(item_second,index_second) in item.children"
        :key="index_second"
      >{{item_second.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "chooseType",
  props: {
    typeData: {
      type: Array
    }
  },
  methods: {
    chooseType(bigTypeName, bigTypeId, smallTypeName, smallTypeId) {
      this.$emit(
        "chooseType",
        bigTypeName,
        bigTypeId,
        smallTypeName,
        smallTypeId
      );
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
