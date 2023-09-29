<template>
    <div class="home-nav-search">
        <div class="location">
            <!-- 位置信息 -->
            <div class="city" @click="getCity">{{ currentCity.cityName }}</div>
            <div class="position" @click="getPosition">
                <span class="text">我的位置</span>
                <img src="@/assets/img/home/icon_location.png" alt="">
            </div>
            
        </div>

        <!-- 居住时间 -->
        <div class="section">
                <div class="start">
                    <div class="date">
                        <span class="tip">入住</span>
                        <span class="time">{{ startDate }}</span>
                    </div>
                    
                    <div class="stay" @click="selectCalendar">住{{stayTime}}晚</div>
                </div>

                <div class="end">
                    <div class="date">
                        <span class="tip">离店</span>
                        <span class="time">{{ endDate }}</span>
                    </div>
                </div>
        </div>

        <van-calendar v-model:show="showDate" type="range" @confirm="onConfirm"  color="#ff9854" />

        <div class="section price-counter bottom-gray-line">
            <div class="start">价格不限</div>
            <div class="end">人数不限</div>
        </div>
            <!-- 关键字 -->
        <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>

         <!-- 热门建议 -->
        <div class="section hot-suggests">
            <template v-for="(item, index) in hotSuggests" :key="index">
                <div 
                class="item"
                :style="{ color: item.tagText.color, background: item.tagText.background.color }"
                >
                {{ item.tagText.text }}
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref,computed,toRef } from "vue";
import { useRouter } from "vue-router";
import  useCityStore  from '@/stores/modules/city.js'
import useHomeStore from "@/stores/modules/home.js"
import { storeToRefs } from 'pinia';

import { formatMonthDay,selectDiffTime } from '@/utils/format_day'

    //获取城市
    const cityStore = useCityStore()
    const {currentCity} = storeToRefs(cityStore)

    //获取热门建议
    const homeStore = useHomeStore()
    homeStore.fetchHotSuggext()
    const { hotSuggests }  = storeToRefs(homeStore)

    


    //定位城市
    const getPosition = ()=>{
        navigator.geolocation.getCurrentPosition((res)=>{
            console.log('成功拿到位置',res)
        },(err)=>{
            console.log(err);
        },{
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        });
    }

    //选择城市
    const router = useRouter()
    const getCity = ()=>{
        router.push('/city')
    }

    //日期范围处理
    const newDate = new Date()
    const startDate = ref(formatMonthDay(newDate))
    const nextDate = new Date().setDate(newDate.getDate()+1)
    const endDate = ref(formatMonthDay(nextDate))

    //点击弹出日历
    const selectCalendar = ()=>{
        showDate.value = true
    }

    
    //计算住宿时间
    const showDate = ref(false)

    //日历选择时间
    const stayTime = ref(selectDiffTime(newDate,nextDate))
    // const stayTime = computed(()=>{
    //     return selectDiffTime(newDate,nextDate)
    // })

    const onConfirm = (value)=>{
        const selectStartDate = value[0]
        const selectEndDate = value[1]

        startDate.value =  formatMonthDay(selectStartDate)
        endDate.value =  formatMonthDay(selectEndDate)

        //获取住宿时间差
        stayTime.value = selectDiffTime(selectStartDate,selectEndDate)

        //关闭日历弹窗
        showDate.value = false
    }

    

</script>

<style lang="less" scoped>
.location {
        display: flex;
        align-items: center;
        height: 44px;
        padding: 0 20px;
        .city {
            flex: 1;
            color: #333;
            font-size: 15px;
        }
        
        .position {
            width: 74px;
            display: flex;
            align-items: center;
            .text {
                font-size: 12px;
                position: relative;
                top: 1px;
                color: #666;
            }
            img {
                margin-left: 5px;
                width: 18px;
                height: 18px;
            }
        }
        
    }
.section {
            padding: 0 20px;
            display: flex;
            flex-wrap: wrap;
            //
            align-items: center;
            color: #999;
            .start {
                flex: 1;
                display: flex;
                height: 44px;
                align-items: center;
                
                }
                
                .stay {
                    flex: 1;
                    text-align: center;
                    font-size: 12px;
                    color: #666;
                }
                .end {
                min-width: 30%;
                padding-left: 20px;
            }
            .date {
                    display: flex;
                    flex-direction: column;
                    .tip {
                    font-size: 12px;
                    color: #999;
                    }
                    .time {
                        margin-top: 3px;
                        color: #333;
                        font-size: 15px;
                        font-weight: 500;
                    }
                }
        
        }
            
.price-counter {
  .start {
    border-right: 1px solid  var(--line-color);
  }
}

.hot-suggests {
  margin: 10px 0;

  .item {
    padding: 4px 8px;
    margin: 4px;
    border-radius: 14px;
    font-size: 12px;
    line-height: 1;
  }
}
            
</style>