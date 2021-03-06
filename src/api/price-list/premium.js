import config from '@/config';
import apibasics from '@/components/apibasics';
import { downloadUsingGET } from '@/components/download';

/**
 * 保费明细列表
 * @param {number} pageNo 当前页 必填
 * @param {number} pageSize 总页码 必填
 * @param {String} startDate 开始时间
 * @param {String} endDate 结束时间
 * @param {String} networkType 车商ID
 * @param {String} bcId 支公司
 * @param {String} teamId 团队
 * @param {String} lowestSumpremium 最低保费
 * @param {String} highestSumpremium 最高保费
 */
export function listPremiumUsingGET(pageNo, pageSize, startDate, endDate, networkType, bcId, teamId, lowestSumpremium, highestSumpremium) {
    let urlparam = `?pageNo=${pageNo}&pageSize=${pageSize}`;
    urlparam += startDate ? `&startDate=${startDate}` : '';
    urlparam += endDate ? `&endDate=${endDate}` : '';
    urlparam += networkType ? `&networkType=${networkType}` : '';
    urlparam += bcId ? `&bcId=${bcId}` : '';
    urlparam += teamId ? `&teamId=${teamId}` : '';
    urlparam += lowestSumpremium ? `&lowestSumpremium=${lowestSumpremium}` : '';
    urlparam += highestSumpremium ? `&highestSumpremium=${highestSumpremium}` : '';

    return apibasics({
        url: `${config.url.origin}/cdimms/server/premium/list${urlparam}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    });
}

/**
 * 保费明细导出excel
 * @param {String} startDate 开始时间
 * @param {String} endDate 结束时间
 * @param {String} networkType 车商ID
 * @param {String} bcId 支公司
 * @param {String} teamId 团队
 * @param {String} lowestSumpremium 最低保费
 * @param {String} highestSumpremium 最高保费
 */
export function exportPremiumUsingGET(startDate, endDate, networkType, bcId, teamId, lowestSumpremium, highestSumpremium) {
    let urlparam = '';

    urlparam += startDate ? `&startDate=${startDate}` : '';
    urlparam += endDate ? `&endDate=${endDate}` : '';
    urlparam += networkType ? `&networkType=${networkType}` : '';
    urlparam += bcId ? `&bcId=${bcId}` : '';
    urlparam += teamId ? `&teamId=${teamId}` : '';
    urlparam += lowestSumpremium ? `&lowestSumpremium=${lowestSumpremium}` : '';
    urlparam += highestSumpremium ? `&highestSumpremium=${highestSumpremium}` : '';

    if (urlparam.indexOf('&') !== -1) {
        urlparam = `?${urlparam.substr(1)}`;
    }

    downloadUsingGET(`/cdimms/server/premium/export${urlparam}`);
}
