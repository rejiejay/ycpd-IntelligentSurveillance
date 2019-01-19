import apibasics from '@/components/apibasics';
import config from '@/config';
import notFilter from '@/components/apibasics-notFilter';

/**
 * 获取用户列表
 * @param {number} currentPage 当前页码
 * @param {number} pageCount 当前页大小
 * @param {number} userType 用户类型
 * @param {number || string} bcName 用户归属
 * @param {number || string} staffName 用户姓名
 * @param {number || string} staffCode 用户代码
 * @param {number || string} roleName 角色
 * @param {number || string} state 状态
 */
export function queryUserListUsingPOST(currentPage, pageCount, userType, bcName, staffName, staffCode, roleName, state) {
    return notFilter({
        url: `${config.url.origin}/cdimms/server/user/queryUserList`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            currentPage: currentPage ? currentPage : 1,
            pageCount: pageCount ? pageCount : 10,
            userType: userType ? userType : '',
            bcName: bcName ? bcName : '',
            staffName: staffName ? staffName : '',
            staffCode: staffCode ? staffCode : '',
            roleName: roleName ? roleName : '',
            state: state ? state : '',
        }
    });
}

/**
 * 用户角色下拉框
 */
export function queryRoleListUsingGET() {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/user/queryRoleList`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    });
}
