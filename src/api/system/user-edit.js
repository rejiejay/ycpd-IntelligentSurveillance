import apibasics from '@/components/apibasics';
import notFilter from '@/components/apibasics-notFilter';
import config from '@/config';

/**
 * 判断添加用户时用户名或手机号是否已注册
 * @param {string} nameOrPhone 用户名或手机号
 */
export function existUserUsingGET(nameOrPhone) {
    return notFilter({
        url: `${config.url.origin}/cdimms/server/user/existUser?nameOrPhone=${nameOrPhone}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    });
}

/**
 * 查询单个用户
 * @param {number} userName 用户名称
 */
export function queryUserUsingGET(userName) {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/user/queryUser?userName=${userName}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    });
}

/**
 * 添加用户
 * @param {number} userType 用户类型
 * @param {number} bcId 用户类型
 * @param {number} teamId 团队id
 * @param {number} staffName 用户真实姓名
 * @param {number} staffCode 员工代码
 * @param {number} userName 用户姓名
 * @param {number} passwd 用户密码
 * @param {number} phone 用户手机号
 * @param {number} roleId 角色名称
 * @param {number} state 状态
 */
export function addUserUsingPOST(userType, bcId, teamId, staffName, staffCode, userName, passwd, phone, roleId, state) {
    return notFilter({
        url: `${config.url.origin}/cdimms/server/user/addUser`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            userType: userType,
            bcId: bcId,
            teamId: teamId,
            staffName: staffName,
            staffCode: staffCode,
            userName: userName,
            passwd: passwd,
            phone: phone,
            roleId: roleId,
            state: state,
        }
    });
}

/**
 * 修改用户
 * @param {number} id 用户唯一标识
 * @param {number} userType 用户类型
 * @param {number} bcId 用户类型
 * @param {number} teamId 团队id
 * @param {number} staffName 用户真实姓名
 * @param {number} staffCode 员工代码
 * @param {number} userName 用户姓名
 * @param {number} passwd 用户密码
 * @param {number} phone 用户手机号
 * @param {number} roleId 角色名称
 * @param {number} state 状态
 */
export function modifyUserUsingPOST(id, userType, bcId, teamId, staffName, staffCode, userName, passwd, phone, roleId, state) {
    return notFilter({
        url: `${config.url.origin}/cdimms/server/user/modifyUser`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            id: id,
            userType: userType,
            bcId: bcId,
            teamId: teamId,
            staffName: staffName,
            staffCode: staffCode,
            userName: userName,
            passwd: passwd,
            phone: phone,
            roleId: roleId,
            state: state,
        }
    });
}


