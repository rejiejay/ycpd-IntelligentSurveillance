import apibasics from '@/components/apibasics';
import config from '@/config';
import { downloadUsingPOST, downloadUsingGET } from '@/components/download';
import upload from '@/components/upload';

/**
 * 获取车行列表
 * @param {number} pageNo 当前页码
 * @param {number} pageSzie 页面大小
 * @param {number} companyId 支公司 id
 * @param {number} storeId 网点 id
 * @param {number} teamId 团队 id
 */
export function findAllStoreUsingPOST(pageNo, pageSzie, companyId, storeId, teamId) {
    let data = {
        pageNo: pageNo ? pageNo : 1,
        pageSzie: pageSzie ? pageSzie : 10,
        companyId: companyId ? companyId : '',
        teamId: teamId ? teamId : '',
    }

    storeId ? data.networkType = parseInt(storeId) : '';

    return apibasics({
        url: `${config.url.origin}/cdimms/server/store/queryAllStore`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: data,
    });
}

/**
 * 删除车行列表
 * @param {number} storeId 车行网点唯一标识
 */
export function removeStoreUsingGET(storeId) {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/store/removeStore?storeId=${storeId}`,
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    });
}

/**
 * 导入车行信息
 * @param {files} formData 文件表单
 */
export function importStoreUsingFormData(formData) {
    return upload('/cdimms/server/store/importStore', formData);
}

/**
 * 车行记录列表导出excel
 * @param {number} companyId 支公司 id
 * @param {number} storeId 网点 id
 * @param {number} teamId 团队 id
 */
export function exportStoreUsingGET(companyId, storeId, teamId) {
    let data = {
        pageNo: pageNo ? pageNo : 1,
        pageSzie: pageSzie ? pageSzie : 10,
        companyId: companyId ? companyId : '',
        teamId: teamId ? teamId : '',
    }

    storeId ? data.networkType = storeId : '';

    downloadUsingPOST('/cdimms/server/store/exportStore', data);
}

/**
 * 下载车行导入模板
 */
export function getStoreTemplateUsingGET() {
    downloadUsingGET('/cdimms/server/store/getStoreTemplate');
}

/**
 * 下载失败清单
 */
export function getErrorTemplateUsingGET(downKey) {
    downloadUsingGET(`/cdimms/server/store/exportStoreError?downKey=${downKey}`);
}

/**
 * 新增车行网点
 * @param {string} networkNo 车行编码
 * @param {string} networkName 车行名称
 * @param {string} networkType 车行类型
 * @param {string} star 车行星级
 * @param {string} isJoin 是否合作
 * @param {string} contact 联系人
 * @param {string} phone 联系电话
 * @param {string} brand 品牌
 * @param {string} superiorGroup 上级集团
 * @param {string} bcId 支公司
 * @param {string} teamId 团队
 * @param {string} channelCode 渠道代码
 * @param {string} remark 备注
 * @param {string} address 地址
 * @param {string} longitude 经度
 * @param {string} latitude 纬度
 */
export function addStoreUsingPOST(networkNo, networkName, networkType, star, isJoin, contact, phone, brand, superiorGroup, bcId, teamId, channelCode, remark, address, longitude, latitude) {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/store/addStore`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            networkNo: networkNo, // 车行编码
            networkName: networkName, // 车行名称
            networkType: parseInt(networkType), // 车行类型
            star: star, // 车行星级
            isJoin: isJoin, // 是否合作
            contact: contact, // 联系人
            phone: phone, // 联系电话
            brand: brand, // 品牌
            superiorGroup: superiorGroup, // 上级集团
            bcId: bcId, // 支公司
            teamId: teamId, // 团队
            channelCode: channelCode, // 渠道代码
            remark: remark ? remark : '', // 备注
            address: address, // 地址
            longitude: longitude, // 经度
            latitude: latitude, // 纬度
        }
    });
    
}

/**
 * 新增车行网点
 * @param {string} id 车行网点唯一标识
 * @param {string} networkNo 车行编码
 * @param {string} networkName 车行名称
 * @param {string} networkType 车行类型
 * @param {string} star 车行星级
 * @param {string} isJoin 是否合作
 * @param {string} contact 联系人
 * @param {string} phone 联系电话
 * @param {string} brand 品牌
 * @param {string} superiorGroup 上级集团
 * @param {string} bcId 支公司
 * @param {string} teamId 团队
 * @param {string} channelCode 渠道代码
 * @param {string} remark 备注
 * @param {string} address 地址
 * @param {string} longitude 经度
 * @param {string} latitude 纬度
 */
export function modifyStoreUsingPOST(id, networkNo, networkName, networkType, star, isJoin, contact, phone, brand, superiorGroup, bcId, teamId, channelCode, remark, address, longitude, latitude) {
    return apibasics({
        url: `${config.url.origin}/cdimms/server/store/modifierStore`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            id: id, // 车行网点唯一标识
            networkNo: networkNo, // 车行编码
            networkName: networkName, // 车行名称
            networkType: networkType, // 车行类型
            star: star, // 车行星级
            isJoin: isJoin, // 是否合作
            contact: contact, // 联系人
            phone: phone, // 联系电话
            brand: brand, // 品牌
            superiorGroup: superiorGroup, // 上级集团
            bcId: bcId, // 支公司
            teamId: teamId, // 团队
            channelCode: channelCode, // 渠道代码
            remark: remark ? remark : '', // 备注
            address: address, // 地址
            longitude: longitude, // 经度
            latitude: latitude, // 纬度
        }
    });
}

