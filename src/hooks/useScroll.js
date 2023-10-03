import { onMounted, onUnmounted, ref } from "vue"
import { throttle } from 'underscore'



export default function uesScroll(elRef) {
    let el = window
    const isReachBtn = ref(false)
    const clientHeight = ref(0)
    const scrollTop = ref(0)
    const scrollHeight = ref(0)
    //防抖函数
    const scrollListHandle = throttle(()=>{
        if(el === window) {
            //获取的是窗口
            clientHeight.value = document.documentElement.clientHeight
            scrollTop.value = document.documentElement.scrollTop
            scrollHeight.value = document.documentElement.scrollHeight
        }else {
            clientHeight.value = el.clientHeight
            scrollTop.value = el.scrollTop
            scrollHeight.value = el.scrollHeight
        }
        if(clientHeight.value + scrollTop.value+1 >= scrollHeight.value) {
            
            isReachBtn.value = true
        }
    },100)

    onMounted(()=>{
        if(elRef) {
            el = elRef.value
        }
        // console.log("mount监听中");
        
        el.addEventListener("scroll",scrollListHandle)
        
    })
    
    onUnmounted(()=>{
        console.log("unmount监听中");

        el.removeEventListener("scroll",scrollListHandle)
    })

    return { isReachBtn , clientHeight , scrollTop , scrollHeight }
}

