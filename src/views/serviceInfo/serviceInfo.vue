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
                .title {
                    width: 712px;
                    margin-bottom: 12px;
                    font-size: 28px;
                    font-weight: 600;
                    color: rgba(0, 0, 0, .8);
                    line-height: 40px;
                }
            }
        }
    }
</style>
