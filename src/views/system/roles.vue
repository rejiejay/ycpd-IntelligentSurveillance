<!-- 角色设置 -->
<template>
<div class="system-roles">
    <!-- 顶部操作按钮 -->
    <div class="system-roles-operate flex-start-bottom">
        <div class="roles-operate-left flex-rest">
            <el-select v-model="rolesCodeSection" placeholder="角色代码">
                <el-option
                    v-for="item in rolesCodeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>

            <el-input v-model="rolesName" type="text" :clearable="true" placeholder="角色名称"></el-input>

            <el-button icon="el-icon-search" type="primary" @click="currentPage = 1; queryRoleList();">查询</el-button>
            <el-button icon="el-icon-download" type="success" @click="exportRoleList">导出</el-button>
            <el-button size="mini" type="danger" round @click="clearConditions">清空查询条件</el-button>
        </div>
    
        <div class="roles-operate-right">
            <el-button icon="el-icon-plus" type="primary" @click="jumpToRouter('/system/roles/details')">添加角色</el-button>
        </div>
    </div>
    
    <!-- 表单部分 -->
    <div class="system-roles-table">
        <el-table
            :data="rolesList"
            border
            style="width: 100%"
        >
            <el-table-column
                prop="rolesCode"
                label="角色代码"
            ></el-table-column>
            <el-table-column
                prop="rolesName"
                label="角色名称"
            ></el-table-column>
            <el-table-column
                prop="rolesDes"
                label="角色简介"
            ></el-table-column>
            <el-table-column
                prop="rolesLabel"
                label="有效标注"
            ></el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="120"
            >
                <template slot-scope="scope">
                    <!-- <el-button @click="modifierStaffHandle(scope.row)" type="text" size="small">人员配置</el-button> -->
                    <el-button @click="modifierDetailsHandle(scope.row)" type="text" size="small">菜单配置</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    
    <!-- 分页部分 -->
    <div class="system-roles-pagination flex-center">
        <el-pagination
            :current-page="currentPage"
            :page-count="pageCount"
            :page-size="pageSize"
            :total="total"
            @size-change="pageSizeChangeHandle"
            @current-change="pageChangeHandle"
            layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
    </div>
</div>
</template>

<script>
// 请求类
import { queryRoleListUsingPOST, queryRoleCodeListUsingGET, exportRoleListUsingPOST } from "@/api/system/roles";

export default {
    name: 'system-roles',

	data: function data() { 
        return {
            rolesCodeSection: '', // 角色代码
            rolesCodeOptions: [
                // {
                //     value: '角色代码一',
                //     label: '角色代码一',
                // }
            ],

            rolesName: '', // 角色名称

            // 角色列表
            rolesList: [
                // {
                //     rolesCode: '', // 角色代码
                //     rolesName: '', // 角色名称
                //     rolesDes: '', // 角色简介
                //     rolesLabel: '', // 有效标注
                // }
            ],

            /**
             * 分页相关
             */
            currentPage: 1, // 当前页码
            pageCount: 1, // 一共多少页
            pageSize: 10, // 页码大小
            total: 1,
        } 
    },

	mounted: function mounted() {
        this.queryRoleList();
        this.initRolesCode()
        
    },

	methods: {
        /**
         * 请求角色列表
         */
        queryRoleList: function queryRoleList() {
            const _this  = this;

            let currentPage = this.currentPage;
            let pageCount = this.pageSize;
            let roleCode = this.rolesCodeSection ? this.rolesCodeSection : null;
            let rolesName = this.rolesName ? this.rolesName : null;

            queryRoleListUsingPOST(currentPage, pageCount, roleCode, rolesName)
            .then(val => {
                let data = val.data;

                // 初始化一共多少条数据
                _this.pageCount = data.pageSize; 
                _this.total = data.total;

                // 初始化角色列表
                if (data.roles && data.roles instanceof Array && data.roles.length > 0) {
                    _this.rolesList = data.roles.map(item => {
                        let newItem = {};
                        newItem.id = item.id;
                        newItem.rolesCode = item.roleCode;
                        newItem.rolesName = item.roleName;
                        newItem.rolesDes = item.roleDetail;
                        newItem.rolesLabel = item.state === 0 ? '正常' : '禁用';

                        return newItem;
                    });

                } else {
                    _this.rolesList = [];

                }

            }, error => console.log(error))
        },

        /**
         * 导出角色
         */
        exportRoleList: function exportRoleList() {
            let roleCode = this.rolesCodeSection ? this.rolesCodeSection : null;
            let rolesName = this.rolesName ? this.rolesName : null;

            exportRoleListUsingPOST(roleCode, rolesName);
        },

        /**
         * 角色代码下拉框
         */
        initRolesCode: function initRolesCode() {
            const _this  = this;

            queryRoleCodeListUsingGET()
            .then(val => {
                let data = val.data;

                if (data && data instanceof Array && data.length > 0) {
                    _this.rolesCodeOptions = data.map(item => {
                        return {
                            value: item,
                            label: item,
                        }
                    });
                }

            }, error => console.log(error))
        },

        /**
         * 清空查询条件
         */
        clearConditions: function clearConditions() {
            this.rolesCodeSection = null;
            this.rolesName = null;
            this.currentPage = 1;
        },

        /**
         * 人员配置
         */
        modifierStaffHandle: function modifierStaffHandle(item) {
            this.jumpToRouter('/system/roles/staff', {rolesName: item.rolesName});
        },

        /**
         * 菜单配置
         */
        modifierDetailsHandle: function modifierDetailsHandle(item) {
            this.jumpToRouter('/system/roles/details', {rolesName: item.rolesName});
        },

        /**
         * 分页改变的时候处理函数
         */
        pageChangeHandle: function pageChangeHandle(item) {
            this.currentPage = item;
            this.queryRoleList();
        },

        /**
         * 前页页码大小时候处理函数
         */
        pageSizeChangeHandle: function pageSizeChangeHandle(item) {
            this.pageSize = item;
            this.queryRoleList();
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

.system-roles-operate {
    padding: 15px;

    .el-select {
        margin-right: 15px;
    }

    .el-input {
        width: 140px;
        margin-right: 15px;
    }
}

// 表单部分
.system-roles-table {
    padding: 15px;
}

// 分页部分
.system-roles-pagination {
    padding: 15px;
}

</style>
