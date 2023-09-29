import { defineStore } from "pinia";
import { getHotSuggestions } from "@/servies/index.js"

const useHomeStore = defineStore("home",{
    state:()=>({
        hotSuggests:[],
        categories:[]
    }),
    actions:{
        async fetchHotSuggext() {
            const res = await getHotSuggestions()
            console.log(res);
            this.hotSuggests = res.data
            
        }
    }
})


export default useHomeStore