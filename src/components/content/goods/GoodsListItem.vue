<template>
    <div class="goods-item">
        <img :src="goodsItem.show.img" alt="">
        <div class="goods-info">
            <p class="tit">{{ goodsItem.title }}</p>
            <span class="price">{{ goodsItem.price }}</span>
            <span class="collect">{{ goodsItem.cfav }}</span>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'GoodsListItem',
        props: {
            goodsItem: {
                type: Object,
                default: {},
            }
        },
        data() {
            return {

            }
        },
    }
</script>

<style>
    .goods-item {
        width: 48%;
        text-align: center;
        font-size: 12px;
        position: relative;
        padding-bottom: 40px;
    }
    .goods-item img {
        width: 100%;
        border-radius: 5px;
    }
    .goods-info {
        position: absolute;
        bottom: 7px;
        left: 0px;
        width: 100%;
    }
    .goods-info .tit{
        white-space: nowrap;
        overflow: hidden; 
        text-overflow: ellipsis; 
        margin-bottom: 3px;
        
    }
    .goods-info .price{
        color: var(--color-high-text);
        margin-right: 20px;
    }

    .goods-info .collect {
        position: relative;
    }
    .goods-info .collect::before{
        content: '';
        background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
        position: absolute;
        left: -15px;
        top: -1px;
        width: 14px;
        height: 14px;

    }

</style>