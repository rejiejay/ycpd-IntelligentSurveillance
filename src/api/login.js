import axios from 'axios';
import apibasics from '@/components/apibasics';
import config from '@/config';

/**
 * 获取登录用的token
 */
export function getBaseToken() {
    return axios({
        url: `${config.url.origin}/cdimms/server/index`,
        method: 'get',
    });
}

/**
 * 获取登录用的token
 * @param {string} username 用户名
 * @param {string} password 密码
 * @param {string} loginToken 人机验证成功后返的token
 */
export function postLogin(username, password, loginToken) {
    return axios({
        url: `${config.url.origin}/cdimms/server/loginByPC`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            userName: username,
            passwd: password,
            token: loginToken,
        }
    });
}

/**
 * 退出登录
 */
export function getlogout() {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/logout`,
        method: 'get'
    });
}

/**
 * 返回用户类型
 */
export function getUserType() {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/user/getUserType`,
        method: 'get'
    });
}
