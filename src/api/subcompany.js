import config from '@/config';
import notLoading from '@/components/apibasics-notLoading';

/**
 * 用户归属下拉框
 */
export function queryCompanyListUsingGET() {
    return notLoading({
        url: `${config.url.origin}/cdimms/server/user/queryCompanyList`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    });
}
