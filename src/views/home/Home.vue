<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <tab-control class="tab-control" 
                :controlTitles="['流行','新款','精选']" 
                @tabClick="tabClick" ref="controlTop" v-show="controlState" :class="{'active-control': controlState}"/>
        <scroll class="content" ref="scroll" :probeType="3" @scrollMove="scrollMove" :pullUpLoad="true" @upload="upload">
            <home-swiper :banner="banner" @loadSwiper="loadSwiper"></home-swiper>
            <home-recommend :recommend="recommend"></home-recommend>
            <home-feature></home-feature>
            <tab-control class="tab-control" 
                :controlTitles="['流行','新款','精选']" 
                @tabClick="tabClick" ref="control"/>
            <goods-list :goodsList="goods[currentType].list"/>
        </scroll>
        <back-top @click.native="backClick" v-show="backShow"/>
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

    import Scroll from 'components/common/scroll/Scroll'
    import BackTop from 'components/content/backTop/BackTop'

    import {debounce} from 'common/utils'
    import {itemObject} from 'common/mixin'

    import {getHomeMultidata,getHomeGoods} from 'network/home'
    export default{
        name: 'home',
        components:{
            NavBar,
            HomeSwiper,
            HomeRecommend,
            HomeFeature,
            TabControl,
            GoodsList,
            Scroll,
            BackTop
        },
        mixins: [itemObject],
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
                    cfav:'2559',
                    iid:'1m4xiic'
                },
                sellData1: {
                    show: {
                        img:''
                    },
                    title: '2023新款纯色宽松连帽毛毛短外套 MW21928',
                    price: '699.90',
                    cfav:'888',
                    iid:'1lyp2vg'
                },
                popData: {
                    show: {
                        img:'~assets/img/goods/pop1.jpg'
                    },
                    title: '尘兮高端收官大衣',
                    price: '285.90',
                    cfav:'3541',
                    iid:'1lrzvr8'
                },
                popData1: {
                    show: {
                        img:'~assets/img/goods/pop2.jpg'
                    },
                    title: '法式丝绒复古小香风棉服外套6092',
                    price: '998.90',
                    cfav:'369',
                    iid:'156'
                },
                newsData: {
                    show: {
                        img:'~assets/img/goods/news1.jpg'
                    },
                    title: '美拉德毛毛外套女厚款秋冬季新款毛绒外套气质外套女26705#',
                    price: '99.00',
                    cfav:'2523',
                    iid:'258'
                },
                backShow: false,
                controlOffsetH: 0,
                controlState: false,
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
        mounted() {
            const refresh = debounce(this.$refs.scroll.refresh,500)
            this.$bus.$on('loadGoodImg',() =>{
                refresh()
            })
            // 获取 吸顶的组件的offsetTop
            // this.controlOffsetH = this.$refs.control.$el.offsetTop  // 由于图片没有加载 在这里获取的offsetTop不准确   解决 ：监听图片加载后 在获取
            // console.log('offset:',this.controlOffsetH)
        },
        activated() {
            // 设置缓存的路由 可以用这个钩子函数
            // 进入路由的时候触发
            // 老版的scroll 会出现滚动距离不准确的问题 切换路由时导致 滚动不正确的问题   在退出路由的时候deactivated  报错滚动的y值 ，在进入路由的时候重新设置这个值，并且刷新路由  在这里不用
        },
        deactivated() {
            // 设置缓存的路由(用keep-alive） 离开路由时触发
        },
        methods: {
            /**
             * 事件监听相关方法
             */
            tabClick(index){   // 监听商品分类切换
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
                this.$refs.control.controlIndex = index
                this.$refs.controlTop.controlIndex = index
            },
            backClick() {  // 点击滚动回到顶部
                this.$refs.scroll.setScrollTo(0,0,500)
            },
            scrollMove(position) {  // 监听滚动事件
                // 判断置顶按钮显示距离
                this.backShow = -position.y > 1000
                
                // 判断选项系统效果距离
                this.controlState = -position.y > this.controlOffsetH
            },
            upload() {  // 监听上拉加载事件
                console.log("上拉加载。。。")
                this.getHomeGoods(this.currentType)
            },
            loadSwiper() {  // 监听轮播图加载后的事件
                this.controlOffsetH = this.$refs.control.$el.offsetTop  // 由于图片没有加载 在这里获取的offsetTop不准确   解决 ：监听图片加载后 在获取
                console.log('offset:',this.controlOffsetH)
            },
            /**
             * 网络请求相关的方法
             */
            getHomeMultidata() {  // 获取轮播图
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
                    this.$refs.scroll.scroll.finishPullUp()
                })
            },
        }

    }
</script>

<style scoped>
    #home{
        /* padding-top: 44px; */
        height: 100vh;
        position: relative;
    }
    .home-nav { 
        background-color: var(--color-tint);
        color: #fff;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;
    }
    /* .tab-control{
        position: sticky;
        top: 44px;
        z-index: 9;
    } */

    /* 两种计算滚动部分高度的方式 */

    /* 利用calc来计算 */
    /* .content {  
        margin-top: 44px;
        height: calc(100% - 93px);
        overflow: hidden;
    } */

    /* 利用定位 单上下高度确定的时 */
    .content {
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
    .active-control {
        position: relative;
        top: 44px;
        left: 0;
        z-index: 9;
    }
    
</style>