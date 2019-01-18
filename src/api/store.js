import config from '@/config';
import notLoading from '@/components/apibasics-notLoading';

/**
 * 查询车行下拉列表
 * @param {string} storeName 车行名称
 */
export function queryStoreSelectUsingPOST(storeName) {
    return notLoading({
        url: `${config.url.origin}/cdimms/server/store/queryStoreSelect`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            storeName: storeName,
        }
    });
}
