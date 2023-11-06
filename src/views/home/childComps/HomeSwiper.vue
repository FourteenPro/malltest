<template>
    <swiper :banner="banner">
        <swiper-item v-for="(item,index) in banner" :key="index">
            <a :href="item.link">
                <img :src="item.image" alt="">
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
        }
    }
</script>