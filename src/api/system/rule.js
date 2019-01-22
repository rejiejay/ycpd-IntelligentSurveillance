import config from '@/config';
import notFilter from '@/components/apibasics-notFilter';
import apibasics from '@/components/apibasics';
import axios from 'axios';

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

    return notFilter({
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

    return axios({
        url: `${config.url.origin}/cdimms/server/alarmRule/exportAlarmRuleList`,
        method: 'post',
        headers: {
            token: window.sessionStorage.cdimmstoken,
        },
        data: body,
        responseType: 'arraybuffer'
    }).then(response => {
        let contentdisposition = response.headers['content-disposition']; // "attachment; filename=LossAssessment.xlsx"
        let myFlieName = contentdisposition.slice(contentdisposition.indexOf('=') + 1);
        
        let blob = new Blob([response.data], {type: 'application/vnd.ms-excel;charset=utf-8'});
        let url = window.URL.createObjectURL(blob);
        let link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        link.setAttribute('download', myFlieName);

        document.body.appendChild(link);
        link.click();
    }).catch(error =>  console.log(error));
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
