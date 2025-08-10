import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: '',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/user/login.vue'),
        meta: {
            title: '登录',
            freeAuth: true
        }
    },
    {
        path: '/select',
        name: 'select',
        component: () => import('@/pages/user/select.vue'),
        meta: {
            title: '选择端',
            freeAuth: true
        }
    },
    {
        path: '/student',
        name: 'student',
        component: () => import('@/pages/user/student.vue'),
        meta: {
            title: '学生端',
            freeAuth: true
        }
    },
    {
        path: '/choose',
        name: 'choose',
        component: () => import('@/pages/manager/choose.vue')
    },
    {
        path: '/classSelect',
        name: 'classSelect',
        component: () => import('@/pages/manager/classSelect.vue'),
        meta: {
            title: '班级选择',
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
                path: 'home',
                name: 'home',
                component: () => import('@/pages/manager/home.vue'),
                meta: {
                    title: '主页',
                    freeAuth: true
                }
            },
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
                path: 'classSelect',
                name: 'classSelect',
                component: () => import('@/pages/manager/classSelect.vue'),
                meta: {
                    title: '班级选择',
                    freeAuth: true
                }
            },
            {
                path: 'classRate/:classNumber',
                name: 'classRate',
                component: () => import('@/pages/manager/classRate.vue'),
                meta: {
                    title: '班级考勤',
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
                }
            },
            {
                path: 'recordDetail',
                name: 'recordDetail',
                component: () => import('@/pages/manager/recordDetail.vue'),
                meta: {
                    title: '记录详情',
                    freeAuth: true
                }
            }
        ]
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
