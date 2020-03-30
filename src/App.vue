<template>
    <div id="app">
        <!-- 头部导航 -->
        <HeaderNav/>
        <router-view/>
    </div>
</template>

<script>
    import HeaderNav from "./components/HeaderNav"

    export default {
        components: {
            HeaderNav
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
</style>
