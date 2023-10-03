<template>
    <div class="loading" v-if="isLoading">
        <div class="bg">
            <img src="@/assets/img/home/full-screen-loading.gif" alt="" >
        </div>
    </div>
</template>

<script setup>
import useMainStore from '@/stores/modules/main';
import { storeToRefs } from 'pinia';


const mainStore = useMainStore()
const { isLoading } = storeToRefs(mainStore)

</script>



<style lang="less" scoped>
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    bottom:0;

    .bg {
        
        width:104px;
        height:104px;
        display: flex;
        align-items: center;
        justify-content: center;
        
        background:url(@/assets/img/home/loading-bg.png) 0 0 / 100% 100%;
        img {
            
            width:70px;
            height:70px;
            margin-bottom: 10px;
        }
    }
}
</style>