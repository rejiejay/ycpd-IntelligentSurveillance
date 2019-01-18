import apibasics from '@/components/apibasics';
import config from '@/config';

/**
 * 用户归属下拉框
 */
export function queryCompanyListUsingGET() {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/user/queryCompanyList`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    });
}
