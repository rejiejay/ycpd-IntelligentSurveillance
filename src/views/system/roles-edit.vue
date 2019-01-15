<!-- 角色设置 -->
<template>
<div class="system-roles">
    <div class="user-roles-form">
        <el-row>
            <el-col :span="12">
                <div class="details-form-item">
                    <div class="form-item-title">角色代码</div>
                    <el-input placeholder="请输入角色代码" v-model="rolesCode"></el-input>
                </div>
            </el-col>

            <el-col :span="12">
                <div class="details-form-item">
                    <div class="form-item-title">角色名称</div>
                    <el-input placeholder="请输入角色名称" v-model="rolesName"></el-input>
                </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
                <div class="details-form-item">
                    <div class="form-item-title">角色介绍</div>
                    <el-input placeholder="请输入角色介绍" v-model="rolesDes"></el-input>
                </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
                <div class="details-form-item">
                    <div class="form-item-title">请选择菜单权限</div>
                    <el-tree
                        ref="tree"
                        :data="treeCheckData"
                        :props="treeCheckprops"
                        show-checkbox
                        node-key="id"
                        :default-expand-all="true"
                        @check-change="treeCheckHandle"
                    ></el-tree>
                </div>
            </el-col>
        </el-row>
    </div>

    <div class="user-roles-operate flex-center">
        <div class="details-operate-container flex-start">
            <el-button type="info" plain @click="$router.back(-1)">取消</el-button>
            <div style="width: 45px;"></div>
            <el-button type="primary" @click="submit">保存</el-button>
        </div>
    </div>
</div>
</template>

<script>
// 请求类
import { queryUserUsingGET, addRoleUsingPOST, modifyRoleUsingPOST } from "@/api/system/roles-edit";

export default {
    name: 'system-roles',

	data: function data() { 
        return {
            /**
             * 页面状态
             * @param {string} add 新增
             * @param {string} edit 编辑
             */
            pageType: 'add',

            rolesId: '', // 角色唯一标识
            rolesCode: '', // 角色代码
            rolesName: '', // 角色名称
            rolesDes: '', // 角色介绍

            // 择菜单权限 数据
            checkedKeys: [],
            treeCheckData: [
                {
                    label: '监控预警',
                    children: [{
                        id: 1,
                        label: '车行监控',
                    }, {
                        id: 2,
                        label: '支公司监控',
                    }, {
                        id: 3,
                        label: '团队监控',
                    }]
                }, {
                    id: 4,
                    label: '统计分析',
                }, {
                    label: '清单明细',
                    children: [{
                        id: 5,
                        label: '产保比明细',
                    }, {
                        id: 6,
                        label: '保费明细',
                    }, {
                        id: 7,
                        label: '定损明细',
                    }]
                }, {
                    label: '车商管理',
                    children: [{
                        id: 8,
                        label: '车行管理',
                    }, {
                        id: 9,
                        label: '支公司管理',
                    }, {
                        id: 10,
                        label: '团队管理',
                    }]
                }, {
                    label: '预测设置',
                    children: [{
                        id: 11,
                        label: '支公司数据设置',
                    }, {
                        id: 12,
                        label: '团队数据设置',
                    }]
                }, {
                    id: 13,
                    label: '预警日志',
                }, {
                    label: '系统设置',
                    children: [{
                        id: 14,
                        label: '用户管理',
                    }, {
                        id: 15,
                        label: '角色设置',
                    }, {
                        id: 16,
                        label: '预警规则设置',
                    }]
                },
            ],
            treeCheckprops: { // 择菜单权限 配置选项
                children: 'children',
                label: 'label'
            }
        } 
    },

	mounted: function mounted() {
        this.initPageData(); // 初始化页面数据
    },

	methods: {
        /**
         * 跳转到路由
         * @param {object} query 携带的参数 非必填
         */
        initPageData: function initPageData() {
            const _this = this;

            // 如果 页面状态 存在 rolesName 表示编辑状态
            let rolesName = this.$route.query.rolesName
            if (rolesName) {
                this.pageType = 'edit';
                // 设置选中的下标
                queryUserUsingGET(rolesName)
                .then(val => {
                    let data = val.data;
                    _this.rolesId = data.role.id;
                    _this.rolesCode = data.role.roleCode;
                    _this.rolesName = data.role.roleName;
                    _this.rolesDes = data.role.roleDetail;

                    let roles = [];
                    if (data.trees) {
                        data.trees.map(val => {
                            // 监控预警
                            if (val.urlName === '监控预警' && val.children.length > 0) {
                                val.children.map(chil => {
                                    if (chil === '车行监控') {
                                        roles.push(1);
                                    }
                                    if (chil === '团队监控') {
                                        roles.push(2);
                                    }
                                    if (chil === '支公司监控') {
                                        roles.push(3);
                                    }
                                });
                            }
                            
                            // 统计分析
                            if (val.urlName === '统计分析') {
                                roles.push(4);
                            }

                            // 清单明细
                            if (val.urlName === '清单明细' && val.children.length > 0) {

                                val.children.map(chil => {
                                    if (chil === '保费明细') {
                                        roles.push(5);
                                    }
                                    if (chil === '定损明细') {
                                        roles.push(6);
                                    }
                                    if (chil === '产保比明细') {
                                        roles.push(7);
                                    }
                                });
                            }

                            // 车商管理
                            if (val.urlName === '车商管理' && val.children.length > 0) {

                                val.children.map(chil => {
                                    if (chil === '车行管理') {
                                        roles.push(8);
                                    }
                                    if (chil === '支公司管理') {
                                        roles.push(9);
                                    }
                                    if (chil === '团队管理') {
                                        roles.push(10);
                                    }
                                });
                            }

                            // 预测设置
                            if (val.urlName === '预测设置' && val.children.length > 0) {

                                val.children.map(chil => {
                                    if (chil === '支公司数据设置') {
                                        roles.push(11);
                                    }
                                    if (chil === '团队数据设置') {
                                        roles.push(12);
                                    }
                                });
                            }
                            
                            // 预警日志
                            if (val.urlName === '预警日志') {
                                roles.push(13);
                            }

                            // 系统设置
                            if (val.urlName === '系统设置' && val.children.length > 0) {

                                val.children.map(chil => {
                                    if (chil === '用户管理') {
                                        roles.push(14);
                                    }
                                    if (chil === '角色设置') {
                                        roles.push(15);
                                    }
                                    if (chil === '预警规则设置') {
                                        roles.push(16);
                                    }
                                });
                            }
                        });
                    }
                    _this.$refs.tree.setCheckedKeys(roles);

                }, error => {
                    console.log(error)
                    _this.$router.back(-1);
                })
            }
        },

        /**
         * 择菜单权限
         */
        treeCheckHandle: function treeCheckHandle(data) {
            this.checkedKeys = this.$refs.tree.getCheckedKeys();
        },

        /**
         * 提交
         */
        submit: function submit() {
            const _this = this;
            let roleList = [];

            /**
             * 新增的请求
             */
            let submitAdd = () => {
                addRoleUsingPOST(_this.rolesCode, _this.rolesName, _this.rolesDes, roleList)
                .then(val => {
                    if (val.code === 1000) {
                        _this.$router.back(-1);

                    } else if (val.code === 1001) {
                        alert('添加异常');

                    } else if (val.code === 1002) {
                        alert('角色代码重复!');

                    } else if (val.code === 1003) {
                        alert('者角色名称重复!');

                    } else {
                        alert(`添加失败, ${val.msg}`)
                    }

                }, error => console.log(error))
            };

            /**
             * 编辑的请求
             */
            let submitEdd = () => {
                modifyRoleUsingPOST(_this.rolesId, _this.rolesCode, _this.rolesName, _this.rolesDes, roleList)
                .then(val => {
                    if (val.code === 1000) {
                        _this.$router.back(-1);

                    } else if (val.code === 1001) {
                        alert('修改角色异常');

                    } else if (val.code === 1002) {
                        alert('角色代码重复!');

                    } else if (val.code === 1003) {
                        alert('者角色名称重复!');

                    } else {
                        alert(`修改角色失败, ${val.msg}`)
                    }

                }, error => console.log(error))
            };

            if (this.rolesCode === '') {
                return alert('角色代码不能为空');
            }

            if (this.rolesName === '') {
                return alert('角色名称不能为空');
            }

            /**
             * 初始化 权限 菜单列表
             */
            let have_Monitor = false; // 是否有 监控预警
            let have_detailedlist = false; // 是否有 清单明细
            let have_shops = false; // 是否有 车商管理
            let have_predict = false; // 是否有 预测设置
            let have_system = false; // 是否有 系统设置
            this.checkedKeys.map(val => {
                if (val === 1 || val === 2 || val === 3) {
                    if (have_Monitor === false) {
                        have_Monitor = true;
                        roleList.push('监控预警');
                    }

                    if (val === 1) {
                        roleList.push('车行监控');
                    }

                    if (val === 2) {
                        roleList.push('团队监控');
                    }

                    if (val === 3) {
                        roleList.push('支公司监控');
                    }
                }

                if (val === 4) {
                    roleList.push('统计分析');
                }

                if (val === 5 || val === 6 || val === 7) {
                    if (have_detailedlist === false) {
                        have_detailedlist = true;
                        roleList.push('清单明细');
                    }

                    if (val === 5) {
                        roleList.push('保费明细');
                    }

                    if (val === 6) {
                        roleList.push('定损明细');
                    }

                    if (val === 7) {
                        roleList.push('产保比明细');
                    }
                }

                if (val === 8 || val === 9 || val === 10) {
                    if (have_shops === false) {
                        have_shops = true;
                        roleList.push('车商管理');
                    }

                    if (val === 8) {
                        roleList.push('车行管理');
                    }

                    if (val === 9) {
                        roleList.push('支公司管理');
                    }

                    if (val === 10) {
                        roleList.push('团队管理');
                    }
                }

                if (val === 11 || val === 12) {
                    if (have_predict === false) {
                        have_predict = true;
                        roleList.push('预测设置');
                    }

                    if (val === 11) {
                        roleList.push('支公司数据设置');
                    }

                    if (val === 12) {
                        roleList.push('团队数据设置');
                    }
                }

                if (val === 13) {
                    roleList.push('预警日志');
                }

                if (val === 14 || val === 15 || val === 16) {
                    if (have_system === false) {
                        have_system = true;
                        roleList.push('系统设置');
                    }

                    if (val === 14) {
                        roleList.push('用户管理');
                    }

                    if (val === 15) {
                        roleList.push('角色设置');
                    }

                    if (val === 16) {
                        roleList.push('预警规则设置');
                    }
                }
            });

            // 判断是新增还是编辑
            if (this.pageType === 'add') {
                submitAdd();

            } else {
                submitEdd();

            }
            
        },

        /**
         * 跳转到路由
         * @param {object} query 携带的参数 非必填
         */
        jumpToRouter: function jumpToRouter(url, query) {
            let routerConfig = {
                path: url,
            }

            query ? routerConfig.query = query : null; // 初始化携带的参数 非必填

            this.$router.push(routerConfig);
        },
    },

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$black1: #303133;
$black2: #606266;
$black3: #909399;
$black4: #C0C4CC;

.system-roles {
    position: relative;
    color: $black2;
    font-size: 14px;
    font-weight: normal;
}

.user-roles-form {
    padding: 15px 15px 0px 15px;

    .details-form-item {
        padding: 7.5px;

        .form-item-title {
            padding-bottom: 10px;
            font-size: 14px;
            color: $black1;
        }
    }

    .el-select {
        width: 100%;
    }
}

.user-roles-operate {
    padding: 15px 15px 35px 15px;
}

</style>
