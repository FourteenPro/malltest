<template>
    <div class="goods">
        <goods-list-item v-for="(item,i) in goodsList" :key="i" :goodsItem="item"/>
    </div>
</template>

<script>
    import GoodsListItem from 'components/content/goods/GoodsListItem'
    export default{
        name: 'GoodsList',
        components: { GoodsListItem },
        props: {
            goodsList:{
                type: Array,
                default: [],
            }
        },
        data() {
            return {
                
            }
        },
    }
</script>

<style>
    .goods {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 0 calc(2%/2)
    }
</style>