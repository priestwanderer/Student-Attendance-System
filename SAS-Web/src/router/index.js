import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: '',
        redirect: '/head/rota'
    },
    {
        path: '/demo',
        name: 'demo',
        component: () => import('@/pages/demo/demo.vue'),
        meta: {
            title: '示例页面',
            freeAuth: true
        }
    },
    {
        path: '/head',
        name: 'head',
        component: () => import('@/pages/user/head.vue'),
        meta: {
            title: '导航栏',
            freeAuth: true
        },
        children: [
            {
                path: 'arrangement',
                name: 'arrangement',
                component: () => import('@/pages/manager/arrangement.vue'),
                meta: {
                    title: '安排',
                    freeAuth: true
                }
            },
            {
                path: 'rota',
                name: 'rota',
                component: () => import('@/pages/manager/rota.vue'),
                meta: {
                    title: '考勤',
                    freeAuth: true
                }
            },
            {
                path: 'record',
                name: 'record',
                component: () => import('@/pages/manager/record.vue'),
                meta: {
                    title: '记录',
                    freeAuth: true
                },
                children: [
                    {
                        path: 'recordDetail',
                        name : 'recordDetail',
                        component: () => import('@/pages/manager/recordDetail.vue'),
                        meta: {
                            title: '记录详情',
                            freeAuth: true
                        }
                    }
                ]
            },
            {
                path: 'upload',
                name: 'upload',
                component: () => import('@/pages/user/upload.vue'),
                meta: {
                    title: '上传',
                    freeAuth: true
                }
            }
        ],
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// 导航守卫
router.beforeEach((to, from, next) => {
    // 从 localStorage 中读取 token
    const token = localStorage.getItem('token');
    // 判断当前页面 meta 信息是否包含免认证标识
    const freeAuthMeta = to.matched.some((record) => record.meta.freeAuth);
    // 如果不是免认证的页面并且没有token，则跳转到登录页
    if (!freeAuthMeta && !token) {
        next({ name: 'login' });
    } else {
        next();
    }
});

export default router;
