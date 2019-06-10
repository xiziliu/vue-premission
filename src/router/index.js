import Vue from 'vue'
import Router from 'vue-router'

// 后台
import BackMenu from '@/pages/backend/BackMenu'
import defaultRoutes from './backend'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            const position = {};
            if (to.hash) {
                position.selector = to.hash
            }
            if (to.matched.some(m => m.meta.scrollToTop)) {
                position.x = 0
                position.y = 0
            }
            return position
        }
    },
    routes: [{
            path: '',
            redirect: '/back'
        },
        {
            path: '/back',
            component: BackMenu,
            children: defaultRoutes
        }
    ]
})



export default router;
