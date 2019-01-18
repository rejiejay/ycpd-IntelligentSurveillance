import config from '@/config';
import apibasics from '@/components/apibasics';
import axios from 'axios';

/**
 * 产保比明细列表
 * @param {number} pageNo 当前页 必填
 * @param {number} pageSize 总页码 必填
 * @param {String} startDate 开始时间
 * @param {String} endDate 结束时间
 * @param {String} storeId 车商ID
 * @param {String} bcId 支公司
 * @param {String} teamId 团队
 * @param {String} networkName 车行
 * @param {String} lowestProportion 最低保费
 * @param {String} highestProportion 最高保费
 */
export function listPremiumLossAssessRatioUsingGET(pageNo, pageSize, startDate, endDate, storeId, bcId, teamId, networkName, lowestProportion, highestProportion) {
    let urlparam = `?pageNo=${pageNo}&pageSize=${pageSize}`;
    urlparam += startDate ? `&startDate=${startDate}` : '';
    urlparam += endDate ? `&endDate=${endDate}` : '';
    urlparam += storeId ? `&storeId=${storeId}` : '';
    urlparam += bcId ? `&bcId=${bcId}` : '';
    urlparam += teamId ? `&teamId=${teamId}` : '';
    urlparam += networkName ? `&networkName=${networkName}` : '';
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
 * @param {String} storeId 车商ID
 * @param {String} bcId 支公司
 * @param {String} teamId 团队
 * @param {String} networkName 车行
 * @param {String} lowestProportion 最低保费
 * @param {String} highestProportion 最高保费
 */
export function exportPremiumLossAssessRatioUsingGET(startDate, endDate, storeId, bcId, teamId, networkName, lowestProportion, highestProportion) {
    let urlparam = '';

    urlparam += startDate ? `&startDate=${startDate}` : '';
    urlparam += endDate ? `&endDate=${endDate}` : '';
    urlparam += storeId ? `&storeId=${storeId}` : '';
    urlparam += bcId ? `&bcId=${bcId}` : '';
    urlparam += teamId ? `&teamId=${teamId}` : '';
    urlparam += networkName ? `&networkName=${networkName}` : '';
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
        let blob = new Blob([response.data], {type: 'application/vnd.ms-excel;charset=utf-8'});
        window.location.href = window.URL.createObjectURL(blob);
        
    }).catch(error =>  console.log(error));
}
