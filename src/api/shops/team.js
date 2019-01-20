import apibasics from '@/components/apibasics';
import notFilter from '@/components/apibasics-notFilter';
import config from '@/config';
import axios from 'axios';

/**
 * 获取团队列表
 * @param {number} pageNo 当前页码
 * @param {number} pageSzie 页面大小
 * @param {number} companyId 支公司 id
 * @param {number} storeId 团队 id
 * @param {number} teamId 团队 id
 */
export function queryAllTeamUsingPOST(pageNo, pageSzie, companyId, storeId, teamId) {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/team/queryAllTeam`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            pageNo: pageNo ? pageNo : 1,
            pageSzie: pageSzie ? pageSzie : 10,
            companyId: companyId ? companyId : '',
            storeId: storeId ? storeId : '',
            teamId: teamId ? teamId : '',
        }
    });
}

/**
 * 删除团队记录
 * @param {number} teamId 团队唯一标识
 */
export function removeTeamUsingPOST(teamId) {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/team/removeTeam?teamId=${teamId}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    });
}

/**
 * 团队记录列表导出excel
 * @param {number} companyId 支公司 id
 * @param {number} storeId 团队 id
 * @param {number} teamId 团队 id
 */
export function exportTeamUsingGET(companyId, storeId, teamId) {
    let urlparam = '';

    urlparam += companyId ? `&companyId=${companyId}` : '';
    urlparam += storeId ? `&storeId=${storeId}` : '';
    urlparam += teamId ? `&teamId=${teamId}` : '';

    if (urlparam.indexOf('&') !== -1) {
        urlparam = `?${urlparam.substr(1)}`;
    }

    return axios({
        url: `${config.url.origin}/cdimms/server/team/exportTeam${urlparam}`,
        method: 'get',
        headers: {
            token: window.sessionStorage.cdimmstoken,
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

/**
 * 团队记录列表导入excel模板
 */
export function getTeamTemplateUsingGET() {

    return axios({
        url: `${config.url.origin}/cdimms/server/team/getTeamTemplate`,
        method: 'get',
        headers: {
            token: window.sessionStorage.cdimmstoken,
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
