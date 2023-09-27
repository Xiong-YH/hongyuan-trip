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
    import {ref} from 'vue'
    import {useRouter} from 'vue-router'

    const active = ref(0)
    const currenIndex = ref(0)
    const router = useRouter()
    const itemClick = (index,item)=>{
        currenIndex.value = index
        router.push(item.path)
    }
</script>

<style lang="less" scoped>
.tab-bar {
    img {
        height: 26px;
    }
}
</style>