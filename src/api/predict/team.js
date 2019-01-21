import apibasics from '@/components/apibasics';
import config from '@/config';
import axios from 'axios';

/**
 * 获取团队列表
 * @param {number} pageNo 当前页码
 * @param {number} pageSzie 页面大小
 * @param {number} bcId 支公司 id
 * @param {number} teamId 支公司 id
 * @param {number} month 月份
 */
export function queryAllTeamPredictionUsingPOST(pageNo, pageSzie, bcId, teamId, month) {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/prediction/queryAllTeamPrediction`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            pageNo: pageNo ? pageNo : 1,
            pageSzie: pageSzie ? pageSzie : 10,
            bcId: bcId ? bcId : '',
            teamId: teamId ? teamId : '',
            month: month ? month : '',
        }
    });
}

/**
 * 导出团队模板
 */
export function exportTeamPredictionUsingGET(bcId, teamId, month) {
    let urlparam = '';

    urlparam += bcId ? `&bcId=${bcId}` : '';
    urlparam += teamId ? `&teamId=${teamId}` : '';
    urlparam += month ? `&month=${month}` : '';

    if (urlparam.indexOf('&') !== -1) {
        urlparam = `?${urlparam.substr(1)}`;
    }

    return axios({
        url: `${config.url.origin}/cdimms/server/prediction/exportTeamPrediction${urlparam}`,
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
 * 下载团队模板
 */
export function getTeamPreTemplateUsingGET() {

    return axios({
        url: `${config.url.origin}/cdimms/server/prediction/getTeamPreTemplate`,
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
