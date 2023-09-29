import dayjs  from 'dayjs'

export function formatMonthDay(date) {
    return dayjs(date).format("MM月DD日")
}

//计算时间差
export function selectDiffTime(startDate,endDate) {
    return dayjs(endDate).diff(startDate,"day")
}