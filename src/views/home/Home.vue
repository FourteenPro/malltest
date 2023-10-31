<template>
    <nav-bar class="home-nav">
        <div slot="center">购物街</div>
    </nav-bar>
</template>

<script>
    import NavBar from 'components/common/navBar/NavBar' 
    import {getHomeMultidata} from 'network/home'
    export default{
        name: 'home',
        components:{
            NavBar
        },
        data () {
            return {
                banner:{}, // 轮播图数据
                dKeyword: {},
                keywords: {},
                recommend: {},
            }
        },
        created() {
            getHomeMultidata().then(res => {
                console.log('首页部分的数据：', res)
                this.banner = res.data.banner
                this.dKeyword = res.data.dKeyword
                this.keywords = res.data.keywords
                this.recommend = res.data.recommend
            })
        }

    }
</script>

<style>
    .home-nav { 
        background-color: #ff8e96;
        color: #fff;
    }
</style>