import apibasics from '@/components/apibasics';
import notLoading from '@/components/apibasics-notLoading';
import config from '@/config';
import axios from 'axios';
import { downloadUsingPOST, downloadUsingGET } from '@/components/download';

/**
 * 获取团队列表
 * @param {number} pageNo 当前页码
 * @param {number} pageSzie 页面大小
 * @param {number} bcId 支公司 id
 * @param {number} teamId 支公司 id
 * @param {number} month 月份
 */
export function queryAllTeamPredictionUsingPOST(pageNo, pageSzie, bcId, teamId, month) {
    return notLoading({
        url: `${config.url.origin}/cdimms/server/prediction/queryAllTeamPrediction`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            pageNo: pageNo ? pageNo : 1,
            pageSzie: pageSzie ? pageSzie : 10,
            bcId: bcId ? bcId : '',
            teamId: teamId ? teamId : '',
            month: month ? month : '',
        }
    });
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
 * 下载团队模板
 */
export function getTeamPreTemplateUsingGET() {
    downloadUsingGET('/cdimms/server/prediction/getTeamPreTemplate');
}
