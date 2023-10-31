<template>
    <nav-bar class="home-nav">
        <div slot="center">购物街</div>
    </nav-bar>
</template>

<script>
    import NavBar from 'components/common/navBar/NavBar' 
    export default{
        name: 'home',
        components:{
            NavBar
        }

    }
</script>

<style>
    .home-nav { 
        background-color: #ff8e96;
        color: #fff;
    }
</style>