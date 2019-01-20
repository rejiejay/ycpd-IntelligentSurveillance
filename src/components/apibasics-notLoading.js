/**
 * ajaxs请求复用的抽象
 */
import axios from 'axios';
import { Message } from 'element-ui';
import Router from '@/router';

// 创建axios实例
const apibasics = axios.create();

/**
 * 设置 请求(request)拦截器
 */
apibasics.interceptors.request.use(
    /**
     * 拦截请求头
     */
    config => {
        // 让每个请求携带自定义token
        config.headers['token'] = window.sessionStorage.cdimmstoken ? window.sessionStorage.cdimmstoken : 'null';

        return config;
    },

    /**
     * 请求未发出去的情况
     */
    error => {
        console.error(error); // for debug
        Message({
            message: `请求未发送, 原因: ${error}`,
            type: 'error',
            duration: 5 * 1000
        });
        Promise.reject(error); // 这个的意思是 获取到 Promise 然后调用 reject
    },
);

/**
 * 设置 响应(response)拦截器
 */
apibasics.interceptors.response.use(
    /**
     * 拦截响应
     */
    response => {
        const res = response.data;
        
        /**
         * 判断拦截的是否有 1000 没有的情况表示失败
         */
        if (res.code !== 1000) {
            // 不是 1000 的情况下, 直接报出错误

            Message({
                message: res.message,
                type: 'error',
                duration: 5 * 1000
            });

            return Promise.reject('error');

        } else {
            return response.data;

        }
    },

    /**
     * 服务器返回错误的情况
     */
    error => {
        let response = error.response;

        // 网络错误的情况
        if (response.status === 0 && response.statusText === 'error') {
            Message({
                message: `网络错误, 请检查你的网络`,
                type: 'error',
                duration: 5 * 1000
            });
            return Promise.reject('网络错误, 请检查你的网络');
        }

        // 登录过期的情况
        if (response.status === 444) {
            Message({
                message: `登录过期, 请重新登录`,
                type: 'error',
                duration: 5 * 1000
            });
            window.sessionStorage.removeItem('cdimmstoken');
            Router.push({ path: '/login' });
            return Promise.reject('登录过期, 请重新登录');
        }
    
        // 服务器正在升级或异常
        if (response.status === 502) {
            Message({
                message: `服务器正在升级或异常,请稍后再试!`,
                type: 'error',
                duration: 5 * 1000
            });
            // 跳转等正在升级页面
            Router.push({ path: '/404' });
            return Promise.reject('服务器正在升级或异常,请稍后再试!');
        } 
        
        console.error(`服务器错误: ${error}`); // for debug

        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        });

        return Promise.reject(error);
    },
);

export default apibasics