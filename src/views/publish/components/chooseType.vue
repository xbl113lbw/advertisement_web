<template>
    <div class="chooseType">
        <ul v-for="(item,index) in [1,2,3,4]" :key="index">
            <li>广告传媒</li>
            <li>广告位招租</li>
            <li>多媒体互动</li>
            <li>导视系统设计</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "chooseType"
    }
</script>

<style lang="scss" scoped>
    .chooseType {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-top: 60px;

        ul {
            padding-left: 60px;

            li {
                margin-bottom: 26px;
                font-size: 18px;
                color: rgba(0, 0, 0, .8);
                line-height: 25px;
                text-align: left;

                &:first-child {
                    padding: 13px 0;
                    margin-bottom: 22px;
                    font-size: 20px;
                    font-weight: 600;
                    color: rgba(0, 0, 0, .8);
                    line-height: 28px;
                }
            }

            .active {
                color: #1DBC76;
            }
        }
    }
</style>
