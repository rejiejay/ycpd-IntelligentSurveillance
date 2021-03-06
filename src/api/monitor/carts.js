import apibasics from '@/components/apibasics';
import config from '@/config';

/**
 * 条件查询车商地图展示
 * @param {string} minLng 最大最小经纬度
 * @param {string} maxLng 最大最小经纬度
 * @param {string} minLat 最大最小经纬度
 * @param {string} maxLat 最大最小经纬度
 * @param {string} startDate 开始日期 2018-01-01 (非必填)
 * @param {string} endDate 结束日期 2018-01-01 (非必填)
 * @param {string} bcId 支公司 唯一标识
 * @param {string} teamId 团队 唯一标识
 * @param {string} id 车行唯一标识
 * @param {string} isJoin 是否合作
 * @param {string} networkType 网点类型
 * @param {string} lowestSumpremium 最低保费
 * @param {string} highestSumpremium 最高保费
 * @param {string} lowestMaterialfee 最低定损
 * @param {string} highestMaterialfee 最高定损
 * @param {string} lowestProportion 最低占比
 * @param {string} highestProportion 最高占比
 */
export function listStoreToMapUsingGET(minLng, maxLng, minLat, maxLat, startDate, endDate, bcId, teamId, id, isJoin, networkType, lowestSumpremium, highestSumpremium, lowestMaterialfee, highestMaterialfee, lowestProportion, highestProportion) {
    let urlparam = '';

    urlparam += minLng ? `&minLng=${minLng}` : '';
    urlparam += maxLng ? `&maxLng=${maxLng}` : '';
    urlparam += minLat ? `&minLat=${minLat}` : '';
    urlparam += maxLat ? `&maxLat=${maxLat}` : '';
    urlparam += startDate ? `&startDate=${startDate}` : '';
    urlparam += endDate ? `&endDate=${endDate}` : '';
    urlparam += bcId ? `&bcId=${bcId}` : '';
    urlparam += teamId ? `&teamId=${teamId}` : '';
    urlparam += id ? `&id=${id}` : '';
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

/**
 * 根据ID,查询车行详情信
 * @param {string} id 车行唯一标识
 * @param {string} startDate 开始日期 2018-01-01 (必填)
 * @param {string} endDate 结束日期 2018-01-01 (必填)
 */
export function listByIdUsingGET(id, startDate, endDate) {
    let urlparam = `id=${id}`;

    urlparam += startDate ? `&startDate=${startDate}` : '';
    urlparam += endDate ? `&endDate=${endDate}` : '';

    return apibasics({
        url: `${config.url.origin}/cdimms/server/storeMap/listById?${urlparam}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    });
}

/**
 * 搜索框查询车行列表
 * @param {string} searchParam 车行唯一标识
 */
export function listStoreToSearchUsingGET(searchParam) {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/storeMap/listToSearch?searchParam=${searchParam}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    });
}
