<template>
    <div class="recommend">
        <div class="recommend-item" v-for="(tj,index) in recommend" :key="index">
            <a :href="tj.link">
                <img :src="tj.image" alt="">
                <div>{{ tj.title }}</div>
            </a>
            
        </div>
    </div>
</template>

<script>
    export default{
        name: 'homeRecommend',
        props: {
            recommend: {
                type: Array,
                default: []
            }
        }
    }
</script>

<style>
    .recommend {
        display: flex;
        border-bottom: 10px solid #eeeeee;
        padding-bottom: 20px;
    }
    .recommend-item {
        padding-top: 10px;
        font-size: 12px;
        flex: 1;
        text-align: center;
    }
    .recommend-item img {
        width: 70px;
        height: 70px;
        vertical-align: middle;
        margin-bottom: 10px;
    }
</style>