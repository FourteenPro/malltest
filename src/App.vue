<template>
    <div id="app">
        <router-view/>
        <main-tab-bar/>
    </div>
</template>

<script>
import MainTabBar from "components/content/mainTabBar/MainTabBar"
export default {
  name: 'App',
  components: {
    MainTabBar
  },
  methods: {
    btnBar(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style>
    @import "./assets/css/base.css";
    

</style>
