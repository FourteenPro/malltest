<template>
    <div>详情</div>    
</template>

<script>
    export default{
        name:'Detail',
        data() {
            return {
                id: '',
            }
        },
        created() {  // 可以获取组件的数据
            console.log(this.$route.params.id)
            this.id = this.$route.params.id
        },
    }
</script>

<style scoped>

</style>