import config from '@/config';
import apibasics from '@/components/apibasics';

/**
 * 查询车行下拉列表
 * @param {string} storeName 车行名称
 */
export function queryStoreSelectUsingPOST(storeName) {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/store/queryStoreSelect`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            storeName: storeName,
        }
    });
}
