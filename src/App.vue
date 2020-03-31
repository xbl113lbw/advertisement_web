<template>
    <div id="app">
        <!-- 头部导航 -->
        <HeaderNav/>
        <router-view/>
        <!-- 底部 -->
        <Footer/>
    </div>
</template>

<script>
    import HeaderNav from "./components/HeaderNav"
    import Footer from "./components/Footer"

    export default {
        components: {
            HeaderNav,
            Footer
        }
    }
</script>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    ul, li {
        list-style: none;
    }

    button {
        outline: none;
        border: none;
    }

    input {
        outline: none;
        border: none;
    }

    a {
        text-decoration: none;
    }

    /*修改 placeholder 默认颜色*/
    input::-webkit-input-placeholder {
        color: rgba(0, 0, 0, .2) !important;
    }

    input::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: rgba(0, 0, 0, .2) !important;
    }

    input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: rgba(0, 0, 0, .2) !important;
    }

    input:-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: rgba(0, 0, 0, .2) !important;
    }


    /*去掉input 输入框右边的上下箭头按钮*/
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
    }

    input[type=number] {
        -moz-appearance: textfield;
    }

    /* 省略号 */
    .omit {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
