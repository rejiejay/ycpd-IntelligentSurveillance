<!-- 团队监控 -->
<template>
<div class="monitor-team">
    <!-- 顶部操作按钮 -->
    <div class="team-operate flex-start-center">
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
            <el-button icon="el-icon-download" type="primary" @click="exportTeamMonitor">导出</el-button>
        </div>

        <div class="team-operate-right">
            <el-input class="carts-search-main"
                placeholder="按照团队搜索" 
                v-model="search" 
                clearable
            >
                <el-button slot="append" icon="el-icon-search" @click="initTeamMonitorList"></el-button>
            </el-input>
        </div>
    </div>
    
    <!-- 表单部分 -->
    <div class="team-table">
        <div class="team-table-title flex-start">
            <div class="team-table-ranking">
                排名
            </div>
            <div class="team-table-name">
                <span>团队名称</span>
            </div>
            <div class="team-table-subcompany">
                <span>支公司</span>
            </div>
            <div class="team-table-premium flex-rest" @click="premiumSortHandle">
                <span>保费收入</span>
                <i :class="sortToIcon(premiumSort)"></i>
            </div>
            <div class="team-table-loss flex-rest" @click="lossSortHandle">
                <span>定损支出</span>
                <i :class="sortToIcon(lossSort)"></i>
            </div>
            <div class="team-table-proportion flex-rest" @click="proportionSortHandle">
                <span>产保比</span>
                <i :class="sortToIcon(proportionSort)"></i>
            </div>
        </div>

        <div class="team-table-form">
            <!-- 一个项 -->
            <div class="team-table-item flex-start-center"
                v-for="(item, key) in teamList" 
                :key="key"
            >
                <div class="team-table-ranking">{{item.no}}</div>
                <div class="team-table-name">{{item.name}}</div>
                <div class="team-table-subcompany">{{item.subcompany}}</div>

                <div class="team-table-premium flex-rest">
                    <div class="team-table-container flex-start">

                        <div class="team-table-activate flex-start-center"
                            :style="`width: ${
                                item.premiumPercent
                            }%; background: ${
                                /** 小于警戒线会显示黄色 */
                                item.premiumPercentLable < premiumWarningLine ? '#E6A23C' : '#67C23A'
                            };`"
                        >
                            <div class="flex-rest" v-if="item.premiumPercent < 40 /** 这里设置最大宽度为 40% 因为最后有 1800 / 6000 万元 怕会被挡住 */" ></div>
                            <div v-else style="width: 40%;"></div>
                            <div class="table-activate-percent" v-if="item.premiumPercent >= 30 /** 当百分比大于30 的时候显示在这边即可 */">
                                <span>{{`${item.premiumPercentLable}%`}}</span>
                            </div>
                        </div>
                        
                        <div class="team-table-disable flex-rest flex-start-center">
                            <span 
                                v-if="item.premiumPercent < 30 /** 当百分比小于30的显示在这边，因为怕会被挤掉 */"
                            >{{`${item.premiumPercentLable}%`}}</span>
                        </div>
                        
                        <div class="team-table-lable">{{`${item.premium} / ${item.premiumPredicted} 万元`}}</div>
                    </div>
                </div>
                <div class="team-table-loss flex-rest">
                    <div class="team-table-container flex-start">

                        <div class="team-table-activate flex-start-center"
                            :style="`width: ${item.lossPercent}%; background: ${item.lossPercentLable > premiumWarningLine ? '#E6A23C' : '#67C23A'};`"
                        >
                            <div class="flex-rest" v-if="item.lossPercent < 40" ></div>
                            <div v-else style="width: 40%;"></div>
                            <div class="table-activate-percent" v-if="item.lossPercent >= 30">
                                <span>{{`${item.lossPercentLable}%`}}</span>
                            </div>
                        </div>
                        
                        <div class="team-table-disable flex-rest flex-start-center">
                            <span v-if="item.lossPercent < 30">{{`${item.lossPercentLable}%`}}</span>
                        </div>
                        
                        <div class="team-table-lable">{{`${item.loss} / ${item.lossPredicted} 万元`}}</div>
                    </div>
                </div>
                <div class="team-table-proportion flex-rest">
                    <div class="team-table-container flex-start">
                        <div class="team-table-activate flex-start-center"
                            :style="`width: ${item.proportion}%; background: ${item.proportion > proportionSortLine ? '#E6A23C' : '#67C23A'};`"
                        >
                            <div class="flex-rest"></div>
                            <div class="table-activate-percent" v-if="item.proportion >= 30">
                                <span>{{`${item.proportion}%`}}</span>
                            </div>
                        </div>
                        
                        <div class="team-table-disable flex-rest flex-start-center">
                            <span v-if="item.proportion < 30">{{`${item.proportion}%`}}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 预警线 -->
            <div class="table-form-predicted flex-start">
                <div style="width: 45px;"></div>
                <div style="width: 120px;"></div>
                <div style="width: 200px;"></div>
                <div class="team-table-premium flex-rest flex-start">
                    <div class="team-table-predicted" :style="`width: ${premiumWarningLine}%`">
                        <!-- <div class="table-predicted-label">{{premiumWarningLine}}%</div> -->
                    </div>
                </div>
                <div class="team-table-loss flex-rest flex-start">
                    <div class="team-table-predicted" :style="`width: ${lossSortLine}%`">
                        <!-- <div class="table-predicted-label">{{lossSortLine}}%</div> -->
                    </div>
                </div>
                <div class="team-table-proportion flex-rest flex-start">
                    <div class="team-table-predicted" :style="`width: ${proportionSortLine}%`">
                        <div class="table-predicted-label">{{proportionSortLine}}%</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    
    <!-- 分页部分 -->
    <div class="team-pagination flex-center">
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
// 请求类
import { listTeamMonitorUsingGET, exportTeamMonitorUsingGET } from "@/api/monitor/team";
// 组件类
import TimeConver from "@/utils/TimeConver";

export default {
    name: 'monitor-team',

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
                        end.setTime(new Date().getTime() - 3600 * 1000 * 24 * 1);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        end.setTime(new Date().getTime() - 3600 * 1000 * 24 * 1);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        end.setTime(new Date().getTime() - 3600 * 1000 * 24 * 1);
                        picker.$emit('pick', [start, end]);
                    }
                }
            ]
        }
        let thisFullYear = new Date().getFullYear(); // 今年
        let thisMonth = new Date().getMonth(); // 这个月 - 1
        // 初始化 筛选的开始时间（这个月 1号）
        let initStartTime = new Date(thisFullYear, thisMonth, 1);
        // 下个月初的时间戳（下个月 1号）
        let nextMonthTimestamp = new Date(thisFullYear, thisMonth + 1, 1).getTime();
        // 初始化 筛选的结束时间
        let initEndTime = new Date(thisFullYear, thisMonth, new Date(nextMonthTimestamp - (1000 * 60 * 60 * 24)).getDate());


        return {
            startendTime: [ // 开始结束时间
                initStartTime,
                initEndTime,
            ],
            startendTimeOptions: startendTimeOptions, // 开始结束时间 左边选项

            ajaxStartTime: initStartTime, // 数据提交的开始时间
            ajaxEndTime: initEndTime, // 数据提交的结束时间

            search: '', // 搜索

            /**
             * 保费收入排序
             * @param {object} null 表示不排序
             * @param {string} up 向上
             * @param {string} down 向上
             */
            premiumSort: null,

            /**
             * 定损支出排序
             * @param {object} null 表示不排序
             * @param {string} up 向上
             * @param {string} down 向上
             */
            lossSort: null,

            /**
             * 产保比排序
             * @param {object} null 表示不排序
             * @param {string} up 向上
             * @param {string} down 向上
             */
            proportionSort: null,

            // premiumWarningLine: 50, // 保费 预警线 （百分比1~100）
            // lossSortLine: 50, // 定损 预警线 （百分比1~100）
            proportionSortLine: 60, // 产保比 预警线 （百分比1~100）

            teamList: [
                // {
                //     no: 1, // 排名
                //     name: '业务二部', // 名称
                //     subcompany: '深圳市有限公司', // 名称支公司
                //     premium: 1800, // 保费收入（万元）
                //     premiumPredicted: 6000, // 保费预测收入（万元）
                //     premiumPercent: 60, // 保费预测百分比(1~100)
                //     loss: 1800, // 保费收入（万元）
                //     lossPredicted: 6000, // 保费预测收入（万元）
                //     lossPercent: 20, // 保费预测百分比(1~100)
                //     proportion: 20, // 产保比 (1~100)
                // }, {
                //     no: 2,
                //     name: '业务二部', // 名称
                //     subcompany: '深圳市有限公司深圳市有限公司深圳市有限公司', // 名称支公司
                //     premium: 1800, // 保费收入（万元）
                //     premiumPredicted: 6000, // 保费预测收入（万元）
                //     premiumPercent: 40, // 保费预测百分比(1~100)
                //     loss: 1800, // 保费收入（万元）
                //     lossPredicted: 6000, // 保费预测收入（万元）
                //     lossPercent: 45, // 保费预测百分比(1~100)
                //     proportion: 90, // 产保比 (1~100)
                // }, {
                //     no: 3,
                //     name: '业务二部业务二部业务二部业务二部', // 名称
                //     subcompany: '深圳市有限公司', // 名称支公司
                //     premium: 1800, // 保费收入（万元）
                //     premiumPredicted: 6000, // 保费预测收入（万元）
                //     premiumPercent: 20, // 保费预测百分比(1~100)
                //     loss: 1800, // 保费收入（万元）
                //     lossPredicted: 6000, // 保费预测收入（万元）
                //     lossPercent: 80, // 保费预测百分比(1~100)
                //     proportion: 60, // 产保比 (1~100)
                // }, 
            ],

            /**
             * 分页相关
             */
            currentPage: 1, // 当前页码
            pageSize: 100, // 一个页面多少数据
            pageTotal: 1, // 一共多少条数据 
        } 
    },

    computed: {
        /**
         * 保费 预警线 （日期 百分比1~100）
         */
        premiumWarningLine: function premiumWarningLine() {
            let nowDateTimestamp = new Date().getTime();
            let ajaxStartTimetamp = this.ajaxStartTime.getTime();
            let ajaxEndTimetamp = this.ajaxEndTime.getTime();

            // 判断现在的时间戳 是否小于 开始时间
            if (nowDateTimestamp < this.ajaxStartTime.getTime()) {
                return 0
            }

            // 判断现在的时间戳 是否大于 结束时间
            if (nowDateTimestamp > ajaxEndTimetamp) {
                return 100
            }

            let molecule = (ajaxEndTimetamp - ajaxStartTimetamp) - (ajaxEndTimetamp - nowDateTimestamp);
            let denominator = ajaxEndTimetamp - ajaxStartTimetamp;

            return Math.floor((molecule / denominator) * 100);
        }, 

        /**
         * 定损 预警线 （日期 百分比1~100）
         */
        lossSortLine: function lossSortLine() {
            let nowDateTimestamp = new Date().getTime();
            let ajaxStartTimetamp = this.ajaxStartTime.getTime();
            let ajaxEndTimetamp = this.ajaxEndTime.getTime();

            // 判断现在的时间戳 是否小于 开始时间
            if (nowDateTimestamp < this.ajaxStartTime.getTime()) {
                return 0
            }

            // 判断现在的时间戳 是否大于 结束时间
            if (nowDateTimestamp > ajaxEndTimetamp) {
                return 100
            }

            let molecule = (ajaxEndTimetamp - ajaxStartTimetamp) - (ajaxEndTimetamp - nowDateTimestamp);
            let denominator = ajaxEndTimetamp - ajaxStartTimetamp;

            return Math.floor((molecule / denominator) * 100);
        }
    },

    watch: {
        /**
         * 开始结束时间
         */
        startendTime: function startendTime(newstartendTime) {
            if (newstartendTime[0] && newstartendTime[1]) {
                this.initTeamMonitorList();
            }
        },
    },

	mounted: function mounted() {
        this.initTeamMonitorList(); // 初始化 团队监控
    },

	methods: {
        /**
         * 初始化 支公司监控
         */
        initTeamMonitorList: function initTeamMonitorList() {
            const _this = this;
            
            if (!this.startendTime[0]) {
                return this.$notify({title: '提示', message: '开始时间不能为空', duration: 0 });
            }
            
            if (!this.startendTime[1]) {
                return this.$notify({title: '提示', message: '结束时间不能为空', duration: 0 });
            }

            let pageSize = this.pageSize;

            let teamName = this.search ? this.search : '';

            this.ajaxStartTime = this.startendTime[0];
            this.ajaxEndTime = this.startendTime[1];

            let startDate = TimeConver.dateToFormat(this.ajaxStartTime);
            let endDate = TimeConver.dateToFormat(this.ajaxEndTime);

            let orderBy = '';
            let sortType = '';
            
            if (this.premiumSort) {
                orderBy = 'PREMIUM';

                if (this.premiumSort === 'up') {
                    sortType = 'ASC';
                } else if (this.premiumSort === 'down') {
                    sortType = 'DESC';
                }
            }
            
            if (this.lossSort) {
                orderBy = 'LOSS_ASSESSMENT';

                if (this.lossSort === 'up') {
                    sortType = 'ASC';
                } else if (this.lossSort === 'down') {
                    sortType = 'DESC';
                }
            }
            
            if (this.proportionSort) {
                orderBy = 'RATIO';

                if (this.proportionSort === 'up') {
                    sortType = 'ASC';
                } else if (this.proportionSort === 'down') {
                    sortType = 'DESC';
                }
            }

            listTeamMonitorUsingGET(pageSize, teamName, startDate, endDate, orderBy, sortType)
            .then(val => {
                let data = val.data;

                console.log(data)
                if (data && data instanceof Array && data.length > 0) {
                    _this.teamList = data.map((item, key) => {
                        let newItem = {}

                        newItem.no = (key + 1);
                        newItem.name = item.teamName; // 团队名称
                        newItem.subcompany = item.bcName; // 支公司名称

                        newItem.premium = item.sumpremium ? (Math.round(item.sumpremium / 100) / 100)/** 转化为万元并且保留两位小数 */ : '0'; // 保费金额
                        newItem.premiumPredicted = item.income ? (Math.round(item.income / 100) / 100) : '0'; // 预测保费

                        /**
                         * 保费收入
                         */
                        /** 渲染百分比的比例 */
                        let premiumPercent = item.sumpremium / item.income;
                        if (item.sumpremium && item.income && premiumPercent > 1) {
                            newItem.premiumPercent = 100;
                        } else if (item.sumpremium && item.income && premiumPercent >= 0 && premiumPercent <= 1) {
                            newItem.premiumPercent = Math.round(premiumPercent * 10000) / 100; // 保费预测百分比(1~100)
                            
                        } else {
                            newItem.premiumPercent = 0; // 保费预测百分比(1~100)
                        }
                        /** 渲染百分比的标签 */
                        if (item.sumpremium && item.income && premiumPercent >= 0) {
                            newItem.premiumPercentLable = Math.round(premiumPercent * 100); // 不保留小数
                        } else {
                            newItem.premiumPercentLable = 0; // 注意清空为零
                        }

                        newItem.loss = item.sumlossfee ? (Math.round(item.sumlossfee / 100) / 100) : '0'; // 定损金额
                        newItem.lossPredicted = item.expense ? (Math.round(item.expense / 100) / 100) : '0'; // 预测定损

                        /**
                         * 定损支出
                         */
                        /** 渲染百分比的比例 */
                        let lossPercent = item.sumlossfee / item.expense;
                        if (item.sumlossfee && item.expense && lossPercent > 1) {
                            newItem.lossPercent = 100;
                        } else if (item.sumlossfee && item.expense && lossPercent >= 0 && lossPercent <= 1) {
                            newItem.lossPercent = Math.round(lossPercent * 10000) / 100; // 保费预测百分比(1~100)
                            
                        } else {
                            newItem.lossPercent = 0; // 保费预测百分比(1~100)
                        }
                        /** 渲染百分比的标签 */
                        if (item.sumlossfee && item.expense && lossPercent >= 0) {
                            newItem.lossPercentLable = Math.round(lossPercent * 100); // 不保留小数
                        } else {
                            newItem.lossPercentLable = 0; // 注意清空为零
                        }

                        /**
                         * 产保比
                         */
                        newItem.proportion = item.ratio ? (Math.round(item.ratio * 10000) / 100) : '0'; // 定损金额

                        return newItem;
                    });
                } else {
                    _this.teamList = []; // 记得清空
                }

            }, error => console.log(error));
        },
        
        /**
         * 导出 支公司监控
         */
        exportTeamMonitor: function exportTeamMonitor() {
            const _this = this;
            
            if (!this.startendTime[0]) {
                return this.$notify({title: '提示', message: '开始时间不能为空', duration: 0 });
            }
            
            if (!this.startendTime[1]) {
                return this.$notify({title: '提示', message: '结束时间不能为空', duration: 0 });
            }

            let teamName = this.search ? this.search : '';

            this.ajaxStartTime = this.startendTime[0];
            this.ajaxEndTime = this.startendTime[1];

            let startDate = TimeConver.dateToFormat(this.ajaxStartTime);
            let endDate = TimeConver.dateToFormat(this.ajaxEndTime);

            let orderBy = '';
            let sortType = '';
            
            if (this.premiumSort) {
                orderBy = 'PREMIUM';

                if (this.premiumSort === 'up') {
                    sortType = 'ASC';
                } else if (this.premiumSort === 'down') {
                    sortType = 'DESC';
                }
            }
            
            if (this.lossSort) {
                orderBy = 'LOSS_ASSESSMENT';

                if (this.lossSort === 'up') {
                    sortType = 'ASC';
                } else if (this.lossSort === 'down') {
                    sortType = 'DESC';
                }
            }
            
            if (this.proportionSort) {
                orderBy = 'RATIO';

                if (this.proportionSort === 'up') {
                    sortType = 'ASC';
                } else if (this.proportionSort === 'down') {
                    sortType = 'DESC';
                }
            }

            exportTeamMonitorUsingGET(teamName, startDate, endDate, orderBy, sortType)
        },

        /**
         * 排序方式 转为 ICON 样式
         * @param {string} name 排序的方式
         */
        sortToIcon: function sortToIcon(name) {
            if (name && name === 'up') {
                return 'el-icon-caret-bottom';

            } else if (name && name === 'down') {
                return 'el-icon-caret-top';

            } else {
                return 'el-icon-d-caret';

            }
        },

        /**
         * 保费收入排序
         */
        premiumSortHandle: function premiumSortHandle() {
            if (this.premiumSort === null) {
                this.premiumSort = 'up';

            } else if (this.premiumSort === 'up') {
                this.premiumSort = 'down';

            } else if (this.premiumSort === 'down') {
                this.premiumSort = null;

            }

            this.lossSort = null; // 只要点击就进行清空
            this.proportionSort = null;
            this.initTeamMonitorList();
        },

        /**
         * 保费收入排序
         */
        lossSortHandle: function lossSortHandle() {
            if (this.lossSort === null) {
                this.lossSort = 'up';

            } else if (this.lossSort === 'up') {
                this.lossSort = 'down';

            } else if (this.lossSort === 'down') {
                this.lossSort = null;

            }

            this.premiumSort = null; // 只要点击就进行清空
            this.proportionSort = null;
            this.initTeamMonitorList();
        },

        /**
         * 保费收入排序
         */
        proportionSortHandle: function proportionSortHandle() {
            if (this.proportionSort === null) {
                this.proportionSort = 'up';

            } else if (this.proportionSort === 'up') {
                this.proportionSort = 'down';

            } else if (this.proportionSort === 'down') {
                this.proportionSort = null;

            }

            this.premiumSort = null; // 只要点击就进行清空
            this.lossSort = null;
            this.initTeamMonitorList();
        },

        /**
         * 分页改变的时候处理函数
         */
        pageSizeChangeHandle: function pageSizeChangeHandle(item) {
            this.pageSize = item;
            this.initTeamMonitorList();
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

.monitor-team {
    position: relative;
    color: $black2;
    font-size: 14px;
    font-weight: normal;
}

// 顶部操作按钮
.team-operate {
    padding: 15px;
}

// 表单部分
.team-table {
    padding: 15px 15px 30px 15px;

    .team-table-title {
        color: $black1;
        font-size: 16px;
        padding-bottom: 15px;
        

        span {
            padding-left: 15px;
        }

        .flex-rest {
            cursor: pointer;
            -webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Chrome/Safari/Opera */
            -khtml-user-select: none; /* Konqueror */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently not supported by any browser */
        }

        .flex-rest:hover {
            color: #F56C6C;
        }

        .el-icon-caret-top,
        .el-icon-caret-bottom {
            color: #F56C6C;
        }
    }

    .team-table-ranking {
        width: 45px;
    }

    .team-table-name {
        width: 120px;
    }

    .team-table-subcompany {
        width: 200px;
    }

    // 一个项
    .team-table-form {
        position: relative;
        border-bottom: 1px solid #ddd;

        .team-table-item {
            border-top: 1px solid #ddd;
            min-height: 45px;
        }

        .team-table-ranking {
            text-align: center;
        }

        // 因为会换行 所以给与一定的间距
        .team-table-name {
            padding: 15px 0px 15px 15px;
        }
        .team-table-subcompany {
            padding: 15px 15px 15px 0px;
        }

        .team-table-premium, 
        .team-table-loss, 
        .team-table-proportion {
            padding-right: 15px;

            .team-table-container {
                position: relative;
                height: 45px;
                background: #f5f5f5;
            }

            // 激活的百分比进度部分
            .team-table-activate {
                height: 45px;

                .table-activate-percent {
                    color: #fff;

                    span {
                        padding-right: 10px;
                    }
                }
            }

            // 失效的百分比进度部分
            .team-table-disable {
                height: 45px;

                span {
                    padding-left: 10px;
                }
            }

            .team-table-lable {
                position: absolute;
                line-height: 45px;
                right: 10px;
            }
        }

        // 预警线
        .table-form-predicted {
            position: absolute;
            left: 0px;
            top: 0px;
            width: 100%;
            height: 100%;

            > div {
                height: 100%;
            }

            .team-table-predicted {
                position: relative;
                height: 100%;
                border-right: 1px solid #F56C6C;

                .table-predicted-label {
                    position: absolute;
                    bottom: -24px;
                    right: -15px;
                }
            }
        }
    }
}

// 分页部分
.team-pagination {
    padding: 15px;
}
</style>
