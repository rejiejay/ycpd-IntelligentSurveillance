import apibasics from '@/components/apibasics';
import config from '@/config';
import { downloadUsingPOST, downloadUsingGET } from '@/components/download';
import upload from '@/components/upload';

/**
 * 获取支公司列表
 * @param {number} pageNo 当前页码
 * @param {number} pageSzie 页面大小
 * @param {number} bcId 支公司 id
 * @param {number} month 月份
 */
export function queryAllCompanyPredictionUsingPOST(pageNo, pageSzie, bcId, month) {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/prediction/queryAllCompanyPrediction`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            pageNo: pageNo ? pageNo : 1,
            pageSzie: pageSzie ? pageSzie : 10,
            bcId: bcId ? bcId : '',
            month: month ? month : '',
        }
    });
}

/**
 * 导出团队模板
 * @param {number} bcId 支公司 id
 * @param {number} month 月份
 */
export function exportCompanyPredictionUsingGET(bcId, month) {
    downloadUsingPOST('/cdimms/server/prediction/exportCompanyPrediction', {
        bcId: bcId ? bcId : '',
        month: month ? month : '',
    });
}

/**
 * 导入数据
 * @param {files} formData 文件表单
 */
export function importSubCompanyUsingFormData(formData) {
    return upload('/cdimms/server/prediction/importBcPrediction', formData);
}

/**
 * 下载支公司模板
 */
export function getBcPreTemplateUsingGET() {
    downloadUsingGET('/cdimms/server/prediction/getBcPreTemplate');
}
