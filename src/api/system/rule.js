import config from '@/config';
import apibasics from '@/components/apibasics';
import { downloadUsingPOST } from '@/components/download';

/**
 * 获取告警规则列表
 * @param {number} currentPage 当前页码
 * @param {number} pageCount 当前页大小
 * @param {number} indicatorType 预警指标
 * @param {number} objType 预警对象
 * @param {number} alarmName 关键字查询
 */
export function queryAlarmRuleListUsingPOST(currentPage, pageCount, indicatorType, objType, alarmName) {
    let body = {
        currentPage: currentPage ? currentPage : 1,
        pageCount: pageCount ? pageCount : 10,
        alarmName: alarmName ? alarmName : '',
    }

    indicatorType ? body.indicatorType = indicatorType : '';
    objType ? body.objType = objType : '';

    return apibasics({
        url: `${config.url.origin}/cdimms/server/alarmRule/queryAlarmRuleList`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: body
    });
}

/**
 * 导出告警规则excel
 * @param {number} indicatorType 预警指标
 * @param {number} objType 预警对象
 * @param {number} alarmName 关键字查询
 */
export function exportAlarmRuleListUsingPOST(indicatorType, objType, alarmName) {
    let body = {
        alarmName: alarmName ? alarmName : '',
    }

    indicatorType ? body.indicatorType = indicatorType : '';
    objType ? body.objType = objType : '';
    
    downloadUsingPOST('/cdimms/server/alarmRule/exportAlarmRuleList', body);
}

/**
 * 删除告警规则
 * @param {string} id 预警唯一标识
 */
export function disableAlarmRuleUsingGET(id) {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/alarmRule/disableAlarmRule?id=${id}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    });
}
