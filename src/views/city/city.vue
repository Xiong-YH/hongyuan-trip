<template>
    <keep-alive>
        <div class="city">
            <!-- 搜索框、港澳台、海外 -->
            <div class="top">
                <form action="/">
                    <van-search
                        v-model="searchValue"
                        shape="round"
                        show-action
                        placeholder="城市/区域/位置"
                        @cancel="cancelClick"
                    />
                    </form>
                    <van-tabs v-model:active="TabActive" color="#ff9854">
                            <template v-for="(value,key,index) in allCities" :key="key">
                                <van-tab :title="value.title" :name="key"></van-tab>
                            </template>
                    </van-tabs>
            </div>
            <div class="content">
                <template v-for="(value,key,index) in allCities">
                    <city-group v-show="TabActive === key" :groupData="value"></city-group>
                </template>
            </div>
        </div>
    </keep-alive>
    
</template>
<script setup>
    import { ref,computed } from "vue";
    import { useRouter } from "vue-router";
    import { storeToRefs } from 'pinia'
    import cityGroup from './cpns/city-group.vue'
    // import { getCityAll } from '@/servies/index.js'
    import  useCityStore  from '@/stores/modules/city.js'
   
    const router = useRouter()
    const searchValue = ref("")
    const TabActive = ref()
    const cancelClick = ()=>{
        router.back()
    }

    //获取服务器数据
    // getCityAll().then((result) => {
    //     console.log(result);
    // }).catch((err) => {
    //     console.log(err);
    // });

    //从store中获取数据
    const cityStore = useCityStore()
    //发起网络请求
    cityStore.fetchAllCityData()
    //设为响应式
    const { allCities } = storeToRefs(cityStore)

    const currentCity = computed(()=>allCities.value[TabActive.value])
</script>

<style lang="less" scoped>
.top {
    position: relative;
    z-index: 10;
}
.content {
    //视口
    height: calc(100vh - 98px);
    //溢出滚动
    overflow-y: auto;
}
</style>