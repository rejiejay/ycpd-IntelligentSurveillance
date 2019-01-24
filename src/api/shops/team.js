import apibasics from '@/components/apibasics';
import config from '@/config';
import { downloadUsingPOST, downloadUsingGET } from '@/components/download';
import notLoading from '@/components/apibasics-notLoading';

/**
 * 获取团队列表
 * @param {number} pageNo 当前页码
 * @param {number} pageSzie 页面大小
 * @param {number} keyword 团队关键词查询
 */
export function queryAllTeamUsingPOST(pageNo, pageSzie, keyword) {
    return notLoading({
        url: `${config.url.origin}/cdimms/server/team/queryAllTeam`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            pageNo: pageNo ? pageNo : 1,
            pageSzie: pageSzie ? pageSzie : 10,
            keyword: keyword ? keyword : '',
        }
    });
}

/**
 * 删除团队记录
 * @param {number} teamId 团队唯一标识
 */
export function removeTeamUsingPOST(teamId) {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/team/removeTeam?teamId=${teamId}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    });
}

/**
 * 团队记录列表导出excel
 * @param {number} keyword 团队关键词查询
 */
export function exportTeamUsingGET(keyword) {
    downloadUsingPOST('/cdimms/server/team/exportTeam', {
        keyword: keyword ? keyword : '',
    });
}

/**
 * 团队记录列表导入excel模板
 */
export function getTeamTemplateUsingGET() {
    downloadUsingGET('/cdimms/server/team/getTeamTemplate');
}

/**
 * 新增团队记录
 * @param {string} teamCode 团队代码
 * @param {string} teamName 团队名称
 * @param {string} teamLeader 团队经理
 * @param {string} phone 分管领导电话
 * @param {string} subCompany 支公司
 * @param {string} remark 备注
 */
export function addTeamUsingPOST(teamCode, teamName, manager, phone, bcId, remark) {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/team/addTeam`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            teamCode: teamCode,
            teamName: teamName,
            manager: manager,
            phone: phone,
            bcId: bcId,
            remark: remark,
        }
    });
}

/**
 * 修改团队记录
 * @param {string} id 团队唯一标识
 * @param {string} teamCode 团队代码
 * @param {string} teamName 团队名称
 * @param {string} teamLeader 团队经理
 * @param {string} phone 分管领导电话
 * @param {string} subCompany 支公司
 * @param {string} remark 备注
 */
export function modifierTeamUsingPOST(id, teamCode, teamName, manager, phone, bcId, remark) {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/team/modifierTeam`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            id: id,
            teamCode: teamCode,
            teamName: teamName,
            manager: manager,
            phone: phone,
            bcId: bcId,
            remark: remark,
        }
    });
}
