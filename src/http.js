import axios from 'axios'
import router from './router'
import qs from 'qs'
import store from './store'

// axios 配置
axios.defaults.timeout = 15000
// axios.defaults.baseURL = 'http://192.168.199.156:91'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// http request 拦截器
axios.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    },
)

// http response 拦截器
axios.interceptors.response.use(
    response => {
        if (!response.data.status) {
            switch (response.data.code) {
                case 3:
                    store.state.loginRole=''
                    break;
                case 4:
                    // console.log('go')
                    router.push('/back/login');
                    break;
            }
        }
        return response;
    }
)

// 请求超时重新发起请求
axios.defaults.retry = 1; //重试次数
axios.defaults.retryDelay = 3000; //重试延时
axios.defaults.shouldRetry = (error) => true; //重试条件，默认只要是错误都需要重试
axios.interceptors.response.use(undefined, (err) => {
    var config = err.config;
    // 判断是否配置了重试
    if (!config || !config.retry) return Promise.reject(err);

    if (!config.shouldRetry || typeof config.shouldRetry != 'function') {
        return Promise.reject(err);
    }

    //判断是否满足重试条件
    if (!config.shouldRetry(err)) {
        return Promise.reject(err);
    }

    // 设置重置次数，默认为0
    config.__retryCount = config.__retryCount || 0;

    // 判断是否超过了重试次数
    if (config.__retryCount >= config.retry) {
        return Promise.reject(err);
    }

    //重试次数自增
    config.__retryCount += 1;

    //延时处理
    var backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, config.retryDelay || 1);
    });

    //重新发起axios请求
    return backoff.then(function() {
        return axios(config);
    });
});

// export default axios
export default {
    get(url, params) {
        return axios({
            method: 'get',
            url,
            params, // get 请求时带的参数
        }).then(
            (response) => {
                return response
            }
        ).then(
            (res) => {
                return res
            }
        )
    },
    post(url, data) {
        return axios({
            method: 'post',
            url,
            data: qs.stringify(data),
        }).then(
            (response) => {
                return response
            }
        ).then(
            (res) => {
                return res
            }
        )
    },
    all: axios.all,
    spread: axios.spread
}