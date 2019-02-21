import config from '@/config';
import apibasics from '@/components/apibasics';
import notFilter from '@/components/apibasics-notFilter';

/**
 * 新增预警
 * @param {string} alarmName  预警名称
 * @param {string} indicatorType  预警指标
 * @param {string} objType  预警对象
 * @param {string} areaType  预警范围
 * @param {string} frequency  通知时间
 * @param {string} activeType  通知有效期
 * @param {string} startDate 通知有效期
 * @param {string} endDate 通知有效期
 * @param {string} userIds 预警通知人 [id, id, id, id]
 */
export function addAlarmRuleUsingPOST(alarmName, indicatorType, objType, areaType, frequency, activeType, startDate, endDate, userIds) {
    return notFilter({
        url: `${config.url.origin}/cdimms/server/alarmRule/addAlarmRule`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            alarmName: alarmName, 
            indicatorType: indicatorType, 
            objType: objType, 
            areaType: areaType, 
            frequency: frequency, 
            activeType: activeType, 
            startDate: startDate,
            endDate: endDate,
            userIds: userIds,
        }
    });
}

/**
 * 修改预警
 * @param {string} id 预警唯一标识
 * @param {string} alarmName  预警名称
 * @param {string} indicatorType  预警指标
 * @param {string} objType  预警对象
 * @param {string} areaType  预警范围
 * @param {string} frequency  通知时间
 * @param {string} activeType  通知有效期
 * @param {string} startDate 通知有效期
 * @param {string} endDate 通知有效期
 * @param {string} userIds 预警通知人 [id, id, id, id]
 */
export function modifyAlarmRuleUsingPOST(id, alarmName, indicatorType, objType, areaType, frequency, activeType, startDate, endDate, userIds) {
    return notFilter({
        url: `${config.url.origin}/cdimms/server/alarmRule/modifyAlarmRule`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            id: id, 
            alarmName: alarmName, 
            indicatorType: indicatorType, 
            objType: objType, 
            areaType: areaType, 
            frequency: frequency, 
            activeType: activeType, 
            startDate: startDate,
            endDate: endDate,
            userIds: userIds,
        }
    });
}

/**
 * 预警通知人下拉框
 * @param {string} userType 预警对象
 */
export function queryUserNameUsingGET(userType) {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/alarmRule/queryUserName${userType ? `?userType=${userType}` : ''}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    });
}

/**
 * 查询单个告警规则信息
 * @param {string} id 预警唯一标识
 */
export function queryAlarmRuleUsingGET(id) {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/alarmRule/queryAlarmRule?id=${id}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    });
}
