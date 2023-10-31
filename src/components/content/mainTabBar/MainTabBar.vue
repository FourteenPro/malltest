<template>
    <tab-bar>
        <tab-bar-item linkUrl="/home">
            <img slot="icon" src="~assets/img/tabbar/home.svg" alt="">
            <img slot="iconActive" src="~assets/img/tabbar/home_active.svg" alt="">
            <div slot="text">首页</div>
        </tab-bar-item>
        <tab-bar-item linkUrl="/category">
            <img slot="icon" src="~assets/img/tabbar/category.svg" alt="">
            <img slot="iconActive" src="~assets/img/tabbar/category_active.svg" alt="">
            <div slot="text">分类</div>
        </tab-bar-item>
        <tab-bar-item linkUrl="/cart">
            <img slot="icon" src="~assets/img/tabbar/shopcart.svg" alt="">
            <img slot="iconActive" src="~assets/img/tabbar/shopcart_active.svg" alt="">
            <div slot="text">购物车</div>
        </tab-bar-item>
        <tab-bar-item linkUrl="/profile">
            <img slot="icon" src="~assets/img/tabbar/profile.svg" alt="">
            <img slot="iconActive" src="~assets/img/tabbar/profile_active.svg" alt="">
            <div slot="text">我的</div>
        </tab-bar-item>
    </tab-bar>
</template>

<script>
    import TabBar from 'components/common/tabBar/TabBar'
    import TabBarItem from 'components/common/tabBar/TabBarItem'
    export default{
        name: 'mainTabBat',
        components: {
            TabBar,
            TabBarItem
        }
    }
</script>

<style>

</style>