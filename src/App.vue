
<template>
  <div class="app">
    <router-view v-slot="props">
      <keep-alive include="home">
        <component :is="props.Component"></component>
      </keep-alive>
    </router-view>
   
    <tab-bar v-show="!route.meta. hidden"></tab-bar>
    <loading></loading>
  </div>
</template>

<script setup>
import Loading from '@/components/loading/loading.vue'
import tabBar from "./components/tab-bar/tab-bar.vue";
import { useRoute } from "vue-router";
  const route = useRoute()
</script>




<style scoped>

</style>
