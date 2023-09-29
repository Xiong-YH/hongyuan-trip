import myRequest from '../request'

export function getHotSuggestions() {
    return myRequest.get({url:"/home/hotSuggests"})
}