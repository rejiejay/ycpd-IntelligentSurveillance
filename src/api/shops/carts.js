import apibasics from '@/components/apibasics';
import config from '@/config';

/**
 * 按条件查询车行列表
 * @param {number} companyId 支公司 id
 * @param {number} storeId 网点 id
 * @param {number} teamId 团队 id
 */
export function findAllStoreUsingPOST(companyId, storeId, teamId) {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/role/queryRoleList`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            companyId: companyId,
            storeId: storeId,
            teamId: teamId,
        }
    });
}
