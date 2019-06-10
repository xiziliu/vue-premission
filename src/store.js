import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loginRole:'',
        dynamicRoutersCache: null,
        backendMenus:null
    },
    getters: {
        getCacheRouters: state => {
            return state.dynamicRoutersCache;
        },
        getCacheRouterParentIndex: (state) => (path) => {
            let ret = {'parentIdx':0,'name':'首页'};
            if (state.dynamicRoutersCache) {
                state.dynamicRoutersCache.forEach((menu, index) => {
                    menu.submenu.forEach(sub => {
                        if (sub.path == path) {
                            ret.parentIdx = index;
                            ret.name = sub.name;
                        }
                    })
                
                });
            }
            return ret;
        }
    },
    mutations: {
        cacheRouters(state, payload) {
            state.dynamicRoutersCache = payload; 
        },
        toggleLoading(state, payload) {
            state.isShowLoading = payload;
        },
        setLoinRole(state, role) {
            state.loginRole = role;
        }
        
    }
    
})
