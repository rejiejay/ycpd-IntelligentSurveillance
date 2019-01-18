import config from '@/config';
import notLoading from '@/components/apibasics-notLoading';

/**
 * 保费明细列表
 * @param {number} pageNo 当前页 必填
 * @param {number} pageSize 总页码 必填
 * @param {String} startDate 开始时间
 * @param {String} endDate 结束时间
 * @param {String} storeId 车商ID
 * @param {String} bcId 支公司
 * @param {String} teamId 团队
 * @param {String} networkName 车行
 * @param {String} lowestSumpremium 最低保费
 * @param {String} highestSumpremium 最高保费
 */
export function listPremiumUsingGET(pageNo, pageSize, startDate, endDate, storeId, bcId, teamId, networkName, lowestSumpremium, highestSumpremium) {
    let urlparam = `?pageNo=${pageNo}&pageSize=${pageSize}`;
    urlparam += startDate ? `&startDate=${startDate}` : '';
    urlparam += endDate ? `&endDate=${endDate}` : '';
    urlparam += storeId ? `&storeId=${storeId}` : '';
    urlparam += bcId ? `&bcId=${bcId}` : '';
    urlparam += teamId ? `&teamId=${teamId}` : '';
    urlparam += networkName ? `&networkName=${networkName}` : '';
    urlparam += lowestSumpremium ? `&lowestSumpremium=${lowestSumpremium}` : '';
    urlparam += highestSumpremium ? `&highestSumpremium=${highestSumpremium}` : '';

    return notLoading({
        url: `${config.url.origin}/cdimms/server/premium/list${urlparam}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    });
}
