import {RouteRecordRaw} from "vue-router";
import isShow from '../utils/judgeTheClient'

let pcView = () => import('@/view/Main.vue')
let MoView = () => import('@/view/Mobile/Main.vue')
let isMobile = isShow ? MoView : pcView

// const modules = import.meta.glob('@/view/*/*.vue')  // vite动态导入
// component: modules[`@/view/${isMobile}/main.vue`],
// component: resolve => { require([`@/view/${isMobile}/Home.vue`], resolve) }

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: isMobile,
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('@/view/Home.vue'),
            },
            {
                path: 'special',
                name: 'special',
                component: () => import('@/view/Special.vue'),
            },
            {
                path: 'record',
                name: 'record',
                component: () => import('@/view/Record.vue'),
            },
            {
                path: 'about',
                name: 'about',
                component: () => import('@/view/About.vue'),
            },
            {
                path: 'articleDetails', //动态路由文章详情
                name: 'articleDetails',
                component: () => import('@/view/ArticleDetails.vue'),
            },
            {
                path: 'detail', //专栏文章
                name: 'detail',
                component: () => import('@/view/Detail.vue'),
            },
        ]
    },
    {path: '/:pathMatch(.*)*', name: '404', component: import('@/view/404.vue')},
]
