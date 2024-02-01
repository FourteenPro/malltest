<template>
    <div>
        <detail-tab-bar></detail-tab-bar>
    </div>    
</template>

<script>
    import DetailTabBar from './childComps/DetailTabBar'

    import { getDetail, Goods } from 'network/detail'
    export default{
        name:'Detail',
        components: {
            DetailTabBar,
        },
        data() {
            return {
                id: '',

                goodsInfo: {},
            }
        },
        created() {  // 可以获取组件的数据
            console.log(this.$route.params.id)
            this.id = this.$route.params.id
            this.getDetail(this.id)
            
        },
        methods: {
            getDetail(id) {
                getDetail(id).then(res=>{
                console.log('详情数据：',res)

                // 数据比较散乱，需要跟据组件的需要组合数据
                let detailData = {
                    columns:['销量 86', '收藏14人', '默认快递'],
                    detailInfo:{},
                    esi: '',
                    isLogin: false,
                    itemInfo: {
                        addCartTips: false,
                        admin: false,
                        cfav: 0,
                        cartNum: 0,
                        cids: '#682# #683# #684# #685#',
                        desc: '2018春秋冬白色体恤长袖宽松T桖女打底衫韩版新款圆领纯棉百搭上衣',
                        discountDesc:'7折',
                        extra: {},
                        highNoePrice: '39.00',
                        highPrice: '55.72',
                        id: '1m7dvsq',
                        price: '',
                        oldPrice: '',
                    },
                    itemParams:{},
                    rate:{},
                    shopInfo: {
                        allGoodsUrl: "http://m.meilishuo.com/shop/index/1q9au6",
                        cfans: 51792,
                        cGoods: 549,
                        cSells: 230278,
                        categories: [],
                        isMarked: false,
                        level:5,
                        name: '优米女孩',
                        nonsupporReasonRefound: false,
                        score: [],
                        services: [
                            {},
                            {},
                            {},
                            {},
                            {
                                icon:'',
                                name: '72小时发货'
                            },
                        ], 
                    },
                    skuInfo:{
                        defaultPrece: '￥39.00',
                        isAbroad: false,
                        priceRange: '￥39.00',
                        props: [],
                        sizeKey: "尺码"
                    },
                    topBar:{
                        img: '',
                        link:''
                    },
                }

                // 组合商品的数据  // 在请求组件中坐聚合class 用constructor  提取数据
                this.goodsInfo = new Goods(detailData.itemInfo,detailData.columns,detailData.shopInfo.services)
                console.log('组合的商品数据:', this.goodsInfo)
            })
            },
        }
    }
</script>

<style scoped>

</style>