import apibasics from '@/components/apibasics';
import config from '@/config';

/**
 * 添加角色
 * @param {number} roleCode 角色代码
 * @param {number} roleName 角色名称
 * @param {number} roleDetail 角色简介
 * @param {number} roleList 权限
 */
export function addRoleUsingPOST(roleCode, roleName, roleDetail, roleList) {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/role/addRole`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            roleCode: roleCode,
            roleName: roleName,
            roleDetail: roleDetail,
            roleList: roleList,
        }
    });
}

/**
 * 菜单配置(查看单个角色)
 * @param {number} roleName 角色名称
 */
export function queryUserUsingGET(roleName) {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/role/queryRole?roleName=${roleName}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    });
}

/**
 * 修改角色信息
 * @param {number} id 唯一标识
 * @param {number} roleCode 角色代码
 * @param {number} roleName 角色名称
 * @param {number} roleDetail 角色简介
 * @param {number} roleList 权限
 */
export function modifyRoleUsingPOST(id, roleCode, roleName, roleDetail, roleList) {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/role/modifyRole`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            id: id,
            roleCode: roleCode,
            roleName: roleName,
            roleDetail: roleDetail,
            roleList: roleList,
        }
    });
}
