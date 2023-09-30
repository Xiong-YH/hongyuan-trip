import { onMounted, onUnmounted, ref } from "vue"
import { throttle } from 'underscore'



export default function uesScroll() {
    const isReachBtn = ref(false)
    const clientHeight = ref(0)
    const scrollTop = ref(0)
    const scrollHeight = ref(0)
    const scrollListHandle = throttle(()=>{
        // //客户端高度
        // const clientHeight = document.documentElement.clientHeight
        // //滚动高度
        // const scrollTop = document.documentElement.scrollTop
        // //元素高度
        // const scrollHeight = document.documentElement.scrollHeight

         clientHeight.value = document.documentElement.clientHeight
         scrollTop.value = document.documentElement.scrollTop
         scrollHeight.value = document.documentElement.scrollHeight
        if(clientHeight.value + scrollTop.value+1 >= scrollHeight.value) {
            console.log("到底了");
            isReachBtn.value = true
        }
    },100)

    onMounted(()=>{
        console.log("mount监听中");
        
        window.addEventListener("scroll",scrollListHandle)
        
    })
    
    onUnmounted(()=>{
        console.log("unmount监听中");

        window.removeEventListener("scroll",scrollListHandle)
    })

    return { isReachBtn , clientHeight , scrollTop , scrollHeight }
}

