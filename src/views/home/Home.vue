<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <home-swiper :banner="banner"></home-swiper>
        <home-recommend :recommend="recommend"></home-recommend>
        <home-feature></home-feature>

        <ul>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
        </ul>
    </div>
</template>

<script>
    import NavBar from 'components/common/navBar/NavBar' 
    import HomeSwiper from "views/home/childComps/HomeSwiper"
    import HomeRecommend from "views/home/childComps/HomeRecommend"
    import HomeFeature from "views/home/childComps/HomeFeature"
    import {getHomeMultidata} from 'network/home'
    export default{
        name: 'home',
        components:{
            NavBar,
            HomeSwiper,
            HomeRecommend,
            HomeFeature
        },
        data () {
            return {
                banner:[], // 轮播图数据
                dKeyword: {},
                keywords: {},
                recommend: [],
            }
        },
        created() {
            getHomeMultidata().then(res => {
                console.log('首页部分的数据：', res)
                this.banner = res.data.banner.list
                this.dKeyword = res.data.dKeyword
                this.keywords = res.data.keywords
                this.recommend = res.data.recommend.list
            })
        }

    }
</script>

<style>
    #home{
        padding-top: 44px;
    }
    .home-nav { 
        background-color: #ff8e96;
        color: #fff;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 99;
    }
    
    
</style>