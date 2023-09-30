import { defineStore } from "pinia";

const newDate = new Date()
const nextDate = new Date().setDate(newDate.getDate()+1)

const useMainStore = defineStore("main",{
    state:()=>({
        startDate:newDate,
        endDate:nextDate
    })
})

export default useMainStore