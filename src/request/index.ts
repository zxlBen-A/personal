import axios from 'axios';

const CancelToken: any = axios.CancelToken; // axios 的取消请求

const service = axios.create({
     baseURL: 'http://127.0.0.1:3000/api', // 可以不需要
    // baseURL: 'http://43.138.75.248:3000/api', // 可以不需要
    timeout: 10000,  // 超时时间
    // withCredentials: true,
    // headers: {
    //     'version': '1.0.1', // 接口的版本号
    //     'Authorization': 'Bearer ' + token, // 向后台发送的token
    //     get: {
    //         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //     },
    //     post: {
    //         'Content-Type': 'application/json;charset=utf-8'
    //     }
    // },
    // validateStatus () {
    //     return true;
    // },

});

// 防止重复提交 利用axios的cancelToken
let pending: any[] = []; // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识

/**
 * 取消重复请求
 * @param config
 * @param f
 */
const removePending: any = (config: any, f: any) => {
    const flgUrl = config.url;
    if (pending.indexOf(flgUrl) !== -1) {
        if (f) {
            f('取消重复请求');
        } else {
            pending.splice(pending.indexOf(flgUrl), 1); // 删除记录
        }
    } else {
        if (f) {
            pending.push(flgUrl);
        }
    }
}

/**
 * 请求拦截器
 */
// service.interceptors.request.use(
//     (config: any) => {
//         if (!config.neverCancel) {
//             // 生成canalToken
//             config.cancelToken = new CancelToken((c: any) => {
//                 removePending(config, c);
//             });
//         }
//         // 添加请求头以及其他逻辑处理
//         return config;
//     },
//     (error: any) => {
//         Promise.resolve(error);
//     }
// );

/**
 * 响应拦截器
 */
// service.interceptors.response.use(
//     (response: any) => {
//         removePending(response.config);
//         const res = response.data;
//         // 后端status错误判断
//         if (res.code === 200) {
//             return Promise.resolve(res);
//         } else {
//             // 错误状态码处理
//             return Promise.reject(res);
//         }
//     },
//     (error: any) => {
//         // Http错误状态码处理
//         return Promise.reject(error);
//     }
// );

export default service;

