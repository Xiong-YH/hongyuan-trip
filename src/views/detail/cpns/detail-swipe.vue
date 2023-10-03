<template>
    <div class="swiper">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">

            
                <template v-for="(item,index) in swipeData">
                    <van-swipe-item>
                        <img :src="item.url" alt="">
                    </van-swipe-item>
                </template>
            
            
            <template #indicator="{ active, total }">
            <div class="custom-indicator">
                <template v-for="(value,key,index) in mainGroup" :key="index">
                        <span class="item" 
                        :class="{ active : swipeData[active]?.enumPictureCategory == key }"
                        >
                            {{ getName(value[0].title) }}</span>
                        <span>{{ getIndex(swipeData[active],value,active) }}/{{ value.length }}</span>
                </template>
            </div>
            </template>
        </van-swipe>
    </div>
</template>

<script setup>
import useDetailStore from '@/stores/modules/detail.js'
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { isRef,computed,ref,defineProps } from 'vue'


const props = defineProps({
    swipeData:{
        typeof:Array,
        default:()=>[]
    }
})
// const route = useRoute()
// const houseId = route.params.id


// const detailStore = useDetailStore()
// detailStore.fetchDetail(houseId)

// let { mainPart } = storeToRefs(detailStore)
// console.log(mainPart);
// const swipeArr = ref(mainPart.value.topModule.housePicture.housePics)
// const swipeArr = computed(()=>{
//     return mainPart.value.topModule?.housePicture?.housePics
// })

// console.log(swipeArr);
//设定一个对象，里面包含不同enumPictureCategory的数组
const mainGroup = {}

for(let item of props.swipeData) {
    //若valueArr有值，取到mainGroup[item.enumPictureCategory]
    let valueArr = mainGroup[item.enumPictureCategory]
    if(!valueArr) {
         valueArr = []
        mainGroup[item.enumPictureCategory] = valueArr
    }
    valueArr.push(item)
}
const nameReg = /【(.*?)】/i
const getName = (name)=>{
    const res = nameReg.exec(name)
    return res[1]
}

const getIndex = (item,value,a)=>{
    // console.log(a,value);
    const index = value.findIndex(data=>data === item)
    return index+1
}
</script>

<style lang="less" scoped>
.swiper {
    img {
        width: 100%;
    }
    .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    color: #fff;
    background: #000;
    display:flex;

    .item {
        margin: 0 2px;
        &.active {
          padding: 0 3px;
          border-radius: 5px;
          background-color: #fff;
          color: #333;
        }
    }
  }
}
</style>