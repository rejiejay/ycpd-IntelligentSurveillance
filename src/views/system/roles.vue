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

            <el-select v-model="rolesNameSection" placeholder="角色名称">
                <el-option
                    v-for="item in rolesNameOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>

            <el-button icon="el-icon-search" type="primary" @click="searchByConditions">查询</el-button>
            <el-button icon="el-icon-download" type="success">导出</el-button>
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
            :page-size="pageSize"
            :total="pageTotal"
            @current-change="pageChangeHandle"
            layout="sizes, prev, pager, next, jumper"
        ></el-pagination>
    </div>
</div>
</template>

<script>

export default {
    name: 'system-roles',

	data: function data() { 
        return {
            rolesCodeSection: '', // 角色代码
            rolesCodeOptions: [
                {
                    value: '角色代码一',
                    lable: '角色代码一',
                }
            ],

            rolesNameSection: '', // 角色名称
            rolesNameOptions: [
                {
                    value: '角色名称一',
                    lable: '角色名称一',
                }
            ],

            // 角色列表
            rolesList: [
                {
                    rolesCode: '', // 角色代码
                    rolesName: '', // 角色名称
                    rolesDes: '', // 角色简介
                    rolesLabel: '', // 有效标注
                }
            ],

            /**
             * 分页相关
             */
            currentPage: 1, // 当前页码
            pageSize: 20, // 一个页面多少数据
            pageTotal: 1, // 一共多少条数据 
        } 
    },

	mounted: function mounted() {},

	methods: {
        /**
         * 通过条件查询
         */
        searchByConditions: function searchByConditions() {
        },

        /**
         * 清空查询条件
         */
        clearConditions: function clearConditions() {
            this.rolesCodeSection = null;
            this.rolesNameSection = null;
        },

        /**
         * 人员配置
         */
        modifierStaffHandle: function modifierStaffHandle(item) {
            this.jumpToRouter('/system/roles/staff', {id: ''});
            console.log(item);
        },

        /**
         * 菜单配置
         */
        modifierDetailsHandle: function modifierDetailsHandle(item) {
            this.jumpToRouter('/system/roles/details', {id: ''});
            console.log(item);
        },

        /**
         * 分页改变的时候处理函数
         */
        pageChangeHandle: function pageChangeHandle(item) {
            console.log(item);
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
