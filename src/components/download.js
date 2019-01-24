import myLoading from './myLoading';
import axios from 'axios';
import config from '@/config';

/**
 * 使用 get 请求下载
 */
export function downloadUsingGET(url) {
    myLoading.show(); // 每个请求出去的时候, 显示加载框（主要用来防止UI重复点击提交）

    axios({
        url: `${config.url.origin}${url}`,
        method: 'get',
        headers: {
            token: window.sessionStorage.cdimmstoken,
        },
        responseType: 'arraybuffer'
    }).then(response => {
        myLoading.close(); // 关闭加载框

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

    }).catch(error => {
        myLoading.close(); // 关闭加载框
        
        console.error(error);
        alert(`导出失败, 原因: ${error.message}`);
    });
}

/**
 * 使用 post 请求下载
 */
export function downloadUsingPOST(url, data) {
    myLoading.show(); // 每个请求出去的时候, 显示加载框（主要用来防止UI重复点击提交）

    axios({
        url: `${config.url.origin}${url}`,
        method: 'post',
        headers: {
            token: window.sessionStorage.cdimmstoken,
        },
        data: data,
        responseType: 'arraybuffer'
    }).then(response => {
        myLoading.close(); // 关闭加载框

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

    }).catch(error => {
        myLoading.close(); // 关闭加载框

        console.error(error);
        alert(`导出失败, 原因: ${error.message}`);
    });
}
