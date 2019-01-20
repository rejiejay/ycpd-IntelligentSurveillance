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

            <el-button icon="el-icon-search" type="primary" @click="currentPage = 1; queryAllCompany();">查询</el-button>
            <el-button icon="el-icon-download" type="success" @click="exportCompany">导出</el-button>
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
            @size-change="pageSizeChangeHandle"
            @current-change="pageChangeHandle"
            layout="sizes, prev, pager, next, jumper"
        ></el-pagination>
    </div>
</div>
</template>

<script>
// 请求类
import { queryAllCompanyUsingPOST, exportCompanyUsingGET, removeCompanyUsingGET } from "@/api/shops/sub-company";
import { queryCompanyListUsingGET } from "@/api/subcompany";

export default {
    name: 'subsidiary-company-manage',

	data: function data() { 
        return {
            
            subCompanySection: null, // 支公司
            subCompanyOptions: [
                // {
                //     value: '支公司一',
                //     label: '支公司一',
                // }
            ],

            // 支公司列表
            subCompanyList: [
                // {
                //     subCompanyCode: '', // 支公司代码
                //     subCompanyName: '', // 支公司名称
                //     leadershipCode: '', // 分管领导代码
                //     leadershipName: '', // 分管领导姓名
                //     leadershipPhone: '', // 分管领导电话
                //     adminCode: '', // 管理员代码
                //     adminName: '', // 管理员姓名
                //     adminPhone: '', // 管理员电话
                //     remark: '', // 备注
                // }
            ],

            /**
             * 分页相关
             */
            currentPage: 1, // 当前页码
            pageSize: 10, // 一个页面多少数据
            pageTotal: 1, // 一共多少条数据 
        } 
    },

	mounted: function mounted() {
        this.queryAllCompany(); // 初始化 获取支公司信息列表
        this.queryCompanyList(); // 支公司下拉选项
    },

	methods: {
        /**
         * 获取支公司信息列表
         */
        queryAllCompany: function queryAllCompany() {
            const _this = this;

            let pageNo = this.pageNo;
            let pageSzie = this.pageSzie;
            let companyId = this.subCompanySection;

            queryAllCompanyUsingPOST(pageNo, pageSzie, companyId) 
            .then(val => {
                console.log(val)

                let data = val.data;

                _this.pageTotal = data.totalPages;

                if (!data || !data.content || data.content instanceof Array === false || data.content.length <= 0) {
                    _this.subCompanyList = [];
                    return false;
                }

                _this.subCompanyList = data.content.map(val => {
                    let newItem = {};

                    newItem.original = val; // 后端返的原始数据
                    newItem.id = val.id; // 支公唯一标识
                    newItem.subCompanyCode = val.bcCode; // 支公司代码
                    newItem.subCompanyName = val.bcName; // 支公司名称
                    newItem.leadershipCode = val.leaderCode; // 分管领导代码
                    newItem.leadershipName = val.leaderName; // 分管领导姓名
                    newItem.leadershipPhone = val.leaderPhone; // 分管领导电话
                    newItem.adminCode = val.adminCode; // 管理员代码
                    newItem.adminName = val.adminName; // 管理员姓名
                    newItem.adminPhone = val.adminPhone; // 管理员电话
                    newItem.remark = val.remark; // 备注

                    return newItem
                });

            }, error => console.log(error));
        },

        /**
         * 公司信息列表导出excel
         */
        exportCompany: function exportCompany() {
            const _this = this;

            let companyId = this.subCompanySection;

            exportCompanyUsingGET(companyId);
        },

        /**
         * 支公司下拉选项
         */
        queryCompanyList: function queryCompanyList() {
            const _this  = this;

            queryCompanyListUsingGET()
            .then(val => {
                let data = val.data;

                if (data && data instanceof Array && data.length > 0) {
                    _this.subCompanyOptions = data.map(item => ({
                        value: item[0],
                        label: item[1],
                    }));
                }

            }, error => console.log(error))
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
            this.jumpToRouter('/shops/subcompany/details', item.original);
        },

        /**
         * 删除一个项
         */
        deleteHandle: function deleteHandle(item) {
            const _this = this;

            this.$confirm('此操作将永久删除该支公司, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                removeCompanyUsingGET(item.id)
                .then(val => {
                    _this.$message({
                        message: '删除成功',
                        type: 'info'
                    });
                    _this.currentPage = 1;
                    _this.queryAllCompany();

                }, error => console.log(error));

            }).catch(() => {
                _this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },

        /**
         * 分页改变的时候处理函数
         */
        pageChangeHandle: function pageChangeHandle(item) {
            this.currentPage = item;
            this.queryAllCompany();
        },

        /**
         * 前页页码大小时候处理函数
         */
        pageSizeChangeHandle: function pageSizeChangeHandle(item) {
            this.pageSize = item;
            this.queryAllCompany();
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
