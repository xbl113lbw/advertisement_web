<template>
    <div class="success">
        <img src="../../../assets/publish/success.png" alt=""/>
        <div>
            <p>完成发布，待审核</p>
            <p>审核完成后，成功发布的信息可在“<span><span>个人中心</span> - <span>服务管理</span> - <span>已发布</span></span>”中进行查看</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "success"
    }
</script>

<style lang="scss" scoped>
    .success {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 180px auto 0;

        img {
            width: 90px;
            height: 90px;
            margin-right: 60px;
        }

        div {
            p {
                text-align: left;

                &:first-child {
                    margin-bottom: 10px;
                    font-size: 24px;
                    font-weight: 600;
                    color: rgba(0, 0, 0, .8);
                    line-height: 33px;
                }

                &:last-child {
                    font-size: 16px;
                    color: rgba(0, 0, 0, 1);
                    line-height: 22px;
                }

                span {
                    font-size: 16px;
                    color: rgba(0, 0, 0, .4);
                    line-height: 22px;

                    span {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
</style>
