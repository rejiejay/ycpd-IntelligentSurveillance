import apibasics from '@/components/apibasics';
import config from '@/config';
import axios from 'axios';

/**
 * 获取车行列表
 * @param {number} pageNo 当前页码
 * @param {number} pageSzie 页面大小
 * @param {number} companyId 支公司 id
 * @param {number} storeId 网点 id
 * @param {number} teamId 团队 id
 */
export function findAllStoreUsingPOST(pageNo, pageSzie, companyId, storeId, teamId) {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/store/queryAllStore`,
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
 * 车行记录列表导出excel
 * @param {number} companyId 支公司 id
 * @param {number} storeId 网点 id
 * @param {number} teamId 团队 id
 */
export function exportStoreUsingGET(companyId, storeId, teamId) {
    let urlparam = '';

    urlparam += companyId ? `&companyId=${companyId}` : '';
    urlparam += storeId ? `&storeId=${storeId}` : '';
    urlparam += teamId ? `&teamId=${teamId}` : '';

    if (urlparam.indexOf('&') !== -1) {
        urlparam = `?${urlparam.substr(1)}`;
    }

    return axios({
        url: `${config.url.origin}/cdimms/server/store/exportStore${urlparam}`,
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
 * 下载车行导入模板
 */
export function getStoreTemplateUsingGET() {

    return axios({
        url: `${config.url.origin}/cdimms/server/store/getStoreTemplate`,
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
