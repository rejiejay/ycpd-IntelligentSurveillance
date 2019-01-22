import config from '@/config';
import apibasics from '@/components/apibasics';
import axios from 'axios';

/**
 * 产保比明细列表
 * @param {number} pageNo 当前页 必填
 * @param {number} pageSize 总页码 必填
 * @param {String} startDate 开始时间
 * @param {String} endDate 结束时间
 * @param {String} bcId 支公司
 * @param {String} teamId 团队
 * @param {String} storeId 车行
 * @param {String} lowestProportion 最低保费
 * @param {String} highestProportion 最高保费
 */
export function listPremiumLossAssessRatioUsingGET(pageNo, pageSize, startDate, endDate, bcId, teamId, storeId, lowestProportion, highestProportion) {
    let urlparam = `?pageNo=${pageNo}&pageSize=${pageSize}`;
    urlparam += startDate ? `&startDate=${startDate}` : '';
    urlparam += endDate ? `&endDate=${endDate}` : '';
    urlparam += bcId ? `&bcId=${bcId}` : '';
    urlparam += teamId ? `&teamId=${teamId}` : '';
    urlparam += storeId ? `&storeId=${storeId}` : '';
    urlparam += lowestProportion ? `&lowestProportion=${lowestProportion}` : '';
    urlparam += highestProportion ? `&highestProportion=${highestProportion}` : '';

    return apibasics({
        url: `${config.url.origin}/cdimms/server/premiumLossAssessRatio/list${urlparam}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    });
}

/**
 * 产保比明细导出excel
 * @param {String} startDate 开始时间
 * @param {String} endDate 结束时间
 * @param {String} bcId 支公司
 * @param {String} teamId 团队
 * @param {String} storeId 车商ID
 * @param {String} lowestProportion 最低保费
 * @param {String} highestProportion 最高保费
 */
export function exportPremiumLossAssessRatioUsingGET(startDate, endDate, bcId, teamId, storeId, lowestProportion, highestProportion) {
    let urlparam = '';

    urlparam += startDate ? `&startDate=${startDate}` : '';
    urlparam += endDate ? `&endDate=${endDate}` : '';
    urlparam += bcId ? `&bcId=${bcId}` : '';
    urlparam += teamId ? `&teamId=${teamId}` : '';
    urlparam += storeId ? `&storeId=${storeId}` : '';
    urlparam += lowestProportion ? `&lowestProportion=${lowestProportion}` : '';
    urlparam += highestProportion ? `&highestProportion=${highestProportion}` : '';

    if (urlparam.indexOf('&') !== -1) {
        urlparam = `?${urlparam.substr(1)}`;
    }

    return axios({
        url: `${config.url.origin}/cdimms/server/premiumLossAssessRatio/export${urlparam}`,
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
