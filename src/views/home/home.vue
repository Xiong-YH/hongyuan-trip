<template>
    <div class="home">
        <home-nav-bar></home-nav-bar>
        <img src="@/assets/img/home/banner.webp" alt="">
        <home-nav-search></home-nav-search>
    </div>
</template>

<script setup>
import homeNavBar from './cpns/home_nav_bar.vue'
import homeNavSearch from './cpns/home-nav-search.vue'
</script>

<style lang="less" scoped>
.home {

    img {
        width: 100%;
    }
    
    
}
</style>

