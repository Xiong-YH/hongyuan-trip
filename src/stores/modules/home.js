import { defineStore } from "pinia";
import { getHotSuggestions , getCategories ,getHomeList } from "@/servies/index.js"

const useHomeStore = defineStore("home",{
    state:()=>({
        hotSuggests:[],
        categories:[],
        homeList:[],
        currentPage:1
    }),
    actions:{
        async fetchHotSuggext() {
            const res = await getHotSuggestions()
            // console.log(res);
            this.hotSuggests = res.data
            
        },
        async fetchCategories () {
            const res = await getCategories()
            this.categories = res.data
        },
        async fetchHomeList() {
            const res = await getHomeList(this.currentPage)
            this.homeList.push(...res.data)
            this.currentPage++
        }
    }
})


export default useHomeStore