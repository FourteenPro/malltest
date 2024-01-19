<template>
    <div>
        <detail-tab-bar></detail-tab-bar>
    </div>    
</template>

<script>
    import DetailTabBar from './childComps/DetailTabBar'

    import { getDetail } from 'network/detail'
    export default{
        name:'Detail',
        components: {
            DetailTabBar,
        },
        data() {
            return {
                id: '',
            }
        },
        created() {  // 可以获取组件的数据
            console.log(this.$route.params.id)
            this.id = this.$route.params.id
            getDetail(this.id).then(res=>{
                console.log('详情数据：',res)
            })
        },
    }
</script>

<style scoped>

</style>