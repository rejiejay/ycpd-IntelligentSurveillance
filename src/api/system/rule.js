import config from '@/config';
import notFilter from '@/components/apibasics-notFilter';
import axios from 'axios';

/**
 * 获取告警规则列表
 * @param {number} currentPage 当前页码
 * @param {number} indicatorType 预警指标
 * @param {number} objType 预警对象
 * @param {number} alarmName 关键字查询
 */
export function queryAlarmRuleListUsingPOST(currentPage, indicatorType, objType, alarmName) {
    return notFilter({
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

/**
 * 导出告警规则excel
 * @param {number} indicatorType 预警指标
 * @param {number} objType 预警对象
 * @param {number} alarmName 关键字查询
 */
export function exportAlarmRuleListUsingPOST(indicatorType, objType, alarmName) {
    return axios({
        url: `${config.url.origin}/cdimms/server/alarmRule/exportAlarmRuleList`,
        method: 'post',
        headers: {
            token: window.sessionStorage.cdimmstoken,
        },
        data: {
            indicatorType: indicatorType ? indicatorType : '',
            objType: objType ? objType : '',
            alarmName: alarmName ? alarmName : '',
        },
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

