import apibasics from '@/components/apibasics';
import config from '@/config';

/**
 * 获取告警规则列表
 * @param {number} currentPage 当前页码
 * @param {number} indicatorType 预警指标
 * @param {number} objType 预警对象
 * @param {number} alarmName 关键字查询
 */
export function queryAlarmRuleListUsingPOST(currentPage, indicatorType, objType, alarmName) {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/alarmRule/queryAlarmRuleList`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            currentPage: currentPage ? currentPage : 1,
            indicatorType: indicatorType ? indicatorType : '',
            objType: objType ? objType : '',
            alarmName: alarmName ? alarmName : '',
        }
    });
}

