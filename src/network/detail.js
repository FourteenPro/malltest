import {requests_get} from './request'


export function getDetail(id) {
    return requests_get({
        url: '/detail',
        params: {
            iid: id,
        }
        
    })
}