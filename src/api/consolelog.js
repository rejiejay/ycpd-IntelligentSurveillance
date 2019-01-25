import apibasics from '@/components/apibasics';
import config from '@/config';
import { downloadUsingPOST } from '@/components/download';

/**
 * 获取预警日志列表
 * @param {number} pageNo 当前页码
 * @param {number} pageSzie 页面大小
 * @param {number} arId 预警id
 * @param {number} startTime 开始时间
 * @param {number} endTime 结束时间
 */
export function queryAllAlarmLogUsingPOST(pageNo, pageSzie, arId, startTime, endTime) {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/alarmlog/queryAllAlarmLog`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            pageNo: pageNo ? pageNo : 1,
            pageSzie: pageSzie ? pageSzie : 10,
            arId: arId ? arId : '',
            startTime: startTime ? startTime : '',
            endTime: endTime ? endTime : '',
        }
    });
}

/**
 * 下载预警日志列表
 */
export function exportAlarmLogUsingGET(arId, startTime, endTime) {
    downloadUsingPOST('/cdimms/server/alarmlog/exportAlarmLog', {
        arId: arId ? arId : '',
        startTime: startTime ? startTime : '',
        endTime: endTime ? endTime : '',
    });
}

/**
 * 查询预警规则下拉列表
 */
export function queryAlarmRuleNameUsingGET() {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/alarmRule/queryAlarmRuleName`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    });
}
