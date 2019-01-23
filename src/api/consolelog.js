import apibasics from '@/components/apibasics';
import notLoading from '@/components/apibasics-notLoading';
import config from '@/config';
import axios from 'axios';

/**
 * 获取预警日志列表
 * @param {number} pageNo 当前页码
 * @param {number} pageSzie 页面大小
 * @param {number} arId 预警id
 * @param {number} startTime 开始时间
 * @param {number} endTime 结束时间
 */
export function queryAllAlarmLogUsingPOST(pageNo, pageSzie, arId, startTime, endTime) {
    return notLoading({
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
    return axios({
        url: `${config.url.origin}/cdimms/server/alarmlog/exportAlarmLog`,
        method: 'post',
        headers: {
            token: window.sessionStorage.cdimmstoken,
        },
        data: {
            arId: arId ? arId : '',
            startTime: startTime ? startTime : '',
            endTime: endTime ? endTime : '',
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

/**
 * 查询预警规则下拉列表
 */
export function queryAlarmRuleNameUsingGET() {
    return notLoading({
        url: `${config.url.origin}/cdimms/server/alarmRule/queryAlarmRuleName`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    });
}
