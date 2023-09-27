<template>
    <div class="home">
        <home-nav-bar></home-nav-bar>
        <img src="@/assets/img/home/banner.webp" alt="">
        <div class="location">
            <div class="city">广州</div>
            <div class="position">
                <span class="text">我的位置</span>
                <img src="@/assets/img/home/icon_location.png" alt="">
            </div>
        </div>
    </div>
</template>

<script setup>
import homeNavBar from './cpns/home_nav_bar.vue'
</script>

<style lang="less" scoped>
.home {

    img {
        width: 100%;
    }
    .location {
        display: flex;
        align-items: center;
        height: 44px;
        padding: 0 20px;
        .city {
            flex: 1;
        }
        
        .position {
            width: 74px;
            display: flex;
            align-items: center;
            .text {
                font-size: 12px;
                
            }
            img {
                margin-left: 5px;
                width: 18px;
                height: 18px;
            }
        }
    }
    
}
</style>

