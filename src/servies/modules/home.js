import myRequest from '../request'

export function getHotSuggestions() {
    return myRequest.get({url:"/home/hotSuggests"})
}

export function getCategories() {
    return myRequest.get({url:'/home/categories'})
}

export function getHomeList(currenPage) {
    return myRequest.get({
        url:"/home/houselist",
        params:{
            page:currenPage
        }
    })
}