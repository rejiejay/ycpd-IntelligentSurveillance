<!-- 统计分析 -->
<template>
<div class="analyze">
    <!-- 顶部操作按钮 -->
    <div class="analyze-operate flex-start-bottom">
        <div class="analyze-time-section">
            <el-select v-model="analyzeTimeSection" placeholder="请选择统计分析">
                <el-option label="按日分析" value="0"></el-option>
                <el-option label="按月分析" value="1"></el-option>
            </el-select>
        </div>

        <div class="analyze-operate-date flex-start" v-if="analyzeTimeSection === '0'">
            <el-date-picker
                v-model="startDataTime"
                @change="startDataHandle"
                type="date"
                placeholder="开始日期"
            ></el-date-picker>

            <el-date-picker
                v-model="endDataTime"
                @change="endDataHandle"
                type="date"
                placeholder="结束日期"
            ></el-date-picker>
        </div>

        <div class="analyze-operate-month flex-start" v-if="analyzeTimeSection === '1'">
            <el-date-picker
                v-model="startMonthTime"
                @change="startMonthHandle"
                type="month"
                placeholder="开始日期"
            ></el-date-picker>

            <el-date-picker
                v-model="endMonthTime"
                @change="endMonthHandle"
                type="month"
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

        <el-select v-model="teamSection" :disabled="!subCompanySection" placeholder="选择业务团队">
            <el-option
                v-for="item in teamOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
        </el-select>

        <el-select 
            v-model="regionSection" 
            placeholder="请输入网点名称"
            filterable 
            :filter-method="selectCartsStoreSearch"
        >
            <el-option
                v-for="item in regionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
        </el-select>

        <el-button icon="el-icon-search" type="primary" @click="currentPage = 1; searchByConditions();">查询</el-button>
        <el-button icon="el-icon-download" type="success">导出</el-button>
        <el-button size="mini" type="danger" round @click="clearConditions">清空查询条件</el-button>
    </div>

    <!-- 图表分析部分（注意用到了DOM渲染，不可随便在这个元素下改东西） -->
    <div class="analyze-charts" id="analyze-charts">
        <div class="charts-premium-loss" id="charts-premium-loss" style="height: 300px;"></div>
        <div style="height: 45px;"></div>
        <div class="analyze-charts-proportion" id="analyze-charts-proportion" style="height: 300px;"></div>
    </div>

    <!-- 表单统计部分 -->
    <div class="analyze-statistics">
    <div class="analyze-statistics-title">表单统计</div>
        <el-table
            :data="statistics"
            border
            style="width: 100%"
        >
            <el-table-column
                prop="date"
                label="时间"
            ></el-table-column>
            <el-table-column
                prop="premium"
                label="保费收入（万元）"
            ></el-table-column>
            <el-table-column
                prop="loss"
                label="定损金额（万元）"
            ></el-table-column>
            <el-table-column
                prop="proportion"
                label="产保比（%）"
            ></el-table-column>
            <el-table-column
                prop="type"
                label="数据类型"
            ></el-table-column>
        </el-table>
    </div>
</div>
</template>

<script>
// 工具类
import TimeConver from '@/utils/TimeConver';
// 框架类
import echarts  from 'echarts';
// 请求类
import { statisticalAnalysisUsingPOST, exportStatisticalAnalysisUsingPOST } from "@/api/analyze";
import { queryCompanyListUsingGET } from "@/api/subcompany";
import { queryTeamByBcIdUsingGET } from "@/api/team";
import { queryStoreSelectUsingPOST } from "@/api/store";

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
             * @param {string} 0 按日分析
             * @param {string} 1 按月分析
             */
            analyzeTimeSection: '0',

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
            startMonthTime: null,
            endMonthTime: null,

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
                // {
                //     value: '网点一',
                //     label: '网点一',
                // }
            ],

            premiums: [], // 保险
            lossAssessments: [], // 定损
            ratios: [], // 产包比

            /**
             * 表单统计
             */
            statistics: [
                {
                    date: '2018年1月',
                    premium: '111',
                    loss: '222',
                    proportion: '33%',
                    type: '时间数据',
                }, {
                    date: '汇总',
                    premium: '6342',
                    loss: '4299',
                    proportion: '23%',
                    type: '含预测数据',
                }
            ],
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
        this.initStatisticalAnalys(); // 初始化数据

        this.queryCompanyList(); // 支公司下拉选项
        this.selectCartsStoreSearch(''); // 初始化 车行下拉列表
    },

	methods: {
        /**
         * 初始化 图表数据
         */
        initStatisticalAnalys: function initStatisticalAnalys() {
            const _this  = this;

            let type = this.analyzeTimeSection;
            let startDate = TimeConver.dateToFormat(this.startDataTime); 
            let endDate = TimeConver.dateToFormat(this.endDataTime); 
            let bcId = this.subCompanySection; 
            let teamId = this.teamSection; 
            let networkId = this.regionSection;

            statisticalAnalysisUsingPOST(type, startDate, endDate, bcId, teamId, networkId)
            .then(val => {
                let data = val.data;
                
                _this.premiums = data.premiums.concat(data.futureDay4Premiums);
                _this.lossAssessments = data.lossAssessments.concat(data.futureDay4LossAssessments);
                _this.ratios = data.ratios.concat(data.futureDay4Ratios);

                _this.initAnalyzeCharts(); // 初始化 图表

            }, error => console.log(error))

            return '下面的是测试数据!';

            /**
             * 获取循环多少次
             */
            let differ = 0;
            let startTimestamp = this.startDataTime.getTime(); // 开始时间
            let endTimestamp = this.endDataTime.getTime(); // 结束时间
            if (this.analyzeTimeSection === '0') {
                differ = (endTimestamp - startTimestamp) / (1000 * 60 * 60 * 24); // 相差几天
            } else {
                let endTimeMonth = (this.endMonthTime.getFullYear() * 12) + (this.endMonthTime.getMonth() + 1); // 结束一共多少个月
                let startTimeMonth = (this.startMonthTime.getFullYear() * 12) + (this.startMonthTime.getMonth() + 1); // 开始一共多少个月
                differ = endTimeMonth - startTimeMonth; // 相差几个月
            }

            let premiums = [];
            let lossAssessments = [];
            let ratios = [];

            for (let i = 0; i <= differ; i++) {
                premiums.push(123321);
                lossAssessments.push(321123);
                ratios.push(12);
            }
            
            this.premiums = premiums;
            this.lossAssessments = lossAssessments;
            this.ratios = ratios;

            this.initAnalyzeCharts(); // 初始化 图表
        },

        /**
         * 初始化表单统计
         */
        initFormStatistical: function initFormStatistical() {
            // 现在的时间戳
            let nowTimestamp = new Date(); 
            let nowDayTimestamp = new Date(nowTimestamp.getFullYear(), nowTimestamp.getMonth(), nowTimestamp.getDate()).getTime(); // 精确到日
            let nowMonthTimestamp = new Date(nowTimestamp.getFullYear(), nowTimestamp.getMonth()).getTime(); // 精确到月
            
            let startTimestamp = this.startDataTime.getTime(); // 开始时间
            let endTimestamp = this.endDataTime.getTime(); // 结束时间
            let statistics = [];

            if (this.analyzeTimeSection === '0') {
                let differDay = (endTimestamp - startTimestamp) / (1000 * 60 * 60 * 24); // 相差几天

                let countpremium = 0;
                let countloss = 0;

                for (let i = 0; i <= differDay; i++) { // 循环相差几天
                    let mapTemDate = new Date(startTimestamp + (i * (1000 * 60 * 60 * 24)) ); // 数组循环的时间
                    let Month = mapTemDate.getMonth() + 1;
                    let nowDate = mapTemDate.getDate();
                    let thisMapTimestamp = startTimestamp + (i * (1000 * 60 * 60 * 24)); // 当前数组循环的时间戳

                    countpremium += this.premiums[i];
                    countloss += this.lossAssessments[i];

                    let date = `${Month}月${nowDate}日`;
                    let premium = this.premiums[i];
                    let loss = this.lossAssessments[i];
                    let proportion = this.ratios[i];
                    let type = '实际数据';
                    if (thisMapTimestamp > nowDayTimestamp) {
                        type = '预测数据';
                    }

                    statistics.push({
                        date: date,
                        premium: premium,
                        loss: loss,
                        proportion: `${proportion}%`,
                        type: type,
                    });
                }

                let countProportion = Math.floor((countloss / countpremium) * 100); // 定损金额/保费金额

                statistics.push({
                    date: '汇总',
                    premium: countpremium,
                    loss: countloss,
                    proportion: countProportion ? `${countProportion}%` : '0%',
                    type: '汇总数据',
                });

            } else {
                let endTimeMonth = (this.endMonthTime.getFullYear() * 12) + (this.endMonthTime.getMonth() + 1); // 结束一共多少个月
                let startTimeMonth = (this.startMonthTime.getFullYear() * 12) + (this.startMonthTime.getMonth() + 1); // 开始一共多少个月
                let differMonth = endTimeMonth - startTimeMonth; // 相差几个月
                
                let countpremium = 0;
                let countloss = 0;

                for (let i = 0; i <= differMonth; i++) { // 循环相差几月
                    let thisMapFullYear = Math.floor( (startTimeMonth + i) / 12); // 当前循环的年份
                    let thisMapMonth = ((startTimeMonth + i) % 12) - 1; // 当前循环的(月份 - 1)
                    let thisMapTime = new Date(thisMapFullYear, thisMapMonth);
                    let thisMapTimestamp = new Date(thisMapFullYear, thisMapMonth).getTime(); // 当前循环的时间戳

                    
                    countpremium += this.premiums[i];
                    countloss += this.lossAssessments[i];

                    let date = `${thisMapTime.getFullYear()}年${thisMapTime.getMonth() + 1}月`;
                    let premium = this.premiums[i];
                    let loss = this.lossAssessments[i];
                    let proportion = this.ratios[i];
                    let type = '实际数据';
                    if (thisMapTimestamp > nowMonthTimestamp) {
                        type = '预测数据';
                    }

                    statistics.push({
                        date: date,
                        premium: premium,
                        loss: loss,
                        proportion: `${proportion}%`,
                        type: type,
                    });
                }

                let countProportion = Math.floor((countloss / countpremium) * 100); // 定损金额/保费金额

                statistics.push({
                    date: '汇总',
                    premium: countpremium,
                    loss: countloss,
                    proportion: countProportion ? `${countProportion}%` : '0%',
                    type: '汇总数据',
                });
            }

            this.statistics = statistics;
        },

        /**
         * 导出图表数据
         */
        exportStatisticalAnalys: function exportStatisticalAnalys() {
            let type = this.analyzeTimeSection;
            let startDate = TimeConver.dateToFormat(this.startDataTime); 
            let endDate = TimeConver.dateToFormat(this.endDataTime); 
            let bcId = this.subCompanySection; 
            let teamId = this.teamSection; 
            let networkId = this.regionSection;

            statisticalAnalysisUsingPOST(type, startDate, endDate, bcId, teamId, networkId)
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
         * 选择车行搜索 车行下拉列表
         */
        selectCartsStoreSearch: function selectCartsStoreSearch(storeName) {
            const _this  = this;
            queryStoreSelectUsingPOST(storeName)
            .then(val => {
                let data = val.data;

                if (data && data instanceof Array && data.length > 0) {
                    _this.regionOptions = data.map(item => ({
                        value: item[0],
                        label: item[1],
                    }));
                } else {
                    _this.regionOptions = []; // 记得清空
                }

            }, error => console.log(error));
        },

        /**
         * 初始化 图表
         */
        initAnalyzeCharts: function initAnalyzeCharts() {
            // 不渲染新的DOM元素, 图标初始化后的数据会有重复数据的
            document.getElementById('analyze-charts').innerHTML = `
                <div class="charts-premium-loss" id="charts-premium-loss" style="height: 300px;"></div>
                <div style="height: 45px;"></div>
                <div class="analyze-charts-proportion" id="analyze-charts-proportion" style="height: 300px;"></div>
            `;

            this.initPremiumLossCharts(); // 初始化 保费收入/定损支出 图表
            this.initProportionCharts(); // 初始化 产保比 图表
            
            this.initFormStatistical(); // 初始化表单统计
        },

        /**
         * 初始化 保费收入/定损支出 图表
         */
        initPremiumLossCharts: function initPremiumLossCharts() {
            const mountPremiumLossCharts = echarts.init(document.getElementById('charts-premium-loss'));
            const _this = this;
            /**
             * 修改 提示框浮层内容 格式器函数
             * 就是 既有真实数据 又有预测数据的 提示框浮层函数
             * 因为多出 保费收入预测 定损支出预测 的标签是（重复的）
             */
            let bothFormatter =  function formatter(params) {
                // 如果是交叉点的位置
                if (params[0].data !== null && params[1].data !== null && params[2].data !== null && params[3].data !== null ) {
                    return `${params[0].marker}${params[0].seriesName}: ${params[0].data}<br>${params[2].marker}${params[2].seriesName}: ${params[2].data}<br>`;
                }

                return params.map(val => {
                    // 数据不为 null 的时候才渲染标签
                    if (val.data !== null) {
                        return `${val.marker}${val.seriesName}: ${val.data}<br>`;

                    } else {
                        
                        return '';
                    }
                }).join('');
            }
            // 现在的时间戳
            let nowTimestamp = new Date(); 
            let nowDayTimestamp = new Date(nowTimestamp.getFullYear(), nowTimestamp.getMonth(), nowTimestamp.getDate()).getTime(); // 精确到日
            let nowMonthTimestamp = new Date(nowTimestamp.getFullYear(), nowTimestamp.getMonth()).getTime(); // 精确到月
            // 提示框浮层内容 格式器
            let formatter = null;
            let legendData = ['保费收入', '定损支出'];
            // x 轴的数据
            let xAxisData = [];
            // 系列列表
            let series = [];

            // 公共配置
            let echartsOption = {
                title: {
                    text: '保费收入/定损支出',
                    subtext: '单位：万元',
                },
                tooltip: { // 提示框组件。
                    trigger: 'axis', // 触发类型: 坐标轴触发
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

            /**
             * 初始化 图标 按日分析 
             */
            let initChartsByData = () => {
                let startTimestamp = _this.startDataTime.getTime(); // 开始时间
                let endTimestamp = _this.endDataTime.getTime(); // 结束时间
                let differDay = (endTimestamp - startTimestamp) / (1000 * 60 * 60 * 24); // 相差几天
                let xAxisTemArr = []; // x 轴 临时数据
                
                // 初始化 x 轴的数据
                for (let i = 0; i <= differDay; i++) { // 循环相差几天
                    let mapTemDate = new Date(startTimestamp + (i * (1000 * 60 * 60 * 24)) ); // 数组循环的时间
                    let Month = mapTemDate.getMonth() + 1;
                    let nowDate = mapTemDate.getDate();
                    
                    xAxisTemArr.push(`${Month}月${nowDate}日`);
                }

                // 初始化到 x 轴
                xAxisData = xAxisTemArr;

                // 既有 真实 又有 预测 数据的情况 （既有 实线 也有 虚线）
                if (nowDayTimestamp > startTimestamp && nowDayTimestamp < endTimestamp) {
                    let premiumRealArr = []; // 保费 真实 临时数据
                    let lossRealArr = []; // 损金额 真实 临时数据
                    let premiumPredictArr = []; // 保费 真实 临时数据
                    let lossPredictArr = []; // 损金额 真实 临时数据

                    // 初始化 系列列表数据
                    for (let i = 0; i <= differDay; i++) { // 循环相差几天
                        let thisMapTimestamp = startTimestamp + (i * (1000 * 60 * 60 * 24)); // 当前数组循环的时间戳

                        if (nowDayTimestamp === thisMapTimestamp) { 
                            // 两个时间点交错 （今天）
                            premiumRealArr.push(_this.premiums[i]); // 【保费 真实】 
                            lossRealArr.push(_this.lossAssessments[i]); // 【定损 真实】
                            premiumPredictArr.push(_this.premiums[i]); // 【保费 预测】
                            lossPredictArr.push(_this.lossAssessments[i]); // 【定损 预测】

                        } else if (thisMapTimestamp > nowDayTimestamp) {
                            // 如果循环的时间 大于现在的时间 表示预测数据
                            premiumRealArr.push(null); // 【保费 真实】  真实数据 传入 null 即可
                            lossRealArr.push(null); // 【定损 真实】 真实数据 传入 null 即可
                            premiumPredictArr.push(_this.premiums[i]); // 【保费 预测】 后端数据
                            lossPredictArr.push(_this.lossAssessments[i]); // 【定损 预测】 后端数据

                        } else {
                            // 表示真实数据的情况
                            premiumRealArr.push(_this.premiums[i]); // 【保费 真实】 后端数据
                            lossRealArr.push(_this.lossAssessments[i]); // 【定损 真实】 后端数据
                            premiumPredictArr.push(null); // 【保费 预测】 传入 null 即可
                            lossPredictArr.push(null); // 【定损 预测】 传入 null 即可
                        }
                    }

                    // 初始化图例组件
                    legendData = ['保费收入', '定损支出', '保费收入预测', '定损支出预测'];

                    series.push({
                        name: '保费收入',
                        type: 'line',
                        itemStyle: { color: '#67C23A' },
                        lineStyle: { width: 2, type: 'solid' },
                        data: premiumRealArr,
                    });
                    series.push({
                        name: '保费收入预测',
                        type: 'line',
                        itemStyle: { color: '#67C23A' },
                        lineStyle: { width: 2, type: 'dotted' },
                        data: premiumPredictArr,
                    });
                    series.push({
                        name: '定损支出',
                        type: 'line',
                        itemStyle: {  color: '#F56C6C' },
                        lineStyle: { width: 2, type: 'solid' },
                        data: lossRealArr,
                    });
                    series.push({
                        name: '定损支出预测',
                        type: 'line',
                        itemStyle: {  color: '#F56C6C' },
                        lineStyle: { width: 2, type: 'dotted' },
                        data: lossPredictArr,
                    });

                    /**
                     * 修改 提示框浮层内容 格式器函数
                     */
                    formatter = bothFormatter;

                } else {
                    // 全是 真实数据 或者 预测数据 的情况 （全是 实线 或 虚线）
                    let isPredict = false; // 是否预测数据

                    // 初始化是否虚线 （预测数据）
                    if (nowTimestamp < startTimestamp) {
                        isPredict = true;

                        // 初始化图例组件
                        legendData = ['保费收入预测', '定损支出预测'];
                    }

                    let premiumTemArr = []; // 保费 临时数据
                    let lossTemArr = []; // 损金额 临时数据

                    // 初始化 系列列表数据
                    for (let i = 0; i <= differDay; i++) { // 循环相差几天
                        premiumTemArr.push(1200); // 保费
                        lossTemArr.push(2300); // 定损
                    }

                    series.push({
                        name: isPredict ? '保费收入预测' : '保费收入',
                        type: 'line',
                        itemStyle: { color: '#67C23A' },
                        lineStyle: { width: 2, type: isPredict ? 'dotted' : 'solid' },
                        data: premiumTemArr,
                    });
                    series.push({
                        name: isPredict ? '定损支出预测' : '定损支出',
                        type: 'line',
                        itemStyle: {  color: '#F56C6C' },
                        lineStyle: { width: 2, type: isPredict ? 'dotted' : 'solid' },
                        data: lossTemArr,
                    });
                }
            }

            /**
             * 初始化 图标 按月分析 
             */
            let initChartsByMonth = () => {
                let startTimestamp = _this.startMonthTime.getTime(); // 开始时间戳
                let endTimestamp = _this.endMonthTime.getTime(); // 结束时间戳
                
                /**
                 * 计算相差几个月
                 */
                let endTimeMonth = (_this.endMonthTime.getFullYear() * 12) + (_this.endMonthTime.getMonth() + 1); // 结束一共多少个月
                let startTimeMonth = (_this.startMonthTime.getFullYear() * 12) + (_this.startMonthTime.getMonth() + 1); // 开始一共多少个月
                let differMonth = endTimeMonth - startTimeMonth; // 相差几个月
                let xAxisTemArr = []; // x 轴 临时数据
                
                // 初始化 x 轴的数据
                for (let i = 0; i <= differMonth; i++) { // 循环相差几月
                    /**
                     * 当前循环的时间
                     */
                    let thisMapFullYear = Math.floor( (startTimeMonth + i) / 12); // 当前循环的年份
                    let thisMapMonth = ((startTimeMonth + i) % 12) - 1; // 当前循环的(月份 - 1)
                    let thisMapTime = new Date(thisMapFullYear, thisMapMonth);
                    
                    xAxisTemArr.push(`${thisMapTime.getFullYear()}年${thisMapTime.getMonth() + 1}月`);
                }

                // 初始化到 x 轴
                xAxisData = xAxisTemArr;

                // 既有 真实 又有 预测 数据的情况 （既有 实线 也有 虚线）
                if (nowTimestamp > startTimestamp && nowTimestamp < endTimestamp) {
                    let premiumRealArr = []; // 保费 真实 临时数据
                    let lossRealArr = []; // 损金额 真实 临时数据
                    let premiumPredictArr = []; // 保费 真实 临时数据
                    let lossPredictArr = []; // 损金额 真实 临时数据

                    // 初始化 系列列表数据
                    for (let i = 0; i <= differMonth; i++) { // 循环相差几月
                        /**
                         * 获取当前循环的时间戳
                         */
                        let thisMapFullYear = Math.floor( (startTimeMonth + i) / 12); // 当前循环的年份
                        let thisMapMonth = ((startTimeMonth + i) % 12) - 1; // 当前循环的(月份 - 1)
                        let thisMapTimestamp = new Date(thisMapFullYear, thisMapMonth).getTime(); // 当前循环的时间戳

                        if (nowMonthTimestamp === thisMapTimestamp) { 
                            // 两个时间点交错 （今天）
                            premiumRealArr.push(_this.premiums[i]); // 【保费 真实】 
                            lossRealArr.push(_this.lossAssessments[i]); // 【定损 真实】
                            premiumPredictArr.push(_this.premiums[i]); // 【保费 预测】
                            lossPredictArr.push(_this.lossAssessments[i]); // 【定损 预测】

                        } else if (thisMapTimestamp > nowMonthTimestamp) {
                            // 如果循环的时间 大于现在的时间 表示预测数据
                            premiumRealArr.push(null); // 【保费 真实】  真实数据 传入 null 即可
                            lossRealArr.push(null); // 【定损 真实】 真实数据 传入 null 即可
                            premiumPredictArr.push(_this.premiums[i]); // 【保费 预测】 后端数据
                            lossPredictArr.push(_this.lossAssessments[i]); // 【定损 预测】 后端数据

                        } else {
                            // 表示真实数据的情况
                            premiumRealArr.push(_this.premiums[i]); // 【保费 真实】 后端数据
                            lossRealArr.push(_this.lossAssessments[i]); // 【定损 真实】 后端数据
                            premiumPredictArr.push(null); // 【保费 预测】 传入 null 即可
                            lossPredictArr.push(null); // 【定损 预测】 传入 null 即可
                        }
                    }

                    // 初始化图例组件
                    legendData = ['保费收入', '定损支出', '保费收入预测', '定损支出预测'];

                    series.push({
                        name: '保费收入',
                        type: 'line',
                        itemStyle: { color: '#67C23A' },
                        lineStyle: { width: 2, type: 'solid' },
                        data: premiumRealArr,
                    });
                    series.push({
                        name: '保费收入预测',
                        type: 'line',
                        itemStyle: { color: '#67C23A' },
                        lineStyle: { width: 2, type: 'dotted' },
                        data: premiumPredictArr,
                    });
                    series.push({
                        name: '定损支出',
                        type: 'line',
                        itemStyle: {  color: '#F56C6C' },
                        lineStyle: { width: 2, type: 'solid' },
                        data: lossRealArr,
                    });
                    series.push({
                        name: '定损支出预测',
                        type: 'line',
                        itemStyle: {  color: '#F56C6C' },
                        lineStyle: { width: 2, type: 'dotted' },
                        data: lossPredictArr,
                    });

                    /**
                     * 修改 提示框浮层内容 格式器函数
                     */
                    formatter = bothFormatter;

                } else {
                    // 全是 真实数据 或者 预测数据 的情况 （全是 实线 或 虚线）
                    let isPredict = false; // 是否预测数据

                    // 初始化是否虚线 （预测数据）
                    if (nowTimestamp < startTimestamp) {
                        isPredict = true;

                        // 初始化图例组件
                        legendData = ['保费收入预测', '定损支出预测'];
                    }

                    let premiumTemArr = []; // 保费 临时数据
                    let lossTemArr = []; // 损金额 临时数据

                    // 初始化 系列列表数据
                    for (let i = 0; i <= differMonth; i++) { // 循环相差几月
                        premiumTemArr.push(1200); // 保费
                        lossTemArr.push(2300); // 定损
                    }

                    series.push({
                        name: isPredict ? '保费收入预测' : '保费收入',
                        type: 'line',
                        itemStyle: { color: '#67C23A' },
                        lineStyle: { width: 2, type: isPredict ? 'dotted' : 'solid' },
                        data: premiumTemArr,
                    });
                    series.push({
                        name: isPredict ? '定损支出预测' : '定损支出',
                        type: 'line',
                        itemStyle: {  color: '#F56C6C' },
                        lineStyle: { width: 2, type: isPredict ? 'dotted' : 'solid' },
                        data: lossTemArr,
                    });
                }
            }

            /**
             * 一共有六种情况
             * 按照时间段分 有三种情况
             * 【一】 全是 真实 数据的情况 （全部是今天之前）
             * 【二】 全是 预测 数据的情况 （全部是今天之后）
             * 【三】 既有 真实 又有 预测 数据的情况
             * 按照统计时间分 有两种情况
             * 【一】 按日分析
             * 【二】 按月分析
             */
            if (this.analyzeTimeSection === '0') {
                initChartsByData(); // 初始化 图标 按日分析 
            } else if (this.analyzeTimeSection === '1') {
                initChartsByMonth(); // 初始化 图标 按月分析 
            }

            // 开始绘制图表
            formatter ? echartsOption.tooltip.formatter = formatter : '';
            echartsOption.xAxis.data = xAxisData;
            echartsOption.legend = {data: legendData};
            echartsOption.series = series;
            mountPremiumLossCharts.setOption(echartsOption);
        },

        /**
         * 初始化 产保比 图表
         */
        initProportionCharts: function initProportionCharts() {
            const mountProportionCharts = echarts.init(document.getElementById('analyze-charts-proportion'));
            const _this = this;
            /**
             * 修改 提示框浮层内容 格式器函数
             * 就是 既有真实数据 又有预测数据的 提示框浮层函数
             * 因为多出 产保比 产保比预测 的标签是（重复的）
             */
            let bothFormatter =  function formatter(params) {
                // 如果是交叉点的位置
                if (params[0].data !== null && params[1].data !== null) {
                    return `${params[0].marker}${params[0].seriesName}: ${params[0].data}%`;
                }

                return params.map(val => {
                    // 数据不为 null 的时候才渲染标签
                    if (val.data !== null) {
                        return `${val.marker}${val.seriesName}: ${val.data}%<br>`;

                    } else {
                        
                        return '';
                    }
                }).join('');
            }
            // 现在的时间戳
            let nowTimestamp = new Date(); 
            let nowDayTimestamp = new Date(nowTimestamp.getFullYear(), nowTimestamp.getMonth(), nowTimestamp.getDate()).getTime(); // 精确到日
            let nowMonthTimestamp = new Date(nowTimestamp.getFullYear(), nowTimestamp.getMonth()).getTime(); // 精确到月
            // 提示框浮层内容 格式器
            let formatter = function formatter(params) {
                return params.map(val => {
                    return `${val.marker}${val.seriesName}: ${val.data}%<br>`;
                }).join('');
            };
            let legendData = ['产保比'];
            // x 轴的数据
            let xAxisData = [];
            // 系列列表
            let series = [];

            // 公共配置
            let echartsOption = {
                title: {
                    text: '产保比',
                    subtext: '单位：%',
                },
                tooltip: { // 提示框组件。
                    trigger: 'axis', // 触发类型: 坐标轴触发
                },
                xAxis: { // x 轴
                    type: 'category', // 坐标轴 类型 （category: 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。）
                    name: '日期', // 坐标轴 昵称
                    splitLine: {show: true},
                },
                yAxis: { // y 轴
                    type: 'value', // 数值轴，适用于连续数据。
                    axisLabel: {
                        show: true,
                        interval: 'auto',
                        formatter: '{value} %'
                    },
                },
                grid: { // 直角坐标系内绘图网格
                    top: '60',
                    left: '15', // grid 组件离容器左侧的距离。
                    right: '15',
                    bottom: '0',
                    containLabel: true, // grid 区域是否包含坐标轴的刻度标签。
                },
            }

            /**
             * 初始化 图标 按日分析 
             */
            let initChartsByData = () => {
                let startTimestamp = _this.startDataTime.getTime(); // 开始时间
                let endTimestamp = _this.endDataTime.getTime(); // 结束时间
                let differDay = (endTimestamp - startTimestamp) / (1000 * 60 * 60 * 24); // 相差几天
                let xAxisTemArr = []; // x 轴 临时数据
                
                // 初始化 x 轴的数据
                for (let i = 0; i <= differDay; i++) { // 循环相差几天
                    let mapTemDate = new Date(startTimestamp + (i * (1000 * 60 * 60 * 24)) ); // 数组循环的时间
                    let Month = mapTemDate.getMonth() + 1;
                    let nowDate = mapTemDate.getDate();
                    
                    xAxisTemArr.push(`${Month}月${nowDate}日`);
                }

                // 初始化到 x 轴
                xAxisData = xAxisTemArr;

                // 既有 真实 又有 预测 数据的情况 （既有 实线 也有 虚线）
                if (nowDayTimestamp > startTimestamp && nowDayTimestamp < endTimestamp) {
                    let proportionRealArr = []; // 产保比 真实 临时数据
                    let proportionPredictArr = []; // 产保比 真实 临时数据

                    // 初始化 系列列表数据
                    for (let i = 0; i <= differDay; i++) { // 循环相差几天
                        let thisMapTimestamp = startTimestamp + (i * (1000 * 60 * 60 * 24)); // 当前数组循环的时间戳

                        if (nowDayTimestamp === thisMapTimestamp) { 
                            // 两个时间点交错 （今天）
                            proportionRealArr.push(_this.ratios[i]); // 【真实数据】 同样是 后端数据
                            proportionPredictArr.push(_this.ratios[i]); // 【预测数据】 同样是 后端数据

                        } else if (thisMapTimestamp > nowDayTimestamp) {
                            // 如果循环的时间 大于现在的时间 表示预测数据
                           
                            proportionRealArr.push(null);  // 【真实数据】预测数据的时候 真实数据是 null
                            proportionPredictArr.push(_this.ratios[i]); // 【预测数据】 推入后端数据

                        } else {
                            // 表示真实数据的情况
                            proportionRealArr.push(_this.ratios[i]); // 【真实数据】 是 后端数据
                            proportionPredictArr.push(null);  // 【预测数据】 真实数据的情况 预测数据传入 null 即可
                        }
                    }

                    // 初始化图例组件
                    legendData = ['产保比', '产保比预测'];

                    series.push({
                        name: '产保比',
                        type: 'line',
                        itemStyle: { color: '#67C23A' },
                        lineStyle: { width: 2, type: 'solid' },
                        data: proportionRealArr,
                    });
                    series.push({
                        name: '产保比预测',
                        type: 'line',
                        itemStyle: { color: '#67C23A' },
                        lineStyle: { width: 2, type: 'dotted' },
                        data: proportionPredictArr,
                    });

                    /**
                     * 修改 提示框浮层内容 格式器函数
                     */
                    formatter = bothFormatter;

                } else {
                    // 全是 真实数据 或者 预测数据 的情况 （全是 实线 或 虚线）
                    let isPredict = false; // 是否预测数据

                    // 初始化是否虚线 （预测数据）
                    if (nowTimestamp < startTimestamp) {
                        isPredict = true;

                        // 初始化图例组件
                        legendData = ['产保比预测'];
                    }

                    let proportionTemArr = []; // 产保比 临时数据

                    // 初始化 系列列表数据
                    for (let i = 0; i <= differDay; i++) { // 循环相差几天
                        proportionTemArr.push(_this.ratios[i]); // 产保比
                    }

                    series.push({
                        name: isPredict ? '产保比预测' : '产保比',
                        type: 'line',
                        itemStyle: { color: '#67C23A' },
                        lineStyle: { width: 2, type: isPredict ? 'dotted' : 'solid' },
                        data: proportionTemArr,
                    });
                }
            }

            /**
             * 初始化 图标 按月分析 
             */
            let initChartsByMonth = () => {
                let startTimestamp = _this.startMonthTime.getTime(); // 开始时间戳
                let endTimestamp = _this.endMonthTime.getTime(); // 结束时间戳
                
                /**
                 * 计算相差几个月
                 */
                let endTimeMonth = (_this.endMonthTime.getFullYear() * 12) + (_this.endMonthTime.getMonth() + 1); // 结束一共多少个月
                let startTimeMonth = (_this.startMonthTime.getFullYear() * 12) + (_this.startMonthTime.getMonth() + 1); // 开始一共多少个月
                let differMonth = endTimeMonth - startTimeMonth; // 相差几个月
                let xAxisTemArr = []; // x 轴 临时数据
                
                // 初始化 x 轴的数据
                for (let i = 0; i <= differMonth; i++) { // 循环相差几月
                    /**
                     * 当前循环的时间
                     */
                    let thisMapFullYear = Math.floor( (startTimeMonth + i) / 12); // 当前循环的年份
                    let thisMapMonth = ((startTimeMonth + i) % 12) - 1; // 当前循环的(月份 - 1)
                    let thisMapTime = new Date(thisMapFullYear, thisMapMonth);
                    
                    xAxisTemArr.push(`${thisMapTime.getFullYear()}年${thisMapTime.getMonth() + 1}月`);
                }

                // 初始化到 x 轴
                xAxisData = xAxisTemArr;

                // 既有 真实 又有 预测 数据的情况 （既有 实线 也有 虚线）
                if (nowTimestamp > startTimestamp && nowTimestamp < endTimestamp) {
                    let proportionRealArr = []; // 产保比 真实 临时数据
                    let proportionPredictArr = []; // 产保比 真实 临时数据

                    // 初始化 系列列表数据
                    for (let i = 0; i <= differMonth; i++) { // 循环相差几月
                        /**
                         * 获取当前循环的时间戳
                         */
                        let thisMapFullYear = Math.floor( (startTimeMonth + i) / 12); // 当前循环的年份
                        let thisMapMonth = ((startTimeMonth + i) % 12) - 1; // 当前循环的(月份 - 1)
                        let thisMapTimestamp = new Date(thisMapFullYear, thisMapMonth).getTime(); // 当前循环的时间戳

                        if (nowMonthTimestamp === thisMapTimestamp) { 
                            // 两个时间点交错 （今天）
                            proportionRealArr.push(30);
                            proportionPredictArr.push(30);

                        } else if (thisMapTimestamp > nowMonthTimestamp) {
                            // 如果循环的时间 大于现在的时间 表示预测数据
                            // 预测数据的时候 真实数据是 null
                            proportionRealArr.push(null);
                            // 预测数据
                            proportionPredictArr.push(30);

                        } else {
                            // 表示真实数据的情况
                            proportionRealArr.push(40);
                            //真实数据的情况 预测数据传入 null 即可
                            proportionPredictArr.push(null);
                        }
                    }

                    // 初始化图例组件
                    legendData = ['产保比', '产保比预测'];

                    series.push({
                        name: '产保比',
                        type: 'line',
                        itemStyle: { color: '#67C23A' },
                        lineStyle: { width: 2, type: 'solid' },
                        data: proportionRealArr,
                    });
                    series.push({
                        name: '产保比预测',
                        type: 'line',
                        itemStyle: { color: '#67C23A' },
                        lineStyle: { width: 2, type: 'dotted' },
                        data: proportionPredictArr,
                    });

                    /**
                     * 修改 提示框浮层内容 格式器函数
                     */
                    formatter = bothFormatter;

                } else {
                    // 全是 真实数据 或者 预测数据 的情况 （全是 实线 或 虚线）
                    let isPredict = false; // 是否预测数据

                    // 初始化是否虚线 （预测数据）
                    if (nowTimestamp < startTimestamp) {
                        isPredict = true;

                        // 初始化图例组件
                        legendData = ['产保比预测'];
                    }

                    let proportionTemArr = []; // 产保比 临时数据

                    // 初始化 系列列表数据
                    for (let i = 0; i <= differMonth; i++) { // 循环相差几月
                        proportionTemArr.push(50); // 产保比
                    }

                    series.push({
                        name: isPredict ? '产保比预测' : '产保比',
                        type: 'line',
                        itemStyle: { color: '#67C23A' },
                        lineStyle: { width: 2, type: isPredict ? 'dotted' : 'solid' },
                        data: proportionTemArr,
                    });
                }
            }

            /**
             * 一共有六种情况
             * 按照时间段分 有三种情况
             * 【一】 全是 真实 数据的情况 （全部是今天之前）
             * 【二】 全是 预测 数据的情况 （全部是今天之后）
             * 【三】 既有 真实 又有 预测 数据的情况
             * 按照统计时间分 有两种情况
             * 【一】 按日分析
             * 【二】 按月分析
             */
            if (this.analyzeTimeSection === '0') {
                initChartsByData(); // 初始化 图标 按日分析 
            } else if (this.analyzeTimeSection === '1') {
                initChartsByMonth(); // 初始化 图标 按月分析 
            }

            // 开始绘制图表
            formatter ? echartsOption.tooltip.formatter = formatter : '';
            echartsOption.xAxis.data = xAxisData;
            echartsOption.legend = {data: legendData};
            echartsOption.series = series;
            mountProportionCharts.setOption(echartsOption);
        },

        /**
         * 开始时间（日） 处理函数
         */
        startDataHandle: function startDataHandle(date) {
            // 如果是清空操作
            if (!date) {
                // 不需要做任何处理
                return false;
            }

            // 判断 结束日期 是否为空
            if (!this.endDataTime) {
                // 为空不需要做任何处理
                return false;
            }

            // 判断 开始时间 是否大于 结束时间
            if (date.getTime() >= this.endDataTime.getTime()) {
                // 不大于的情况下, 弹出提示
                this.endDataTime = new Date(date.getTime() + (3600 * 1000 * 24)); // 结束日期设置往后一天
                return this.$message({
                    message: '开始时间必须小于结束时间',
                    type: 'info'
                });
            }

            // 判断跨度是否大于 31天
            let spanTimestamp = 3600 * 1000 * 24 * 31; // 31天跨度的时间戳
            if ((this.endDataTime.getTime() - date.getTime()) > spanTimestamp) {
                // 超过跨度, 弹出提示
                this.startDataTime = new Date(this.endDataTime.getTime() - spanTimestamp); // 设置为最大跨度的时间
                return this.$message({
                    message: '最多可统计31天的数据',
                    type: 'warning'
                });
            }
        },

        /**
         * 结束时间（日） 处理函数
         */
        endDataHandle: function endDataHandle(date) {
            // 如果是清空操作
            if (!date) {
                // 不需要做任何处理
                return false;
            }

            // 判断 开始日期 是否为空
            if (!this.startDataTime) {
                // 为空不需要做任何处理
                return false;
            }

            // 判断 开始时间 是否大于 结束时间
            if (this.startDataTime.getTime() >= date.getTime()) {
                // 不大于的情况下, 弹出提示
                this.startDataTime = new Date(date.getTime() - (3600 * 1000 * 24)); // 开始日期设置往前一天
                return this.$message({
                    message: '结束时间必须大于开始时间',
                    type: 'info'
                });
            }

            // 判断跨度是否大于 31天
            let spanTimestamp = 3600 * 1000 * 24 * 31; // 31天跨度的时间戳
            if ((date.getTime() - this.startDataTime.getTime()) > spanTimestamp) {
                // 超过跨度, 弹出提示
                this.endDataTime = new Date(this.startDataTime.getTime() + spanTimestamp); // 设置为最大跨度的时间
                return this.$message({
                    message: '按日分析最多可统计31天的数据',
                    type: 'warning'
                });
            }
        },

        /**
         * 开始时间（月） 处理函数
         */
        startMonthHandle: function startMonthHandle(date) {
            // 如果是清空操作
            if (!date) {
                // 不需要做任何处理
                return false;
            }
            
            // 判断 结束日期 是否为空
            if (!this.endMonthTime) {
                // 为空不需要做任何处理
                return false;
            }

            // 判断 开始时间 是否大于 结束时间
            if (date.getTime() >= this.endMonthTime.getTime()) {
                // 不大于的情况下, 弹出提示
                this.endMonthTime = new Date(date.getTime() + (3600 * 1000 * 24 * 31)); // 结束日期设置往后一月
                return this.$message({
                    message: '开始时间必须小于结束时间',
                    type: 'info'
                });
            }

            // 判断跨度是否大于 12个月
            let spanTimestamp = 3600 * 1000 * 24 * 365; // 12个月跨度的时间戳
            if ((this.endMonthTime.getTime() - date.getTime()) > spanTimestamp) {
                // 超过跨度, 弹出提示
                this.startMonthTime = new Date(this.endMonthTime.getTime() - spanTimestamp); // 设置为最大跨度的时间
                return this.$message({
                    message: '最多可统计12个月的数据',
                    type: 'warning'
                });
            }
        },

        /**
         * 结束时间（月） 处理函数
         */
        endMonthHandle: function endMonthHandle(date) {
            // 如果是清空操作
            if (!date) {
                // 不需要做任何处理
                return false;
            }
            
            // 判断 开始日期 是否为空
            if (!this.startMonthTime) {
                // 为空不需要做任何处理
                return false;
            }

            // 判断 开始时间 是否大于 结束时间
            if (this.startMonthTime.getTime() >= date.getTime()) {
                // 不大于的情况下, 弹出提示
                this.startMonthTime = new Date(date.getTime() - (3600 * 1000 * 24 * 31)); // 开始日期设置往前一个月
                return this.$message({
                    message: '结束时间必须大于开始时间',
                    type: 'info'
                });
            }

            // 判断跨度是否大于 12个月
            let spanTimestamp = 3600 * 1000 * 24 * 365; // 12个月跨度的时间戳
            if ((date.getTime() - this.startMonthTime.getTime()) > spanTimestamp) {
                // 超过跨度, 弹出提示
                this.endMonthTime = new Date(this.startMonthTime.getTime() + spanTimestamp); // 设置为最大跨度的时间
                return this.$message({
                    message: '按日分析最多可统计12个月的数据',
                    type: 'warning'
                });
            }
        },

        /**
         * 通过条件查询
         */
        searchByConditions: function searchByConditions() {
            // 判断是否为空
            if (this.analyzeTimeSection === '0') {
                // 按日分析
                if (!this.startDataTime || !this.endDataTime) {
                    return this.$alert('查询的日期不能为空', '查询条件有误');
                }
            } else {
                // 按月分析
                if (!this.startMonthTime || !this.endMonthTime) {
                    return this.$alert('查询的日期不能为空', '查询条件有误');
                }
            }

            this.initAnalyzeCharts(); // 初始化 图表
        },

        /**
         * 清空查询条件
         */
        clearConditions: function clearConditions() {
            this.analyzeTimeSection = '0';
            this.startDataTime = this.initStartTime;
            this.endDataTime = this.initEndTime;
            this.startMonthTime = null;
            this.endMonthTime = null;
            this.subCompanySection = null;
            this.teamSection = null;
            this.regionSection = null;
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
}

// 表单统计
.analyze-statistics {
    padding: 15px 15px 35px 15px;
    
    .analyze-statistics-title {
        font-size: 18px;
        font-weight: bold;
        padding-bottom: 15px;
        color: $black1;
    }
}

</style>
