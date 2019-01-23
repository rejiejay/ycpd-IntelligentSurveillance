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
            <el-button icon="el-icon-download" type="primary">导出</el-button>
        </div>

        <div class="team-operate-right">
            <el-input class="carts-search-main"
                placeholder="按照团队搜索" 
                v-model="search" 
                clearable
            >
                <el-button slot="append" icon="el-icon-search"></el-button>
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
                                item.premiumPercent < premiumWarningLine ? '#E6A23C' : '#67C23A'
                            };`"
                        >
                            <div class="flex-rest" v-if="item.premiumPercent < 70 /** 这里设置最大宽度为 70% 因为最后有 1800 / 6000 万元 怕会被挡住 */" ></div>
                            <div v-else style="width: 70%;"></div>
                            <div class="table-activate-percent" v-if="item.premiumPercent >= 30 /** 当百分比大于30 的时候显示在这边即可 */">
                                <span>{{`${item.premiumPercent}%`}}</span>
                            </div>
                        </div>
                        
                        <div class="team-table-disable flex-rest flex-start-center">
                            <span 
                                v-if="item.premiumPercent < 30 /** 当百分比小于30的显示在这边，因为怕会被挤掉 */"
                            >{{`${item.premiumPercent}%`}}</span>
                        </div>
                        
                        <div class="team-table-lable">{{`${item.premium} / ${item.premiumPredicted} 万元`}}</div>
                    </div>
                </div>
                <div class="team-table-loss flex-rest">
                    <div class="team-table-container flex-start">

                        <div class="team-table-activate flex-start-center"
                            :style="`width: ${item.lossPercent}%; background: ${item.lossPercent < premiumWarningLine ? '#E6A23C' : '#67C23A'};`"
                        >
                            <div class="flex-rest" v-if="item.lossPercent < 70" ></div>
                            <div v-else style="width: 70%;"></div>
                            <div class="table-activate-percent" v-if="item.lossPercent >= 30">
                                <span>{{`${item.lossPercent}%`}}</span>
                            </div>
                        </div>
                        
                        <div class="team-table-disable flex-rest flex-start-center">
                            <span v-if="item.lossPercent < 30">{{`${item.lossPercent}%`}}</span>
                        </div>
                        
                        <div class="team-table-lable">{{`${item.loss} / ${item.lossPredicted} 万元`}}</div>
                    </div>
                </div>
                <div class="team-table-proportion flex-rest">
                    <div class="team-table-container flex-start">
                        <div class="team-table-activate flex-start-center"
                            :style="`width: ${item.proportion}%; background: ${item.proportion < premiumWarningLine ? '#E6A23C' : '#67C23A'};`"
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
                        <div class="table-predicted-label">{{premiumWarningLine}}%</div>
                    </div>
                </div>
                <div class="team-table-loss flex-rest flex-start">
                    <div class="team-table-predicted" :style="`width: ${lossSortLine}%`">
                        <div class="table-predicted-label">{{lossSortLine}}%</div>
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
            @current-change="pageChangeHandle"
            layout="sizes, prev, pager, next, jumper"
        ></el-pagination>
    </div>

</div>
</template>

<script>

export default {
    name: 'monitor-team',

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

            premiumWarningLine: 50, // 保费 预警线 （百分比1~100）
            lossSortLine: 50, // 定损 预警线 （百分比1~100）
            proportionSortLine: 50, // 产保比 预警线 （百分比1~100）

            /**
             * 分页相关
             */
            currentPage: 1, // 当前页码
            pageSize: 10, // 一个页面多少数据
            pageTotal: 1, // 一共多少条数据 

            teamList: [
                {
                    no: 1, // 排名
                    name: '业务二部', // 名称
                    subcompany: '深圳市有限公司', // 名称支公司
                    premium: 1800, // 保费收入（万元）
                    premiumPredicted: 6000, // 保费预测收入（万元）
                    premiumPercent: 60, // 保费预测百分比(1~100)
                    loss: 1800, // 保费收入（万元）
                    lossPredicted: 6000, // 保费预测收入（万元）
                    lossPercent: 20, // 保费预测百分比(1~100)
                    proportion: 20, // 产保比 (1~100)
                }, {
                    no: 2,
                    name: '业务二部', // 名称
                    subcompany: '深圳市有限公司深圳市有限公司深圳市有限公司', // 名称支公司
                    premium: 1800, // 保费收入（万元）
                    premiumPredicted: 6000, // 保费预测收入（万元）
                    premiumPercent: 40, // 保费预测百分比(1~100)
                    loss: 1800, // 保费收入（万元）
                    lossPredicted: 6000, // 保费预测收入（万元）
                    lossPercent: 45, // 保费预测百分比(1~100)
                    proportion: 90, // 产保比 (1~100)
                }, {
                    no: 3,
                    name: '业务二部业务二部业务二部业务二部', // 名称
                    subcompany: '深圳市有限公司', // 名称支公司
                    premium: 1800, // 保费收入（万元）
                    premiumPredicted: 6000, // 保费预测收入（万元）
                    premiumPercent: 20, // 保费预测百分比(1~100)
                    loss: 1800, // 保费收入（万元）
                    lossPredicted: 6000, // 保费预测收入（万元）
                    lossPercent: 80, // 保费预测百分比(1~100)
                    proportion: 60, // 产保比 (1~100)
                }, 
            ],
        } 
    },

	mounted: function mounted() {},

	methods: {
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
