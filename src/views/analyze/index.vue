<!-- 统计分析 -->
<template>
<div class="analyze">
    <!-- 顶部操作按钮 -->
    <div class="analyze-operate flex-start-bottom">
        <div class="analyze-time-section">
            <el-select v-model="analyzeTimeSection" placeholder="请选择统计分析">
                <el-option label="按月分析" value="month"></el-option>
                <el-option label="按日分析" value="data"></el-option>
            </el-select>
        </div>

        <div class="analyze-operate-month flex-start" v-if="analyzeTimeSection === 'month'">
            <el-date-picker
                v-model="startMonthTime"
                type="month"
                placeholder="开始日期"
            ></el-date-picker>

            <el-date-picker
                v-model="endMonthTime"
                type="month"
                placeholder="结束日期"
            ></el-date-picker>
        </div>

        <div class="analyze-operate-date flex-start" v-if="analyzeTimeSection === 'data'">
            <el-date-picker
                v-model="startDataTime"
                type="date"
                placeholder="开始日期"
            ></el-date-picker>

            <el-date-picker
                v-model="endDataTime"
                type="date"
                placeholder="结束日期"
            ></el-date-picker>
        </div>

        <el-select v-model="subCompanySection" placeholder="请选择支公司">
            <el-option
                v-for="item in subCompanyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
        </el-select>

        <el-select v-model="teamSection" placeholder="选择业务团队">
            <el-option
                v-for="item in teamOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
        </el-select>

        <el-select v-model="regionSection" placeholder="请选择网点">
            <el-option
                v-for="item in regionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
        </el-select>

        <el-button icon="el-icon-search" type="primary">查询</el-button>
        <el-button icon="el-icon-download" type="success">导出</el-button>
        <el-button size="mini" type="danger" round>清空查询条件</el-button>
    </div>

    <!-- 图表部分 -->
    <div class="analyze-charts">
        <div class="charts-premium-loss" id="charts-premium-loss"></div>
        <div class="analyze-charts-proportion" id="analyze-charts-proportion"></div>
    </div>
</div>
</template>

<script>
// 框架类
import echarts  from 'echarts';

export default {
    name: 'analyze',

	data: function data() { 
        let thisFullYear = new Date().getFullYear(); // 今年
        let thisMonth = new Date().getMonth(); // 这个月 - 1
        // 初始化 筛选的开始时间（这个月 1号）
        this.initStartTime = new Date(thisFullYear, thisMonth, 1);
        // 下个月初的时间戳（下个月 1号）
        let nextMonthTimestamp = new Date(thisFullYear, thisMonth + 1, 1).getTime();
        // 初始化 筛选的结束时间（这个月 月底）
        this.initEndTime = new Date(thisFullYear, thisMonth, new Date(nextMonthTimestamp - (1000 * 60 * 60 * 24)).getDate());

        return {
            /**
             * 统计分时间段 
             * @param {string} data 按日分析
             * @param {string} month 按月分析
             */
            analyzeTimeSection: 'data',

            /**
             * 开始结束天数
             * 最大区间31天
             */
            startDataTime: this.initStartTime,
            endDataTime: this.initEndTime,

            /**
             * 开始结束月份
             * 最大区间12个月
             */
            startMonthTime: '',
            endMonthTime: '',

            subCompanySection: '', // 支公司
            subCompanyOptions: [
                {
                    value: '支公司一',
                    lable: '支公司一',
                }
            ],
            teamSection: '', // 业务团队
            teamOptions: [
                {
                    value: '业务团队一',
                    lable: '业务团队一',
                }
            ],
            regionSection: '', // 网点
            regionOptions: [
                {
                    value: '网点一',
                    lable: '网点一',
                }
            ],

            mountPremiumLossCharts: null, // 保费收入/定损支出 图表实例
            mountProportionCharts: null, // 产保比 图表实例
        } 
    },

	mounted: function mounted() {
        this.mountPremiumLossCharts = echarts.init(document.getElementById('charts-premium-loss'));
        this.mountProportionCharts = echarts.init(document.getElementById('analyze-charts-proportion'));
        this.initPremiumLossCharts(); // 初始化 保费收入/定损支出 图表
        this.initProportionCharts(); // 初始化 产保比 图表
    },

	methods: {
        /**
         * 初始化 保费收入/定损支出 图表
         */
        initPremiumLossCharts: function initPremiumLossCharts() {
            // let echartsOption = {
            //     title: {
            //         text: '保费收入/定损支出',
            //         subtext: '单位：万元',
            //     },
            //     tooltip: { // 提示框组件。
            //         trigger: 'axis', // 触发类型: 坐标轴触发
            //         /**
            //          * 提示框浮层内容 格式器
            //          * 因为修改成为了 ... 的点样式, 所以提示需要手动去修改
            //          * @param {Object|Array} formatter 需要的数据集
            //          */
            //         formatter: function formatter(params) {
            //             let str = ""; 
            //             let n = []; // 一个新的临时数组
            //             let m = [];
            //             for (let i = 0; i < params.length; i++ ) {
            //                 if( params[i].data == "" || params[i].data == undefined) {
            //                 } else {
            //                     n.push(params[i].marker + params[i].seriesName + ":" + params[i].data + "<br>");
            //                 }
            //             };

            //             for (let i = 0; i < n.length; i++) {
            //                 // 如果当前数组的第i已经保存进了临时数组，那么跳过，
            //                 // 否则把当前项push到临时数组里面
            //                 if (m.indexOf(n[i]) == -1) {
            //                     m.push(n[i]);
            //                 }
            //             }
                        
            //             for(let i = 0; i < m.length; i++ ) {
            //                 str += m[i];
            //             }

            //             return str;
            //         }
            //     },
            //     legend: { // 图例组件。
            //         data: [ '2的指数','3的指数']
            //     },
            //     xAxis: { // x 轴
            //         type: 'category', // 坐标轴 类型 （category: 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。）
            //         name: '日期', // 坐标轴 昵称
            //         splitLine: {show: true},
            //         data: ['一', '二', '三', '四', '五', '六', '七', '八', '九']
            //     },
            //     yAxis: { // y 轴
            //         type: 'value', // 数值轴，适用于连续数据。
            //     },
            //     grid: { // 直角坐标系内绘图网格
            //         top: '60',
            //         left: '15', // grid 组件离容器左侧的距离。
            //         right: '15',
            //         bottom: '0',
            //         containLabel: true, // grid 区域是否包含坐标轴的刻度标签。
            //     },
            //     series: [ // 系列列表。
            //         {
            //             name: '3的指数',
            //             type: 'line',
            //             data: [1, 3, 9, 27, 81, 247, , ,]
            //         },
            //         {
            //             name: '3的指数',
            //             type: 'line',
            //             itemStyle:{
            //                 normal:{
            //                 lineStyle:{
            //                     width:2,
            //                     type:'dotted'  //'dotted'虚线 'solid'实线
            //                 }
            //             }
            //         }, 
            //             data: [, , , , , 247, 741, 2223, 6669]
            //         },
            //         {
            //             name: '2的指数',
            //             type: 'line',
            //             data: [3,5 ,7 ,35 , 3, 247, 74, 2223, 33]
            //         },
            //     ]
            // }

            // 公共配置
            let echartsOption = {
                title: {
                    text: '保费收入/定损支出',
                    subtext: '单位：万元',
                },
                tooltip: { // 提示框组件。
                    trigger: 'axis', // 触发类型: 坐标轴触发
                },
                legend: { // 图例组件。
                    data: [ '保费收入','定损支出']
                },
                xAxis: { // x 轴
                    type: 'category', // 坐标轴 类型 （category: 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。）
                    name: '日期', // 坐标轴 昵称
                    splitLine: {show: true},
                },
                yAxis: { // y 轴
                    type: 'value', // 数值轴，适用于连续数据。
                },
                grid: { // 直角坐标系内绘图网格
                    top: '60',
                    left: '15', // grid 组件离容器左侧的距离。
                    right: '15',
                    bottom: '0',
                    containLabel: true, // grid 区域是否包含坐标轴的刻度标签。
                },
            }

            // 提示框浮层内容 格式器
            let formatter = function formatter(params) {}
            // x 轴的数据
            let xAxisData = [];
            // 系列列表
            let series = [];

            // 开始绘制图表
            echartsOption.tooltip.formatter = formatter;
            echartsOption.xAxis.data = xAxisData;
            echartsOption.series = series;
            this.mountPremiumLossCharts.setOption(echartsOption);
        },

        /**
         * 初始化 产保比 图表
         */
        initProportionCharts: function initProportionCharts() {
            let myChart = this.mountProportionCharts;
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

.analyze {
    position: relative;
    color: $black2;
    font-size: 14px;
    font-weight: normal;
}

// 顶部操作按钮
.analyze-operate {
    padding: 15px;

    .el-select {
        width: 140px;
        margin-right: 15px;
    }

    .analyze-time-section .el-select {
        width: 110px;
    }

    .analyze-operate-month .el-date-editor {
        width: 120px;
        margin-right: 15px;
    }

    .analyze-operate-date .el-date-editor {
        width: 140px;
        margin-right: 15px;
    }
}

// 图表部分
.analyze-charts {
    padding: 15px;

    .charts-premium-loss {
        height: 300px;
    }
}

</style>
