<template>
    <div class="publish">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>免费发布信息</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 步骤条 -->
        <div class="steps">
            <div class="steps-item" v-for="(item,index) in stepsData" :key="index"
                 :class="stepsIndex === index ? 'activeStep' : '' ">
                <span>{{item.name}}</span>
                <ul>
                    <li></li>
                    <li>{{index+1}}</li>
                    <li></li>
                </ul>
            </div>
        </div>
        <!-- 步骤 -->
        <ChooseType v-if="stepsIndex===0"/><!-- 类别 -->
        <Write v-if="stepsIndex===1"/><!-- 填写 -->
        <Success v-if="stepsIndex===2"/><!-- 信息 -->
    </div>
</template>

<script>
    import ChooseType from "./components/chooseType.vue"
    import Success from "./components/success.vue"
    import Write from "./components/write.vue"

    export default {
        name: "publish",
        components: {ChooseType, Success, Write},
        data() {
            return {
                stepsData: [
                    {name: "选择类别"}, {name: "填写信息"}, {name: "完成发布"}
                ],
                stepsIndex: 1
            }
        }
    }
</script>

<style lang="scss" scoped>
    .publish {
        width: 1200px;
        margin: 0 auto;
        padding-top: 80px;
        padding-bottom: 279px;

        .steps {
            margin-top: 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .steps-item {
                flex: 1;

                span {
                    display: inline-block;
                    margin-bottom: 10px;
                    font-size: 20px;
                    font-weight: 600;
                    color: rgba(0, 0, 0, .3);
                    line-height: 28px;
                }

                ul {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    li {
                        &:nth-child(1), &:nth-child(3) {
                            flex: 1;
                            height: 3px;
                            background: rgba(0, 0, 0, .3);
                        }

                        &:nth-child(2) {
                            width: 26px;
                            height: 26px;
                            margin: 0 3px;
                            border-radius: 50%;
                            line-height: 26px;
                            font-size: 20px;
                            font-weight: 600;
                            text-align: center;
                            color: #FFFFFF;
                            background: #B2B2B2;
                        }
                    }
                }
            }

            .activeStep {
                span {
                    color: #24BE7A;
                }

                ul {
                    li {
                        background: #1DBC76 !important;
                    }
                }
            }
        }
    }
</style>
