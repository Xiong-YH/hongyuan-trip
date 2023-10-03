import { defineStore } from "pinia";
import { getDetail } from "@/servies"

const useDetailStore = defineStore("detail",{
    state:()=>({
        mainPart:null
    }),
    actions:{
        async fetchDetail(id) {
            const res = await getDetail(id)
            this.mainPart = res.data.mainPart
            
        }
    }
})

export default useDetailStore