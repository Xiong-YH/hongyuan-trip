<template>
    <div class="detail top-page" ref="detailRef">
        <nav-bar :titles="names" @tabclick="tabclick" v-show="isShow"  ref="getBarRef" class="tabs"></nav-bar>
        <van-nav-bar
        title="房屋详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />
        
        <div v-if="mainPart">
        <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics"></detail-swipe>
        <detail-infos name="描述" :top-infos="mainPart.topModule" :ref="getSectionRef"></detail-infos>
        <detail-facility :house-facility="mainPart.dynamicModule.facilityModule.houseFacility" :ref="getSectionRef" name="设施"></detail-facility>
        <detail-landord :landlord="mainPart.dynamicModule.landlordModule" :ref="getSectionRef" name="房东"></detail-landord>
        <detail-comment :comment="mainPart.dynamicModule.commentModule" :ref="getSectionRef" name="评论"></detail-comment>
        <detail-notice :order-rules="mainPart.dynamicModule.rulesModule.orderRules" :ref="getSectionRef" name="须知"></detail-notice>
        <detail-map :position="mainPart.dynamicModule.positionModule" :ref="getSectionRef" name="周边"></detail-map>
        <detail-intro :price-intro="mainPart.introductionModule"></detail-intro>
        </div>

        <div class="footer">
            <img src="@/assets/img/detail/icon_ensure.png" alt="">
        <div class="text">弘源旅途, 永无止境!</div>
    </div>
    </div>
</template>

<script setup>
import { useRouter,useRoute } from "vue-router";
import useDetailStore from '@/stores/modules/detail.js'
import { storeToRefs } from 'pinia';
import { ref,computed,watch,onMounted } from 'vue'

import detailSwipe from './cpns/detail-swipe.vue'
import detailInfos from './cpns/detail-infos.vue'
import detailFacility from './cpns/detail-facility.vue'
import detailLandord from './cpns/detail-landord.vue'
import detailComment from './cpns/datail-comment.vue'
import detailNotice from './cpns/detail-notice.vue'
import detailMap from './cpns/detail-map.vue'
import detailIntro from './cpns/detail-intro.vue'
import navBar from '@/components/nav-bar/nav-bar.vue'

//导入hook函数
import uesScroll from '@/hooks/useScroll'


const route = useRoute()
const houseId = route.params.id
//异步获取数据
const detailStore = useDetailStore()
detailStore.fetchDetail(houseId)
let { mainPart } = storeToRefs(detailStore)



//通过获取父节点的值，监测节点的高度,记得加上top-age属性
const detailRef = ref()
const { scrollTop } = uesScroll(detailRef)
//利用计算属性进行获取
const isShow = computed(()=>{
  // console.log(detailRef.value);
  return scrollTop.value >= 300
})

//获取属性名,通过属性名获取不同名字的节点
const sectionEl = ref({})
const getSectionRef = (value)=>{
  //
  if(!value) return
  const name = value.$el.getAttribute("name")
  sectionEl.value[name] = value.$el 
}

//获取titles的name
const names = computed(()=>{
  return Object.keys(sectionEl.value)
})

let isClick = false
let currentDistance = -1
//通过点击获取到对应title
const tabclick = (index)=>{
  //得到名字所对应的节点
  const key = Object.keys(sectionEl.value)[index]
  const el = sectionEl.value[key]
  //offsetTop是元素距离父元素节点的距离
  let instance = el.offsetTop
  if(index != 0) {
    instance = instance -44
  }

  //scrollTo使元素滚动到指定坐标
  detailRef.value.scrollTo({
    top: instance,
    behavior: "smooth"
  })
  //跳转时不监听
  isClick = true
  currentDistance = instance
}

//获取navBar元素
const getBarRef = ref()
// onMounted(() => {
//   console.log(getBarRef.value);
// })

// const elArr = Object.values(sectionEl.value) //获取每个组件的offset
// const elOffset = elArr.map(item=>item.offsetTop)
// onMounted(()=>{
//   
// })
watch(scrollTop,(newValue)=>{

  const els = Object.values(sectionEl.value) //这两个无法放watch外面，若放置，则数组为空
  const values = els.map(el => el.offsetTop)

  // console.log(Object.values(sectionEl.value));
  // console.log(values);
  if (newValue === currentDistance) {
    isClick = false
  }
  if (isClick) return

  let index = values.length-1
  for(let i = 0; i<values.length; i++) {
    
    if(values[i] > newValue + 44) {
      index = i-1
      console.log(values[i]);
      break
    }
  }
  //为什么使用？可选链。因为执行时可能组件未挂载
  getBarRef.value?.setCurrentIndex(index)

  // console.log(getBarRef.value);
})





const router = useRouter()
const onClickLeft = ()=>{
    router.back()
}

</script>

<style lang="less" scoped>
.tabs {
  position:fixed;
    top:0;
    right:0;
    left:0;
    z-index:9;
}
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>