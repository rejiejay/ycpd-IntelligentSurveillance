import apibasics from '@/components/apibasics';
import config from '@/config';
import notLoading from '@/components/apibasics-notLoading';
import axios from 'axios';

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
    return axios({
        url: `${config.url.origin}/cdimms/server/role/exportRoleList`,
        method: 'post',
        headers: {
            token: window.sessionStorage.cdimmstoken,
        },
        data: {
            roleCode: roleCode ? roleCode : '',
            roleName: roleName ? roleName : '',
        },
        responseType: 'arraybuffer'
    }).then(response => {
        let contentdisposition = response.headers['content-disposition']; // "attachment; filename=LossAssessment.xlsx"
        let myFlieName = contentdisposition.slice(contentdisposition.indexOf('=') + 1);
        
        let blob = new Blob([response.data], {type: 'application/vnd.ms-excel;charset=utf-8'});
        let url = window.URL.createObjectURL(blob);
        let link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        link.setAttribute('download', myFlieName);

        document.body.appendChild(link);
        link.click();
    }).catch(error =>  console.log(error));
}
