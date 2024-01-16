<template>
    <div class="tab-bar-item" @click="btnClick">
        <div v-if="!activeLink"><slot name="icon"></slot></div>
        <div v-else><slot name="iconActive"></slot></div>
        <div :style="activeText"><slot name="text"></slot></div>
    </div>
</template>

<script>
    export default{
        name: 'TabBarItem',
        props:{
            linkUrl: String,
            textColor: {
                type: String,
                default: '#ff5777'
            }
        },
        data() {
            return {
                
            }
        },
        computed: {
            activeLink() {
                return this.$route.path.indexOf(this.linkUrl) > -1
            },
            activeText() {
                return this.$route.path.indexOf(this.linkUrl) > -1 ? {color:this.textColor} : {}
            }
        },
        methods: {
            btnClick () {
                // console.log(this.linkUrl)
                this.$router.push(this.linkUrl)
            }
        }
    }
</script>

<style>
    .tab-bar-item {
        flex: 1;
        text-align: center;
        height: 49px;
        background-color: #f5f4f5;
        font-size: 14px;
    }
    .tab-bar-item img {
        width: 24px;
        height: 24px;
        margin-top: 3px;
        vertical-align: middle;
        margin-bottom: 2px;
    }
    
</style>