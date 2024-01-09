<template>
    <div class="tab-control">
        <div class="tab-control-item" :class="{active:index===controlIndex}" v-for="(title,index) in controlTitles" :key="index" @click="controlClick(index)">
            <span>{{ title }}</span>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'tabControl',
        props: {
            controlTitles: {
                type: Array,
                default: []
            }
        },
        data() {
            return{
                controlIndex: 0
            }
        },
        methods: {
            controlClick(index){
                this.controlIndex = index
                this.$emit('tabClick',index)
            }
        }
    }
</script>

<style>
    .tab-control{
        display: flex;
        text-align: center;
        height: 40px;
        line-height: 40px;
        background-color: #fff;
    }
    .tab-control-item{
        flex: 1;
        font-size: 15px;
    }
    .tab-control-item span {
        padding: 5px;
    }
    .tab-control-item.active {
        color: var(--color-high-text)
    }

    .tab-control-item.active span {
        border-bottom: 2px solid var(--color-high-text);
    }
</style>