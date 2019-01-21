import apibasics from '@/components/apibasics';
import config from '@/config';

/**
 * 获取车行列表
 * @param {number} pageNo 当前页码
 * @param {number} pageSzie 页面大小
 * @param {number} companyId 支公司 id
 */
export function queryAllCompanyUsingPOST(pageNo, pageSzie, companyId) {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/prediction/queryAllCompanyPrediction`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            pageNo: pageNo ? pageNo : 1,
            pageSzie: pageSzie ? pageSzie : 10,
            companyId: companyId ? companyId : '',
        }
    });
}
