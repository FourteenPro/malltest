<template>
    <div id="tab-bar">
        <slot></slot>
    </div>    
</template>

<script>
    export default{
        name: 'TabBar',
    }
</script>

<style>
    #tab-bar {
        display: flex;
        /* 使用固定定位把tabbar定位在显示屏最下方 */
        position:fixed; 
        left: 0;
        right: 0;
        bottom: 0;
        /* 做一个阴影进行凸显感 */
        box-shadow: 0px -2px 1px rgba(100,100,100,.1);
    }
    
</style>