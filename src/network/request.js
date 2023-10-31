import axios from 'axios'

export function requests_get(option) {
    // 创建axioss实例
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000',
        timeout: 5000,
    })

    // 设置请求拦截
    instance.interceptors.request.use(config => {
        console.log('请求拦截：', config)
        return config
    },err => {
        console.log('请求拦截失败：', err)
        return err
    })
    // 设置响应拦截
    instance.interceptors.response.use(response => {
        console.log('响应拦截：', response)
        return response.data
    },err => {
        console.log('响应拦截失败：', err)
        return err
    })

    return instance(option)
}