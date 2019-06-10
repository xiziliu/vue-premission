import {dynamicRouters} from '../../router/backend';
import backMenu from './BackMenu';
import store from '../../store'

let util = {
    generateRoutes(dynamicMenus,vueRouter){
        let root ={
            path: '/back',
            component: backMenu,
            children: []
        };
        let addRouter =[]
        dynamicMenus.forEach(menu => {
            menu.submenu.forEach(sub=>{
                let r =dynamicRouters.find(el=>{
                        return el.path == sub.path;
                });
                addRouter.push(r);
            })
            
        });
        root.children=addRouter;
        vueRouter.addRoutes([root]);
        store.commit('cacheRouters', dynamicMenus);
    }
};

export default util;