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
                        <span class="time">{{ startDateStr }}</span>
                    </div>
                    
                    <div class="stay" @click="selectCalendar">住{{stayTime}}晚</div>
                </div>

                <div class="end">
                    <div class="date">
                        <span class="tip">离店</span>
                        <span class="time">{{ endDateStr }}</span>
                    </div>
                </div>
        </div>

        <van-calendar v-model:show="showDate" type="range" @confirm="onConfirm"  color="#ff9854" />
        <!-- 价格/人数选择 -->
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

        <!-- 开始搜索框 -->
        <div class="section">
            <div class="btn" @click="searchClick">
                <span class="text">
                    开始搜索
                </span>
        </div>
        </div>

        <!-- categories -->
        
    </div>
</template>

<script setup>
import { ref,computed,toRef } from "vue";
import { useRouter } from "vue-router";
import  useCityStore  from '@/stores/modules/city.js'
import useHomeStore from "@/stores/modules/home.js"
import useMainStore from "@/stores/modules/main";
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
    const mainStore = useMainStore()
    const {startDate,endDate}  =storeToRefs(mainStore)
    //转化为字符串的处理函数
    const startDateStr = computed(()=>formatMonthDay(startDate.value))
    const endDateStr = computed(()=>formatMonthDay(endDate.value))

    //点击弹出日历
    const selectCalendar = ()=>{
        showDate.value = true
    }

    
    //计算住宿时间
    const showDate = ref(false)

    //日历选择时间
    const stayTime = ref(selectDiffTime(startDate.value,endDate.value))
    // const stayTime = computed(()=>{
    //     return selectDiffTime(newDate,nextDate)
    // })

    //确定选择时间差
    const onConfirm = (value)=>{
        const selectStartDate = value[0]
        const selectEndDate = value[1]

        mainStore.startDate =  selectStartDate
        mainStore.endDate =  selectEndDate

        //获取住宿时间差
        stayTime.value = selectDiffTime(selectStartDate,selectEndDate)

        //关闭日历弹窗
        showDate.value = false
    }

    //搜索按钮
    const searchClick = ()=>{
        router.push({
            path:"/search",
            query:{
                startDate:startDate.value,
                endDate:endDate.value,
                currentCity:currentCity.cityName
            }
        })
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
            height: 44px;
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
  height: auto;

  .item {
    padding: 4px 8px;
    margin: 4px;
    border-radius: 14px;
    font-size: 12px;
    line-height: 1;
  }
}

.btn {
    
    // margin: 0 auto;
    height: 44px;
    width: 100%;
    text-align: center;
    line-height: 44px;
    border-radius: 28px;
    background-image: var(--theme-linear-gradient);
    .text {
        // text-align: center;
        font-size: 20px;
        color:white;
        // font-weight: 600;
    }
}
</style>