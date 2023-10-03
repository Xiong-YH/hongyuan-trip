<template>
    <div id="TabBar">
        <template v-for="(item,index) in titles" :key="item">
            <div class="tabBar-item" 
            :class="{ active:index === current }"
             @click="currentIndex(index)"
             >
                <span>{{ item }}</span>
            </div>
        </template>
    </div>
</template>

<script setup>
import {ref} from 'vue'

const current = ref(0)

defineProps({
    titles:{
        type:Array,
        default:'我是默认'
    }
})


const emit = defineEmits(["tabclick"])

const currentIndex = (index)=>{
    current.value = index
    console.log(index);
    emit("tabclick",index)
}
const setCurrentIndex = (index)=>{
    current.value = index
    console.log(index);
}

defineExpose({
    setCurrentIndex
})
</script>



<style lang="less" scoped>
#TabBar {
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background-color:#fff;
    .tabBar-item {
    flex: 1;
    
    }
    .tabBar-item.active {
        color: #ff9854;
        font-weight: 700;
    }
    .tabBar-item.active span {
        border-bottom: 3px solid #ff9854;
        padding: 8px;
    }
}


</style>