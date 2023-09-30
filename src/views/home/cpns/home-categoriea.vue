<template>
    <div class="categories">
        <template v-for="(item,index) in categories" :key="item.id">
            <div class="item">
                <img :src="item.pictureUrl" alt="">
                <div class="text">{{ item.title }}</div>
            </div>
        </template>
        
    </div>
</template>

<script setup>
import useHomeStore from "@/stores/modules/home.js"
import { storeToRefs } from 'pinia';

const homeStore = useHomeStore()
    homeStore.fetchCategories()
    const {categories} = storeToRefs(homeStore)


</script>

<style lang="less" scoped>
.categories {
    display: flex;
    overflow-x: auto;
    height: 80px;
    padding: 0 10px;
    margin-top: 8px;
    // align-items: center;
    &::-webkit-scrollbar {
    display: none;
  }
    .item {
        width: 70px;
        //flex-shrink为1时会自动压缩
        flex-shrink: 0;
        //父元素设置
        text-align: center;
        // display: flex;
        // flex-direction: column;
        // //垂直水平居中
        // align-items:center;
        // justify-content: center;
        img {
            width: 32px;
            height: 32px;
        }
        .text {
            font-size: 12px;
            margin-top: 5px;
        }
    }

//     .item {
//     flex-shrink: 0;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     width: 70px;
//     text-align: center;

//     img {
//       width: 32px;
//       height: 32px;
//     }

//     .text {
//       font-size: 12px;
//       margin-top: 8px;
//     }
//   }
}
</style>