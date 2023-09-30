import dayjs  from 'dayjs'

export function formatMonthDay(date,format = "MM月DD日") {
    return dayjs(date).format(format)
}

//计算时间差
export function selectDiffTime(startDate,endDate) {
    return dayjs(endDate).diff(startDate,"day")
}