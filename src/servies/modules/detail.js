import myRequest from '../request'

export function getDetail(houseId) {
    return myRequest.get({
        url:"/detail/infos",
        params:{
            houseId
        }
    })
}