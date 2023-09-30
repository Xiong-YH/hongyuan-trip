<template>
    <div class="tab-bar">
        <van-tabbar v-model="currenIndex" active-color="#ff9854" :route="true">
            <template v-for="(item,index) in tabbarData">
                <van-tabbar-item :to="item.path">
                    <span>{{ item.text }}</span>
                    <template #icon>
                        <img :src="getAssetURL(item.imge)" alt="" v-if="currenIndex !== index">
                        <img :src="getAssetURL(item.imgeAction)"  v-else alt="">
                    </template>
                </van-tabbar-item>
            </template>
        </van-tabbar>

        <!-- <template v-for="(item,index) in tabbarData">
            <div class="tab-bar-item" @click="itemClick(index,item)" :class="{active:currenIndex === index}">
                <img :src="getAssetURL(item.imge)" alt="" v-if="currenIndex !== index">
                <img :src="getAssetURL(item.imgeAction)"  v-else alt="">
                <span class="text">{{ item.text }}</span>
            </div>
        </template> -->
    </div>
</template>

<script setup>
    import tabbarData from '@/assets/data/tab-bar.js'
    import {getAssetURL} from '@/utils/load_assets.js'
    import {ref ,watch} from 'vue'
    import {useRouter,useRoute} from 'vue-router'


    //通过监听路由改变得到索引
    const currenIndex = ref(0)
    const route = useRoute()
    const router = useRouter()

    watch(route,(newValue)=>{
        const index = tabbarData.findIndex(item=>
            item.path === newValue.path)
        console.log(index);
        if(index == -1) return
        currenIndex.value = index
    })


    // const itemClick = (index,item)=>{
    //     currenIndex.value = index
    //     router.push(item.path)
    // }


</script>

<style lang="less" scoped>
.tab-bar {
    
   .img {
    width: 26px;
   }
}
</style>