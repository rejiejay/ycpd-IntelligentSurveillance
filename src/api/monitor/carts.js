import apibasics from '@/components/apibasics';
import config from '@/config';

/**
 * 合作网点（统计：合作网点数，为合作网点数，新增网点，签约率）
 * @param {string} startDate 开始日期 2018-01-01 (非必填)
 * @param {string} endDate 结束日期 2018-01-01 (非必填)
 */
export function countStoreInfoUsingGET(startDate, endDate) {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/storeMap/countStoreMapInfo?startDate=${startDate}&endDate=${endDate}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    });
}

/**
 * 条件查询车商地图展示
 * @param {string} startDate 开始日期 2018-01-01 (非必填)
 * @param {string} endDate 结束日期 2018-01-01 (非必填)
 * @param {string} bcId 支公司 唯一标识
 * @param {string} teamId 团队 唯一标识
 * @param {string} networkName 车行
 * @param {string} isJoin 是否合作
 * @param {string} networkType 网点类型
 * @param {string} lowestSumpremium 最低保费
 * @param {string} highestSumpremium 最高保费
 * @param {string} lowestMaterialfee 最低定损
 * @param {string} highestMaterialfee 最高定损
 * @param {string} lowestProportion 最低占比
 * @param {string} highestProportion 最高占比
 */
export function listStoreToMapUsingGET(startDate, endDate, bcId, teamId, networkName, isJoin, networkType, lowestSumpremium, highestSumpremium, lowestMaterialfee, highestMaterialfee, lowestProportion, highestProportion) {
    let urlparam = '';

    urlparam += startDate ? `&startDate=${startDate}` : '';
    urlparam += endDate ? `&endDate=${endDate}` : '';
    urlparam += bcId ? `&bcId=${bcId}` : '';
    urlparam += teamId ? `&teamId=${teamId}` : '';
    urlparam += networkName ? `&networkName=${networkName}` : '';
    urlparam += isJoin ? `&isJoin=${isJoin}` : '';
    urlparam += networkType ? `&networkType=${networkType}` : '';
    urlparam += lowestSumpremium ? `&lowestSumpremium=${lowestSumpremium}` : '';
    urlparam += highestSumpremium ? `&highestSumpremium=${highestSumpremium}` : '';
    urlparam += lowestMaterialfee ? `&lowestMaterialfee=${lowestMaterialfee}` : '';
    urlparam += highestMaterialfee ? `&highestMaterialfee=${highestMaterialfee}` : '';
    urlparam += lowestProportion ? `&lowestProportion=${lowestProportion}` : '';
    urlparam += highestProportion ? `&highestProportion=${highestProportion}` : '';

    if (urlparam.indexOf('&') !== -1) {
        urlparam = `?${urlparam.substr(1)}`;
    }
    
    return apibasics({
        url: `${config.url.origin}/cdimms/server/storeMap/list${urlparam}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    });
}
