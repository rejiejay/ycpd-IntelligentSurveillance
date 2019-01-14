<!-- 车商管理 -->
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
                        :data="treeCheckData"
                        :props="treeCheckprops"
                        show-checkbox
                        node-key="id"
                        :default-checked-keys="defaultCheckedArray"
                        :default-expand-all="true"
                        @check-change="treeCheckHandle"
                    ></el-tree>
                </div>
            </el-col>
        </el-row>
    </div>

    <div class="user-roles-operate flex-center">
        <div class="details-operate-container flex-start">
            <el-button type="info" plain>取消</el-button>
            <div style="width: 45px;"></div>
            <el-button type="primary">保存</el-button>
        </div>
    </div>
</div>
</template>

<script>

export default {
    name: 'system-roles',

	data: function data() { 
        return {
            rolesCode: '', // 角色代码
            rolesName: '', // 角色名称
            rolesDes: '', // 角色介绍

            // 择菜单权限 数据
            defaultCheckedArray: [], // 对应选中的 id
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

	mounted: function mounted() {},

	methods: {
        /**
         * 择菜单权限
         */
        treeCheckHandle: function treeCheckHandle(data) {
            console.log(data);
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
