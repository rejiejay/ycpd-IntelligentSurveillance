import apibasics from '@/components/apibasics';
import config from '@/config';

/**
 * 支公司监控展示
 * @param {string} bcName 按照支公司搜索
 * @param {string} startDate 开始时间
 * @param {string} endDate 结束时间
 * @param {string} orderBy 根据什么字段排序 PREMIUM:保费, LOSS_ASSESSMENT:定损, RATIO：产保比
 * @param {string} sortType ASC 顺序 DESC:倒叙
 */
export function listCompanyMonitorUsingGET(bcName, startDate, endDate, orderBy, sortType) {
    let urlparam = '';

    urlparam += bcName ? `&bcName=${bcName}` : '';
    urlparam += startDate ? `&startDate=${startDate}` : '';
    urlparam += endDate ? `&endDate=${endDate}` : '';
    urlparam += orderBy ? `&orderBy=${orderBy}` : '';
    urlparam += sortType ? `&sortType=${sortType}` : '';

    if (urlparam.indexOf('&') !== -1) {
        urlparam = `?${urlparam.substr(1)}`;
    }
    
    return apibasics({
        url: `${config.url.origin}/cdimms/server/companyMonitor/list${urlparam}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    });
}
