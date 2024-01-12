<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default{
        name: 'Scroll',
        props: {
            probeType: {
                type: Number,
                default: 0,
            },
        },
        data() {
            return {
                scroll: null,
            }
        },
        mounted () {
            console.log('probeType:',this.probeType)
            this.scroll = new BScroll(this.$refs.wrapper,{
                observeImage: true,  //  无论图片的加载成功与否，都会自动调用 BetterScroll 的 refresh 方法来重新计算可滚动的宽度或者高度
                probeType: this.probeType,   // 设置获取滚动的位置设置
                pullUpLoad: true,  // 设置上拉加载能力
            })

            this.scroll.on('scroll', (position) => {  // 滚动获取位置事件
                this.$emit('scrollMove',position)
            })

            this.scroll.on('pullingUp',() => {   // 上拉加载事件
                console.log("上拉加载。。。")
            })
        },
        methods: {
            setScrollTo(x,y,time=300) { // 设置滚动的位置
                this.scroll.scrollTo(x,y,time)
            }, 
        },
    }
</script>

<style scoped>

</style>