<!-- 定损明细 -->
<template>
<div class="loss">
    <!-- 顶部操作按钮 -->
    <div class="loss-operate flex-start-bottom">
        <el-date-picker
            v-model="startendTime"
            type="daterange"
            align="left"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="startendTimeOptions"
        ></el-date-picker>

        <el-select v-model="subCompanySection" placeholder="选择支公司">
            <el-option
                v-for="item in subCompanyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
        </el-select>

        <el-select v-model="teamSection" placeholder="业务团队">
            <el-option
                v-for="item in teamOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
        </el-select>

        <el-select v-model="regionSection" placeholder="选择车行">
            <el-option
                v-for="item in regionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
        </el-select>

        <el-input v-model="minProportion" type="number" :clearable="true" placeholder="最低损保比"></el-input>

        <el-input v-model="maxProportion" type="number" :clearable="true" placeholder="最高损保比"></el-input>

        <el-button icon="el-icon-search" type="primary" @click="currentPage = 1; lossAssessment();">查询</el-button>
        <el-button icon="el-icon-download" type="success" @click="exportLossAssessment">导出</el-button>
        <el-button size="mini" type="danger" round @click="clearConditions">清空查询条件</el-button>
    </div>

    <!-- 表单部分 -->
    <div class="loss-table">
        <el-table :data="losslist" border>
            <el-table-column
                prop="netCode"
                label="车行编码"
            ></el-table-column>
            <el-table-column
                prop="netName"
                label="车行名称"
            ></el-table-column>
            <el-table-column
                prop="netType"
                label="车行类型"
            ></el-table-column>
            <el-table-column
                prop="netRate"
                label="车行星级"
            ></el-table-column>
            <el-table-column
                prop="subCompany"
                label="支公司"
            ></el-table-column>
            <el-table-column
                prop="team"
                label="业务团队"
            ></el-table-column>
            <el-table-column
                prop="reportNo"
                label="报案号"
            ></el-table-column>
            <el-table-column
                prop="lossTime"
                label="定损时间"
            ></el-table-column>
            <el-table-column
                prop="lossPlace"
                label="定损中心"
            ></el-table-column>
        </el-table>
    </div>

    <!-- 分页部分 -->
    <div class="loss-pagination flex-center">
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
import { lossAssessmentUsingGET, exportLossAssessmentUsingGET } from "@/api/price-list/loss";
import { queryTeamByBcIdUsingGET } from "@/api/team";
import { queryCompanyListUsingGET } from "@/api/subcompany";
// 组件类
import TimeConver from '@/utils/TimeConver';

export default {
    name: 'loss',


	data: function data() { 
        // 选择时间段 左边选项列表选项
        let startendTimeOptions = {
            shortcuts: [
                {
                    text: '今天',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', [start, end]);
                    }
                },{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }
            ]
        }

        return {
            startendTime: [ // 开始结束时间
                new Date(new Date().getTime() - 3600 * 1000 * 24 * 31),
                new Date(),
            ],
            startendTimeOptions: startendTimeOptions, // 开始结束时间 左边选项

            subCompanySection: null, // 支公司
            subCompanyOptions: [
                // {
                //     value: '支公司一',
                //     label: '支公司一',
                // }
            ],
            teamSection: null, // 业务团队
            teamOptions: [
                // {
                //     value: '业务团队一',
                //     label: '业务团队一',
                // }
            ],
            regionSection: null, // 网点
            regionOptions: [
                {
                    value: '0',
                    label: '4S店',
                }, {
                    value: '1',
                    label: '修理厂',
                }, {
                    value: '2',
                    label: '二网',
                }, {
                    value: '3',
                    label: '二手车行',
                }, {
                    value: '4',
                    label: '续保',
                }, {
                    value: '5',
                    label: '非车险',
                }, {
                    value: '6',
                    label: '网络销售',
                }, {
                    value: '7',
                    label: '其他',
                }
            ],

            minProportion: '', // 最低损保比
            maxProportion: '', // 最高损保比

            // 保费明细
            losslist: [
                // {
                //     netCode: 1, // 网店编码
                //     netName: '网点一', // 网点名称
                //     netType: '网点一', // 网点类型
                //     netRate: 5, // 网点星级
                //     subCompany: '支公司一', // 支公司
                //     team: '业务团队一', // 业务团队
                //     reportNo: '123123213213', // 报案号
                //     lossTime: '2019年1月10日', // 定损时间
                //     lossPlace: '中国人保财险科技园定损中心', // 定损中心
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
        subCompanySection: function subCompanySection(newsubCompanySection) {
            this.queryTeamByBcId(newsubCompanySection);
        },
    },

	mounted: function mounted() {
        this.lossAssessment(); // 初始化 定损明细列表
        this.queryCompanyList(); // 初始化 支公司下拉选项
    },

	methods: {
        /**
         * 通过条件查询
         */
        exportLossAssessment: function exportLossAssessment() {
            const _this  = this;

            let startDate = this.startendTime[0] ? TimeConver.dateToFormat(this.startendTime[0]) : '';
            let endDate = this.startendTime[1] ? TimeConver.dateToFormat(this.startendTime[1]) : ''; 
            let storeId = this.regionSection ? this.regionSection : ''; 
            let bcId = this.subCompanySection ? this.subCompanySection : ''; 
            let teamId = this.teamSection ? this.teamSection : ''; 
            let lowestSumpremium = this.minProportion ? this.minProportion : ''; 
            let highestSumpremium = this.maxProportion ? this.maxProportion : ''; 

            exportLossAssessmentUsingGET(startDate, endDate, storeId, bcId, teamId, lowestSumpremium, highestSumpremium);
        },

        /**
         * 通过条件查询
         */
        lossAssessment: function lossAssessment() {
            const _this  = this;

            let pageNo = this.currentPage;
            let pageSize = this.pageSize;
            let startDate = this.startendTime[0] ? TimeConver.dateToFormat(this.startendTime[0]) : '';
            let endDate = this.startendTime[1] ? TimeConver.dateToFormat(this.startendTime[1]) : ''; 
            let storeId = this.regionSection ? this.regionSection : ''; 
            let bcId = this.subCompanySection ? this.subCompanySection : ''; 
            let teamId = this.teamSection ? this.teamSection : ''; 
            let lowestSumpremium = this.minProportion ? this.minProportion : ''; 
            let highestSumpremium = this.maxProportion ? this.maxProportion : ''; 

            lossAssessmentUsingGET(pageNo, pageSize, startDate, endDate, storeId, bcId, teamId, lowestSumpremium, highestSumpremium)
            .then(val => {
                let data = val.data;

                _this.pageTotal = data.total;

                if (!data || !data.lossAssessment || data.lossAssessment instanceof Array === false || data.lossAssessment.length <= 0) {
                    _this.losslist = [];
                    return false;
                }

                _this.losslist = data.lossAssessment.map(val => {
                    let newItem = {};

                    newItem.netCode = val.networkname; // 网点编码
                    newItem.netName = val.netpointname; // 网点名称	
                    newItem.netType = val.netpointtype; // 网点类型	
                    newItem.netRate = val.netpointstart; // 网点星级
                    newItem.subCompany = val.comcode; // 支公司
                    newItem.team = val.teamcode; // 业务团队

                    newItem.reportNo = val.registno; // 报案号
                    newItem.lossTime = val.deflossdate; // 定损时间
                    newItem.lossPlace = val.defsite; // 定损中心

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
         * 根据支公司唯一id获取团队列表
         */
        queryTeamByBcId: function queryTeamByBcId(bcId) {
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
         * 清空查询条件
         */
        clearConditions: function clearConditions() {
            this.startendTime = [
                new Date(new Date().getTime() - 3600 * 1000 * 24 * 31),
                new Date(),
            ];

            this.subCompanySection = null;
            this.teamSection = null;
            this.regionSection = null;
            this.minProportion = null;
            this.maxProportion = null;
        },

        /**
         * 分页改变的时候处理函数
         */
        pageChangeHandle: function pageChangeHandle(item) {
            this.currentPage = item;
            this.lossAssessment();
        },

        /**
         * 前页页码大小时候处理函数
         */
        pageSizeChangeHandle: function pageSizeChangeHandle(item) {
            this.pageSize = item;
            this.lossAssessment();
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

.loss {
    position: relative;
    color: $black2;
    font-size: 14px;
    font-weight: normal;
}

.loss-operate {
    padding: 15px;

    .el-select {
        width: 120px;
        margin-right: 15px;
    }

    .el-date-editor {
        width: 250px;
        margin-right: 15px;
    }

    .el-input {
        width: 140px;
        margin-right: 15px;
    }
}

// 表单部分
.loss-table {
    padding: 15px;
}

// 分页部分
.loss-pagination {
    padding: 15px;
}

</style>
