<template>
    <div class="goods-item">
        <img :src="goodsItem.show.img" alt="" @load="loadImg">
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
        methods: {
            loadImg() {  // 图片加载完成后触发的事件
                // 图片加载完成后，让scroll重新计算高度
                // 怎么在这个子组件和父组件的父组件交互(非父子组件交互) 1. 利用emit传给父组件，父组件在emit传给他的父组件 2.利用vuex 管理状态 监听这个状态失效高度计算 3. 利用事件总线  管理状态 在vue实例的prototype（原型链中）挂载上$bus的属性用来执行公共的东西
                
                this.$bus.$emit('loadGoodImg')
                
               
            },  
        }
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