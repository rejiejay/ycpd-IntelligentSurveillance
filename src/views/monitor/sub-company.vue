<!-- 支公司监控 -->
<template>
<div class="monitor-subsidiary-company">
    <!-- 顶部操作按钮 -->
    <div class="subsidiary-company-operate flex-start-center">
        <div class="company-operate-left flex-rest">
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

        <div class="company-operate-right">
            <el-input class="carts-search-main"
                placeholder="安装支公司搜索" 
                v-model="search" 
                clearable
            >
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
    </div>
    
    <!-- 表单部分 -->
    <div class="subsidiary-company-table">
        <div class="company-table-title flex-start">
            <div class="company-table-ranking">
                <span>排名</span>
            </div>
            <div class="company-table-name">
                <span>名称</span>
            </div>
            <div class="company-table-premium flex-rest" @click="premiumSortHandle">
                <span>保费收入</span>
                <i :class="sortToIcon(premiumSort)"></i>
            </div>
            <div class="company-table-loss flex-rest" @click="lossSortHandle">
                <span>定损支出</span>
                <i :class="sortToIcon(lossSort)"></i>
            </div>
            <div class="company-table-proportion flex-rest" @click="proportionSortHandle">
                <span>产保比</span>
                <i :class="sortToIcon(proportionSort)"></i>
            </div>
        </div>


    </div>
    
    <!-- 分页部分 -->
    <div class="subsidiary-company-pagination flex-center">
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
    name: 'monitor-subsidiary-company',

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

            /**
             * 分页相关
             */
            currentPage: 1, // 当前页码
            pageSize: 20, // 一个页面多少数据
            pageTotal: 1, // 一共多少条数据 

            subCompanyList: [
            ],
        } 
    },

	mounted: function mounted() {

    },

	methods: {
        /**
         * 排序方式 转为 ICON 样式
         * @param {string} name 排序的方式
         */
        sortToIcon: function sortToIcon(name) {
            if (name && name === 'up') {
                return 'el-icon-caret-top';

            } else if (name && name === 'down') {
                return 'el-icon-caret-bottom';

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

.monitor-subsidiary-company {
    position: relative;
    color: $black2;
    font-size: 14px;
    font-weight: normal;
}

// 顶部操作按钮
.subsidiary-company-operate {
    padding: 15px;
}

// 表单部分
.subsidiary-company-table {
    padding: 15px;

    .company-table-title {
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

    .company-table-ranking {
        width: 45px;
    }

    .company-table-name {
        width: 200px;
    }
}

// 分页部分
.subsidiary-company-pagination {
    padding: 15px;
}
</style>
