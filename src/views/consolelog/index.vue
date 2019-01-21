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
        </el-table>
    </div>

    <!-- 分页部分 -->
    <div class="consolelog-pagination flex-center">
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
// 工具类
import TimeConver from '@/utils/TimeConver';
// 请求类
import { queryAllAlarmLogUsingPOST, exportAlarmLogUsingGET } from "@/api/consolelog";

export default {
    name: 'consolelog',

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
                new Date(new Date().getTime() - 3600 * 1000 * 24),
                new Date(),
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
            pageTotal: 1, // 一共多少条数据 
        } 
    },

	mounted: function mounted() {
        // this.queryAllAlarmLog();
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
            let startTime = this.startendTimeOptions[0] ? TimeConver.dateToFormat(this.startendTimeOptions[0]) : '';
            let endTime = this.startendTimeOptions[1] ? TimeConver.dateToFormat(this.startendTimeOptions[1]) : '';

            queryAllAlarmLogUsingPOST(currentPage, pageSize, arId, startTime, endTime)
            .then(val => {
                console.log(val)

                let data = val.data;

                _this.pageTotal = data.totalPages;

                if (!data || !data.objs || data.objs instanceof Array === false || data.objs.length <= 0) {
                    _this.teamList = []; // 记得清空
                    return false;
                }

                _this.teamList = data.objs.map(val => {
                    let newItem = {};

                    newItem.original = val; // 后端返的原始数据
                    newItem.id = val.id; // 唯一标识
                    newItem.sendTime = val.sendTime; // 短信发送时间
                    newItem.alarmName = val.alarmName; // 预警名称
                    newItem.content = val.content; // 预警内容
                    newItem.alarmUser = val.alarmUser; // 被预警人
                    
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
         * 清空查询条件
         */
        clearConditions: function clearConditions() {
            this.subCompanySection = null;
            this.monthSection = null;
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
