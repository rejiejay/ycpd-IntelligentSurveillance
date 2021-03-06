import apibasics from '@/components/apibasics';
import notFilter from '@/components/apibasics-notFilter';
import config from '@/config';
import { downloadUsingPOST, downloadUsingGET } from '@/components/download';

/**
 * 获取支公司信息列表
 * @param {number} pageNo 当前页码
 * @param {number} pageSize 页面大小
 * @param {number} companyId 支公司 id
 */
export function queryAllCompanyUsingPOST(pageNo, pageSize, companyId) {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/company/queryAllCompany`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            companyId: companyId ? companyId : '',
            pageNo: pageNo ? pageNo : 1,
            pageSize: pageSize ? pageSize : 10,
        }
    });
}

/**
 * 公司信息列表导出excel
 * @param {number} companyId 支公司 id
 */
export function exportCompanyUsingGET(companyId) {
    downloadUsingPOST('/cdimms/server/company/exportCompany', {
        companyId: companyId ? companyId : '',
    });
}

/**
 * 删除支公司记录
 * @param {number} companyId 支公司 id
 */
export function removeCompanyUsingGET(companyId) {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/company/removeCompany${companyId ? `?companyId=${companyId}` : ''}`,
        method: 'get',
    });
}

/**
 * 新增支公司信息
 * @param {number} bcCode 预警名称
 * @param {number} bcName 支公司名称
 * @param {number} leaderCode 分管领导代码
 * @param {number} leaderName 分管领导姓名
 * @param {number} leaderPhone 分管领导电话
 * @param {number} adminCode 管理员代码
 * @param {number} adminName 管理员姓名
 * @param {number} adminPhone 管理员电话
 * @param {number} remark 管理员电话
 */
export function addCompanyUsingPOST(bcCode, bcName, leaderCode, leaderName, leaderPhone, adminCode, adminName, adminPhone, remark ) {
    return notFilter({
        url: `${config.url.origin}/cdimms/server/company/addCompany`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            bcCode: bcCode,
            bcName: bcName,
            leaderCode: leaderCode,
            leaderName: leaderName,
            leaderPhone: leaderPhone,
            adminCode: adminCode,
            adminName: adminName,
            adminPhone: adminPhone,
            remark: remark ? remark : '',
        }
    });
}

/**
 * 编辑支公司信息
 * @param {number} bcCode 预警名称
 * @param {number} bcName 支公司名称
 * @param {number} leaderCode 分管领导代码
 * @param {number} leaderName 分管领导姓名
 * @param {number} leaderPhone 分管领导电话
 * @param {number} adminCode 管理员代码
 * @param {number} adminName 管理员姓名
 * @param {number} adminPhone 管理员电话
 * @param {number} remark 管理员电话
 */
export function modifierCompanyUsingPOST(id, bcCode, bcName, leaderCode, leaderName, leaderPhone, adminCode, adminName, adminPhone, remark ) {
    return notFilter({
        url: `${config.url.origin}/cdimms/server/company/modifierCompany`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            id: id,
            bcCode: bcCode,
            bcName: bcName,
            leaderCode: leaderCode,
            leaderName: leaderName,
            leaderPhone: leaderPhone,
            adminCode: adminCode,
            adminName: adminName,
            adminPhone: adminPhone,
            remark: remark ? remark : '',
        }
    });
}
