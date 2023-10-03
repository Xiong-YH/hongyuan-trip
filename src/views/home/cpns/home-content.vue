<template>
    <div class="homelist">
        <h2 class="title">热门精选</h2>
        <div class="item">
            <template v-for="(item,index) in homeList" :key="item.data.houseId">
                <house-item-v9 
                :item-data="item.data" 
                v-if="item.discoveryContentType === 9" 
                @click="detailClick(item.data.houseId)"></house-item-v9>
                <house-item-v3 
                :item-data="item.data" 
                v-else-if="item.discoveryContentType === 3"
                @click="detailClick(item.data.houseId)"
                ></house-item-v3>
            </template>
        </div>
        
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useRouter } from "vue-router";
import houseItemV9 from '@/components/house-item-v9/house-item-v9.vue'
import houseItemV3 from '@/components/house-item-v3/house-item-v3.vue'
import useHomeStore from "@/stores/modules/home.js"



    const homeStore = useHomeStore()
    homeStore.fetchHomeList()
    const {homeList} = storeToRefs(homeStore)

    //跳转详情页
    const router = useRouter()
    const detailClick = (id)=>{
        //params传参
        router.push("/detail/" + id)
    }

</script>

<style lang="less" scoped>
.homelist {
   .title {
    padding: 5px;
   }
   .item {
    display: flex;
    flex-wrap: wrap;
   }
}
</style>