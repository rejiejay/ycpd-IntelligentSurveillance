<!-- 团队管理 -->
<template>
<div class="team-manage">
    <!-- 顶部操作按钮 -->
    <div class="team-manage-operate flex-start-bottom">
        <div class="manage-operate-left flex-rest">
            <el-input v-model="keyword" type="text" :clearable="true" placeholder="请输入团队名称"></el-input>

            <el-button icon="el-icon-search" type="primary" @click="currentPage = 1; queryAllTeam();">查询</el-button>
            <el-button icon="el-icon-download" type="success" @click="exportTeam">导出</el-button>
            <el-button size="mini" type="danger" round @click="clearConditions">清空查询条件</el-button>
        </div>

        <div class="manage-operate-right">
            <el-button icon="el-icon-download" type="text" @click="getTeamTemplate">下载模板</el-button>
            <el-button icon="el-icon-tickets" type="primary" plain>上传清单</el-button>
            <el-button icon="el-icon-plus" type="primary" @click="jumpToRouter('/shops/team/details')">新增</el-button>
        </div>
    </div>

    <!-- 表单部分 -->
    <div class="team-manage-table">
        <el-table
            :data="teamList"
            border
            style="width: 100%"
        >
            <el-table-column
                prop="teamCode"
                label="团队代码"
            ></el-table-column>
            <el-table-column
                prop="teamName"
                label="团队名称"
            ></el-table-column>
            <el-table-column
                prop="teamLeader"
                label="团队经理"
            ></el-table-column>
            <el-table-column
                prop="phone"
                label="电话"
            ></el-table-column>
            <el-table-column
                prop="subCompany"
                label="支公司"
            ></el-table-column>
            <el-table-column
                prop="remark"
                label="备注"
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
    <div class="team-manage-pagination flex-center">
        <el-pagination
            :current-page="currentPage"
            :page-size="pageSize"
            :page-count="pageTotal"
            @size-change="pageSizeChangeHandle"
            @current-change="pageChangeHandle"
            layout="sizes, prev, pager, next, jumper"
        ></el-pagination>
    </div>
</div>
</template>

<script>
import { queryAllTeamUsingPOST, removeTeamUsingPOST, exportTeamUsingGET, getTeamTemplateUsingGET } from "@/api/shops/team";
import { queryTeamByBcIdUsingGET } from "@/api/team";
import { queryCompanyListUsingGET } from "@/api/subcompany";
import { queryStoreSelectUsingPOST } from "@/api/store";

export default {
    name: 'team-manage',

	data: function data() { 
        return {
            keyword: '', // 团队关键词查询

            // 团队列表
            teamList: [
                // {
                //     teamCode: '', // 团队代码
                //     teamName: '', // 团队名称
                //     teamLeader: '', // 团队经理
                //     phone: '', // 电话
                //     subCompany: '', // 支公司
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

    watch: {
        /**
         * 就是支公司 发生改变的时候 根据支公司唯一id获取团队列表
         */
        subCompanySection: function subCompanySection(newsubcompany) {
            this.queryTeamByBcId(newsubcompany);
        },
    },

	mounted: function mounted() {
        this.queryAllTeam(); // 初始化 获取团队列表
        // this.queryCompanyList(); // 支公司下拉选项
        // this.selectCartsStoreSearch(''); // 车行下拉
    },

	methods: {
        /**
         * 获取团队列表
         */
        queryAllTeam: function queryAllTeam() {
            const _this = this;

            let currentPage = this.currentPage;
            let pageSize = this.pageSize;
            let keyword = this.keyword ? this.keyword : '';

            queryAllTeamUsingPOST(currentPage, pageSize, keyword)
            .then(val => {
                console.log(val)

                let data = val.data;

                _this.pageTotal = data.totalPages;

                if (!data || !data.objs || data.objs instanceof Array === false || data.objs.length <= 0) {
                    _this.teamList = [];
                    return false;
                }

                _this.teamList = data.objs.map(val => {
                    let newItem = {};

                    newItem.original = val; // 后端返的原始数据
                    newItem.id = val.id; // 团队 唯一标识
                    newItem.teamCode = val.teamCode; // 团队代码
                    newItem.teamName = val.teamName; // 团队名称
                    newItem.teamLeader = val.manager; // 团队经理
                    newItem.phone = val.phone; // 分管领导电话
                    newItem.subCompany = val.bcName; // 支公司名称
                    newItem.remark = val.remark; // 备注
                    
                    return newItem
                });

            }, error => console.log(error));
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
         * 下载团队模板
         */
        getTeamTemplate: function getTeamTemplate() {
            getTeamTemplateUsingGET(this.keyword);
        },

        /**
         * 选择车行搜索 车行下拉列表
         */
        selectCartsStoreSearch: function selectCartsStoreSearch(storeName) {
            const _this  = this;
            queryStoreSelectUsingPOST(storeName)
            .then(val => {
                let data = val.data;

                if (data && data instanceof Array && data.length > 0) {
                    _this.shopNetOptions = data.map(item => ({
                        value: item[0],
                        label: item[1],
                    }));
                } else {
                    _this.shopNetOptions = []; // 记得清空
                }

            }, error => console.log(error));
        },

        /**
         * 根据支公司唯一id获取团队列表
         */
        queryTeamByBcId: function queryTeamByBcId(bcId) {
            const _this = this;

            queryTeamByBcIdUsingGET(bcId)
            .then(val => {
                let data = val.data;

                if (data && data instanceof Array && data.length > 0) {
                    _this.teamOptions = data.map(item => ({
                        value: item[0],
                        label: item[1],
                    }));
                } else {
                    _this.teamOptions = []; // 记得清空
                }

            }, error => console.log(error))
        },

        /**
         * 数据导出
         */
        exportTeam: function exportTeam() {
            let companyId = this.subCompanySection ? this.subCompanySection : '';
            let storeId = this.shopNetSection ? this.shopNetSection : '';
            let teamId = this.teamSection ? this.teamSection : '';
            
            exportTeamUsingGET(companyId, storeId, teamId);
        },

        /**
         * 清空查询条件
         */
        clearConditions: function clearConditions() {
            this.subCompanySection = null;
            this.shopNetSection = null;
            this.teamSection = null;
        },

        /**
         * 修改一个项
         */
        modifierHandle: function modifierHandle(item) {
            this.jumpToRouter('/shops/team/details', item.original);
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

                removeTeamUsingPOST(item.id)
                .then(val => {
                    _this.$message({
                        message: '删除成功',
                        type: 'info'
                    });
                    _this.currentPage = 1;
                    _this.queryAllTeam();

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
            this.queryAllTeam();
        },

        /**
         * 前页页码大小时候处理函数
         */
        pageSizeChangeHandle: function pageSizeChangeHandle(item) {
            this.pageSize = item;
            this.queryAllTeam();
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

.team-manage {
    position: relative;
    color: $black2;
    font-size: 14px;
    font-weight: normal;
}

// 顶部操作部分
.team-manage-operate {
    padding: 15px;

    .el-input {
        width: 240px;
        margin-right: 15px;
    }

    .el-select {
        margin-right: 15px;
    }
}

// 表单部分
.team-manage-table {
    padding: 15px;
}

.team-manage-pagination {
    padding: 15px 15px 35px 15px;
}

</style>
