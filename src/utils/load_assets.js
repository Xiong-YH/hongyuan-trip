export const getAssetURL = (imge)=>{
    return new URL(`../assets/img/${imge}`,import.meta.url).href
}

