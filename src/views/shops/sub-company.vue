<!-- 支公司管理 -->
<template>
<div class="subsidiary-company-manage">
    <!-- 顶部操作按钮 -->
    <div class="company-manage-operate flex-start-bottom">
        <div class="manage-operate-left flex-rest">

            <el-select v-model="subCompanySection" placeholder="选择支公司代码">
                <el-option
                    v-for="item in subCompanyOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>

            <el-button icon="el-icon-search" type="primary" @click="currentPage = 1; searchByConditions();">查询</el-button>
            <el-button icon="el-icon-download" type="success">导出</el-button>
            <el-button size="mini" type="danger" round @click="clearConditions">清空查询条件</el-button>
        </div>

        <div class="manage-operate-right">
            <el-button icon="el-icon-plus" type="primary" @click="jumpToRouter('/shops/subcompany/details')">新增</el-button>
        </div>
    </div>

    <!-- 表单部分 -->
    <div class="company-manage-table">
        <el-table
            :data="subCompanyList"
            border
            style="width: 100%"
        >
            <el-table-column
                prop="subCompanyCode"
                label="支公司代码"
                min-width="120"
            ></el-table-column>
            <el-table-column
                prop="subCompanyName"
                label="支公司名称"
                min-width="160"
            ></el-table-column>
            <el-table-column
                prop="leadershipCode"
                label="分管领导代码"
                min-width="120"
            ></el-table-column>
            <el-table-column
                prop="leadershipName"
                label="分管领导姓名"
                min-width="120"
            ></el-table-column>
            <el-table-column
                prop="leadershipPhone"
                label="分管领导电话"
                min-width="120"
            ></el-table-column>
            <el-table-column
                prop="adminCode"
                label="管理员代码"
                min-width="120"
            ></el-table-column>
            <el-table-column
                prop="adminName"
                label="管理员姓名"
                min-width="120"
            ></el-table-column>
            <el-table-column
                prop="adminPhone"
                label="管理员电话"
                min-width="120"
            ></el-table-column>
            <el-table-column
                prop="remark"
                label="备注"
                min-width="120"
            ></el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100"
            >
                <template slot-scope="scope">
                    <el-button @click="modifierHandle(scope.row)" type="text" size="small">修改</el-button>
                    <el-button @click="deleteHandle(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

    <!-- 分页部分 -->
    <div class="company-manage-pagination flex-center">
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
    name: 'subsidiary-company-manage',

	data: function data() { 
        return {
            
            subCompanySection: null, // 支公司
            subCompanyOptions: [
                {
                    value: '支公司一',
                    label: '支公司一',
                }
            ],

            // 支公司列表
            subCompanyList: [
                {
                    subCompanyCode: '', // 支公司代码
                    subCompanyName: '', // 支公司名称
                    leadershipCode: '', // 分管领导代码
                    leadershipName: '', // 分管领导姓名
                    leadershipPhone: '', // 分管领导电话
                    adminCode: '', // 管理员代码
                    adminName: '', // 管理员姓名
                    adminPhone: '', // 管理员电话
                    remark: '', // 备注
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
            this.subCompanySection = null;
        },

        /**
         * 修改一个项
         */
        modifierHandle: function modifierHandle(item) {
        },

        /**
         * 删除一个项
         */
        deleteHandle: function deleteHandle(item) {
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

.subsidiary-company-manage {
    position: relative;
    color: $black2;
    font-size: 14px;
    font-weight: normal;
}

// 顶部操作部分
.company-manage-operate {
    padding: 15px;

    .el-select {
        margin-right: 15px;
    }
}

// 表单部分
.company-manage-table {
    padding: 15px;
}

// 分页部分
.company-manage-pagination {
    padding: 15px;
}

</style>
