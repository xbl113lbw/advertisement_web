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
                <div class="title omit">标题标题标题标题标题标题标题标题标题标标题标题标题标题标题标题</div>
            </div>
            <div class="content-right">
                <div class="top">
                    <span class="top-title">温馨提示</span>
                    <ul>
                        <li>
                            <img src="../../assets/serviceInfo/right-icon1.png" alt="" class="imgWrap"/>
                            <div class="textWrap">
                                <span>线上沟通</span>
                                <span>要与商家要先在线上进行沟通</span>
                            </div>
                        </li>
                        <li>
                            <img src="../../assets/serviceInfo/right-icon1.png" alt="" class="imgWrap"/>
                            <div class="textWrap">
                                <span>线下敲定</span>
                                <span>具体的细节要在线下进行敲定</span>
                            </div>
                        </li>
                        <li>
                            <img src="../../assets/serviceInfo/right-icon1.png" alt="" class="imgWrap"/>
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
                        <li v-for="(item,index) in [1,2,3,4]" :key="index">
                            <img src="../../assets/logo.png" alt="">
                            <div class="textWrap">
                                <span class="omit">标题标题标题标题…</span>
                                <span>2020.03.19 ｜ 28人浏览过</span>
                                <span>展会服务 > 展会布置/搭建</span>
                                <span>20元<span>/m²</span></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "serviceInfo"
    }
</script>

<style lang="scss" scoped>
    .serviceInfo {
        width: 1200px;
        margin: 0 auto;
        padding-top: 80px;

        .content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 40px;

            .content-left {
                width: 740px;
                background: #1DBC76;

                .title {
                    width: 712px;
                    margin-bottom: 12px;
                    font-size: 28px;
                    font-weight: 600;
                    color: rgba(0, 0, 0, .8);
                    line-height: 40px;
                }
            }

            .content-right {
                .top {
                    margin-bottom: 60px;
                    padding: 24px 30px 60px;
                    border: 1px solid #E5E5E5;
                    text-align: left;

                    .top-title {
                        display: inline-block;
                        margin-bottom: 18px;
                        font-size: 20px;
                        font-weight: 600;
                        color: rgba(0, 0, 0, .8);
                        line-height: 28px;
                    }

                    ul {
                        padding-top: 30px;
                        border-top: 1px solid rgba(0, 0, 0, .1);

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
                                        color: rgba(0, 0, 0, .6);
                                        line-height: 25px;
                                    }

                                    &:last-child {
                                        font-size: 14px;
                                        color: rgba(0, 0, 0, .3);
                                        line-height: 20px;
                                    }
                                }
                            }
                        }
                    }
                }

                .bottom {
                    padding-top: 40px;
                    border-top: 1px solid rgba(0, 0, 0, .1);
                    text-align: left;

                    .bottom-title {
                        display: inline-block;
                        margin-bottom: 30px;
                        font-size: 20px;
                        font-weight: 600;
                        color: rgba(0, 0, 0, .8);
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
                                background: #1DBC76;
                            }

                            .textWrap {
                                display: flex;
                                flex-direction: column;
                                align-items: flex-start;

                                span {
                                    max-width: 180px;
                                    margin-bottom: 4px;
                                    font-size: 14px;
                                    color: rgba(0, 0, 0, .4);
                                    line-height: 20px;

                                    &:first-child {
                                        margin-bottom: 8px;
                                        font-size: 20px;
                                        color: rgba(0, 0, 0, .8);
                                        line-height: 28px;
                                    }

                                    &:last-child {
                                        margin-top: 10px;
                                        font-size: 20px;
                                        font-weight: 600;
                                        color: #F96D3F;
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
