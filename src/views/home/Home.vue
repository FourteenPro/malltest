<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <home-swiper :banner="banner"></home-swiper>
        <home-recommend :recommend="recommend"></home-recommend>
        <home-feature></home-feature>
        <tab-control class="tab-control" 
            :controlTitles="['流行','新款','精选']" @tabClick="tabClick" />
        <goods-list :goodsList="goods[currentType].list"/>
    </div>
</template>

<script>
    import NavBar from 'components/common/navBar/NavBar' 
    import HomeSwiper from "views/home/childComps/HomeSwiper"
    import HomeRecommend from "views/home/childComps/HomeRecommend"
    import HomeFeature from "views/home/childComps/HomeFeature"

    import TabControl from "components/content/tabControl/TabControl"
    import GoodsList from 'components/content/goods/GoodsList'
    import sellImg from 'assets/img/goods/sell1.png'
    import sellImg1 from 'assets/img/goods/sell2.jpg'
    import popImg from 'assets/img/goods/pop1.jpg'
    import newsImg from 'assets/img/goods/news1.jpg'

    import {getHomeMultidata,getHomeGoods} from 'network/home'
    export default{
        name: 'home',
        components:{
            NavBar,
            HomeSwiper,
            HomeRecommend,
            HomeFeature,
            TabControl,
            GoodsList
        },
        data () {
            return {
                banner:[], // 轮播图数据
                dKeyword: {},
                keywords: {},
                recommend: [],
                goods: {
                    'pop': { page: 0, list: []},
                    'news': { page: 0, list: []},
                    'sell': { page: 0, list: []},
                },
                currentType: 'pop',
                sellData: {
                    show: {
                        img:''
                    },
                    title: '高腰显瘦加绒紧身弹力牛仔裤 592',
                    price: '89.90',
                    cfav:'2559'
                },
                sellData1: {
                    show: {
                        img:''
                    },
                    title: '高腰显瘦加绒紧身弹力牛仔裤 592',
                    price: '89.90',
                    cfav:'2559'
                },
                popData: {
                    show: {
                        img:'~assets/img/goods/pop1.jpg'
                    },
                    title: '尘兮高端收官大衣',
                    price: '285.90',
                    cfav:'3541'
                },
                newsData: {
                    show: {
                        img:'~assets/img/goods/news1.jpg'
                    },
                    title: '美拉德毛毛外套女厚款秋冬季新款毛绒外套气质外套女26705#',
                    price: '99.00',
                    cfav:'2523'
                }
            }
        },
        created() {
            this.sellData.show.img = sellImg
            this.sellData1.show.img = sellImg1
            this.popData.show.img = popImg
            this.newsData.show.img = newsImg
            this.getHomeMultidata()
            this.getHomeGoods('sell')
            this.getHomeGoods('pop')
            this.getHomeGoods('news')

            
        },
        methods: {

            /**
             * 事件监听相关方法
             */
             tabClick(index){
                switch (index){
                    case 0:
                        this.currentType = 'pop'
                        break
                    case 1:
                        this.currentType = 'news'
                        break
                    case 2:
                        this.currentType = 'sell'
                        break
                }
             },
            /**
             * 网络请求相关的方法
             */
            getHomeMultidata() {
                getHomeMultidata().then(res => {
                console.log('首页部分的数据：', res)
                this.banner = res.data.banner.list
                this.dKeyword = res.data.dKeyword
                this.keywords = res.data.keywords
                this.recommend = res.data.recommend.list
            })
            },
            getHomeGoods(type) {  // 获取商品数据
                const page = this.goods[type].page + 1
                getHomeGoods(type,page).then(res => {
                    console.log('goods:',res)
                    if(type=='sell'){
                        for(let i=0; i<30;i++){
                            if (i%2==0)
                                this.goods[type].list.push(this.sellData)
                            else
                                this.goods[type].list.push(this.sellData1)
                        }
                    }else if (type=='pop'){
                        for(let i=0; i<30;i++){
                            this.goods[type].list.push(this.popData)
                        }
                    }else {
                        for(let i=0; i<30;i++){
                            this.goods[type].list.push(this.newsData)
                        }
                    }
                    this.goods[type].page += 1
                })
            },
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
    .tab-control{
        position: sticky;
        top: 44px;
        z-index: 9;
    }
    
    
</style>