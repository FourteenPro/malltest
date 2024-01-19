<template>
    <div>
        <nav-bar class="nav-bar">
            <div @click="backClick" class="tab-letf" slot="left">
                <img src="~assets/img/common/back.svg" alt="">
            </div>
            <div class="tab-list" slot="center">
                <div @click="tabClick(index)" :class="{'active-tab': tabIndex == index }" v-for="(tit,index) in titNav" :key="index">{{ tit }}</div>
            </div>
        </nav-bar>
    </div>
</template>

<script>
    import NavBar from 'components/common/navBar/NavBar'
    export default{
        name: 'DetailTabBar',
        components: {
            NavBar
        },
        data() {
            return {
                titNav: ['商品', '参数', '评论', '推荐'],
                tabIndex: 0,
            }
        },
        methods: {
            tabClick(index) {  // 点击顶部导航
                this.tabIndex = index
            },
            backClick() { // 回退
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>
    .nav-bar{
        background-color: #fff;
    }
    .tab-letf {
       padding-top: 5px
    }
    .tab-list {
        display: flex;
        font-size: 14px;
    }
    .tab-list div{flex:1}
    .active-tab {
        color: var(--color-high-text)
    }

</style>