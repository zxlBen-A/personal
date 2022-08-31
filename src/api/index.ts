//引入二次封装的请求
import {get, post, put, del} from '../request/http'

//使用方法
export const getArticle = (data: object) => {
    return get('/api', data)
}


