import { requests_get } from "./request";

export function getHomeMultidata () {
    return requests_get({
        url: '/home/multidata'
    })
}