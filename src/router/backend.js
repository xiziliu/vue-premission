// 首页和登录
import DataAnalysis from '@/pages/backend/DataAnalysis';
import Login from '@/pages/backend/Login';

// account
import User from '@/pages/backend/account/User';
import Admin from '@/pages/backend/account/Admin';


// host
import Banner from '@/pages/backend/host/Banner';


let _dynamicRouters = [
    {
        path: 'index',
        component: DataAnalysis,
        meta: {
            title: '首页'
        }
    },
    {
        path: 'banner',
        component: Banner,
        meta: {
            title: '轮播图'
        }
    },
    {
        path: 'user',
        component: User,
        meta: {
            title: '账户管理'
        }
    },
    {
        path: 'admin',
        component: Admin,
        meta: {
            title: '管理员'
        }
    }
    
];

let defaultRoutes= [
    {
        path: '/',
        redirect: 'login'
    },
    {
        path: 'login',
        component: Login,
        meta: {
            title: '登录'
        }
    },
    
]

export default defaultRoutes;
export let dynamicRouters = _dynamicRouters;