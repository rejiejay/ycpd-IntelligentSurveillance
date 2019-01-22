import apibasics from '@/components/apibasics';
import config from '@/config';
import notLoading from '@/components/apibasics-notLoading';

/**
 * 根据支公司唯一id获取团队列表
 * @param {string} bcId 支公司 唯一标识
 */
export function queryTeamByBcIdUsingGET(bcId) {
    return notLoading({
        url: `${config.url.origin}/cdimms/server/team/queryTeamByBcId?bcId=${bcId}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    });
}
