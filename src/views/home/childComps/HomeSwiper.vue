<template>
    <swiper :banner="banner">
        <swiper-item v-for="(item,index) in banner" :key="index">
            <a :href="item.link">
                <img :src="item.image" alt="" @load="loadSwiperImg">
            </a>
        </swiper-item>
    </swiper>
</template>

<script>
    import Swiper from 'components/common/swiper/Swiper'
    import SwiperItem from "components/common/swiper/SwiperItem"
    export default{
        name: 'homeSwiper',
        components: {
            Swiper,
            SwiperItem
        },
        props: {
            banner:{
                type: Array,
                default: []
            }
        },
        data() {
            return {
                loadState: false
            }
        },
        methods: {
            loadSwiperImg(){  // 轮播图片加载后 监听的事件
                if(!this.loadState){
                    this.loadState = true   // 不需要执行多次 （有多个轮播图）
                    this.$emit('loadSwiper')  // 图片加载后通知父组件
                }
            }
        }
    }
</script>