import apibasics from '@/components/apibasics';
import config from '@/config';
import { downloadUsingPOST, downloadUsingGET } from '@/components/download';
import upload from '@/components/upload';

/**
 * 获取团队列表
 * @param {number} pageNo 当前页码
 * @param {number} pageSize 页面大小
 * @param {number} companyId 支公司 id
 * @param {number} teamId 支公司 id
 * @param {number} month 月份
 */
export function queryAllTeamPredictionUsingPOST(pageNo, pageSize, companyId, teamId, month) {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/prediction/queryAllTeamPrediction`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            pageNo: pageNo ? pageNo : 1,
            pageSize: pageSize ? pageSize : 10,
            companyId: companyId ? companyId : '',
            teamId: teamId ? teamId : '',
            month: month ? month : '',
        }
    });
}

/**
 * 导入数据
 * @param {files} formData 文件表单
 */
export function importTeamPredictionUsingFormData(formData) {
    return upload('/cdimms/server/prediction/importTeamPrediction', formData);
}

/**
 * 导出团队模板
 */
export function exportTeamPredictionUsingGET(bcId, teamId, month) {
    downloadUsingPOST('/cdimms/server/prediction/exportTeamPrediction', {
        bcId: bcId ? bcId : '',
        teamId: teamId ? teamId : '',
        month: month ? month : '',
    });
}

/**
 * 下载失败清单
 */
export function getErrorTemplateUsingGET(downKey) {
    downloadUsingGET(`/cdimms/server/prediction/exportTeamPredictionError?downKey=${downKey}`);
}

/**
 * 下载团队模板
 */
export function getTeamPreTemplateUsingGET() {
    downloadUsingGET('/cdimms/server/prediction/getTeamPreTemplate');
}
