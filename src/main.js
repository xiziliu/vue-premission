// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import iView from 'iview';
import './my-theme/index.less';
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import commonUtil from './pages/backend/commonUtil ';
import axios from './http';
/* vue-lazyload */
// Vue.use(VueLazyload)

/* iView */
Vue.use(iView);
Vue.prototype.$Message.config({
    top: 300,
    // duration: 2
});

/* axios */
Vue.prototype.axios = axios;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    axios,
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
});

//页面刷新时加载缓存的动态router
let has_login = localStorage.getItem('loginRole');
if (has_login != '') {
    let url= has_login == 'admin' 
                    ? 'http://www.mocky.io/v2/5cfe0cb63200004f0045edf2' 
                    : 'http://www.mocky.io/v2/5cfe1180320000540045ee1d';
    axios.get(url)
        .then(response => {
            if (response.data.status ===true) {
                commonUtil.generateRoutes(response.data.data.menus, router);
            }
        });
} else {
    //此处模拟未登陆时接口返回的结果
    axios.get('http://www.mocky.io/v2/5cfe0c853200002c0045edef')
        .then(response => {
        });
}


