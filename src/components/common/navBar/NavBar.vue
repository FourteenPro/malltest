<template>
    <div class="nav-tab">
        <div class="left"><slot name="left"></slot></div>
        <div class="center"><slot name="center"></slot></div>
        <div class="right"><slot name="right"></slot></div>
    </div>
</template>

<script>
    export default{
        name: 'navBar',
    }
</script>

<style>
    .nav-tab {
        display: flex;
        text-align: center;
        height: 44px;
        line-height: 44px;
        box-shadow: 0 1px 1px rgba(100,100,100,.1);
    }
    .nav-tab .left,.nav-tab .right {
        width: 60px;
    }
    .nav-tab .center {
        flex: 1;
    }
</style>