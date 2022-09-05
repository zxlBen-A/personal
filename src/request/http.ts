import request from './index';

/**
 * 封装get请求
 * @param {string} url 请求地址
 * @param {Object} params 请求参数
 * @param {Object} headers 请求需要设置的header头
 */
export const get = (url: string, params: object, headers={}) => {
    return request({
        url,
        method: 'get',
        params,
        headers
    });
}

/**
 * 封装post请求
 * @param {string} url 请求地址
 * @param {Object} data 请求参数
 * @param {Object} headers 请求的header头
 */
export const post = (url: string, data: object, headers={}) => {
    return request({
        url,
        method: 'post',
        data,
        headers
    });
}

/**
 * 封装put请求
 * @param {string} url 请求地址
 * @param {Object} data 请求参数
 * @param {Object} headers 请求设置的header头
 */
export const put = (url: string, data: object, headers={}) => {
    return request({
        url,
        method: 'put',
        data,
        headers
    });
}

/**
 * 封装delete请求
 * @param {string} url 请求地址
 * @param {Object} data 请求参数
 * @param {Object} headers 请求设置的header头
 */
export const del = (url: string, data: object, headers={}) => {
    return request({
        url,
        method: 'delete',
        data,
        headers
    });
}


