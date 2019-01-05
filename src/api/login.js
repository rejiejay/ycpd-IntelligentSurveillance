import axios from 'axios';
import apibasics from '@/components/apibasics';
import config from '@/config';

/**
 * 获取登录用的token
 */
export function getBaseToken() {
    return axios({
        url: `${config.url.origin}/necrs/server/index`,
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
        url: `${config.url.origin}/necrs/server/loginByPC`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            name: username,
            password: password,
            token: loginToken,
        }
    });
}

/**
 * 校验滑动图片距离是否正确
 * @param {string} checkoutToken 获取人机验证码图片返回的对应 token
 * @param {string} jigsawMovepx 移动的距离
 */
export function checkImage(checkoutToken, jigsawMovepx) {
    return axios({
        url: `${config.url.origin}/necrs/server/checkImage?token=${checkoutToken}&xWidth=${Math.floor(jigsawMovepx)}`,
        method: 'get',
    });
}

/**
 * 获取人机验证码图片
 * @param {string} baseToken 使用当前页面的基础token获取人机验证码图片
 */
export function reqCheckImage(baseToken) {
    return axios({
        url: `${config.url.origin}/necrs/server/reqCheckImage?token=${baseToken}&width=360&height=160`,
        method: 'get',
    });
}

/**
 * 退出登录
 */
export function logout() {
    return apibasics({
        url: `${config.url.origin}/necrs/server/logout`,
        method: 'get'
    });
}
