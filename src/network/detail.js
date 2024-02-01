import {requests_get} from './request'


export function getDetail(id) {
    return requests_get({
        url: '/detail',
        params: {
            iid: id,
        }
        
    })
}

export class Goods{
    constructor(itemInfo, columns, service) {
        this.desc = itemInfo.desc
        this.price = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this.service = service
    }
}