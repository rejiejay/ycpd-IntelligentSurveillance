<!-- 预警日志 -->
<template>
<div class="consolelog">

    <!-- 顶部操作按钮 -->
    <div class="consolelog-operate flex-start-bottom">
        <div class="team-operate-left flex-rest">
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

            <el-select v-model="warnNameSection" placeholder="选择预警名称">
                <el-option
                    v-for="item in warnNameOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>

            <el-button icon="el-icon-search" type="primary" @click="currentPage = 1; queryAllAlarmLog();">查询</el-button>
            <el-button icon="el-icon-download" type="success" @click="exportAlarmLog">导出</el-button>
            <el-button size="mini" type="danger" round @click="clearConditions">清空查询条件</el-button>
        </div>
    </div>

    <!-- 表单部分 -->
    <div class="consolelog-table">
        <el-table
            :data="logs"
            border
            style="width: 100%"
        >
            <el-table-column
                prop="sendTime"
                label="预警短信发送时间"
            ></el-table-column>
            <el-table-column
                prop="alarmName"
                label="预警名称"
            ></el-table-column>
            <el-table-column
                prop="content"
                label="预警内容"
            ></el-table-column>
            <el-table-column
                prop="alarmUser"
                label="被预警人"
            ></el-table-column>
            <el-table-column
                prop="code"
                label="发送状态"
            ></el-table-column>
            <el-table-column
                prop="detail"
                label="发送详情"
            ></el-table-column>
        </el-table>
    </div>

    <!-- 分页部分 -->
    <div class="consolelog-pagination flex-center">
        <el-pagination
            :current-page="currentPage"
            :page-size="pageSize"
            :page-count="pageTotal"
            :total="totalElements"
            @size-change="pageSizeChangeHandle"
            @current-change="pageChangeHandle"
            layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
    </div>
</div>
</template>

<script>
// 工具类
import TimeConver from '@/utils/TimeConver';
// 请求类
import { queryAllAlarmLogUsingPOST, exportAlarmLogUsingGET, queryAlarmRuleNameUsingGET } from "@/api/consolelog";

export default {
    name: 'consolelog',

	data: function data() { 
        // 选择时间段 左边选项列表选项
        let startendTimeOptions = {
            shortcuts: [
                {
                    text: '昨天',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(new Date().getTime() - 3600 * 1000 * 24 * 1);
                        end.setTime(new Date().getTime() - 3600 * 1000 * 24 * 1);
                        picker.$emit('pick', [start, end]);
                    }
                },{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                        end.setTime(new Date().getTime() - 3600 * 1000 * 24 * 1);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                        end.setTime(new Date().getTime() - 3600 * 1000 * 24 * 1);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                        end.setTime(new Date().getTime() - 3600 * 1000 * 24 * 1);
                    }
                }
            ]
        }

        return {
            startendTime: [ // 开始结束时间
                '',
                '',
            ],
            startendTimeOptions: startendTimeOptions, // 开始结束时间 左边选项

            warnNameSection: '', // 预警名称
            warnNameOptions: [
                // {
                //     value: '预警名称一',
                //     label: '预警名称一',
                // }
            ],

            // 预警表单
            logs: [
                // {
                //     sendTime: '', // 短信发送时间
                //     alarmName: '', // 预警名称
                //     content: '', // 预警内容
                //     alarmUser: '', // 被预警人
                // }
            ],

            /**
             * 分页相关
             */
            currentPage: 1, // 当前页码
            pageSize: 10, // 一个页面多少数据
            pageTotal: 1, // 一共多少页数据 
            totalElements: 1, // 一共多少条
        } 
    },

	mounted: function mounted() {
        this.queryAllAlarmLog();
        this.queryAlarmRuleName(); // 初始化 查询预警规则下拉列表
    },

	methods: {
        /**
         * 通过条件查询
         */
        queryAllAlarmLog: function queryAllAlarmLog() {
            const _this = this;

            let currentPage = this.currentPage;
            let pageSize = this.pageSize;
            let arId = this.warnNameSection ? this.warnNameSection : '';
            let startTime = this.startendTime[0] ? `${TimeConver.dateToFormat(this.startendTime[0])} 00:00:00` : '';
            let endTime = this.startendTime[1] ? `${TimeConver.dateToFormat(this.startendTime[1])} 23:59:59` : '';

            queryAllAlarmLogUsingPOST(currentPage, pageSize, arId, startTime, endTime)
            .then(val => {

                let data = val.data;

                _this.pageTotal = data.totalPages;
                _this.totalElements = data.totalElements;

                if (!data || !data.objs || data.objs instanceof Array === false || data.objs.length <= 0) {
                    _this.logs = []; // 记得清空
                    return false;
                }

                _this.logs = data.objs.map(item => {
                    let newItem = {};

                    newItem.original = item; // 后端返的原始数据
                    newItem.sendTime = item.sendTime; // 短信发送时间
                    newItem.alarmName = item.alarmName; // 预警名称
                    newItem.content = item.content; // 预警内容
                    newItem.alarmUser = item.alarmUser; // 被预警人
                    newItem.code = item.code; // 发送短信状态
                    newItem.detail = item.detail; // 发送短信错误信息
                    
                    return newItem;
                });

            }, error => console.log(error));
        },

        /**
         * 下载预警日志列表
         */
        exportAlarmLog: function exportAlarmLog() {
            let arId = this.warnNameSection ? this.warnNameSection : '';
            let startTime = this.startendTimeOptions[0] ? TimeConver.dateToFormat(this.startendTimeOptions[0]) : '';
            let endTime = this.startendTimeOptions[1] ? TimeConver.dateToFormat(this.startendTimeOptions[1]) : '';

            exportAlarmLogUsingGET(arId, startTime, endTime);
        },

        /**
         * 初始化 查询预警规则下拉列表
         */
        queryAlarmRuleName: function queryAlarmRuleName() {
            const _this = this;

            queryAlarmRuleNameUsingGET()
            .then(res => {

                let data = res.data;

                if (!data || data instanceof Array === false || data.length <= 0) {
                    return false;
                }

                _this.warnNameOptions = data.map(item => ({
                    value: item[0],
                    label: item[1],
                }));

            }, error => console.log(error));
        },

        /**
         * 清空查询条件
         */
        clearConditions: function clearConditions() {
            this.startendTime = [ // 开始结束时间
                '',
                '',
            ];
            this.warnNameSection = '';
        },

        /**
         * 分页改变的时候处理函数
         */
        pageChangeHandle: function pageChangeHandle(item) {
            this.currentPage = item;
            this.queryAllAlarmLog();
        },

        /**
         * 前页页码大小时候处理函数
         */
        pageSizeChangeHandle: function pageSizeChangeHandle(item) {
            this.pageSize = item;
            this.queryAllAlarmLog();
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

.consolelog {
    position: relative;
    color: $black2;
    font-size: 14px;
    font-weight: normal;
}

// 顶部操作按钮
.consolelog-operate {
    padding: 15px;

    .el-date-editor,
    .el-select {
        margin-right: 15px;
    }
}

// 表单部分
.consolelog-table {
    padding: 15px;
}

// 分页
.pconsolelog-pagination {
    padding: 15px 15px 35px 15px;
}

</style>
