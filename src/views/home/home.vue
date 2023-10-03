<template>
    <div class="home">
        <home-nav-bar></home-nav-bar>
        <img src="@/assets/img/home/banner.webp" alt="">
        <home-nav-search></home-nav-search>
        <home-categoriea></home-categoriea>
        <home-content></home-content>
        <div class="search-bar" v-if="isShowSearchBar">
            <search-bar/>
        </div>
        
    </div>
</template>

<script setup>
import { watch,computed } from 'vue'
import useHomeStore from '@/stores/modules/home';
import homeNavBar from './cpns/home_nav_bar.vue'
import homeNavSearch from './cpns/home-nav-search.vue'
import homeCategoriea from './cpns/home-categoriea.vue'
import homeContent from './cpns/home-content.vue'
import searchBar from '@/components/search-bar/index.vue'
import uesScroll from '@/hooks/useScroll'


const homeStore = useHomeStore()

const {isReachBtn,scrollListHandle,scrollTop} = uesScroll()

//监视屏幕滑动
watch(isReachBtn , (newValue)=>{
    if(newValue) {
        homeStore.fetchHomeList().then(()=>{
            isReachBtn.value = false
        })

    }
})

//超过360px出现
//为什么用computed而不是watch
// 定义的可响应式数据, 依赖另外一个可响应式的数据, 那么可以使用计算函数(computed)
const isShowSearchBar = computed(()=>{
    return scrollTop.value > 360
})
</script>




<style lang="less" scoped>
.home {
    padding-bottom: 60px;
    img {
        width: 100%;
    }
    
    .search-bar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 45px;
        padding: 16px 16px 10px;
        background-color: #fff;
    }
}
</style>

