import myLoading from './myLoading';
import axios from 'axios';
import config from '@/config';

/**
 * 使用 post 上传 请求下载
 */
export default function upload(url, files) {
    myLoading.show(); // 每个请求出去的时候, 显示加载框（主要用来防止UI重复点击提交）

    return new Promise((resolve, rejects) => {

        axios({
            url: `${config.url.origin}${url}`,
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
                'token': window.sessionStorage.cdimmstoken,
            },
            data: files
        }).then(response => {
            myLoading.close(); // 关闭加载框
            
            resolve(response);
    
        }).catch(error => {
            myLoading.close(); // 关闭加载框

            resolve(rejects);
            
            console.error(error);
            alert(`上传失败, 原因: ${error.message}`);
        });

    })
}
