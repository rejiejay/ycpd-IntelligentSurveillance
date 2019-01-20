import apibasics from '@/components/apibasics';
import notFilter from '@/components/apibasics-notFilter';
import config from '@/config';
import axios from 'axios';

/**
 * 获取团队列表
 * @param {number} pageNo 当前页码
 * @param {number} pageSzie 页面大小
 */
export function queryAllTeamUsingPOST(pageNo, pageSzie) {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/team/queryAllTeam`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            pageNo: pageNo ? pageNo : 1,
            pageSzie: pageSzie ? pageSzie : 10,
        }
    });
}
