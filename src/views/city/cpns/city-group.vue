<template>
    <div class="city-group">
        <van-index-bar highlight-color="black" :sticky="false" :index-list="indexList">
            <!-- 热门城市 -->
            <van-index-anchor index="热门" />
                <div class="list">
                    <template v-for="(city,index) in groupData.hotCities">
                        <div class="city" @click="cityClick(city)">
                            {{ city.cityName }}
                        </div>
                    </template>
                </div>
            <!-- A-Z城市 -->
            <template v-for="(group,index) in groupData?.cities" :key="index">
                <van-index-anchor :index="group.group" />
                <template v-for="(city,inden) in group.cities" :key="inden">
                    <van-cell :title="city.cityName" @click="cityClick(city)"/>
                </template>
            </template>
            
        </van-index-bar>


        <!-- <template v-for="(group,index) in groupData?.cities" :key="index">
                <div class="group-item">
                    <h2>标题{{ group.group }}</h2>
                    <div class="list">
                        <template v-for="(city,inden) in group.cities" :key="inden">
                            <div class="city">
                                {{ city.cityName }}
                            </div>
                        </template>
                    </div>
                </div>
        </template> -->
    </div>
</template>

<script setup>
import { ref,computed } from "vue";
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import  useCityStore  from '@/stores/modules/city.js'
    //获取props
    const props = defineProps({
        groupData:{
            type:Object,
            default:()=>({})
        }
    })

    //动态展示索引
    const indexList = computed(()=>{
        return props.groupData.cities.map((item)=>item.group)
    })

    //获取路由
    const router = useRouter()
    //点击获取城市
    const cityStore = useCityStore()
    const cityClick = (city)=>{
        cityStore.currentCity = city

        router.back()
    }
</script>

<style lang="less" scoped>
.list {
    display:flex;
    //换行
    flex-wrap: wrap;
    //水平方向排布
    justify-content: space-around;
    padding: 10px;
    padding-right: 25px;
    .city {
        width:70px;
        height: 28px;
        border-radius: 14px;
        color: black;
        background-color: #fff4ec;
        font-size: 12px;
        margin: 6px;
        //居中
        text-align: center;
        line-height: 28px;
    }
}
</style>