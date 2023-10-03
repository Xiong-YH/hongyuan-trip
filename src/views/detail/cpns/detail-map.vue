<template>
    <div class="home">
        <detail-section title="位置周边" more-text="查看更多周边信息">
        <div class="gaode" ref="mapRef"></div>
        </detail-section>
    </div>
</template>

<script setup>
import DetailSection from "@/components/detail-section/detail-section.vue"
import { onMounted, ref } from 'vue'


//获取props
const props = defineProps({
  position: {
    type: Object,
    default: () => ({})
  }
})

//获得节点
const mapRef = ref()

//拿到节点
onMounted(()=>{
    const map = new AMap.Map(mapRef.value,{
        zoom: 12,
    	center: [props.position.longitude, props.position.latitude]
    });
    const marker = new AMap.Marker({
        position:[props.position.longitude, props.position.latitude]//位置
    })
    map.add(marker);//添加到地图

})


</script>

<style lang="less" scoped>
.gaode {
    height: 200px;
}
</style>