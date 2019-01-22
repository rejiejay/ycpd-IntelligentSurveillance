import apibasics from '@/components/apibasics';
import config from '@/config';
import axios from 'axios';
import notLoading from '@/components/apibasics-notLoading';

/**
 * 统计分析保费数据
 * @param {number} type 类型 0 天 1 月
 * @param {number} startDate 开始日期
 * @param {number} endDate 结束日期
 * @param {number} bcId 支公司
 * @param {number} teamId 团队
 * @param {number} networkId 网点id
 */
export function statisticalAnalysisUsingPOST(type, startDate, endDate, bcId, teamId, networkId) {
    return notLoading({
        url: `${config.url.origin}/cdimms/server/sa/statisticalAnalysis`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            type: type ? type : '0',
            start: startDate,
            end: endDate,
            bcId: bcId ? bcId : '',
            teamId: teamId ? teamId : '',
            networkId: networkId ? networkId : '',
        }
    });
}

/**
 * 导出统计分析保费数据
 * @param {number} type 类型 0 天 1 月
 * @param {number} startDate 开始日期
 * @param {number} endDate 结束日期
 * @param {number} bcId 支公司
 * @param {number} teamId 团队
 * @param {number} networkId 网点id
 */
export function exportStatisticalAnalysisUsingPOST(type, startDate, endDate, bcId, teamId, networkId) {
    return axios({
        url: `${config.url.origin}/cdimms/server/sa/exportStatisticalAnalysis`,
        method: 'post',
        headers: {
            token: window.sessionStorage.cdimmstoken,
        },
        responseType: 'arraybuffer',
        data: {
            type: type ? type : '0',
            start: startDate,
            end: endDate,
            bcId: bcId ? bcId : '',
            teamId: teamId ? teamId : '',
            networkId: networkId ? networkId : '',
        }
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
