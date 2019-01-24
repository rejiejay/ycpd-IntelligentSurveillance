import apibasics from '@/components/apibasics';
import config from '@/config';
import notLoading from '@/components/apibasics-notLoading';
import { downloadUsingPOST } from '@/components/download';

/**
 * 获取角色列表
 * @param {number} currentPage 当前页码
 * @param {number} pageCount 当前页大小
 * @param {number} roleCode 角色代码 (非必填)
 * @param {number} roleName 角色名称 (非必填)
 */
export function queryRoleListUsingPOST(currentPage, pageCount, roleCode, roleName) {
    return notLoading({
        url: `${config.url.origin}/cdimms/server/role/queryRoleList`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            currentPage: currentPage ? currentPage : 1,
            pageCount: pageCount ? pageCount : 10,
            roleCode: roleCode ? roleCode : '',
            roleName: roleName ? roleName : '',
        }
    });
}

/**
 * 角色代码下拉框
 */
export function queryRoleCodeListUsingGET() {
    return notLoading({
        url: `${config.url.origin}/cdimms/server/role/queryRoleCodeList`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    });
}

/**
 * 导出角色
 * @param {number} roleCode 角色代码 (非必填)
 * @param {number} roleName 角色名称 (非必填)
 */
export function exportRoleListUsingPOST(roleCode, roleName) {
    downloadUsingPOST('/cdimms/server/role/exportRoleList', {
        roleCode: roleCode ? roleCode : '',
        roleName: roleName ? roleName : '',
    });
}
