//引入二次封装的请求
import {get, get2, post, put, del} from '../request/http'

//个人信息
export const personalInformation = (data = {}) => {
    return get('/personalInformation', data)
}
//友链
export const friendshipChain = (data = {}) => {
    return get('/friendshipChain', data)
}
//所有文章
export const allArticles = (data: object) => {
    return post('/allArticles', data)
}
//掘金文章
export const nuggetsArticles = (data = {}) => {
    return get('/nuggetsArticles', data)
}
//文章详情
export const articleDetails = (data: string) => {
    return get2('/articleDetails', data)
}
//所有专栏
export const specialColumn = (data: object) => {
    return post('/specialColumn', data)
}
//专栏具体文章
export const columnQuery = (data: object) => {
    return post('/columnQuery', data)
}
//总专栏描述
export const generalColumn = (data = {}) => {
    return get('/generalColumn', data)
}
//单个专栏描述
export const singleColumn = (data: object) => {
    return post('/singleColumn', data)
}
//介绍
export const about = (data = {}) => {
    return get('/about', data)
}
//音乐
export const songSheet = (data = {}) => {
    return get('/songSheet', data)
}

