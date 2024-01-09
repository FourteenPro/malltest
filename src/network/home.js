import { requests_get } from "./request";

export function getHomeMultidata () {
    return requests_get({
        url: '/home/multidata'
    })
}

export function getHomeGoods(type, page){
    return requests_get({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}