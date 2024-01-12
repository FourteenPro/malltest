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
        data() {
            return {
                scroll: null,
            }
        },
        mounted () {
            setTimeout(()=>{
                this.scroll = new BScroll(this.$refs.wrapper,{

                })
            },300)
            
        },
    }
</script>

<style scoped>

</style>