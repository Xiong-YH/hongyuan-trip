
<template>
  <div class="app">
    <router-view></router-view>
   
    <tab-bar v-show="!route.meta. hidden"></tab-bar>
  </div>
</template>

<script setup>
import tabBar from "./components/tab-bar/tab-bar.vue";
import { useRoute } from "vue-router";
  const route = useRoute()
</script>




<style scoped>

</style>
