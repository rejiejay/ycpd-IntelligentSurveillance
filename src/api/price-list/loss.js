import config from '@/config';
import apibasics from '@/components/apibasics';
import { downloadUsingGET } from '@/components/download';

/**
 * 定损明细列表
 * @param {number} pageNo 当前页 必填
 * @param {number} pageSize 总页码 必填
 * @param {String} startDate 开始时间
 * @param {String} endDate 结束时间
 * @param {String} networkType 车商ID
 * @param {String} bcId 支公司
 * @param {String} teamId 团队
 * @param {String} lowestMaterialfee 最低保费
 * @param {String} highestMaterialfee 最高保费
 */
export function lossAssessmentUsingGET(pageNo, pageSize, startDate, endDate, networkType, bcId, teamId, lowestMaterialfee, highestMaterialfee) {
    let urlparam = `?pageNo=${pageNo}&pageSize=${pageSize}`;
    urlparam += startDate ? `&startDate=${startDate}` : '';
    urlparam += endDate ? `&endDate=${endDate}` : '';
    urlparam += networkType ? `&networkType=${networkType}` : '';
    urlparam += bcId ? `&bcId=${bcId}` : '';
    urlparam += teamId ? `&teamId=${teamId}` : '';
    urlparam += lowestMaterialfee ? `&lowestMaterialfee=${lowestMaterialfee}` : '';
    urlparam += highestMaterialfee ? `&highestMaterialfee=${highestMaterialfee}` : '';

    return apibasics({
        url: `${config.url.origin}/cdimms/server/lossAssessment/list${urlparam}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    });
}

/**
 * 定损明细导出excel
 * @param {String} startDate 开始时间
 * @param {String} endDate 结束时间
 * @param {String} networkType 车商ID
 * @param {String} bcId 支公司
 * @param {String} teamId 团队
 * @param {String} lowestMaterialfee 最低保费
 * @param {String} highestMaterialfee 最高保费
 */
export function exportLossAssessmentUsingGET(startDate, endDate, networkType, bcId, teamId, lowestMaterialfee, highestMaterialfee) {
    let urlparam = '';

    urlparam += startDate ? `&startDate=${startDate}` : '';
    urlparam += endDate ? `&endDate=${endDate}` : '';
    urlparam += networkType ? `&networkType=${networkType}` : '';
    urlparam += bcId ? `&bcId=${bcId}` : '';
    urlparam += teamId ? `&teamId=${teamId}` : '';
    urlparam += lowestMaterialfee ? `&lowestMaterialfee=${lowestMaterialfee}` : '';
    urlparam += highestMaterialfee ? `&highestMaterialfee=${highestMaterialfee}` : '';

    if (urlparam.indexOf('&') !== -1) {
        urlparam = `?${urlparam.substr(1)}`;
    }

    downloadUsingGET(`/cdimms/server/lossAssessment/export${urlparam}`);
}
