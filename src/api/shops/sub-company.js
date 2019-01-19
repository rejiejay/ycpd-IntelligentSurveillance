import apibasics from '@/components/apibasics';
import config from '@/config';

/**
 * 获取支公司信息列表
 * @param {number} pageNo 当前页码
 * @param {number} pageSzie 页面大小
 * @param {number} companyId 支公司 id
 */
export function queryAllCompanyUsingPOST(pageNo, pageSzie, companyId) {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/company/queryAllCompany`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            companyId: companyId ? companyId : '',
            pageNo: pageNo ? pageNo : 1,
            pageSzie: pageSzie ? pageSzie : 10,
        }
    });
}
