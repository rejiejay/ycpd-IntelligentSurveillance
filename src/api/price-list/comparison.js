import config from '@/config';
import apibasics from '@/components/apibasics';
import { downloadUsingGET } from '@/components/download';

/**
 * 产保比明细列表
 * @param {number} pageNo 当前页 必填
 * @param {number} pageSize 总页码 必填
 * @param {String} startDate 开始时间
 * @param {String} endDate 结束时间
 * @param {String} bcId 支公司
 * @param {String} teamId 团队
 * @param {String} networkType 车行
 * @param {String} lowestProportion 最低保费
 * @param {String} highestProportion 最高保费
 */
export function listPremiumLossAssessRatioUsingGET(pageNo, pageSize, startDate, endDate, bcId, teamId, networkType, lowestProportion, highestProportion) {
    let urlparam = `?pageNo=${pageNo}&pageSize=${pageSize}`;
    urlparam += startDate ? `&startDate=${startDate}` : '';
    urlparam += endDate ? `&endDate=${endDate}` : '';
    urlparam += bcId ? `&bcId=${bcId}` : '';
    urlparam += teamId ? `&teamId=${teamId}` : '';
    urlparam += networkType ? `&networkType=${networkType}` : '';
    urlparam += lowestProportion ? `&lowestRatio=${lowestProportion}` : '';
    urlparam += highestProportion ? `&highestRatio=${highestProportion}` : '';

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
 * @param {String} networkType 车商ID
 * @param {String} lowestProportion 最低保费
 * @param {String} highestProportion 最高保费
 */
export function exportPremiumLossAssessRatioUsingGET(startDate, endDate, bcId, teamId, networkType, lowestProportion, highestProportion) {
    let urlparam = '';

    urlparam += startDate ? `&startDate=${startDate}` : '';
    urlparam += endDate ? `&endDate=${endDate}` : '';
    urlparam += bcId ? `&bcId=${bcId}` : '';
    urlparam += teamId ? `&teamId=${teamId}` : '';
    urlparam += networkType ? `&networkType=${networkType}` : '';
    urlparam += lowestProportion ? `&lowestRatio=${lowestProportion}` : '';
    urlparam += highestProportion ? `&highestRatio=${highestProportion}` : '';

    if (urlparam.indexOf('&') !== -1) {
        urlparam = `?${urlparam.substr(1)}`;
    }

    downloadUsingGET(`/cdimms/server/premiumLossAssessRatio/export${urlparam}`);
}
